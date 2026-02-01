export const APP_ID = import.meta.env.VITE_APP_ID ?? "";
export const OAUTH_PORTAL_URL = import.meta.env.VITE_OAUTH_PORTAL_URL ?? "";

/** Safe URL builder: returns empty string if base is missing/invalid. */
export function safeJoinUrl(base: string, path: string) {
  try {
    if (!base) return "";
    const u = new URL(base);
    // Ensure exactly one slash between
    const p = path.startsWith("/") ? path : `/${path}`;
    u.pathname = (u.pathname.replace(/\/$/, "") + p).replace(/\/\/+/g, "/");
    return u.toString();
  } catch {
    return "";
  }
}
