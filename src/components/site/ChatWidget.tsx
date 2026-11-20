import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Close } from "./Icons";

// The panel (and its knowledge base + search engine) loads only when someone opens the chat.
const ChatPanel = lazy(() => import("./ChatPanel"));

// "Devv" — the assistant's avatar: a small robot whose eyes blink and antenna pulses.
export const BotAvatar = ({ size = 28 }: { size?: number }) => (
  <svg className="bot-av" width={size} height={size} viewBox="0 0 40 40" aria-hidden="true" focusable="false">
    <line x1="20" y1="4.5" x2="20" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle className="bot-ant" cx="20" cy="4" r="2.6" />
    <rect x="3" y="18" width="3" height="7" rx="1.5" className="bot-ear" />
    <rect x="34" y="18" width="3" height="7" rx="1.5" className="bot-ear" />
    <rect x="6" y="9" width="28" height="25" rx="9" className="bot-head" />
    <rect x="10" y="14" width="20" height="11" rx="5.5" className="bot-visor" />
    <g className="bot-eyes">
      <circle cx="15.5" cy="19.5" r="2.1" className="bot-eye" />
      <circle cx="24.5" cy="19.5" r="2.1" className="bot-eye" />
    </g>
    <path d="M16.5 28.5 q3.5 2.4 7 0" fill="none" stroke="#0a0b0d" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [initialPrompt, setInitialPrompt] = useState("");
  const [phone, setPhone] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const { pathname } = useLocation();

  useEffect(() => {
    const query = window.matchMedia("(max-width: 760px), (max-height: 500px)");
    const update = () => setPhone(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const onOpen = (event: Event) => {
      const prompt = (event as CustomEvent<{ prompt?: string }>).detail?.prompt ?? "";
      setInitialPrompt(prompt);
      setOpen(true);
    };
    window.addEventListener("devv:open", onOpen);
    return () => window.removeEventListener("devv:open", onOpen);
  }, []);

  // A route change should never leave a floating conversation covering the new page.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Keep the document lock in sync with viewport changes and phone rotation.
  useEffect(() => {
    const lock = open && phone;
    document.documentElement.classList.toggle("chat-open", lock);
    return () => document.documentElement.classList.remove("chat-open");
  }, [open, phone]);
  // Start fetching the panel code as soon as the visitor shows intent.
  const preload = () => void import("./ChatPanel");

  return (
    <>
      <button
        type="button"
        className="chat-launch"
        aria-expanded={open}
        aria-controls="chat-panel"
        aria-label={open ? "Close chat" : "Ask Devv, Reejan's AI assistant"}
        onClick={() => {
          setInitialPrompt("");
          setOpen((o) => !o);
        }}
        onPointerEnter={preload}
        onFocus={preload}
      >
        {open ? <Close size={18} /> : <span className="chat-launch-av"><BotAvatar size={26} /></span>}
        <span className="chat-launch-t" aria-hidden="true">
          {open ? "Close" : <><span className="lt-long">Ask Devv about Reejan</span><span className="lt-short">Ask Devv</span></>}
        </span>
      </button>
      {open && (
        <Suspense fallback={
          <div className="chat-panel chat-loading" role="status" aria-live="polite" aria-label="Loading Devv's knowledge">
            <BotAvatar size={48} />
            <strong className="disp">Loading Devv</strong>
            <span>Preparing the knowledge index…</span>
            <i aria-hidden="true" />
          </div>
        }>
          <ChatPanel onClose={close} initialPrompt={initialPrompt} />
        </Suspense>
      )}
    </>
  );
}
