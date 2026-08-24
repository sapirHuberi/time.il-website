import heroBg from '../../images/a_different_perspective-clockwork-1392757_1920.jpg';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex h-svh min-h-svh items-center overflow-hidden bg-navy-deep pt-16 text-surface md:pt-[4.25rem]"
    >
      <img
        src={heroBg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center motion-safe:animate-ken-burns"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-l from-navy-deep/85 via-navy-deep/70 to-navy-deep/45"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-30 motion-safe:animate-grain"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, rgba(212,175,55,0.12), transparent 40%), radial-gradient(circle at 80% 70%, rgba(197,168,128,0.1), transparent 45%)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-20 md:px-6 md:py-28">
        <h1 className="font-script text-6xl leading-none text-gold motion-safe:animate-fade-up md:text-7xl lg:text-8xl">
          Time.il
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-surface/90 motion-safe:animate-fade-up md:text-lg [animation-delay:160ms]">
          תיקון שעונים מדויק, החלפת סוללות, התאמת רצועות ושירות מלא — בעדינות של שען מומחה.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3 motion-safe:animate-fade-up [animation-delay:280ms]">
          <a
            href="/#contact"
            className="inline-flex items-center justify-center rounded-md bg-gold px-6 py-3 text-sm font-semibold text-navy-deep transition hover:bg-gold-bronze"
          >
            קבלו הצעת מחיר
          </a>
          <a
            href="/#about"
            className="inline-flex items-center justify-center rounded-md border border-gold/40 px-6 py-3 text-sm font-medium text-gold transition hover:border-gold hover:bg-gold/10"
          >
            קצת עלינו
          </a>
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-8 start-1/2 -translate-x-1/2 motion-safe:animate-bounce-soft"
        aria-hidden="true"
      >
        <span className="block h-8 w-px bg-gradient-to-b from-gold/0 via-gold/70 to-gold/0" />
      </div>
    </section>
  );
}
