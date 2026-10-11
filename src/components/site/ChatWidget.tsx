import { Fragment, useEffect, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from "react";
import { profile } from "@/data/site";
import { Close } from "./Icons";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What has Reejan built?",
  "Is he open to new roles?",
  "What's his experience with Supabase?",
  "Explain Row Level Security simply",
];

const ERRORS: Record<number, string> = {
  429: "You're asking quickly — please wait a minute and try again.",
  503: `The assistant is offline right now. You can reach Reejan directly at ${profile.email}.`,
};

// Minimal, safe rendering: **bold**, links for URLs and emails, line breaks via CSS.
function render(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    if (/^\*\*[^*]+\*\*$/.test(part)) return <strong key={i}>{part.slice(2, -2)}</strong>;
    return (
      <Fragment key={i}>
        {part.split(/(https?:\/\/[^\s)]+|[\w.+-]+@[\w-]+(?:\.[\w-]+)+)/g).map((seg, j) => {
          if (/^https?:\/\//.test(seg)) {
            const clean = seg.replace(/[.,;:]+$/, "");
            const internal = clean.startsWith("https://reejangopan.me");
            return (
              <Fragment key={j}>
                <a href={internal ? clean.replace("https://reejangopan.me", "") || "/" : clean}
                  {...(internal ? {} : { target: "_blank", rel: "noopener noreferrer" })}>{clean.replace(/^https?:\/\//, "")}</a>
                {seg.slice(clean.length)}
              </Fragment>
            );
          }
          if (/^[\w.+-]+@[\w-]+(?:\.[\w-]+)+$/.test(seg)) return <a key={j} href={`mailto:${seg}`}>{seg}</a>;
          return seg;
        })}
      </Fragment>
    );
  });
}

const Spark = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.4z" />
    <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" />
  </svg>
);
const Send = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14" /><path d="M13 6l6 6-6 6" />
  </svg>
);

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, busy]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: globalThis.KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => () => abortRef.current?.abort(), []);

  async function ask(question: string) {
    const q = question.trim().slice(0, 600);
    if (!q || busy) return;
    const history: Msg[] = [...messages, { role: "user", content: q }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);

    const update = (content: string) =>
      setMessages((m) => [...m.slice(0, -1), { role: "assistant", content }]);

    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: history }),
        signal: controller.signal,
      });
      if (!res.ok || !res.body) {
        update(ERRORS[res.status] ?? `Sorry, something went wrong. You can reach Reejan at ${profile.email}.`);
        return;
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let text = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        text += decoder.decode(value, { stream: true });
        update(text);
      }
      if (!text.trim()) update(`Sorry, I couldn't answer that. You can reach Reejan at ${profile.email}.`);
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        update(`I couldn't connect. Check your connection, or email Reejan at ${profile.email}.`);
      }
    } finally {
      setBusy(false);
      abortRef.current = null;
    }
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void ask(input);
  };
  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void ask(input);
    }
  };

  const waiting = busy && messages[messages.length - 1]?.content === "";

  return (
    <>
      <button
        type="button"
        className="chat-launch"
        aria-expanded={open}
        aria-controls="chat-panel"
        onClick={() => setOpen((o) => !o)}
      >
        {open ? <Close size={18} /> : <Spark />}
        <span className="chat-launch-t">{open ? "Close" : "Ask AI about Reejan"}</span>
      </button>

      {open && (
        <section id="chat-panel" className="chat-panel" role="dialog" aria-modal="false" aria-labelledby="chat-title">
          <header className="chat-head">
            <span className="chat-avatar" aria-hidden="true"><Spark /></span>
            <div>
              <h2 id="chat-title" className="chat-title">Ask about Reejan</h2>
              <p className="chat-sub"><span className="dot" />AI assistant · answers from his profile</p>
            </div>
            <button type="button" className="icon-btn chat-close" aria-label="Close chat" onClick={() => setOpen(false)}>
              <Close size={18} />
            </button>
          </header>

          <div className="chat-list" ref={listRef} aria-live="polite">
            <div className="chat-msg bot">
              Hi! I can answer questions about Reejan's experience, projects and skills — and about the
              technologies he works with. What would you like to know?
            </div>
            {messages.length === 0 && (
              <div className="chat-suggest">
                {SUGGESTIONS.map((s) => (
                  <button key={s} type="button" className="chat-chip" onClick={() => void ask(s)}>{s}</button>
                ))}
              </div>
            )}
            {messages.map((m, i) =>
              m.role === "assistant" && m.content === "" ? null : (
                <div key={i} className={`chat-msg ${m.role === "user" ? "me" : "bot"}`}>
                  {m.role === "assistant" ? render(m.content) : m.content}
                </div>
              ),
            )}
            {waiting && (
              <div className="chat-msg bot chat-typing" aria-label="Assistant is typing">
                <i /><i /><i />
              </div>
            )}
          </div>

          <form className="chat-form" onSubmit={onSubmit}>
            <label htmlFor="chat-input" className="sr-only">Your question</label>
            <textarea
              id="chat-input"
              ref={inputRef}
              rows={1}
              maxLength={600}
              placeholder="Ask about skills, projects, experience…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
            />
            <button type="submit" className="chat-send" aria-label="Send question" disabled={busy || !input.trim()}>
              <Send />
            </button>
          </form>
          <p className="chat-note">AI can make mistakes. For anything important, email {profile.email}.</p>
        </section>
      )}
    </>
  );
}
