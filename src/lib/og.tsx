import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { Tile } from "@/lib/tile";

// Socle commun des images Open Graph : aplats de la charte, sans dégradé.
// Satori ne lit ni les classes ni les variables CSS : couleurs en hex, `display: flex` partout.

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const CREAM = "#fcf1da";
const CHOCO = "#3b160d";
const BRAISE = "#c93d18";
const TILE_HEX: Record<Tile, string> = {
  miel: "#f8e1a8",
  peche: "#f7d2ba",
  sable: "#efdcc4",
  argile: "#e9bda2",
};

/** Couleurs d'un aplat : fond, texte, et la pastille qui tranche dessus (prix, disque). */
export function ogTone(tone: Tile) {
  return {
    bg: TILE_HEX[tone],
    fg: CHOCO,
    pop: BRAISE,
    onPop: CREAM,
  };
}

// Fredoka n'existe pas en TTF dans le dépôt : Space Grotesk, lu sur disque (aucun téléchargement).
export async function loadOgFonts() {
  const dir = join(process.cwd(), "src", "assets", "fonts");
  const [bold, medium] = await Promise.all([
    readFile(join(dir, "SpaceGrotesk-Bold.ttf")),
    readFile(join(dir, "SpaceGrotesk-Medium.ttf")),
  ]);
  return [
    { name: "Space Grotesk", data: bold, weight: 700 as const },
    { name: "Space Grotesk", data: medium, weight: 500 as const },
  ];
}

/** Mot-symbole OBFLO, même tracé que `ObfloLogo` (rapport 469 × 106). */
export function OgLogo({ width, color }: { width: number; color: string }) {
  return (
    <svg
      width={width}
      height={Math.round((width * 106) / 469)}
      viewBox="-3 -3 469 106"
      fill="none"
      stroke={color}
      strokeWidth="22"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="50" cy="50" r="42" />
      <path d="M126 8H154A19 19 0 0 1 154 46H126M154 46H160A23 23 0 0 1 160 92H126V8" />
      <path d="M219 92V8H267M219 50H257" />
      <path d="M297 8V92H343" />
      <circle cx="413" cy="50" r="42" />
    </svg>
  );
}

const SIDE = 360;

/** Colonne de droite par défaut : disque d'aplat et ondes de chaleur (même tracé que `HeatWaves`). */
function OgWaves({ tone }: { tone: Tile }) {
  const c = ogTone(tone);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: SIDE,
        height: SIDE,
        borderRadius: SIDE,
        backgroundColor: c.pop,
      }}
    >
      <svg
        width="180"
        height="192"
        viewBox="0 0 60 64"
        fill="none"
        stroke={c.onPop}
        strokeWidth="6"
        strokeLinecap="round"
      >
        <path d="M10 60c-8-10 8-18 0-28s8-18 0-28" />
        <path d="M30 60c-8-10 8-18 0-28s8-18 0-28" />
        <path d="M50 60c-8-10 8-18 0-28s8-18 0-28" />
      </svg>
    </div>
  );
}

/**
 * Cadre commun : aplat plein, texte à gauche, visuel à droite, bande de pied.
 * `image` : photo carrée en data URI ; sans elle, le disque aux ondes.
 */
export function OgFrame({
  tone,
  footer,
  image,
  logo = true,
  children,
}: {
  tone: Tile;
  footer: string;
  image?: string | null;
  /** Faux quand le mot-symbole est déjà le sujet de l'image. */
  logo?: boolean;
  children: React.ReactNode;
}) {
  const c = ogTone(tone);
  const band = { bg: CHOCO, fg: CREAM };
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: c.bg,
        color: c.fg,
        fontFamily: "Space Grotesk",
      }}
    >
      <div
        style={{
          display: "flex",
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 72px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", width: 640 }}>{children}</div>
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element -- rendu satori, pas le DOM
          <img
            src={image}
            alt=""
            width={SIDE}
            height={SIDE}
            style={{ borderRadius: 48, objectFit: "cover" }}
          />
        ) : (
          <OgWaves tone={tone} />
        )}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 92,
          padding: "0 72px",
          backgroundColor: band.bg,
          color: band.fg,
          fontSize: 28,
          fontWeight: 500,
        }}
      >
        <div style={{ display: "flex" }}>{footer}</div>
        {logo ? <OgLogo width={160} color={band.fg} /> : null}
      </div>
    </div>
  );
}
