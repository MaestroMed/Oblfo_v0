// Auto-contrôle : npx tsx src/lib/admin-auth.check.ts
import assert from "node:assert/strict";
import { isAdminAuthorized } from "./admin-auth";

process.env.ADMIN_PASSWORD = "secret:avec deux-points";
const basic = (s: string) => `Basic ${btoa(s)}`;
assert.ok(isAdminAuthorized(basic("admin:secret:avec deux-points")));
assert.ok(!isAdminAuthorized(basic("admin:secret")));
assert.ok(!isAdminAuthorized(basic("admin:secret:avec deux-pointsX")));
assert.ok(!isAdminAuthorized(null));
assert.ok(!isAdminAuthorized("Basic ###"));
delete process.env.ADMIN_PASSWORD;
assert.ok(!isAdminAuthorized(basic("admin:")));
console.log("admin ok");
