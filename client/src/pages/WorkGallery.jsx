import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import PhotoGallery from '../components/PhotoGallery';
import { portfolioJobs } from '../data/portfolio';

/**
 * Full work gallery — before/after pairs plus unused lab photos.
 */
export default function WorkGallery() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="scroll-mt-24 bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <Reveal>
          <div className="text-center">
            <p className="text-sm font-medium text-gold">Time.il</p>
            <h1 className="mt-2 font-display text-3xl font-semibold text-navy-deep md:text-4xl">
              עוד עבודות
            </h1>
            <span
              className="mx-auto mt-4 block h-px w-16 origin-center bg-gold motion-safe:animate-draw-line"
              aria-hidden="true"
            />
            <p className="mx-auto mt-4 max-w-2xl text-charcoal/75">
              לפני ואחרי מהמעבדה, וגלריית תמונות וסרטונים מהעבודה השוטפת.
            </p>
          </div>
        </Reveal>

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {portfolioJobs.map((job, index) => (
            <Reveal key={job.id} delay={index * 70} as="li">
              <article className="overflow-hidden rounded-[16px] border border-navy-deep/8 bg-surface shadow-[0_10px_28px_-20px_rgba(10,25,47,0.35)]">
                <BeforeAfterSlider
                  beforeSrc={job.before}
                  afterSrc={job.after}
                  beforeAlt={job.beforeAlt}
                  afterAlt={job.afterAlt}
                  className="rounded-none"
                />
              </article>
            </Reveal>
          ))}
        </ul>

        <PhotoGallery />

        <div className="mt-12 text-center">
          <Link
            to="/"
            className="inline-flex font-semibold text-navy transition hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            חזרה לדף הבית ←
          </Link>
        </div>
      </div>
    </section>
  );
}
