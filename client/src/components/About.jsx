import { useEffect, useState } from 'react';
import Reveal from './Reveal';
import AboutWatchMark from './AboutWatchMark';

export default function About() {
  const [handRotation, setHandRotation] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return undefined;

    let frame = 0;

    const updateRotation = () => {
      frame = 0;
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1,
      );
      const progress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
      // One full clockwise turn across the page
      setHandRotation(progress * 360);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateRotation);
    };

    updateRotation();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section id="about" className="relative scroll-mt-24 overflow-hidden bg-surface py-20 md:py-24">
      <div
        className="pointer-events-none absolute -start-16 top-10 h-56 w-56 rounded-full border border-gold/15 motion-safe:animate-orbit"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -end-10 bottom-8 h-40 w-40 rounded-full border border-navy/10"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 md:grid-cols-[auto_1fr] md:items-start md:gap-16 md:px-6">
        <Reveal className="relative mx-auto shrink-0 md:mx-0 md:mt-1">
          <AboutWatchMark handRotation={handRotation} />
        </Reveal>

        <div>
          <Reveal>
            <h2 className="font-display text-3xl font-semibold text-navy-deep md:text-4xl">
              קצת עלינו
            </h2>
            <span
              className="mt-4 block h-px w-16 origin-right bg-gold motion-safe:animate-draw-line"
              aria-hidden="true"
            />
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-6 max-w-2xl font-display text-xl font-semibold leading-relaxed text-navy-deep md:text-2xl">
              דיוק הוא לא רק תכונה – הוא הסטנדרט שלנו.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-charcoal/75 md:text-lg">
              מאחורי כל שעון יש סיפור, אופי וערך. אנו מעניקים שירותי תיקון, תחזוקה ושיקום שעונים
              במקצועיות, דיוק ואמינות, תוך הקפדה על כל פרט קטן ושימוש בציוד מקצועי ומתקדם.
            </p>
          </Reveal>

          <Reveal delay={280}>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-charcoal/75 md:text-lg">
              עם ניסיון רב בתחום, אנו מטפלים במגוון רחב של תקלות ותיקונים – החל מהחלפת סוללות
              ורצועות ועד תיקונים מורכבים יותר. כל שעון מקבל אצלנו את תשומת הלב והטיפול המקצועי שהוא
              צריך, מתוך הבנה שמדובר לעיתים בפריט יקר ערך, בעל משמעות אישית ורגשית.
            </p>
          </Reveal>

          <Reveal delay={360}>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-charcoal/75 md:text-lg">
              אנו מאמינים ששירות איכותי מתחיל ב
              <strong className="font-semibold text-navy-deep">יחס אישי, שקיפות ומחיר הוגן</strong>
              . העבודה מתבצעת ללא פשרות, במסירות ובקפידה, במטרה להחזיר לכל שעון את הדיוק, האיכות
              והמראה שמגיעים לו.
            </p>
          </Reveal>

          <Reveal delay={440}>
            <p className="mt-6 max-w-2xl font-display text-lg font-semibold leading-relaxed text-navy-deep md:text-xl">
              מקצועיות. אמינות. דיוק ללא פשרות. שירות מכל הלב.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
