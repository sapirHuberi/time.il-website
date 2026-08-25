# Time.il — מעבדת תיקון שעונים

אתר תדמית ומעבדה לתיקון שעונים עם ממשק בעברית (RTL) ושרת Express לאינטגרציה עם n8n.

## התקנה

```bash
npm install
cd client && npm install && cd ..
cp .env.example .env
```

## הרצה

```bash
npm run dev
```

- Frontend (Vite): http://localhost:5173  
- API (Express): http://localhost:3001  

## מבנה

- `client/` — React + Vite + Tailwind
  - `src/` — רכיבים, דפים ונתונים
  - `public/` — לוגו ווידאו סטטיים
  - `images/` — תמונות מעבדה
- `server/server.js` — Express: הודעות צ׳אט ופרוקסי ל-n8n
