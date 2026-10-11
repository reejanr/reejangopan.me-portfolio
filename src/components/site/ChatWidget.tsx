import { lazy, Suspense, useCallback, useState } from "react";
import { Close } from "./Icons";

// The panel (and its knowledge base + search engine) loads only when someone opens the chat.
const ChatPanel = lazy(() => import("./ChatPanel"));

export const Spark = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.4z" />
    <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" />
  </svg>
);

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  // Start fetching the panel code as soon as the visitor shows intent.
  const preload = () => void import("./ChatPanel");

  return (
    <>
      <button
        type="button"
        className="chat-launch"
        aria-expanded={open}
        aria-controls="chat-panel"
        onClick={() => setOpen((o) => !o)}
        onPointerEnter={preload}
        onFocus={preload}
      >
        {open ? <Close size={18} /> : <Spark />}
        <span className="chat-launch-t">{open ? "Close" : "Ask AI about Reejan"}</span>
      </button>
      {open && (
        <Suspense fallback={<div className="chat-panel chat-loading" aria-busy="true" />}>
          <ChatPanel onClose={close} />
        </Suspense>
      )}
    </>
  );
}
