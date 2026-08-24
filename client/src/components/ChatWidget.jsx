import { useEffect, useId, useRef, useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';

const WELCOME =
  'שלום! כאן העוזר של Time.il. איך אפשר לעזור — תיקון, סוללה או רצועה?';

const SESSION_KEY = 'time-il-chat-session';

function getOrCreateSessionId() {
  try {
    const existing = sessionStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const id =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `web-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    sessionStorage.setItem(SESSION_KEY, id);
    return id;
  } catch {
    return `web-${Date.now()}`;
  }
}

/**
 * Floating chat — posts to Express /api/messages → n8n Chat Trigger.
 */
export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [messages, setMessages] = useState([
    { id: 'welcome', role: 'assistant', text: WELCOME },
  ]);
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const inputId = useId();

  useEffect(() => {
    if (!open) return;
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
    inputRef.current?.focus();
  }, [open, messages, sending]);

  async function sendMessage(event) {
    event?.preventDefault();
    const text = input.trim();
    if (!text || sending) return;

    const userMsg = {
      id: `u-${Date.now()}`,
      role: 'user',
      text,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setSending(true);

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          sessionId: getOrCreateSessionId(),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || 'שגיאת שרת');
      }

      const reply =
        (typeof data.reply === 'string' && data.reply.trim()) ||
        'קיבלנו את ההודעה, אך לא התקבלה תשובה מהעוזר כרגע.';

      setMessages((prev) => [
        ...prev,
        { id: `a-${Date.now()}`, role: 'assistant', text: reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `e-${Date.now()}`,
          role: 'assistant',
          text: 'לא הצלחנו להתחבר לעוזר כרגע. נסו שוב בעוד רגע.',
        },
      ]);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="fixed bottom-5 start-5 z-50 flex flex-col items-start gap-3 md:bottom-6 md:start-6">
      {open ? (
        <div className="flex w-[min(100vw-2.5rem,22rem)] flex-col overflow-hidden rounded-xl border border-gold/30 bg-navy-deep shadow-xl shadow-navy-deep/30">
          <div className="flex items-center justify-between border-b border-gold/20 bg-navy px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-gold">עוזר Time.il</p>
              <p className="text-xs text-surface/70">שירות לקוחות חכם</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md p-1.5 text-surface/80 transition hover:bg-gold/10 hover:text-gold"
              aria-label="סגירת צ׳אט"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div
            ref={listRef}
            className="max-h-72 space-y-3 overflow-y-auto px-4 py-4 text-sm"
            role="log"
            aria-live="polite"
            aria-relevant="additions"
          >
            {messages.map((msg) => (
              <p
                key={msg.id}
                className={
                  msg.role === 'user'
                    ? 'ms-8 rounded-lg bg-gold/15 px-3 py-2 leading-relaxed text-surface'
                    : 'me-8 rounded-lg bg-navy/60 px-3 py-2 leading-relaxed text-surface/85'
                }
              >
                {msg.text}
              </p>
            ))}
            {sending ? (
              <p className="me-8 text-xs text-surface/50">העוזר כותב…</p>
            ) : null}
          </div>

          <form
            onSubmit={sendMessage}
            className="flex items-center gap-2 border-t border-gold/20 px-3 py-3"
          >
            <label htmlFor={inputId} className="sr-only">
              הודעה לעוזר
            </label>
            <input
              ref={inputRef}
              id={inputId}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={sending}
              placeholder="כתבו כאן…"
              autoComplete="off"
              className="min-w-0 flex-1 rounded-lg border border-gold/20 bg-navy px-3 py-2 text-sm text-surface placeholder:text-surface/40 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/40 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={sending || !input.trim()}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold text-navy-deep transition hover:bg-gold-bronze disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="שליחת הודעה"
            >
              <Send className="h-4 w-4" strokeWidth={2} />
            </button>
          </form>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gold text-navy-deep shadow-lg shadow-navy-deep/25 transition hover:bg-gold-bronze focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-surface"
        aria-label={open ? 'סגירת צ׳אט' : 'פתיחת צ׳אט עם שירות הלקוחות'}
        aria-expanded={open}
      >
        <MessageCircle className="h-6 w-6" strokeWidth={2} />
      </button>
    </div>
  );
}
