# reejangopan.me

Portfolio of Reejan R Gopan — Software & Systems Engineer, Dubai.

React + TypeScript + Vite, prerendered to static HTML for every route.

## Editing content

All text, projects, experience, skills and certifications live in **`src/data/site.ts`**.
Page titles, descriptions and structured data (JSON-LD) are generated from it in `src/seo/seo.ts`.

Adding a project: add an entry to `projects` in `src/data/site.ts` — it automatically gets its own
page at `/projects/<slug>`, appears in the project list, footer, sitemap and structured data.

## Commands

```sh
npm install
npm run dev      # local development
npm run build    # client + server bundles, then prerender every route and write sitemap.xml
npm run preview  # serve the production build
```

## SEO

- Every route is prerendered to static HTML (`/route.html` and `/route/index.html`) with its own
  `<title>`, meta description, canonical URL, Open Graph/Twitter tags and JSON-LD
  (`Person`, `WebSite`, `ProfilePage`, `CollectionPage`, `BreadcrumbList`, project pages).
- `sitemap.xml` is generated at build time from the same route list; `robots.txt` points to it.
- `404.html` is rendered with `noindex`.
- `public/llms.txt` is a plain-text profile for AI crawlers.

## Chat assistant ("Ask AI about Reejan")

Works **free, with no API key**. Answers come from a knowledge base that runs in the visitor's browser:

- `src/chat/engine.ts` builds a search index (BM25 with synonyms, typo tolerance and light stemming) from
  everything in `src/data/site.ts` — profile, projects, experience, services, skills, FAQs — plus
  `src/chat/techKnowledge.ts`, a bank of ~100 short explanations of the technologies Reejan uses
  (each with a "how Reejan uses it" line backed by his CV).
- The chat panel and knowledge base load only when someone opens the chat (code-split, ~16 KB gzipped).
- Adding knowledge: add an entry to `techKnowledge.ts`, or edit `site.ts` — new projects, services and
  skills become answerable automatically. Re-check with `npx tsx scripts/chat-eval.mts`.

**Optional AI upgrade.** Questions the knowledge base can't answer confidently go to `api/chat.ts`
(Claude, via a Vercel Function) — but only when `ANTHROPIC_API_KEY` is set. Without a key the bot simply
stays in free mode and suggests related questions instead.

To enable it: create a key at https://console.anthropic.com (set a monthly spend limit there), add
`ANTHROPIC_API_KEY` in Vercel → Settings → Environment Variables, and redeploy. For local development,
copy `.env.example` to `.env` and run `npm run dev`. Built-in guards: same-site origin check,
600-character questions, last 12 messages only, per-visitor rate limits and a 1,024-token answer cap.
