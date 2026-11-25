/** Minimal iCalendar generation for event confirmations. */

const pad = (value: number) => String(value).padStart(2, "0");

export function toIcsDate(value: string | Date): string {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return (
    `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}` +
    `T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`
  );
}

const escape = (value: string) =>
  value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");

export function buildEventIcs({
  id,
  title,
  description,
  location,
  url,
  start,
  end,
}: {
  id: string;
  title: string;
  description?: string;
  location?: string;
  url?: string;
  start: string;
  end?: string;
}): string {
  const startDate = new Date(start);
  const endDate = end
    ? new Date(end)
    : new Date(startDate.getTime() + 2 * 60 * 60 * 1000);

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Lithe SD//Events//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:event-${id}@lithesd.com`,
    `DTSTAMP:${toIcsDate(new Date())}`,
    `DTSTART:${toIcsDate(startDate)}`,
    `DTEND:${toIcsDate(endDate)}`,
    `SUMMARY:${escape(title)}`,
    description ? `DESCRIPTION:${escape(description)}` : "",
    location ? `LOCATION:${escape(location)}` : "",
    url ? `URL:${escape(url)}` : "",
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n");
}
