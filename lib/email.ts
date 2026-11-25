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

type EventEmailInput = {
  id: string;
  title: string;
  slug: string;
  startAt: string;
  endAt: string;
  timezone: string;
  location: string;
  venueName: string;
  venueAddress: string;
  virtualUrl: string;
};

type RegistrationEmailInput = {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  jobTitle?: string;
  notes?: string;
};

const eventDateLabel = (event: EventEmailInput) => {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      dateStyle: "full",
      timeStyle: "short",
      timeZone: event.timezone || "UTC",
    }).format(new Date(event.startAt));
  } catch {
    return event.startAt;
  }
};

/** Sends the registrant confirmation (with ICS attachment) and the team notification. */
export async function sendEventRegistrationEmails(
  payload: BasePayload,
  event: EventEmailInput,
  registration: RegistrationEmailInput,
  ics: string,
) {
  const when = eventDateLabel(event);
  const where = [event.venueName, event.venueAddress, event.location]
    .filter(Boolean)
    .join(", ");

  await payload
    .sendEmail({
      to: registration.email,
      subject: `You're registered — ${event.title}`,
      html: `
        <h2>You're registered</h2>
        <p>Hello ${registration.name},</p>
        <p>Your place is confirmed for <strong>${event.title}</strong>.</p>
        <p><strong>When:</strong> ${when} (${event.timezone})<br/>
        ${where ? `<strong>Where:</strong> ${where}<br/>` : ""}
        ${event.virtualUrl ? `<strong>Join link:</strong> ${event.virtualUrl}` : ""}</p>
        <p>The calendar invite is attached. Add it to your calendar so you do not miss the session.</p>
        <p>— Lithe SD</p>
      `,
      attachments: [
        {
          filename: `${event.slug || "event"}.ics`,
          content: ics,
          contentType: "text/calendar; charset=utf-8",
        },
      ],
    })
    .catch((error) => {
      console.error("[events] confirmation email failed", error);
    });

  const settings = (await payload
    .findGlobal({ slug: "email-settings", depth: 0, overrideAccess: true })
    .catch(() => null)) as { notifyEmails?: { email?: string }[] } | null;
  const recipients = (settings?.notifyEmails ?? [])
    .map((row) => row.email)
    .filter((email): email is string => Boolean(email));
  if (recipients.length === 0) return;

  await payload
    .sendEmail({
      to: recipients.join(","),
      subject: `New event registration — ${event.title}`,
      html: `
        <h2>New event registration</h2>
        <table cellpadding="6" cellspacing="0" border="0">
          <tr><td><strong>Event</strong></td><td>${event.title}</td></tr>
          <tr><td><strong>Name</strong></td><td>${registration.name}</td></tr>
          <tr><td><strong>Email</strong></td><td>${registration.email}</td></tr>
          ${registration.company ? `<tr><td><strong>Company</strong></td><td>${registration.company}</td></tr>` : ""}
          ${registration.phone ? `<tr><td><strong>Phone</strong></td><td>${registration.phone}</td></tr>` : ""}
          ${registration.jobTitle ? `<tr><td><strong>Job title</strong></td><td>${registration.jobTitle}</td></tr>` : ""}
          ${registration.notes ? `<tr><td><strong>Notes</strong></td><td>${registration.notes}</td></tr>` : ""}
        </table>
      `,
    })
    .catch((error) => {
      console.error("[events] team notification failed", error);
    });
}
