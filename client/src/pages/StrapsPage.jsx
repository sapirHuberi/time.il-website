import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { strapsClosing, strapsIntro, strapsSections } from '../data/straps';
import { renderRichText } from '../utils/richText';
import strapsBg from '../../images/pexels-ranjit-pradhan-943095-13597651.jpg';

export default function StrapsPage() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
      return undefined;
    }

    const id = location.hash.replace('#', '');
    const timer = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);

    return () => window.clearTimeout(timer);
  }, [location]);

  return (
    <article className="relative min-h-[calc(100dvh-4rem)] md:min-h-[calc(100dvh-4.25rem)]">
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${strapsBg})` }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-surface/35"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
        <div className="rounded-2xl bg-surface/75 px-5 py-8 shadow-[0_16px_48px_-28px_rgba(10,25,47,0.35)] backdrop-blur-sm md:px-8 md:py-10">
          <h1 className="font-display text-3xl font-semibold text-navy-deep md:text-4xl">
            {strapsIntro.title}
          </h1>
          <p className="mt-5 text-lg font-semibold leading-relaxed text-navy-deep">
            {strapsIntro.lead}
          </p>
          <p className="mt-4 leading-relaxed text-charcoal/75">{renderRichText(strapsIntro.body)}</p>

          <div className="mt-12 space-y-12">
            {strapsSections.map((section) => (
              <section
                key={section.title}
                id={section.id}
                className={section.id ? 'scroll-mt-24' : undefined}
              >
                <h2 className="font-display text-2xl font-semibold text-navy-deep">
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)} className="leading-relaxed text-charcoal/75">
                      {renderRichText(paragraph)}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <p className="mt-12 text-lg font-semibold leading-relaxed text-navy-deep">
            {strapsClosing}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/#contact"
              className="inline-flex rounded-md bg-gold px-5 py-2.5 text-sm font-semibold text-navy-deep transition hover:bg-gold-bronze"
            >
              צרו קשר
            </Link>
            <Link
              to="/#straps"
              className="text-sm font-medium text-navy transition hover:text-gold"
            >
              ← חזרה לדף הבית
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
