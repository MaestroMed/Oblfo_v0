import { get, put } from "@vercel/blob";

// Petit stockage JSON privé sur Vercel Blob (back-office et stock). Sans BLOB_READ_WRITE_TOKEN : rien n'est lu ni écrit.
export const storeReady = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);

export async function readJson<T>(pathname: string): Promise<T | null> {
  if (!storeReady()) return null;
  const res = await get(pathname, { access: "private", useCache: false }).catch(() => null);
  if (!res || res.statusCode !== 200) return null;
  return JSON.parse(await new Response(res.stream).text()) as T;
}

export async function writeJson(pathname: string, data: unknown): Promise<void> {
  if (!storeReady()) throw new Error("stockage non configuré (BLOB_READ_WRITE_TOKEN)");
  await put(pathname, JSON.stringify(data), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}
