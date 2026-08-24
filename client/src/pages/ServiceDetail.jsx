import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getServiceBySlug, services } from '../data/services';
import { renderRichText } from '../utils/richText';

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-24 pt-28 text-center md:px-6 md:pt-32">
        <h1 className="font-display text-3xl font-semibold text-navy-deep">השירות לא נמצא</h1>
        <p className="mt-4 text-charcoal/75">ייתכן שהקישור שגוי או שהעמוד הועבר.</p>
        <Link to="/#services" className="mt-8 inline-flex font-semibold text-navy hover:text-gold">
          חזרה לשירותי המעבדה ←
        </Link>
      </section>
    );
  }

  const otherServices = services.filter((item) => item.slug !== service.slug);

  return (
    <article className="bg-surface">
      <div className="relative isolate overflow-hidden bg-navy-deep">
        <div
          className={[
            // Full-bleed under the fixed navbar; aspect scales by breakpoint.
            'relative mx-auto w-full max-h-[min(78svh,36rem)]',
            service.heroAspectClass ??
              'aspect-[4/5] sm:aspect-[4/3] md:aspect-[16/10] lg:aspect-[2/1]',
          ].join(' ')}
        >
          <img
            src={service.image}
            alt={service.imageAlt}
            sizes="100vw"
            className={[
              'absolute inset-0 h-full w-full object-cover',
              service.imageObjectClass ?? 'object-center',
            ].join(' ')}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy-deep/80 via-navy-deep/35 to-transparent"
            aria-hidden="true"
          />
          <div className="absolute inset-x-0 bottom-0 mx-auto max-w-3xl px-4 pb-6 pt-16 md:px-6 md:pb-8">
            <Link
              to="/#services"
              className="mb-3 inline-flex text-sm font-medium text-gold/90 transition hover:text-gold md:mb-4"
            >
              ← חזרה לשירותי המעבדה
            </Link>
            <h1 className="font-display text-3xl font-semibold text-surface md:text-4xl">
              {service.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
        <p className="text-lg leading-relaxed text-charcoal/80">{service.description}</p>

        {service.detail?.length ? (
          <div className="mt-8 space-y-5">
            {service.detail.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="leading-relaxed text-charcoal/75">
                {renderRichText(paragraph)}
              </p>
            ))}
          </div>
        ) : (
          <p className="mt-8 rounded-xl border border-dashed border-navy-deep/15 bg-surface-muted/50 px-5 py-6 text-charcoal/65">
            פירוט מורחב על השירות יופיע כאן בקרוב.
          </p>
        )}

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            to="/#contact"
            className="inline-flex rounded-md bg-gold px-5 py-2.5 text-sm font-semibold text-navy-deep transition hover:bg-gold-bronze"
          >
            צרו קשר להצעת מחיר
          </Link>
          <Link to="/#services" className="text-sm font-semibold text-navy hover:text-gold">
            לכל השירותים
          </Link>
        </div>

        <aside className="mt-16 border-t border-surface-muted pt-10">
          <h2 className="font-display text-xl font-semibold text-navy-deep">שירותים נוספים</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {otherServices.map((item) => (
              <li key={item.slug}>
                <Link
                  to={`/services/${item.slug}`}
                  className="block rounded-lg border border-navy-deep/8 bg-surface px-4 py-3 text-sm font-medium text-navy-deep transition hover:border-gold/40 hover:text-gold"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </article>
  );
}
