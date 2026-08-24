import { useCallback, useEffect, useId, useState } from 'react';
import { ChevronLeft, ChevronRight, Play, X, ZoomIn } from 'lucide-react';
import Reveal from './Reveal';
import { galleryItems } from '../data/gallery';

const INITIAL_VISIBLE = 12;

export default function PhotoGallery() {
  const titleId = useId();
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [activeIndex, setActiveIndex] = useState(null);

  const items = galleryItems;
  const hasMore = visibleCount < items.length;
  const isOpen = activeIndex !== null;
  const activeItem = isOpen ? items[activeIndex] : null;

  // Separate column blocks per batch so CSS multi-column does not rebalance
  // already-viewed photos when "הצג עוד" appends more items.
  const batches = [];
  for (let start = 0; start < visibleCount; start += INITIAL_VISIBLE) {
    const end = Math.min(start + INITIAL_VISIBLE, visibleCount);
    batches.push(
      items.slice(start, end).map((item, offset) => ({
        item,
        index: start + offset,
      })),
    );
  }

  const closeLightbox = useCallback(() => setActiveIndex(null), []);

  const showPrev = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return null;
      return (current - 1 + items.length) % items.length;
    });
  }, [items.length]);

  const showNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return null;
      return (current + 1) % items.length;
    });
  }, [items.length]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowRight') showPrev();
      if (event.key === 'ArrowLeft') showNext();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, closeLightbox, showPrev, showNext]);

  if (items.length === 0) return null;

  return (
    <div className="mt-20 md:mt-24">
      <Reveal>
        <div className="text-center">
          <h2 className="font-display text-2xl font-semibold text-navy-deep md:text-3xl">
            גלריית תמונות וסרטונים
          </h2>
          <span
            className="mx-auto mt-4 block h-px w-16 origin-center bg-gold motion-safe:animate-draw-line"
            aria-hidden="true"
          />
          <p className="mx-auto mt-4 max-w-2xl text-charcoal/75">
            מבט אל המעבדה, הכלים והעבודות — צילומים וסרטונים מהשטח.
          </p>
        </div>
      </Reveal>

      <div className="mt-10">
        {batches.map((batch, batchIndex) => (
          <ul
            key={`batch-${batchIndex}`}
            className="columns-2 gap-3 sm:gap-4 md:columns-3 lg:columns-4 lg:gap-5"
          >
            {batch.map(({ item, index }) => {
              const isVideo = item.type === 'video';
              const delayIndex = index % INITIAL_VISIBLE;
              return (
                <Reveal
                  key={item.id}
                  delay={Math.min(delayIndex, 8) * 45}
                  as="li"
                  className="mb-3 break-inside-avoid sm:mb-4 lg:mb-5"
                >
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className="group relative block w-full overflow-hidden rounded-[16px] border border-navy-deep/8 bg-navy-deep/5 text-right shadow-[0_10px_28px_-20px_rgba(10,25,47,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                    aria-label={
                      isVideo
                        ? `פתיחת סרטון ${index + 1} מתוך ${items.length}`
                        : `פתיחת תמונה ${index + 1} מתוך ${items.length}`
                    }
                  >
                    {isVideo ? (
                      <video
                        src={`${item.src}#t=0.1`}
                        muted
                        playsInline
                        preload="metadata"
                        className="pointer-events-none block aspect-[3/4] h-auto w-full object-cover transition duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                      />
                    ) : (
                      <img
                        src={item.src}
                        alt={item.alt}
                        loading="lazy"
                        decoding="async"
                        className="block h-auto w-full object-cover transition duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                      />
                    )}
                    <span
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-deep/45 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100 motion-reduce:opacity-0"
                      aria-hidden="true"
                    />
                    {isVideo ? (
                      <span
                        className="pointer-events-none absolute inset-0 flex items-center justify-center"
                        aria-hidden="true"
                      >
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy-deep/75 text-surface shadow-md backdrop-blur-sm transition duration-300 group-hover:scale-110 group-hover:bg-gold group-hover:text-navy-deep motion-reduce:transition-none motion-reduce:group-hover:scale-100">
                          <Play className="ms-0.5 h-5 w-5" fill="currentColor" strokeWidth={0} />
                        </span>
                      </span>
                    ) : (
                      <span
                        className="pointer-events-none absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-full bg-surface/90 text-navy-deep opacity-0 shadow-sm transition duration-300 group-hover:opacity-100 motion-reduce:opacity-0"
                        aria-hidden="true"
                      >
                        <ZoomIn className="h-4 w-4" strokeWidth={2.25} />
                      </span>
                    )}
                  </button>
                </Reveal>
              );
            })}
          </ul>
        ))}
      </div>

      {hasMore ? (
        <Reveal delay={120}>
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => setVisibleCount((count) => Math.min(count + 12, items.length))}
              className="inline-flex items-center justify-center rounded-[12px] border border-navy-deep/15 bg-surface px-6 py-2.5 text-sm font-semibold text-navy transition hover:border-gold hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              הצג עוד
              <span className="mr-2 text-charcoal/50">
                ({visibleCount} מתוך {items.length})
              </span>
            </button>
          </div>
        </Reveal>
      ) : null}

      {isOpen && activeItem ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-deep/90 p-3 backdrop-blur-sm sm:p-6"
          onClick={closeLightbox}
        >
          <p id={titleId} className="sr-only">
            {activeItem.type === 'video' ? 'תצוגת סרטון' : 'תצוגת תמונה מוגדלת'}
          </p>

          <button
            type="button"
            onClick={closeLightbox}
            className="absolute left-3 top-3 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-surface/95 text-navy-deep transition hover:bg-gold hover:text-navy-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:left-5 sm:top-5"
            aria-label="סגירה"
          >
            <X className="h-5 w-5" strokeWidth={2.25} />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showPrev();
            }}
            className="absolute right-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-surface/95 text-navy-deep transition hover:bg-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:right-5"
            aria-label="פריט קודם"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2.25} />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
            className="absolute left-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-surface/95 text-navy-deep transition hover:bg-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:left-5"
            aria-label="פריט הבא"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2.25} />
          </button>

          <figure
            className="relative flex max-h-[min(88vh,900px)] w-full max-w-5xl flex-col items-center"
            onClick={(event) => event.stopPropagation()}
          >
            {activeItem.type === 'video' ? (
              <video
                key={activeItem.id}
                src={activeItem.src}
                controls
                autoPlay
                playsInline
                className="max-h-[min(80vh,820px)] w-auto max-w-full rounded-[12px] bg-navy-deep shadow-[0_24px_60px_-20px_rgba(0,0,0,0.55)]"
              >
                הדפדפן שלך אינו תומך בהפעלת סרטונים.
              </video>
            ) : (
              <img
                src={activeItem.src}
                alt={activeItem.alt}
                className="max-h-[min(80vh,820px)] w-auto max-w-full rounded-[12px] object-contain shadow-[0_24px_60px_-20px_rgba(0,0,0,0.55)]"
              />
            )}
            <figcaption className="mt-3 text-sm text-surface/75">
              {activeIndex + 1} / {items.length}
            </figcaption>
          </figure>
        </div>
      ) : null}
    </div>
  );
}
