import jwt from "jsonwebtoken";

const COOKIE_NAME = "admin_token";

/**
 * Very simple admin auth:
 * - POST /api/admin/login with password -> sets httpOnly cookie
 * - For admin routes, we verify the cookie
 */
export function signAdminToken(secret: string) {
  return jwt.sign({ role: "admin" }, secret, { expiresIn: "30d" });
}

export function verifyAdminToken(token: string, secret: string) {
  try {
    const payload = jwt.verify(token, secret) as any;
    return payload?.role === "admin";
  } catch {
    return false;
  }
}

export function getAdminCookieName() {
  return COOKIE_NAME;
}
