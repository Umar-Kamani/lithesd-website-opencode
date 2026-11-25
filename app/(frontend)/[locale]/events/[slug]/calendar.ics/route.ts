import { getEvents } from "@/lib/cms";
import { buildEventIcs } from "@/lib/ics";
import { siteUrl } from "@/lib/site";

export const runtime = "nodejs";
export const revalidate = 300;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const event = (await getEvents("en")).find((item) => item.slug === slug);
  if (!event) return new Response("Not found", { status: 404 });

  const ics = buildEventIcs({
    id: event.id,
    title: event.title,
    description: event.description || `Lithe SD event — ${siteUrl}`,
    location: [event.venueName, event.venueAddress, event.location].filter(Boolean).join(", "),
    url: event.virtualUrl || `${siteUrl}/events/${event.slug}`,
    start: event.startAt,
    end: event.endAt,
  });

  return new Response(ics, {
    headers: {
      "content-type": "text/calendar; charset=utf-8",
      "content-disposition": `attachment; filename="${event.slug || "event"}.ics"`,
      "cache-control": "public, max-age=0, s-maxage=300",
    },
  });
}
