// Avant le build : récupère les réglages publiés depuis le back-office (Vercel Blob) dans src/data/overrides.json.
// Sans jeton ou sans publication, le fichier du dépôt est gardé tel quel.
import { writeFileSync } from "node:fs";

if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.log("[overrides] pas de stockage configuré, fichier du dépôt conservé");
} else {
  try {
    const { get } = await import("@vercel/blob");
    const res = await get("obflo/overrides.json", { access: "private", useCache: false });
    if (res?.statusCode === 200) {
      const json = JSON.parse(await new Response(res.stream).text());
      writeFileSync(new URL("../src/data/overrides.json", import.meta.url), JSON.stringify(json, null, 2));
      console.log(`[overrides] réglages publiés le ${json.publishedAt ?? "?"} appliqués`);
    } else {
      console.log("[overrides] aucune publication, fichier du dépôt conservé");
    }
  } catch (error) {
    // Un stockage indisponible ne doit pas bloquer la mise en ligne.
    console.log("[overrides] lecture impossible, fichier du dépôt conservé :", error?.message ?? error);
  }
}
