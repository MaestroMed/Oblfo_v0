import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Socle commun des images Open Graph — DA OBFLO (nuit + halo orange/bleu).

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export async function loadOgFonts() {
  const dir = join(process.cwd(), "src", "assets", "fonts");
  const [groteskBold, groteskMedium, plexMono] = await Promise.all([
    readFile(join(dir, "SpaceGrotesk-Bold.ttf")),
    readFile(join(dir, "SpaceGrotesk-Medium.ttf")),
    readFile(join(dir, "IBMPlexMono-Medium.ttf")),
  ]);

  return [
    { name: "Space Grotesk", data: groteskBold, weight: 700 as const },
    { name: "Space Grotesk", data: groteskMedium, weight: 500 as const },
    { name: "IBM Plex Mono", data: plexMono, weight: 500 as const },
  ];
}

export function OgFrame({
  kicker,
  footerLeft,
  children,
}: {
  kicker: string;
  footerLeft: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#0A0C10",
        backgroundImage:
          "radial-gradient(circle at 88% 10%, rgba(255,106,43,0.24), transparent 52%), radial-gradient(circle at 6% 95%, rgba(52,104,158,0.28), transparent 52%)",
        padding: "56px 72px",
        fontFamily: "Space Grotesk",
        position: "relative",
      }}
    >
      {/* Coins techniques */}
      <div
        style={{
          position: "absolute",
          top: 28,
          right: 28,
          width: 26,
          height: 26,
          borderTop: "3px solid rgba(255,106,43,0.8)",
          borderRight: "3px solid rgba(255,106,43,0.8)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 28,
          left: 28,
          width: 26,
          height: 26,
          borderBottom: "3px solid rgba(255,106,43,0.8)",
          borderLeft: "3px solid rgba(255,106,43,0.8)",
        }}
      />

      {/* Kicker */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 14,
            height: 14,
            backgroundColor: "#FF6A2B",
            transform: "rotate(45deg)",
            boxShadow: "0 0 24px rgba(255,106,43,0.9)",
          }}
        />
        <div
          style={{
            fontFamily: "IBM Plex Mono",
            fontSize: 22,
            letterSpacing: "0.24em",
            color: "#8FA1B3",
          }}
        >
          {kicker}
        </div>
      </div>

      {/* Contenu */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          justifyContent: "center",
        }}
      >
        {children}
      </div>

      {/* Pied */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            fontFamily: "IBM Plex Mono",
            fontSize: 20,
            letterSpacing: "0.16em",
            color: "#66788A",
          }}
        >
          {footerLeft}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 40,
            fontWeight: 700,
            letterSpacing: "0.05em",
            color: "#F2F5F8",
          }}
        >
          OBFLO
          <span style={{ color: "#FF6A2B" }}>°</span>
        </div>
      </div>
    </div>
  );
}
