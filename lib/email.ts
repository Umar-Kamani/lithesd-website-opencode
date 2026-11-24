import nodemailer, { type Transporter } from "nodemailer";
import type { BasePayload, EmailAdapter } from "payload";
import { decryptSecret } from "./crypto";

type Profile = {
  label?: string;
  host?: string;
  port?: number;
  secure?: boolean;
  username?: string;
  password?: string;
  fromName?: string;
  fromEmail?: string;
  active?: boolean;
};

const cache = new Map<string, Transporter>();

function transportFor(profile: Profile): Transporter | null {
  if (!profile.host) return null;
  const pass = decryptSecret(profile.password || "");
  const cacheKey = `${profile.host}:${profile.port}:${profile.username}:${pass}`;
  const existing = cache.get(cacheKey);
  if (existing) return existing;
  const transport = nodemailer.createTransport({
    host: profile.host,
    port: Number(profile.port) || 587,
    secure: Boolean(profile.secure),
    auth: profile.username ? { user: profile.username, pass } : undefined,
  });
  cache.set(cacheKey, transport);
  return transport;
}

export const litheEmailAdapter: EmailAdapter = ({ payload }) => ({
  name: "lithe-smtp",
  defaultFromAddress: process.env.EMAIL_FROM || "info@lithesd.com",
  defaultFromName: process.env.EMAIL_FROM_NAME || "Lithe SD",
  sendEmail: async (message) => {
    const settings = await payload
      .findGlobal({ slug: "email-settings", depth: 0, overrideAccess: true })
      .catch(() => null);
    const profiles = (settings?.profiles as Profile[] | undefined) ?? [];
    const profile = profiles.find((p) => p.active) ?? profiles[0];
    const transport = transportFor(profile ?? {});
    if (!transport) {
      console.warn("[email] No SMTP profile configured; message not sent.");
      return;
    }
    const from =
      message.from ??
      (profile?.fromEmail
        ? { name: profile.fromName || "Lithe SD", address: profile.fromEmail }
        : undefined);
    return transport.sendMail({ ...message, from });
  },
});

export async function sendLeadNotification(
  payload: BasePayload,
  lead: Record<string, unknown>,
) {
  const settings = (await payload.findGlobal({
    slug: "email-settings",
    depth: 0,
    overrideAccess: true,
  })) as { notifyEmails?: { email?: string }[] } | null;
  const recipients = (settings?.notifyEmails ?? [])
    .map((row) => row.email)
    .filter((email): email is string => Boolean(email));
  if (recipients.length === 0) return;
  const html = `
    <h2>New website enquiry</h2>
    <table cellpadding="6" cellspacing="0" border="0">
      ${["name", "email", "company", "phone", "region", "interest", "source", "page", "message"]
        .filter((key) => lead[key])
        .map((key) => `<tr><td><strong>${key}</strong></td><td>${String(lead[key])}</td></tr>`)
        .join("")}
    </table>
  `;
  await payload.sendEmail({
    to: recipients.join(","),
    subject: `New enquiry — ${lead.name ?? lead.email}`,
    html,
  });
}
