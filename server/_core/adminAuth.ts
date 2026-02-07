import { SignJWT, jwtVerify } from "jose";
import { timingSafeEqual } from "crypto";
import type { Request, Response } from "express";
import { parse as parseCookieHeader } from "cookie";
import { ENV } from "./env";

const ADMIN_COOKIE_NAME = "admin_access";
const ADMIN_SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours
const ADMIN_SESSION_ISSUER = "badr-photography-admin";
const ADMIN_SESSION_AUDIENCE = "admin-panel";
const ADMIN_SESSION_SUBJECT = "admin";

function getAdminSecret() {
  return new TextEncoder().encode(ENV.cookieSecret);
}

function safeEqual(a: string, b: string) {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) return false;
  return timingSafeEqual(aBuf, bBuf);
}

export function matchesAdminCredentials(username: string, password: string) {
  return safeEqual(username, ENV.adminUser) && safeEqual(password, ENV.adminPass);
}

export async function createAdminSession(expiresInMs = ADMIN_SESSION_TTL_MS) {
  const issuedAt = Date.now();
  const expiresAt = new Date(issuedAt + expiresInMs);

  const token = await new SignJWT({})
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt(Math.floor(issuedAt / 1000))
    .setExpirationTime(Math.floor(expiresAt.getTime() / 1000))
    .setIssuer(ADMIN_SESSION_ISSUER)
    .setAudience(ADMIN_SESSION_AUDIENCE)
    .setSubject(ADMIN_SESSION_SUBJECT)
    .sign(getAdminSecret());

  return { token, expiresAt };
}

export async function verifyAdminSession(token: string | undefined | null) {
  if (!token) return { valid: false, expiresAt: null };
  try {
    const { payload } = await jwtVerify(token, getAdminSecret(), {
      issuer: ADMIN_SESSION_ISSUER,
      audience: ADMIN_SESSION_AUDIENCE,
      subject: ADMIN_SESSION_SUBJECT,
    });

    const expiresAt =
      typeof payload.exp === "number" ? new Date(payload.exp * 1000) : null;

    return { valid: true, expiresAt };
  } catch {
    return { valid: false, expiresAt: null };
  }
}

function getAdminCookieOptions(req: Request) {
  const proto = req.headers["x-forwarded-proto"];
  const isSecure = req.protocol === "https" ||
    (typeof proto === "string" && proto.includes("https"));

  return {
    httpOnly: true,
    path: "/",
    sameSite: (isSecure ? "none" : "lax") as const,
    secure: isSecure,
  };
}

export function setAdminSessionCookie(
  req: Request,
  res: Response,
  token: string,
  expiresInMs = ADMIN_SESSION_TTL_MS
) {
  res.cookie(ADMIN_COOKIE_NAME, token, {
    ...getAdminCookieOptions(req),
    maxAge: expiresInMs,
  });
}

export function clearAdminSessionCookie(req: Request, res: Response) {
  res.clearCookie(ADMIN_COOKIE_NAME, {
    ...getAdminCookieOptions(req),
    maxAge: -1,
  });
}

export async function getAdminSessionFromRequest(req: Request) {
  const cookies = parseCookieHeader(req.headers.cookie ?? "");
  const token = cookies[ADMIN_COOKIE_NAME];
  return await verifyAdminSession(token);
}
