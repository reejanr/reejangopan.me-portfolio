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

## AI chat assistant

The "Ask AI about Reejan" widget calls `api/chat.ts`, a Vercel Function that answers from the
site's own `llms-full.txt` (generated from `src/data/site.ts`) using Claude.

Setup:

1. Create an API key at https://console.anthropic.com and set a monthly **spend limit** there.
2. In Vercel → Project → Settings → Environment Variables, add `ANTHROPIC_API_KEY`, then redeploy.
3. Local development: copy `.env.example` to `.env`, add the key, and run `npm run dev`
   (the dev server serves `/api/chat` the same way Vercel does).

Without a key the widget stays visible and tells visitors the assistant is offline, with an email link.
Built-in guards: same-site origin check, 600-character questions, last 12 messages only,
per-visitor rate limits (8/minute, 60/day per server instance) and a 1,024-token answer cap.
