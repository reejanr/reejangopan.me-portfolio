import { useEffect, useRef, useState } from "react";

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

// Pointer effects, delegated from one listener:
//  - .spot   : a soft accent spotlight follows the cursor (sets --mx / --my)
//  - .btn    : buttons lean magnetically toward the cursor
//  - .ide    : the hero code window tilts in 3D toward the cursor
export function usePointerFx() {
  useEffect(() => {
    if (reducedMotion() || !finePointer()) return;
    let magnet: HTMLElement | null = null;
    let frame = 0;
    let last: PointerEvent | null = null;

    const release = () => {
      if (magnet) magnet.style.transform = "";
      magnet = null;
    };

    const apply = () => {
      frame = 0;
      const e = last;
      if (!e) return;
      const target = e.target as Element | null;

      const spot = target?.closest?.(".spot") as HTMLElement | null;
      if (spot) {
        const r = spot.getBoundingClientRect();
        spot.style.setProperty("--mx", `${e.clientX - r.left}px`);
        spot.style.setProperty("--my", `${e.clientY - r.top}px`);
      }

      const btn = target?.closest?.(".btn") as HTMLElement | null;
      if (btn !== magnet) release();
      if (btn) {
        const r = btn.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        btn.style.transform = `translate(${dx * 0.18}px, ${dy * 0.28}px)`;
        magnet = btn;
      }

      const ide = document.querySelector(".ide") as HTMLElement | null;
      if (ide && window.innerWidth > 1024) {
        const r = ide.getBoundingClientRect();
        const inView = r.bottom > 0 && r.top < window.innerHeight;
        if (inView) {
          const x = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
          const y = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
          ide.style.transform = `perspective(1200px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
        }
      }
    };

    const onMove = (e: PointerEvent) => {
      last = e;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      release();
      const ide = document.querySelector(".ide") as HTMLElement | null;
      if (ide) ide.style.transform = "";
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);
}

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ<>/{}[]=+*#01";

// Decodes text from random glyphs into the real string, left to right. The server
// HTML always contains the real text, so search engines and no-JS visitors see it.
export function useScramble<T extends HTMLElement>(text: string, delayMs = 250) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;
    let frame = 0;
    let start = 0;
    const duration = 900;
    // Mutate the existing text node (never replace it): a new text node would count as a
    // new largest paint and push back Largest Contentful Paint.
    const node = el.firstChild;
    if (!(node instanceof Text)) return;
    const tick = (t: number) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / duration);
      const settled = Math.floor(p * text.length);
      node.data = text
        .split("")
        .map((ch, i) => (i < settled || ch === " " ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0]))
        .join("");
      if (p < 1) frame = requestAnimationFrame(tick);
      else node.data = text;
    };
    const timer = window.setTimeout(() => (frame = requestAnimationFrame(tick)), delayMs);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
      node.data = text;
    };
  }, [text, delayMs]);
  return ref;
}

// Live Dubai time (GST, UTC+4). Rendered only after mount so server and client HTML match.
export function useDubaiTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Dubai" });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = window.setInterval(update, 30_000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

const REVEAL = ".rv, .hw, .grow, .cmt, .stagger, .sec-head, .xp, .proj";

// Adds .is-in to elements as they scroll into view (CSS does the animation).
// Re-runs on every route change because <main> remounts.
export function useReveal(key: string) {
  useEffect(() => {
    (window as unknown as { __reveal?: boolean }).__reveal = true;
    const els = Array.from(document.querySelectorAll<HTMLElement>(REVEAL));
    els.forEach((el) => {
      if (el.classList.contains("stagger")) {
        Array.from(el.children).forEach((c, i) => (c as HTMLElement).style.setProperty("--i", String(Math.min(i, 12))));
      }
    });
    if (!("IntersectionObserver" in window) || reducedMotion()) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    // Clipped (.hw) and zero-width (.cmt) elements have no visible area in their hidden
    // state, so watch their parent and reveal them when it comes into view.
    const watched = new Map<Element, HTMLElement[]>();
    els.forEach((el) => {
      if (el.classList.contains("is-in")) return;
      const proxy = el.matches(".hw, .cmt") && el.parentElement ? el.parentElement : el;
      watched.set(proxy, [...(watched.get(proxy) ?? []), el]);
    });
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          watched.get(e.target)?.forEach((el) => el.classList.add("is-in"));
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 },
    );
    watched.forEach((_, proxy) => io.observe(proxy));
    return () => io.disconnect();
  }, [key]);
}
