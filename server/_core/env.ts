const DEFAULT_ADMIN_USER = "Badrabdoph3399";
const DEFAULT_ADMIN_PASS = "Badr@3399";
const DEFAULT_COOKIE_SECRET = "local-admin-secret";

const isProduction = process.env.NODE_ENV === "production";

const adminUser = process.env.ADMIN_USER ?? DEFAULT_ADMIN_USER;
const adminPass = process.env.ADMIN_PASS ?? DEFAULT_ADMIN_PASS;
const cookieSecret = process.env.JWT_SECRET ?? DEFAULT_COOKIE_SECRET;
const adminBypass = (process.env.ADMIN_BYPASS ?? "false") === "true";

const adminSessionTtlMinutes = Number.parseInt(process.env.ADMIN_SESSION_TTL_MINUTES ?? "120", 10);
const adminLoginWindowMs = Number.parseInt(process.env.ADMIN_LOGIN_WINDOW_MS ?? "600000", 10);
const adminLoginMaxAttempts = Number.parseInt(process.env.ADMIN_LOGIN_MAX_ATTEMPTS ?? "5", 10);
const adminLoginBlockMs = Number.parseInt(process.env.ADMIN_LOGIN_BLOCK_MS ?? "1800000", 10);
const adminRequireHttps = (process.env.ADMIN_REQUIRE_HTTPS ?? "true") === "true";

if (isProduction) {
  if (!process.env.ADMIN_USER || !process.env.ADMIN_PASS) {
    throw new Error("ADMIN_USER و ADMIN_PASS لازم يتحددوا في الإنتاج.");
  }
  if (adminUser === DEFAULT_ADMIN_USER || adminPass === DEFAULT_ADMIN_PASS) {
    throw new Error("ممنوع استخدام بيانات الأدمن الافتراضية في الإنتاج.");
  }
  if (!process.env.JWT_SECRET || cookieSecret === DEFAULT_COOKIE_SECRET) {
    throw new Error("JWT_SECRET لازم يتحدد بقيمة قوية في الإنتاج.");
  }
  if (adminBypass) {
    throw new Error("ADMIN_BYPASS ممنوع يكون مفعّل في الإنتاج.");
  }
}

export const ENV = {
  appId: process.env.VITE_APP_ID ?? "local-admin-app",
  cookieSecret,
  databaseUrl: process.env.DATABASE_URL ?? "",
  oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  isProduction,
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? "",
  adminBypass,
  adminUser,
  adminPass,
  adminSessionTtlMinutes: Number.isFinite(adminSessionTtlMinutes) && adminSessionTtlMinutes > 0
    ? adminSessionTtlMinutes
    : 120,
  adminLoginWindowMs: Number.isFinite(adminLoginWindowMs) && adminLoginWindowMs > 0
    ? adminLoginWindowMs
    : 600000,
  adminLoginMaxAttempts: Number.isFinite(adminLoginMaxAttempts) && adminLoginMaxAttempts > 0
    ? adminLoginMaxAttempts
    : 5,
  adminLoginBlockMs: Number.isFinite(adminLoginBlockMs) && adminLoginBlockMs > 0
    ? adminLoginBlockMs
    : 1800000,
  adminRequireHttps,
};
