import { getPayload } from "payload";
import config from "@payload-config";
import { sendEventRegistrationEmails } from "@/lib/email";
import { buildEventIcs } from "@/lib/ics";
import { siteUrl } from "@/lib/site";

export const runtime = "nodejs";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

type EventDoc = {
  id: string | number;
  title?: string;
  slug?: string;
  startAt?: string;
  date?: string;
  endAt?: string;
  timezone?: string;
  location?: string;
  venueName?: string;
  venueAddress?: string;
  virtualUrl?: string;
  registrationEnabled?: boolean;
  registrationDeadline?: string;
};

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (body.website) return Response.json({ ok: true });

  const eventId = String(body.eventId ?? "").trim();
  const name = String(body.name ?? "").trim().slice(0, 200);
  const email = String(body.email ?? "").trim().toLowerCase().slice(0, 320);
  const consent = body.consent === true;

  if (!eventId || name.length < 2 || !EMAIL_RE.test(email) || !consent) {
    return Response.json(
      { ok: false, error: "A name, a valid email and consent are required." },
      { status: 400 },
    );
  }

  const payload = await getPayload({ config });

  let event: EventDoc;
  try {
    event = (await payload.findByID({
      collection: "events",
      id: eventId,
      depth: 0,
      overrideAccess: true,
    })) as EventDoc;
  } catch {
    return Response.json({ ok: false, error: "Event not found." }, { status: 404 });
  }

  if (!event || event.registrationEnabled === false) {
    return Response.json(
      { ok: false, error: "Registration is closed for this event." },
      { status: 400 },
    );
  }
  if (event.registrationDeadline && new Date(event.registrationDeadline) < new Date()) {
    return Response.json(
      { ok: false, error: "The registration deadline has passed." },
      { status: 400 },
    );
  }

  const existing = await payload.find({
    collection: "event-registrations",
    where: {
      and: [
        { event: { equals: event.id } },
        { email: { equals: email } },
      ],
    },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  });

  if (existing.docs[0]) {
    return Response.json({ ok: true, id: existing.docs[0].id, duplicate: true });
  }

  const data = {
    event: event.id,
    name,
    email,
    company: String(body.company ?? "").slice(0, 200) || undefined,
    phone: String(body.phone ?? "").slice(0, 60) || undefined,
    jobTitle: String(body.jobTitle ?? "").slice(0, 120) || undefined,
    notes: String(body.notes ?? "").slice(0, 2000) || undefined,
    consent,
    status: "registered",
    source: "website",
    ip: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || undefined,
    userAgent: request.headers.get("user-agent")?.slice(0, 400) || undefined,
  };

  let created;
  try {
    created = await payload.create({
      collection: "event-registrations",
      data: data as Record<string, unknown>,
      overrideAccess: true,
    });
  } catch (error) {
    console.error("[events] registration failed", error);
    return Response.json(
      { ok: false, error: "Unable to save your registration." },
      { status: 500 },
    );
  }

  const startAt = event.startAt || event.date || new Date().toISOString();
  const ics = buildEventIcs({
    id: String(event.id),
    title: event.title || "Lithe SD event",
    description: `Registered via ${siteUrl}`,
    location: [event.venueName, event.venueAddress, event.location].filter(Boolean).join(", "),
    url: event.virtualUrl || `${siteUrl}/events/${event.slug ?? ""}`,
    start: startAt,
    end: event.endAt,
  });

  sendEventRegistrationEmails(
    payload,
    {
      id: String(event.id),
      title: event.title || "Lithe SD event",
      slug: event.slug || String(event.id),
      startAt,
      endAt: event.endAt || "",
      timezone: event.timezone || "UTC",
      location: event.location || "",
      venueName: event.venueName || "",
      venueAddress: event.venueAddress || "",
      virtualUrl: event.virtualUrl || "",
    },
    {
      name,
      email,
      company: data.company,
      phone: data.phone,
      jobTitle: data.jobTitle,
      notes: data.notes,
    },
    ics,
  ).catch((error) => console.error("[events] email dispatch failed", error));

  return Response.json({ ok: true, id: created.id });
}
