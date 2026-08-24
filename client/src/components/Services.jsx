import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import { services } from '../data/services';

export default function Services() {
  return (
    <section id="services" className="scroll-mt-24 bg-surface-muted/60 py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <Reveal>
          <div className="text-center">
            <h2 className="font-display text-3xl font-semibold text-navy-deep md:text-4xl">
              שירותי המעבדה
            </h2>
            <span
              className="mx-auto mt-4 block h-px w-16 origin-center bg-gold motion-safe:animate-draw-line"
              aria-hidden="true"
            />
            <p className="mx-auto mt-4 max-w-2xl text-charcoal/75">
              תיקונים, אבחון והתאמות מדויקות — בכל שעון, בכל פרט.
            </p>
          </div>
        </Reveal>

        <ul className="mt-12 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {services.map(
            ({
              slug,
              title,
              description,
              icon: Icon,
              image,
              cardImage,
              imageAlt,
              imageObjectClass,
              imageCardObjectClass,
            }, index) => {
            const hasImage = Boolean(image || cardImage);
            const detailPath = `/services/${slug}`;
            const cardSrc = cardImage ?? image;
            const cardImageClass = [
              'object-cover',
              imageCardObjectClass ?? imageObjectClass ?? 'object-center',
            ].join(' ');

            return (
              <Reveal key={slug} delay={index * 70} as="li" className="h-full min-h-[15rem]">
                <article
                  className={[
                    'group relative flex h-full min-h-[15rem] flex-col items-center overflow-hidden rounded-xl border border-navy-deep/8 bg-surface px-5 py-5 text-center transition duration-300',
                    'hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_12px_28px_-18px_rgba(10,25,47,0.35)]',
                    hasImage ? 'cursor-pointer' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {hasImage ? (
                    <>
                      <img
                        src={cardSrc}
                        alt={imageAlt}
                        className={[
                          'pointer-events-none absolute inset-0 h-full w-full opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100 group-active:opacity-100',
                          cardImageClass,
                        ].join(' ')}
                      />
                      <div
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/55 to-navy-deep/25 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100 group-active:opacity-100"
                        aria-hidden="true"
                      />
                    </>
                  ) : null}

                  {Icon ? (
                    <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/35 bg-navy-deep/5 text-gold transition duration-300 group-hover:border-gold group-hover:bg-navy-deep group-hover:text-gold">
                      <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                    </span>
                  ) : null}

                  <h3
                    className={[
                      'relative z-10 shrink-0 font-display text-base font-bold leading-snug text-navy-deep transition-colors duration-300 md:text-lg',
                      Icon ? 'mt-3' : '',
                      hasImage
                        ? 'group-hover:text-surface group-focus-within:text-surface group-active:text-surface'
                        : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    {title}
                  </h3>

                  <p
                    className={[
                      'relative z-10 mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-charcoal/70 transition-colors duration-300',
                      hasImage
                        ? 'group-hover:text-surface/85 group-focus-within:text-surface/85 group-active:text-surface/85'
                        : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    {description}
                  </p>

                  <Link
                    to={detailPath}
                    className={[
                      'relative z-10 mt-4 inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-navy transition hover:text-gold',
                      'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold',
                      hasImage
                        ? 'group-hover:text-gold group-focus-within:text-gold group-active:text-gold'
                        : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    קרא עוד
                    <span aria-hidden="true" className="transition group-hover:-translate-x-0.5">
                      ←
                    </span>
                  </Link>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
