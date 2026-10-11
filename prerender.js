import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const toAbsolute = (p) => path.resolve(__dirname, p)
const SITE_URL = 'https://reejangopan.me'

const template = fs.readFileSync(toAbsolute('dist/index.html'), 'utf-8')
const { render, head, routes } = await import('./dist/server/entry-server.js')

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
const priority = (r) => (r === '/' ? '1.0' : r === '/projects' || r.startsWith('/projects/') ? '0.8' : '0.7')
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
