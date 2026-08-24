/**
 * Lab media gallery — unused images under `client/images` plus clips from
 * `client/public/videos` (static URLs; oversized files are skipped in Vite).
 * Duplicate "עותק" image files are skipped when the original is present.
 */

import galleryVideoItems from 'virtual:gallery-videos';

const USED_FILENAMES = new Set([
  'a_different_perspective-clockwork-1392757_1920.jpg',
  'IMG-20250922-WA0011.jpeg',
  'IMG-20251006-WA0014.jpg',
  'IMG-20251006-WA0050.jpg',
  'IMG-20260216-WA0000.jpg',
  'IMG-20260216-WA0006.jpg',
  'IMG-20260427-WA0000.jpg',
  'IMG-20260516-WA0003 (1).jpg',
  'IMG-20260817-WA0004.jpg',
  'IMG_20241212_181729.jpg',
  'IMG_20250531_220618.jpg',
  'IMG_20250531_224645.jpg',
  'IMG_20251031_125150.jpg',
  'IMG_20260131_200359.jpg',
  'IMG_20260824_161926.jpg',
  'pexels-atelier-kommpass-2152247243-35136298.jpg',
  'pexels-huy-phan-316220-38797596.jpg',
  'pexels-ranjit-pradhan-943095-13597651.jpg',
]);

const imageModules = import.meta.glob('../../images/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
});

function fileNameFromPath(path) {
  return path.split('/').pop() ?? path;
}

/** Strip RTL marks and a trailing " - עותק" so we can detect copy duplicates. */
function normalizeForDedup(name) {
  return name
    .replace(/[\u200e\u200f]/g, '')
    .replace(/\s*-\s*עותק(?=\.[^.]+$)/u, '')
    .trim();
}

const allImageEntries = Object.entries(imageModules).map(([path, src]) => {
  const fileName = fileNameFromPath(path);
  return { path, src, fileName, key: normalizeForDedup(fileName) };
});

const galleryImages = allImageEntries
  .filter((entry) => {
    if (USED_FILENAMES.has(entry.fileName)) return false;

    const isCopy = /עותק/u.test(entry.fileName);
    if (isCopy) {
      const originalExists = allImageEntries.some(
        (other) =>
          other.key === entry.key &&
          other.fileName !== entry.fileName &&
          !/עותק/u.test(other.fileName),
      );
      if (originalExists) return false;
    }

    return true;
  })
  .sort((a, b) => a.fileName.localeCompare(b.fileName, 'he'))
  .map((entry, index) => ({
    id: `image-${index + 1}`,
    type: 'image',
    src: entry.src,
    alt: 'צילום מהמעבדה של Time.il',
  }));

const galleryVideos = galleryVideoItems;

/** Spread videos evenly through the image list so they aren’t clustered. */
function interleaveEvenly(images, videos) {
  if (videos.length === 0) return images;
  if (images.length === 0) return videos;

  const result = [...images];
  const slots = videos.length;

  for (let i = 0; i < slots; i += 1) {
    // Place video i at an even fraction of the growing list
    // (e.g. 6 videos → near 1/7, 2/7, … 6/7 of the final length).
    const insertAt = Math.round(((i + 1) * (result.length + 1)) / (slots + 1));
    result.splice(Math.min(insertAt, result.length), 0, videos[i]);
  }

  return result;
}

export const galleryItems = interleaveEvenly(galleryImages, galleryVideos);

/** @deprecated Prefer galleryItems — kept for any older imports. */
export const galleryPhotos = galleryItems;
