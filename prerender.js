import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const toAbsolute = (p) => path.resolve(__dirname, p)
const SITE_URL = 'https://reejangopan.me'

// Preload the fonts used above the fold (heading, body, and the mono labels/tags) so the
// first paint uses the right typefaces: no late swap that re-wraps text and shifts the layout.
const assets = fs.readdirSync(toAbsolute('dist/assets'))
const preloads = [/^bricolage-grotesque-latin-wght-normal-.*\.woff2$/, /^geist-sans-latin-400-normal-.*\.woff2$/, /^jetbrains-mono-latin-400-normal-.*\.woff2$/]
  .map((re) => assets.find((f) => re.test(f)))
  .filter(Boolean)
  .map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin />`)
  .join('\n    ')

// Inline the stylesheet so the first paint isn't blocked by a separate CSS request.
const inlineCss = (html) =>
  html.replace(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/, (_, href) =>
    `<style>${fs.readFileSync(toAbsolute('dist' + href), 'utf-8')}</style>`)

const template = inlineCss(fs.readFileSync(toAbsolute('dist/index.html'), 'utf-8'))
  .replace('<!--app-head-->', `${preloads}\n    <!--app-head-->`)
const { render, head, routes, llmsTxt, llmsFullTxt } = await import('./dist/server/entry-server.js')

const write = (file, html) => {
  const abs = toAbsolute(file)
  fs.mkdirSync(path.dirname(abs), { recursive: true })
  fs.writeFileSync(abs, html)
  console.log('pre-rendered:', file)
}

const page = (route) =>
  template.replace('<!--app-head-->', head(route)).replace('<!--app-html-->', render(route))

// Each route is written as both /route.html and /route/index.html so the clean
// URL resolves on any static host (with or without "pretty URL" support).
for (const route of routes) {
  const html = page(route)
  if (route === '/') {
    write('dist/index.html', html)
  } else {
    write(`dist${route}.html`, html)
    write(`dist${route}/index.html`, html)
  }
}

// 404 page (served by most static hosts for unknown paths), marked noindex.
write('dist/404.html', page('/404'))

// sitemap.xml generated from the same route list, so it never goes stale.
const today = new Date().toISOString().slice(0, 10)
const priority = (r) =>
  r === '/' ? '1.0'
  : r === '/services' || r.startsWith('/services/') ? '0.9'
  : r === '/projects' || r.startsWith('/projects/') || r === '/about' || r === '/contact' ? '0.8'
  : r.startsWith('/guides/') ? '0.6'
  : '0.7'
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${SITE_URL}${r === '/' ? '/' : r}</loc>
    <lastmod>${today}</lastmod>
    <priority>${priority(r)}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`
fs.writeFileSync(toAbsolute('dist/sitemap.xml'), sitemap)
console.log(`sitemap.xml: ${routes.length} urls`)

// Plain-text profiles for AI assistants and AI search, generated from the same content.
fs.writeFileSync(toAbsolute('dist/llms.txt'), llmsTxt())
fs.writeFileSync(toAbsolute('dist/llms-full.txt'), llmsFullTxt())
console.log('llms.txt + llms-full.txt written')
