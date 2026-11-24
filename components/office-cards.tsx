import { Mail, Phone } from "lucide-react";
import { offices } from "@/lib/site";
import { l, type Locale } from "@/lib/i18n";

export function OfficeCards({ locale }: { locale: Locale }) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {offices.map((office) => (
        <article
          key={office.city.en}
          className="flex flex-col rounded-card border border-void/10 bg-white p-6 transition-colors hover:border-iris/40"
        >
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-heading-sm font-medium text-void">
              {l(locale, office.city.en, office.city.fr)}
            </h3>
            <span className="text-[10px] uppercase tracking-[0.12em] text-iron">
              {l(locale, office.role.en, office.role.fr)}
            </span>
          </div>
          <div className="mt-5 flex flex-col gap-3 border-t border-void/10 pt-5">
            <a href={office.phoneHref} className="inline-flex items-center gap-3 text-sm text-void transition-colors hover:text-iris">
              <Phone className="h-4 w-4 text-iris" />
              {office.phone}
            </a>
            <a href={`mailto:${office.email}`} className="inline-flex items-center gap-3 text-sm text-void transition-colors hover:text-iris">
              <Mail className="h-4 w-4 text-iris" />
              {office.email}
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
