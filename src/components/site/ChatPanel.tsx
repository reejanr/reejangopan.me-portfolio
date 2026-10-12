import { Fragment, useEffect, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { profile } from "@/data/site";
import { answerLocally, PERSONAS, topics } from "@/chat/engine";
import { Close } from "./Icons";
import { BotAvatar } from "./ChatWidget";

// Loaded on demand when the chat opens, so it adds nothing to page load.
// Answers come first from the free in-browser knowledge base (src/chat); only questions
// it can't answer confidently go to the AI endpoint, and only when one is configured.

type Msg = { role: "user" | "assistant"; content: string; suggestions?: string[] };
type AiState = "unknown" | "on" | "off";

const TOPICS = topics();

// Minimal, safe rendering: **bold**, links for URLs and emails, line breaks via CSS.
// Links to this site navigate inside the app (no reload); `onNav` lets the panel react (e.g. close on phones).
function render(text: string, onNav: () => void): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    if (/^\*\*[^*]+\*\*$/.test(part)) return <strong key={i}>{part.slice(2, -2)}</strong>;
    return (
      <Fragment key={i}>
        {part.split(/(https?:\/\/[^\s)]+|[\w.+-]+@[\w-]+(?:\.[\w-]+)+)/g).map((seg, j) => {
          if (/^https?:\/\//.test(seg)) {
            const clean = seg.replace(/[.,;:]+$/, "");
            const tail = seg.slice(clean.length);
            const label = clean.replace(/^https?:\/\//, "");
            if (clean.startsWith("https://reejangopan.me")) {
              const path = clean.replace("https://reejangopan.me", "") || "/";
              // The CV is a file, not a page — let the browser download it.
              const link = /\.[a-z0-9]+$/i.test(path)
                ? <a href={path}>{label}</a>
                : <Link to={path} onClick={onNav}>{label}</Link>;
              return <Fragment key={j}>{link}{tail}</Fragment>;
            }
            return <Fragment key={j}><a href={clean} target="_blank" rel="noopener noreferrer">{label}</a>{tail}</Fragment>;
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
  // Follow the conversation — but start at the top so the welcome message is visible on small screens.
  useEffect(() => {
    const el = listRef.current;
    if (el && messages.length) el.scrollTop = el.scrollHeight;
  }, [messages, busy]);
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      abortRef.current?.abort();
    };
  }, [onClose]);

  // After tapping a site link on a phone, close the full-screen chat so the page is visible.
  const onLinkNav = () => {
    if (window.matchMedia("(max-width: 760px), (max-height: 500px)").matches) onClose();
  };

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

  // Visitor picked who they are: show the tailored answer (no network, no guessing).
  async function choosePersona(id: string) {
    const p = PERSONAS.find((x) => x.id === id);
    if (!p || busy) return;
    setMessages((m) => [...m, { role: "user", content: p.label }, { role: "assistant", content: "" }]);
    setBusy(true);
    try {
      await reveal(p.a, p.next);
    } finally {
      setBusy(false);
    }
  }

  // Topic menu: list that topic's questions as tappable chips.
  function chooseTopic(id: string) {
    const t = TOPICS.find((x) => x.id === id);
    if (!t || busy) return;
    setMessages((m) => [...m, { role: "assistant", content: `**${t.label}** — pick a question, or type your own:`, suggestions: t.asks }]);
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
        <span className="chat-avatar" aria-hidden="true"><BotAvatar size={32} /></span>
        <div>
          <h2 id="chat-title" className="chat-title">Ree · Reejan's AI assistant</h2>
          <p className="chat-sub"><span className="dot" />Built by Reejan · {ai === "on" ? "knowledge base + AI" : "instant answers"}</p>
        </div>
        <button type="button" className="icon-btn chat-close" aria-label="Close chat" onClick={onClose}>
          <Close size={18} />
        </button>
      </header>

      <nav className="chat-topics" aria-label="Chat topics">
        {TOPICS.map((t) => (
          <button key={t.id} type="button" className="chat-topic" onClick={() => chooseTopic(t.id)}>{t.label}</button>
        ))}
      </nav>

      <div className="chat-list" ref={listRef} aria-live="polite">
        <div className="chat-welcome">
          <BotAvatar size={44} />
          <div className="chat-msg bot">
            Hi, I'm <strong>Ree</strong> — the assistant Reejan designed and built for this site. I know his projects, skills and
            experience, and I can help with tech stacks, scaling, planning a website or app, and automating a business.
            <br /><br />Who's visiting today?
          </div>
        </div>
        {messages.length === 0 && (
          <div className="chat-suggest">
            {PERSONAS.map((p) => (
              <button key={p.id} type="button" className="chat-chip" onClick={() => void choosePersona(p.id)}>{p.label}</button>
            ))}
          </div>
        )}
        {messages.map((m, i) =>
          m.role === "assistant" && m.content === "" ? null : (
            <Fragment key={i}>
              <div className={`chat-msg ${m.role === "user" ? "me" : "bot"}`}>
                {m.role === "assistant" ? render(m.content, onLinkNav) : m.content}
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
      <p className="chat-note">Ree answers from Reejan's knowledge base and can make mistakes. For anything important, email {profile.email}.</p>
    </section>
  );
}
