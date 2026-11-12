// Pont CJ Dropshipping : une commande payée chez Stripe devient une commande
// fournisseur créée NON payée, le propriétaire règle lui-même dans CJ.
import type Stripe from "stripe";
import { getProductById } from "@/data/catalog";
import { packSources } from "@/data/catalog-packs";
import { CJ_MAP } from "@/data/cj-map";
import { SHIPPING_COUNTRIES, type ShippingCountry } from "@/lib/shipping";

const CJ_API = "https://developers.cjdropshipping.com/api2.0/v1";

// Seuls les champs que le pont lit : l'objet order du webhook Stripe s'y conforme tel quel.
export type PaidOrder = {
  sessionId: string;
  email: string | null;
  phone: string | null;
  customerName: string | null;
  shippingName: string | null;
  shippingAddress: Stripe.Address | null;
  items: { id: string; qty: number; variant?: string }[];
};

export type CjOrderBody = {
  orderNumber: string;
  shippingCountryCode: string;
  shippingCountry: string;
  shippingProvince: string;
  shippingCity: string;
  shippingCustomerName: string;
  shippingAddress: string;
  shippingAddress2?: string;
  shippingZip: string;
  shippingPhone?: string;
  email?: string;
  logisticName: string;
  fromCountryCode: "CN";
  // 3 = créée sans paiement ; 2 débiterait le solde CJ, le type l'interdit.
  payType: 3;
  products: { sku: string; quantity: number }[];
  remark: string;
};

export type CjSendResult =
  | { status: "created"; orders: { orderNumber: string; orderId: string | null }[] }
  | { status: "skipped"; reason: string }
  | { status: "failed"; message: string };

export function buildCjOrders(
  order: PaidOrder,
): { ok: true; orders: CjOrderBody[] } | { ok: false; reason: string } {
  const address = order.shippingAddress;
  const name = order.shippingName ?? order.customerName;
  const country = address?.country as ShippingCountry | undefined;
  if (!address || !country || !(country in SHIPPING_COUNTRIES)) {
    return { ok: false, reason: `pays non vendu : ${address?.country ?? "inconnu"}` };
  }
  if (!name || !address.line1 || !address.city || !address.postal_code) {
    return { ok: false, reason: "adresse de livraison incomplète" };
  }

  // Une commande CJ ne porte qu'une ligne de transport : ligne → SKU → quantité.
  const groups = new Map<string, Map<string, number>>();
  const missing: string[] = [];
  for (const line of order.items) {
    const pack = packSources.find((p) => p.id === line.id);
    for (const id of pack ? pack.items : [line.id]) {
      // Dans un pack, la variante de la ligne ne vaut que pour le produit à variantes.
      const key =
        line.variant && getProductById(id, "fr")?.variant ? `${id}|${line.variant}` : id;
      const entry = CJ_MAP[key];
      if (!entry) {
        missing.push(key);
        continue;
      }
      const skus = groups.get(entry.logistic) ?? new Map<string, number>();
      skus.set(entry.sku, (skus.get(entry.sku) ?? 0) + line.qty);
      groups.set(entry.logistic, skus);
    }
  }
  // Jamais de commande partielle : le colis incomplet partirait sans que personne le voie.
  if (missing.length > 0) {
    return { ok: false, reason: `produits non reliés à CJ : ${missing.join(", ")}` };
  }
  if (groups.size === 0) return { ok: false, reason: "aucun article" };

  // Tri par nom de ligne : le même réessai Stripe redonne les mêmes numéros.
  const orders = [...groups.keys()].sort().map(
    (logisticName, index): CjOrderBody => ({
      orderNumber: `obflo-${order.sessionId.slice(-38)}-${index + 1}`,
      shippingCountryCode: country,
      shippingCountry: SHIPPING_COUNTRIES[country],
      // Stripe laisse souvent state vide, et CJ exige le champ.
      shippingProvince: address.state || address.city!,
      shippingCity: address.city!,
      shippingCustomerName: name,
      shippingAddress: address.line1!,
      ...(address.line2 ? { shippingAddress2: address.line2 } : {}),
      shippingZip: address.postal_code!,
      ...(order.phone ? { shippingPhone: order.phone } : {}),
      ...(order.email && order.email.length <= 50 ? { email: order.email } : {}),
      logisticName,
      fromCountryCode: "CN",
      payType: 3,
      products: [...groups.get(logisticName)!].map(([sku, quantity]) => ({ sku, quantity })),
      remark: `Stripe ${order.sessionId}`.slice(0, 500),
    }),
  );
  return { ok: true, orders };
}

type CjResponse = {
  code?: number;
  result?: boolean;
  message?: string;
  data?: { accessToken?: string; orderId?: string } | null;
};

// shortcut: jeton gardé en mémoire du module, une lambda froide en redemande un ; passer à un stockage partagé si CJ refuse des authentifications.
let cachedToken: { value: string; expires: number } | null = null;
let lastCall = 0;

async function cjPost(path: string, body: unknown, token?: string): Promise<CjResponse> {
  // CJ limite ce compte à 1 requête par seconde.
  const wait = lastCall + 1100 - Date.now();
  if (wait > 0) await new Promise((resolve) => setTimeout(resolve, wait));
  lastCall = Date.now();
  const res = await fetch(`${CJ_API}${path}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(token ? { "CJ-Access-Token": token } : {}),
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(10_000),
  });
  return (await res.json()) as CjResponse;
}

export async function sendCjOrders(order: PaidOrder): Promise<CjSendResult> {
  const apiKey = process.env.CJ_API_KEY;
  if (!apiKey) return { status: "skipped", reason: "CJ_API_KEY absente" };
  const built = buildCjOrders(order);
  if (!built.ok) return { status: "skipped", reason: built.reason };

  try {
    if (!cachedToken || cachedToken.expires < Date.now()) {
      const auth = await cjPost("/authentication/getAccessToken", { apiKey });
      const value = auth.data?.accessToken;
      if (!auth.result || !value) {
        throw new Error(`authentification CJ refusée : ${auth.message ?? `code ${auth.code}`}`);
      }
      cachedToken = { value, expires: Date.now() + 6 * 3_600_000 };
    }
    const orders: { orderNumber: string; orderId: string | null }[] = [];
    for (const body of built.orders) {
      const res = await cjPost("/shopping/order/createOrderV2", body, cachedToken.value);
      // Stripe réessaie ses webhooks : un numéro déjà pris veut dire commande déjà créée.
      // « exist » seul ne suffit pas, il avalerait un « sku does not exist ».
      const exists = /ORDER_CODE_EXIST|already exist/i.test(res.message ?? "");
      if (!res.result && !exists) {
        const why = `${body.orderNumber} : ${res.message ?? `code ${res.code}`}`;
        // 1600100 = paramètre refusé (SKU, ligne de transport) : réessayer ne changera rien, saisie manuelle.
        if (res.code === 1600100) return { status: "skipped", reason: why };
        throw new Error(why);
      }
      orders.push({ orderNumber: body.orderNumber, orderId: res.data?.orderId ?? null });
    }
    return { status: "created", orders };
  } catch (error) {
    cachedToken = null; // un jeton rejeté ne doit pas resservir à l'essai suivant de Stripe
    return { status: "failed", message: error instanceof Error ? error.message : String(error) };
  }
}
