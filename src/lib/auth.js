import crypto from "crypto";

const AUTH_SECRET = process.env.AUTH_SECRET || "default-secret-change-in-production";
const TOKEN_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 saat

/**
 * HMAC-SHA256 tabanli oturum tokeni olusturur.
 * Format: timestamp.hmac
 */
export function createToken() {
  const timestamp = Date.now().toString();
  const hmac = crypto
    .createHmac("sha256", AUTH_SECRET)
    .update(timestamp)
    .digest("hex");
  return `${timestamp}.${hmac}`;
}

/**
 * Token'in gecerli olup olmadigini kontrol eder.
 * - HMAC imzasi dogrulanir (timing-safe)
 * - Sure asimi kontrol edilir (24 saat)
 */
export function verifyToken(token) {
  if (!token || typeof token !== "string") return false;

  const dotIndex = token.indexOf(".");
  if (dotIndex === -1) return false;

  const timestamp = token.slice(0, dotIndex);
  const hmac = token.slice(dotIndex + 1);

  if (!timestamp || !hmac) return false;

  const expectedHmac = crypto
    .createHmac("sha256", AUTH_SECRET)
    .update(timestamp)
    .digest("hex");

  // Uzunluk farki varsa timingSafeEqual hata verir, once kontrol et
  if (hmac.length !== expectedHmac.length) return false;

  const isValid = crypto.timingSafeEqual(
    Buffer.from(hmac),
    Buffer.from(expectedHmac)
  );

  if (!isValid) return false;

  const elapsed = Date.now() - parseInt(timestamp, 10);
  if (isNaN(elapsed) || elapsed < 0 || elapsed > TOKEN_EXPIRY_MS) return false;

  return true;
}

/**
 * Request header'indan token'i cikarir ve dogrular.
 * Authorization: Bearer <token>
 */
export function verifyRequest(request) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) return false;
  const token = authHeader.slice(7);
  return verifyToken(token);
}
