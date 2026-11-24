import crypto from "node:crypto";

const secret = process.env.PAYLOAD_SECRET || "dev-only-secret-change-me";
const key = crypto.createHash("sha256").update(secret).digest();

/** AES-256-GCM encryption for SMTP passwords at rest. */
export function encryptSecret(plain: string): string {
  if (!plain) return plain;
  if (plain.startsWith("enc:")) return plain;
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `enc:${iv.toString("base64")}:${tag.toString("base64")}:${encrypted.toString("base64")}`;
}

export function decryptSecret(value: string): string {
  if (!value || !value.startsWith("enc:")) return value;
  const [, ivB64, tagB64, dataB64] = value.split(":");
  if (!ivB64 || !tagB64 || !dataB64) return "";
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, Buffer.from(ivB64, "base64"));
  decipher.setAuthTag(Buffer.from(tagB64, "base64"));
  return Buffer.concat([decipher.update(Buffer.from(dataB64, "base64")), decipher.final()]).toString("utf8");
}
