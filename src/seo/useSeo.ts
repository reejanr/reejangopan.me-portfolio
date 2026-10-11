import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getHead, headToHtml } from "./seo";

// Keeps <head> in sync on client-side navigation. The prerendered HTML already
// ships the right tags for the first page load.
export function useSeo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const head = document.head;
    head.querySelectorAll("[data-seo]").forEach((el) => el.remove());
    const tpl = document.createElement("template");
    tpl.innerHTML = headToHtml(getHead(pathname));
    head.append(...Array.from(tpl.content.children));
  }, [pathname]);
}
