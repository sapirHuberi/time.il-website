import batteryServiceImg from '../../images/IMG_20260131_200359.jpg';
import glassSealServiceImg from '../../images/IMG_20241212_181729.jpg';
import gemServiceImg from '../../images/IMG_20251031_125150.jpg';
import strapShortenServiceImg from '../../images/IMG-20250922-WA0011.jpeg';
import mechanicalServiceImg from '../../images/IMG-20260427-WA0000.jpg';
import strapReplaceServiceImg from '../../images/IMG-20260516-WA0003 (1).jpg';

export const services = [
  {
    slug: 'battery-replacement',
    title: 'החלפת סוללות',
    description:
      'החלפת סוללות מקצועית ומדויקת למגוון רחב של סוגי שעונים, תוך הקפדה על עבודה נקייה ושמירה על מנגנון השעון.',
    image: batteryServiceImg,
    imageAlt: 'החלפת סוללת שעון במעבדה עם פינצטה מדויקת',
    // Portrait: keep movement + tweezers in frame.
    imageObjectClass: 'object-[50%_42%]',
    imageCardObjectClass: 'object-cover object-[50%_42%]',
    detail: [
      'החלפת סוללה מתבצעת בעדינות ובמקצועיות, תוך פתיחת גב השעון בצורה מבוקרת, הוצאת הסוללה הישנה והתאמת סוללה חדשה ואיכותית המתאימה לדגם ולמנגנון. במהלך העבודה אנו בודקים את פעולת השעון ומוודאים שהכול פועל בצורה תקינה לפני מסירתו ללקוח. אנו מקפידים על עבודה מדויקת ושמירה על השעון לאורך כל התהליך, והכול במחיר הוגן ובהתחשבות בלקוח.',
    ],
  },
  {
    slug: 'glass-and-sealing',
    title: 'החלפת זכוכית ואטימה',
    description:
      'החלפת זכוכית פגומה או שרוטה והתאמת זכוכית חדשה לשעון, לצד ביצוע אטימה מקצועית להגנה מפני חדירת מים ולחות.',
    image: glassSealServiceImg,
    imageAlt: 'החלפת זכוכית ואטימת שעון במעבדה',
    // Landscape close-up: watch face stays centered.
    imageObjectClass: 'object-center',
    heroAspectClass: 'aspect-[5/4] sm:aspect-[3/2] md:aspect-[16/10] lg:aspect-[2/1]',
    detail: [
      'זכוכית שרוטה, סדוקה או שבורה עלולה לפגוע הן במראה השעון והן בהגנה על המנגנון. אנו מסירים את הזכוכית הפגומה, מנקים ומכינים את אזור ההרכבה ומתאימים זכוכית חדשה במידה ובסוג המתאים לשעון. במידת הצורך מבוצעת גם החלפת אטמים ובדיקת אטימה, במטרה לסייע בהגנה מפני חדירת מים ולחות. העבודה מתבצעת בקפידה ובמחירים הוגנים, תוך ניסיון להתאים את הפתרון הטוב ביותר לצורכי הלקוח.',
    ],
  },
  {
    slug: 'gemstone-bonding',
    title: 'שיקום והדבקת אבני חן וחלקים',
    description:
      'החזרה והדבקה מקצועית של אבני חן, סמלים וחלקים דקורטיביים שנפלו או השתחררו, תוך הקפדה על מיקום מדויק וגימור אסתטי.',
    image: gemServiceImg,
    imageAlt: 'הדבקת אבני חן וחלקי שעון במעבדה',
    // Portrait: dial + tweezers.
    imageObjectClass: 'object-[50%_45%]',
    imageCardObjectClass: 'object-cover object-[50%_45%]',
    detail: [
      'כאשר אבני חן, סמלים, קישוטים או חלקים קטנים של השעון משתחררים או נופלים, ניתן במקרים רבים לשחזר את המראה המקורי שלהם. אנו מנקים ומכינים את אזור ההדבקה, ממקמים את החלק בצורה מדויקת ומבצעים הדבקה מקצועית ועדינה, תוך הקפדה על המיקום, הסימטריה והגימור הסופי. המטרה היא להחזיר לשעון את המראה המקורי והאסתטי שלו, תוך מתן פתרון משתלם ובמחיר הוגן.',
    ],
  },
  {
    slug: 'strap-shortening',
    title: 'קיצור רצועה',
    description: 'התאמה מדויקת של אורך הרצועה לגודל פרק היד, לנוחות מרבית ולמראה מושלם.',
    image: strapShortenServiceImg,
    imageAlt: 'קיצור והתאמת רצועת שעון',
    // Near-square: watch sits on the left.
    imageObjectClass: 'object-[34%_48%]',
    imageCardObjectClass: 'object-cover object-[34%_48%]',
    detail: [
      'רצועה שאינה מותאמת למידת פרק היד עלולה להיות לא נוחה ולפגוע בהתאמה של השעון. אנו מבצעים קיצור מדויק של הרצועה בהתאם למידת היד, באמצעות **הסרה של חוליות ברצועות מתכת או יצירת חורים מתאימים ברצועות עור**. לאחר הקיצור אנו מרכיבים את הרצועה ומוודאים שהשעון יושב בצורה נוחה ובטוחה על היד. השירות מבוצע במקצועיות ובמחיר הוגן, מתוך רצון לתת ללקוח את ההתאמה הנכונה ללא הוצאות מיותרות.',
    ],
  },
  {
    slug: 'mechanical-service',
    title: 'שירות לשעונים מכניים ואוטומטיים',
    description:
      'טיפול מקצועי ומקיף בשעונים מכניים ואוטומטיים, הכולל בדיקה, ניקוי, שימון וכיוון המנגנון, בהתאם לצורכי השעון.',
    image: mechanicalServiceImg,
    imageAlt: 'טיפול בשעון מכני ואוטומטי במעבדה',
    // Tall portrait: keep gears + tool tip.
    imageObjectClass: 'object-[48%_36%]',
    imageCardObjectClass: 'object-cover object-[48%_36%]',
    detail: [
      'שעונים מכניים ואוטומטיים דורשים טיפול מקצועי ועדין על מנת לשמור על פעילות תקינה לאורך זמן. במסגרת השירות אנו מבצעים בדיקה של מנגנון השעון, מפרקים את החלקים הנדרשים, מנקים אותם, משמנים במקומות המתאימים ומבצעים כיוון ובדיקה של פעולת המנגנון. בהתאם למצב השעון, אנו בודקים גם חלקים נוספים ומאתרים בלאי או תקלות הדורשים טיפול. העבודה מתבצעת בסבלנות ובדיוק, תוך התאמת הטיפול למצבו של כל שעון ובמחירים הוגנים ובהתחשבות בלקוח.',
    ],
  },
  {
    slug: 'strap-replacement',
    title: 'החלפת רצועות',
    description:
      'מבחר רצועות במגוון סגנונות וחומרים, עם התאמה מדויקת לשעון ולהעדפה האישית, כולל החלפה מקצועית.',
    image: strapReplaceServiceImg,
    imageAlt: 'החלפת רצועות שעון',
    // Wide landscape: keep watch face + straps.
    imageObjectClass: 'object-[52%_50%]',
    imageCardObjectClass: 'object-cover object-[52%_50%]',
    heroAspectClass: 'aspect-[5/4] sm:aspect-[3/2] md:aspect-[16/9] lg:aspect-[2.2/1]',
    detail: [
      'רצועה חדשה יכולה לשנות את המראה והנוחות של השעון ולהעניק לו מראה מחודש. אנו מסייעים בבחירת רצועה המתאימה לדגם השעון, למידותיו ולסגנון הרצוי, ומבצעים את ההחלפה בעדינות תוך שמירה על גוף השעון והחיבורים. לאחר ההרכבה אנו מוודאים שהרצועה מחוברת היטב ושהשעון יושב בצורה נוחה ובטוחה. אנו מציעים פתרונות במגוון אפשרויות ומקפידים לבוא לקראת לקוחותינו עם מחירים הוגנים ומשתלמים.',
    ],
  },
];

export function getServiceBySlug(slug) {
  return services.find((service) => service.slug === slug);
}
