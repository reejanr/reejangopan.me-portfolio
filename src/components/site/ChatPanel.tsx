import { Fragment, useEffect, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from "react";
import { profile } from "@/data/site";
import { answerLocally } from "@/chat/engine";
import { Close } from "./Icons";
import { Spark } from "./ChatWidget";

// Loaded on demand when the chat opens, so it adds nothing to page load.
// Answers come first from the free in-browser knowledge base (src/chat); only questions
// it can't answer confidently go to the AI endpoint, and only when one is configured.

type Msg = { role: "user" | "assistant"; content: string; suggestions?: string[] };
type AiState = "unknown" | "on" | "off";

const STARTERS = [
  "What has Reejan built?",
  "Is he open to new roles?",
  "What's his experience with Supabase?",
  "Explain Row Level Security",
];

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

const Send = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14" /><path d="M13 6l6 6-6 6" />
  </svg>
);

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function ChatPanel({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [ai, setAi] = useState<AiState>("unknown");
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => inputRef.current?.focus(), []);
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, busy]);
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      abortRef.current?.abort();
    };
  }, [onClose]);

  const setLast = (patch: Partial<Msg>) =>
    setMessages((m) => [...m.slice(0, -1), { ...m[m.length - 1], ...patch }]);

  // Reveal a local answer word by word (instant with reduced motion).
  async function reveal(text: string, suggestions?: string[]) {
    if (reducedMotion()) {
      setLast({ content: text, suggestions });
      return;
    }
    await sleep(250);
    const words = text.split(/(\s+)/);
    const step = Math.max(2, Math.ceil(words.length / 40));
    for (let i = step; i < words.length + step; i += step) {
      setLast({ content: words.slice(0, i).join("") });
      await sleep(16);
    }
    setLast({ content: text, suggestions });
  }

  // Returns true if the AI answered; false if it's unavailable.
  async function askAi(history: Msg[]): Promise<boolean> {
    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: history.map(({ role, content }) => ({ role, content })) }),
        signal: controller.signal,
      });
      if (res.status === 429) {
        setLast({ content: "You're asking quickly — please wait a minute and try again." });
        return true;
      }
      if (!res.ok || !res.body) {
        setAi("off");
        return false;
      }
      setAi("on");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let text = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        text += decoder.decode(value, { stream: true });
        setLast({ content: text });
      }
      return text.trim().length > 0;
    } catch (err) {
      if ((err as Error).name === "AbortError") return true;
      setAi("off");
      return false;
    } finally {
      abortRef.current = null;
    }
  }

  async function ask(question: string) {
    const q = question.trim().slice(0, 600);
    if (!q || busy) return;
    const history: Msg[] = [...messages.map(({ role, content }) => ({ role, content })), { role: "user", content: q }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);
    try {
      const local = answerLocally(q);
      if (local.confident) {
        await reveal(local.text, local.suggestions);
        return;
      }
      if (ai !== "off" && (await askAi(history))) return;
      await reveal(local.text, local.suggestions);
    } finally {
      setBusy(false);
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

  const last = messages[messages.length - 1];
  const waiting = busy && last?.content === "";

  return (
    <section id="chat-panel" className="chat-panel" role="dialog" aria-modal="false" aria-labelledby="chat-title">
      <header className="chat-head">
        <span className="chat-avatar" aria-hidden="true"><Spark /></span>
        <div>
          <h2 id="chat-title" className="chat-title">Ask about Reejan</h2>
          <p className="chat-sub"><span className="dot" />{ai === "on" ? "Knowledge base + AI" : "Instant answers from his knowledge base"}</p>
        </div>
        <button type="button" className="icon-btn chat-close" aria-label="Close chat" onClick={onClose}>
          <Close size={18} />
        </button>
      </header>

      <div className="chat-list" ref={listRef} aria-live="polite">
        <div className="chat-msg bot">
          Hi! Ask me anything about Reejan's experience, projects, skills and availability — or about the technologies he works with.
        </div>
        {messages.length === 0 && (
          <div className="chat-suggest">
            {STARTERS.map((s) => (
              <button key={s} type="button" className="chat-chip" onClick={() => void ask(s)}>{s}</button>
            ))}
          </div>
        )}
        {messages.map((m, i) =>
          m.role === "assistant" && m.content === "" ? null : (
            <Fragment key={i}>
              <div className={`chat-msg ${m.role === "user" ? "me" : "bot"}`}>
                {m.role === "assistant" ? render(m.content) : m.content}
              </div>
              {m.suggestions && i === messages.length - 1 && !busy && (
                <div className="chat-suggest">
                  {m.suggestions.map((s) => (
                    <button key={s} type="button" className="chat-chip" onClick={() => void ask(s)}>{s}</button>
                  ))}
                </div>
              )}
            </Fragment>
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
      <p className="chat-note">Answers come from Reejan's own site content. For anything important, email {profile.email}.</p>
    </section>
  );
}
