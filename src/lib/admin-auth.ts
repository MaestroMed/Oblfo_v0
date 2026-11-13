// Accès au back-office : authentification HTTP Basic, mot de passe dans ADMIN_PASSWORD (choisi par Mehdi, jamais dans le code).
export function isAdminAuthorized(authorization: string | null): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || !authorization?.startsWith("Basic ")) return false;
  let given = "";
  try {
    given = atob(authorization.slice(6)).split(":").slice(1).join(":");
  } catch {
    return false;
  }
  // Comparaison à temps constant : la durée ne trahit pas les premiers caractères justes.
  let diff = given.length ^ expected.length;
  for (let i = 0; i < Math.max(given.length, expected.length); i++) {
    diff |= (given.charCodeAt(i) || 0) ^ (expected.charCodeAt(i) || 0);
  }
  return diff === 0;
}
