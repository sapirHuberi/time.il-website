import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import BeforeAfterSlider from './BeforeAfterSlider';
import { portfolioJobs } from '../data/portfolio';

export default function Portfolio() {
  return (
    <section id="portfolio" className="scroll-mt-24 bg-surface py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <Reveal>
          <div className="text-center">
            <h2 className="font-display text-3xl font-semibold text-navy-deep md:text-4xl">
              העבודות שלנו
            </h2>
            <span
              className="mx-auto mt-4 block h-px w-16 origin-center bg-gold motion-safe:animate-draw-line"
              aria-hidden="true"
            />
            <p className="mx-auto mt-4 max-w-2xl text-charcoal/75">
              מבחר עבודות מהמעבדה — לפני ואחרי, ברמת גימור גבוהה.
            </p>
          </div>
        </Reveal>

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {portfolioJobs.map((job, index) => (
            <Reveal key={job.id} delay={index * 80} as="li">
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

        <Reveal delay={240}>
          <div className="mt-10 text-center">
            <Link
              to="/work"
              className="inline-flex items-center gap-2 font-semibold text-navy transition hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              לעוד עבודות
              <span aria-hidden="true">←</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
