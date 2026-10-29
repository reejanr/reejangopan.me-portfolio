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

// Scroll-linked elements. Each gets a class that CSS turns into a transform driven by --sx,
// the element's progress through the viewport (0 = just entering, 1 = just left). The
// individual `translate` / `scale` properties are used so they never fight the reveal transforms.
const SCRUB: Record<string, string> = {
  ".hero-grid > div:last-child": "sx-par",
  ".grid-bg": "sx-drift",
  ".proj": "sx-slide",
  ".svc-card": "sx-scale",
  ".sk": "sx-scale",
  ".cta-title": "sx-zoom",
  ".footer-grid": "sx-rise",
  ".ticker": "sx-rise",
  ".lead-box": "sx-scale",
  ".sx-fill": "",
  ".words": "",
};

// Scroll effects for every page:
//  - header hides while reading down and returns on the first scroll up (data-nav on <html>)
//  - elements marked in SCRUB follow their viewport progress (--sx)
//  - the technology marquees speed up with scroll velocity
export function useScrollFx(key: string) {
  useEffect(() => {
    if (reducedMotion()) return;
    const root = document.documentElement;
    const scrub = new Set<HTMLElement>();
    for (const [sel, cls] of Object.entries(SCRUB)) {
      document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
        if (cls) el.classList.add("sx", cls);
        else el.classList.add("sx");
        scrub.add(el);
      });
    }
    const visible = new Set<HTMLElement>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const el = e.target as HTMLElement;
          if (e.isIntersecting) visible.add(el);
          else visible.delete(el);
        }
        schedule();
      },
      { rootMargin: "10% 0px 10% 0px" },
    );
    scrub.forEach((el) => io.observe(el));

    let frame = 0;
    let lastY = window.scrollY;
    let velocity = 0; // px per frame, smoothed
    let rate = 1;
    let tracks: Animation[] = [];
    const findTracks = () => {
      tracks = Array.from(document.querySelectorAll<HTMLElement>(".track.run"))
        .map((t) => t.getAnimations()[0])
        .filter(Boolean);
    };
    findTracks();

    const tick = () => {
      frame = 0;
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;
      velocity += (dy - velocity) * 0.18;
      root.style.setProperty("--skew", Math.max(-7, Math.min(7, velocity * 0.3)).toFixed(2));

      // header: hide when scrolling down past the first screenful, show on any upward scroll
      const menuOpen = root.classList.contains("menu-open");
      root.dataset.scrolled = y > 24 ? "true" : "false";
      if (menuOpen || y < 120 || dy < -2) root.dataset.nav = "shown";
      else if (dy > 2) root.dataset.nav = "hidden";

      // scrubbed elements
      const vh = window.innerHeight;
      visible.forEach((el) => {
        const r = el.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
        el.style.setProperty("--sx", p.toFixed(4));
      });

      // marquee speed follows scroll velocity, easing back to normal
      const target = 1 + Math.min(Math.abs(velocity) * 0.35, 7);
      rate += (target - rate) * 0.12;
      if (tracks.some((a) => a.playState === "idle")) findTracks();
      tracks.forEach((a) => (a.playbackRate = rate));

      if (Math.abs(velocity) > 0.05 || Math.abs(rate - 1) > 0.02) schedule();
    };
    function schedule() {
      if (!frame) frame = requestAnimationFrame(tick);
    }
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
      io.disconnect();
      tracks.forEach((a) => (a.playbackRate = 1));
      root.dataset.nav = "shown";
      root.style.removeProperty("--skew");
    };
  }, [key]);
}

// Text motion for scroll:
//  - body copy lower on the page lights up word by word as it moves up the screen
//    (text nodes are split into .w spans; --wi / --wn feed the CSS, --sx comes from useScrollFx)
//  - headings, project names, labels and numbers decode from random glyphs when first seen
// Call this before useScrollFx so the new .words elements get scroll progress too.
const WORDS = ".lead, .cta-title";
const DECODE = ".proj-t, .svc-card-t, .sk-t, .fh, .xp-date, .proj-n";

export function useTextFx(key: string) {
  useEffect(() => {
    if (reducedMotion()) return;
    const undo: Array<() => void> = [];
    const vh = window.innerHeight;

    document.querySelectorAll<HTMLElement>(WORDS).forEach((el) => {
      if (el.classList.contains("sx-fill") || el.classList.contains("in") || el.dataset.words) return;
      if (el.getBoundingClientRect().top < vh * 0.7) return; // already on screen: keep it readable
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      const nodes: Text[] = [];
      while (walker.nextNode()) nodes.push(walker.currentNode as Text);
      const originals = nodes.map((n) => ({ n, data: n.data }));
      let count = 0;
      const replaced: Array<{ frag: Node[]; node: Text }> = [];
      for (const node of nodes) {
        const pieces: Node[] = [];
        for (const part of node.data.split(/(\s+)/)) {
          if (!part) continue;
          if (/^\s+$/.test(part)) pieces.push(document.createTextNode(part));
          else {
            const s = document.createElement("span");
            s.className = "w";
            s.style.setProperty("--wi", String(count++));
            s.textContent = part;
            pieces.push(s);
          }
        }
        node.replaceWith(...pieces);
        replaced.push({ frag: pieces, node });
      }
      el.style.setProperty("--wn", String(Math.max(count, 1)));
      el.classList.add("words");
      el.dataset.words = "1";
      undo.push(() => {
        replaced.forEach(({ frag, node }, i) => {
          if (!frag[0]?.parentNode) return;
          frag[0].parentNode.insertBefore(node, frag[0]);
          node.data = originals[i].data;
          frag.forEach((f) => f.parentNode?.removeChild(f));
        });
        el.classList.remove("words");
        delete el.dataset.words;
      });
    });

    // Decode: mutate the existing text node only (never replace it), like useScramble.
    const frames = new Set<number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          io.unobserve(e.target);
          const el = e.target as HTMLElement;
          const node = el.firstChild;
          if (!(node instanceof Text) || el.childNodes.length !== 1) continue;
          const text = node.data;
          const start = performance.now();
          const dur = Math.min(900, 300 + text.length * 22);
          const step = (t: number) => {
            const p = Math.min(1, (t - start) / dur);
            const settled = Math.floor(p * text.length);
            node.data = p >= 1 ? text : text.split("").map((ch, i) => (i < settled || /\s/.test(ch) ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0])).join("");
            if (p < 1) frames.add(requestAnimationFrame(step));
          };
          frames.add(requestAnimationFrame(step));
          undo.push(() => { node.data = text; });
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.2 },
    );
    document.querySelectorAll<HTMLElement>(DECODE).forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
      frames.forEach((f) => cancelAnimationFrame(f));
      undo.forEach((fn) => fn());
    };
  }, [key]);
}
