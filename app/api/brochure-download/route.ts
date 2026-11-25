import { getPayload } from "payload";
import config from "@payload-config";
import { sendLeadNotification } from "@/lib/email";

export const runtime = "nodejs";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return Response.json({ ok: false }, { status: 400 });

  const brochureId = String(body.brochureId ?? "");
  const name = String(body.name ?? "").trim().slice(0, 200);
  const email = String(body.email ?? "").trim().toLowerCase().slice(0, 320);
  const consent = body.consent === true;

  if (!brochureId || name.length < 2 || !EMAIL_RE.test(email) || !consent) {
    return Response.json({ ok: false, error: "Missing details." }, { status: 400 });
  }

  const payload = await getPayload({ config });
  const brochure = (await payload
    .findByID({ collection: "brochures", id: brochureId, depth: 0 })
    .catch(() => null)) as { title?: string; url?: string } | null;

  if (!brochure?.url) {
    return Response.json({ ok: false, error: "Brochure not found." }, { status: 404 });
  }

  const data = {
    name,
    email,
    company: String(body.company ?? "").slice(0, 200) || undefined,
    consent,
    source: "brochure",
    page: String(body.page ?? "").slice(0, 300) || undefined,
    brochure: brochureId,
    status: "new",
    ip: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || undefined,
    userAgent: request.headers.get("user-agent")?.slice(0, 400) || undefined,
  };

  try {
    await payload.create({
      collection: "leads",
      data: data as Record<string, unknown>,
      overrideAccess: true,
    });
    sendLeadNotification(payload, { ...data, interest: brochure.title }).catch((error) => {
      console.error("[brochure] notification failed", error);
    });
    return Response.json({ ok: true, url: brochure.url, title: brochure.title });
  } catch (error) {
    console.error("[brochure] lead failed", error);
    return Response.json({ ok: false }, { status: 500 });
  }
}
