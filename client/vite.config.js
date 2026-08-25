import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_VIDEOS_DIR = path.resolve(__dirname, 'public', 'videos');
/** Skip clips larger than this — 145MB phone dumps freeze the gallery. */
const MAX_GALLERY_VIDEO_BYTES = 40 * 1024 * 1024;
const VIRTUAL_ID = 'virtual:gallery-videos';
const RESOLVED_VIRTUAL_ID = `\0${VIRTUAL_ID}`;

function listGalleryVideos() {
  if (!fs.existsSync(PUBLIC_VIDEOS_DIR)) {
    return { included: [], skipped: [], missingDir: true };
  }

  const files = fs
    .readdirSync(PUBLIC_VIDEOS_DIR)
    .filter((name) => /\.(mp4|webm|mov|m4v)$/i.test(name));

  const included = [];
  const skipped = [];

  for (const fileName of files) {
    const full = path.join(PUBLIC_VIDEOS_DIR, fileName);
    const size = fs.statSync(full).size;
    const entry = {
      fileName,
      size,
      sizeMB: Math.round((size / (1024 * 1024)) * 100) / 100,
      src: `/videos/${encodeURIComponent(fileName)}`,
    };
    if (size > MAX_GALLERY_VIDEO_BYTES) {
      skipped.push({ ...entry, reason: 'too-large' });
    } else {
      included.push(entry);
    }
  }

  included.sort((a, b) => a.fileName.localeCompare(b.fileName, 'he'));
  return { included, skipped, missingDir: false };
}

function galleryVideosPlugin() {
  return {
    name: 'gallery-videos',
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_VIRTUAL_ID;
      return undefined;
    },
    load(id) {
      if (id !== RESOLVED_VIRTUAL_ID) return undefined;

      const { included, skipped } = listGalleryVideos();

      if (skipped.length) {
        const names = skipped.map((v) => `${v.fileName} (${v.sizeMB}MB)`).join(', ');
        console.warn(
          `[gallery-videos] Skipping oversized clip(s) (>${MAX_GALLERY_VIDEO_BYTES / (1024 * 1024)}MB): ${names}. Compress and replace to include them.`,
        );
      }

      const items = included.map((entry, index) => ({
        id: `video-${index + 1}`,
        type: 'video',
        src: entry.src,
        alt: 'סרטון מהמעבדה של Time.il',
      }));

      return `export default ${JSON.stringify(items)};`;
    },
  };
}

/** Avoid fs.watch on media — Windows EBUSY when files are locked during playback. */
function shouldIgnoreWatchPath(watchPath) {
  const normalized = String(watchPath).replace(/\\/g, '/');
  if (/\/videos(\/|$)/i.test(normalized)) return true;
  if (/\.(mp4|webm|mov|m4v)$/i.test(normalized)) return true;
  return false;
}

export default defineConfig({
  plugins: [react(), galleryVideosPlugin()],
  server: {
    port: 5173,
    watch: {
      ignored: shouldIgnoreWatchPath,
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
});
