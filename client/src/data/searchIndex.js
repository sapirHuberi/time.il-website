import { navLinks } from './navLinks';
import { portfolioJobs } from './portfolio';
import { services } from './services';
import { strapsIntro } from './straps';

/** @typedef {{ id: string, title: string, type: string, href: string, haystack: string }} SearchEntry */

/** @type {SearchEntry[]} */
export const searchIndex = [
  ...navLinks.map((link) => ({
    id: `nav-${link.id}`,
    title: link.label,
    type: 'מקטע',
    href: link.href,
    haystack: link.label,
  })),
  ...services.map((service) => ({
    id: `service-${service.slug}`,
    title: service.title,
    type: 'שירות',
    href: `/services/${service.slug}`,
    haystack: [service.title, service.description].join(' '),
  })),
  ...portfolioJobs.map((job) => ({
    id: `portfolio-${job.id}`,
    title: job.title,
    type: 'עבודה',
    href: '/#portfolio',
    haystack: [job.title, job.description].join(' '),
  })),
  {
    id: 'page-straps',
    title: strapsIntro.title,
    type: 'דף',
    href: '/straps',
    haystack: [strapsIntro.title, strapsIntro.lead, 'רצועות'].join(' '),
  },
  {
    id: 'page-work',
    title: 'גלריית עבודות',
    type: 'דף',
    href: '/work',
    haystack: 'גלריית עבודות תמונות וידאו מעבדה',
  },
];

/**
 * @param {string} query
 * @param {number} [limit]
 * @returns {SearchEntry[]}
 */
export function searchSite(query, limit = 8) {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const scored = [];

  for (const entry of searchIndex) {
    const haystack = entry.haystack.toLowerCase();
    const title = entry.title.toLowerCase();

    let score = 0;
    if (title === q) score = 100;
    else if (title.startsWith(q)) score = 80;
    else if (title.includes(q)) score = 60;
    else if (haystack.includes(q)) score = 40;
    else continue;

    scored.push({ entry, score });
  }

  scored.sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title, 'he'));
  return scored.slice(0, limit).map((item) => item.entry);
}
