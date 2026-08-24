const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;
const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || '';

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'Time.il API',
    timestamp: new Date().toISOString(),
  });
});

/**
 * Forward chat messages to n8n (or echo when webhook is not configured).
 * Body: { message: string, sessionId?: string, metadata?: object }
 */
app.post('/api/messages', async (req, res) => {
  const { message, sessionId, metadata } = req.body || {};

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({
      error: 'נדרשת הודעה תקינה',
      code: 'INVALID_MESSAGE',
    });
  }

  const trimmed = message.trim();
  const session = sessionId || `web-${Date.now()}`;

  // Echo payload kept for local fallback / debugging.
  const echoPayload = {
    message: trimmed,
    sessionId: session,
    metadata: metadata || {},
    receivedAt: new Date().toISOString(),
  };

  if (!N8N_WEBHOOK_URL) {
    return res.json({
      ok: true,
      mode: 'echo',
      reply:
        'תודה על פנייתך ל־Time.il. השירות יחובר בקרוב לעוזר החכם שלנו — נחזור אליך בהקדם.',
      echo: echoPayload,
    });
  }

  // n8n Chat Trigger expects chatInput + sessionId (+ optional action).
  const n8nPayload = {
    action: 'sendMessage',
    chatInput: trimmed,
    sessionId: session,
    metadata: metadata || {},
  };

  try {
    const upstream = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(n8nPayload),
    });

    const contentType = upstream.headers.get('content-type') || '';
    const data = contentType.includes('application/json')
      ? await upstream.json()
      : { raw: await upstream.text() };

    if (!upstream.ok) {
      return res.status(502).json({
        error: 'שגיאה בתקשורת עם שירות העוזר',
        code: 'N8N_UPSTREAM_ERROR',
        status: upstream.status,
        data,
      });
    }

    const reply = extractN8nReply(data);

    return res.json({
      ok: true,
      mode: 'n8n',
      reply,
      sessionId: session,
      data,
    });
  } catch (err) {
    console.error('[messages] n8n proxy failed:', err.message);
    return res.status(502).json({
      error: 'לא ניתן להתחבר לשירות העוזר כרגע',
      code: 'N8N_PROXY_FAILED',
    });
  }
});

/**
 * Chat Trigger / Agent replies often use `output` or `text`.
 * Arrays and nested shapes are normalized to a single string.
 */
function extractN8nReply(data) {
  if (data == null) return null;
  if (typeof data === 'string') return data;

  if (Array.isArray(data)) {
    for (const item of data) {
      const nested = extractN8nReply(item);
      if (nested) return nested;
    }
    return null;
  }

  if (typeof data !== 'object') return String(data);

  const direct =
    data.output ?? data.reply ?? data.message ?? data.text ?? data.response;
  if (typeof direct === 'string' && direct.trim()) return direct.trim();
  if (direct && typeof direct === 'object') {
    const nested = extractN8nReply(direct);
    if (nested) return nested;
  }

  if (data.data != null) return extractN8nReply(data.data);
  if (data.json != null) return extractN8nReply(data.json);

  return null;
}

/**
 * Inbound webhook passthrough for n8n callbacks.
 */
app.post('/api/n8n/webhook', (req, res) => {
  console.log('[n8n/webhook] received:', JSON.stringify(req.body));
  res.json({
    ok: true,
    received: true,
    receivedAt: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`Time.il API listening on http://localhost:${PORT}`);
  if (!N8N_WEBHOOK_URL) {
    console.log('N8N_WEBHOOK_URL not set — /api/messages will echo responses.');
  }
});
