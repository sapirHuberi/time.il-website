import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import AboutWatchMark from './AboutWatchMark';
import { strapsIntro } from '../data/straps';
import { renderRichText } from '../utils/richText';

export default function Straps() {
  return (
    <section id="straps" className="scroll-mt-24 overflow-hidden bg-surface py-20 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-center md:gap-14 md:px-6">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold text-navy-deep md:text-4xl">
            {strapsIntro.title}
          </h2>
          <p className="mt-5 text-lg font-semibold leading-relaxed text-navy-deep">
            {strapsIntro.lead}
          </p>
          <p className="mt-4 leading-relaxed text-charcoal/75">
            {renderRichText(strapsIntro.body)}
          </p>
          <Link
            to="/straps#continue"
            className="mt-6 inline-flex items-center gap-2 font-semibold text-navy transition hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            המשך קריאה
            <span aria-hidden="true">←</span>
          </Link>
        </Reveal>

        <Reveal delay={140} className="flex min-w-0 justify-center md:justify-start">
          <AboutWatchMark orientation="horizontal" />
        </Reveal>
      </div>
    </section>
  );
}
