import { SignJWT, jwtVerify } from "jose";
import { nanoid } from "nanoid";
import { ENV } from "./env";

const SHARE_LINK_ISSUER = "badr-photography";
const SHARE_LINK_AUDIENCE = "share-link";
const SHARE_LINK_SUBJECT = "site-share";

function getShareLinkSecret() {
  return new TextEncoder().encode(ENV.cookieSecret);
}

export async function createShareLink(expiresInMs: number) {
  const issuedAt = Date.now();
  const expiresAt = new Date(issuedAt + expiresInMs);

  const token = await new SignJWT({ jti: nanoid(12) })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt(Math.floor(issuedAt / 1000))
    .setExpirationTime(Math.floor(expiresAt.getTime() / 1000))
    .setIssuer(SHARE_LINK_ISSUER)
    .setAudience(SHARE_LINK_AUDIENCE)
    .setSubject(SHARE_LINK_SUBJECT)
    .sign(getShareLinkSecret());

  return { token, expiresAt };
}

export async function verifyShareLink(token: string) {
  try {
    const { payload } = await jwtVerify(token, getShareLinkSecret(), {
      issuer: SHARE_LINK_ISSUER,
      audience: SHARE_LINK_AUDIENCE,
      subject: SHARE_LINK_SUBJECT,
    });

    const expiresAt =
      typeof payload.exp === "number" ? new Date(payload.exp * 1000) : null;

    return { valid: true, expiresAt };
  } catch {
    return { valid: false, expiresAt: null };
  }
}
