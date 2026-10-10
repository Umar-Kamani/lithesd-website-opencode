import { cn } from "@/lib/utils";

function Row({
  items,
  hidden,
}: {
  items: string[];
  hidden?: boolean;
}) {
  return (
    <ul
      className="flex shrink-0 items-center gap-10 pr-10"
      aria-hidden={hidden || undefined}
    >
      {items.map((name) => (
        <li key={`${name}-${hidden ? "b" : "a"}`} className="shrink-0">
          <span className="whitespace-nowrap font-display text-xl font-light tracking-[-0.01em] text-mist transition-colors duration-300 hover:text-midnight-ink">
            {name}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function CustomerWall({
  items,
  reverse = false,
  slow = false,
  className,
}: {
  items: string[];
  reverse?: boolean;
  slow?: boolean;
  className?: string;
}) {
  const animation = reverse
    ? slow
      ? "animate-marquee-reverse-slow"
      : "animate-marquee-reverse"
    : slow
      ? "animate-marquee-slow"
      : "animate-marquee";

  return (
    <div
      className={cn(
        "marquee-group relative overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]",
        className,
      )}
    >
      <div className={cn("flex w-max", animation)}>
        <Row items={items} />
        <Row items={items} hidden />
      </div>
    </div>
  );
}
