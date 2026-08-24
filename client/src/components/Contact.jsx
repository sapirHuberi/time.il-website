import Reveal from './Reveal';

const contactDetails = [
  {
    label: 'טלפון / WhatsApp',
    value: '055-2803556',
  },
  {
    label: 'אימייל',
    value: 'time.isratal@gmail.com',
    dir: 'ltr',
  },
  {
    label: 'כתובת',
    value: 'רח׳ שמואל חיים לנדאו 1, פתח תקווה',
  },
];

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 bg-navy-deep py-20 text-surface md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold text-gold md:text-4xl">צור קשר</h2>
          <p className="mt-3 max-w-2xl text-surface/75">
            יש לכם שאלה או צריכים הצעת מחיר? נשמח לעמוד לשירותכם.
          </p>

          <ul className="mt-10 space-y-5">
            {contactDetails.map((item) => (
              <li key={item.label}>
                <p className="text-sm font-medium text-gold/80">{item.label}</p>
                <p className="mt-1 text-lg text-surface" dir={item.dir}>
                  {item.value}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
