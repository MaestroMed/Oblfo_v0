// Clé IndexNow (Bing/Copilot, Seznam, Naver…). Publique par protocole :
// elle est servie en clair à la racine (public/<clé>.txt) pour prouver la
// propriété du domaine — la committer n'expose rien.
//
// Clé tournée le 03/08/2026 : la première (2d77…) avait été validée contre
// l'apex obflo.com qui répond 308 vers www — IndexNow ne suit pas les
// redirections pour le fichier de clé et met l'échec en cache (403 ensuite).
// Si l'hôte canonique change un jour : tourner la clé en même temps.
export const INDEXNOW_KEY = "6ce5f377f310d8f9d8109e4dcae04250";

export const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
