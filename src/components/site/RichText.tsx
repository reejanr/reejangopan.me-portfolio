import { Fragment, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { SITE_URL } from "@/data/site";

// Renders the knowledge-base text format as semantic HTML:
// "• item" → <ul>, "1. step" → <ol>, **bold**, `code`, and URLs as links
// (links to this site become client-side <Link>s for internal linking).

function inline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`|https?:\/\/[^\s)]+)/g).map((part, i) => {
    if (/^\*\*[^*]+\*\*$/.test(part)) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (/^`[^`]+`$/.test(part)) return <code key={i}>{part.slice(1, -1)}</code>;
    if (/^https?:\/\//.test(part)) {
      const clean = part.replace(/[.,;:]+$/, "");
      const tail = part.slice(clean.length);
      if (clean.startsWith(SITE_URL)) {
        const path = clean.slice(SITE_URL.length) || "/";
        return <Fragment key={i}><Link to={path}>{path === "/" ? "reejangopan.me" : `reejangopan.me${path}`}</Link>{tail}</Fragment>;
      }
      return <Fragment key={i}><a href={clean} target="_blank" rel="noopener noreferrer">{clean.replace(/^https?:\/\//, "")}</a>{tail}</Fragment>;
    }
    return part;
  });
}

export function RichText({ text }: { text: string }) {
  const blocks: ReactNode[] = [];
  let list: { type: "ul" | "ol"; items: string[] } | null = null;
  const flush = () => {
    if (!list) return;
    const items = list.items.map((it, i) => <li key={i}>{inline(it)}</li>);
    blocks.push(list.type === "ul" ? <ul key={blocks.length}>{items}</ul> : <ol key={blocks.length}>{items}</ol>);
    list = null;
  };
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    const bullet = /^•\s+(.*)$/.exec(line);
    const step = /^\d+\.\s+(.*)$/.exec(line);
    if (bullet || step) {
      const type = bullet ? "ul" : "ol";
      if (!list || list.type !== type) {
        flush();
        list = { type, items: [] };
      }
      list.items.push((bullet ?? step)![1]);
      continue;
    }
    flush();
    if (line) blocks.push(<p key={blocks.length}>{inline(line)}</p>);
  }
  flush();
  return <div className="prose">{blocks}</div>;
}
