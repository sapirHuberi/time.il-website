import Reveal from './Reveal';

export default function Testimonials() {
  return (
    <section id="testimonials" className="scroll-mt-24 bg-surface-muted/60 py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold text-navy-deep md:text-4xl">
            המלצות
          </h2>
          <p className="mt-3 max-w-2xl text-charcoal/75">
            לקוחות שסומכים על Time.il לשעונים היקרים להם.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
