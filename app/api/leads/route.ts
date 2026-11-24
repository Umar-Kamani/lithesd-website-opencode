import { getPayload } from "payload";
import config from "@payload-config";
import { sendLeadNotification } from "@/lib/email";

export const runtime = "nodejs";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot — silently accept bot submissions without storing them.
  if (body.website) return Response.json({ ok: true });

  const name = String(body.name ?? "").trim().slice(0, 200);
  const email = String(body.email ?? "").trim().toLowerCase().slice(0, 320);
  const consent = body.consent === true;

  if (name.length < 2 || !EMAIL_RE.test(email) || !consent) {
    return Response.json(
      { ok: false, error: "A name, a valid email and consent are required." },
      { status: 400 },
    );
  }

  const payload = await getPayload({ config });
  const data = {
    name,
    email,
    company: String(body.company ?? "").slice(0, 200) || undefined,
    phone: String(body.phone ?? "").slice(0, 60) || undefined,
    region: String(body.region ?? "").slice(0, 80) || undefined,
    interest: String(body.interest ?? "").slice(0, 120) || undefined,
    message: String(body.message ?? "").slice(0, 5000) || undefined,
    source: String(body.source ?? "website").slice(0, 80),
    page: String(body.page ?? "").slice(0, 300) || undefined,
    consent,
    status: "new",
    ip: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || undefined,
    userAgent: request.headers.get("user-agent")?.slice(0, 400) || undefined,
  };

  try {
    const lead = await payload.create({
      collection: "leads",
      data: data as Record<string, unknown>,
      overrideAccess: true,
    });

    sendLeadNotification(payload, data).catch((error) => {
      console.error("[leads] notification failed", error);
    });

    return Response.json({ ok: true, id: lead.id });
  } catch (error) {
    console.error("[leads] create failed", error);
    return Response.json({ ok: false, error: "Unable to save your enquiry." }, { status: 500 });
  }
}
