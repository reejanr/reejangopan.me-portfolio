import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const toAbsolute = (p) => path.resolve(__dirname, p)

const template = fs.readFileSync(toAbsolute('dist/index.html'), 'utf-8')
const { render } = await import('./dist/server/entry-server.js')

// Define routes matching App.tsx
const routesToPrerender = [
  '/',
  // Add new routes here as they are added to App.tsx
]

;(async () => {
  for (const routeUrl of routesToPrerender) {
    const appHtml = render(routeUrl);
    const html = template.replace(`<!--app-html-->`, appHtml)

    // Determine file path
    const filePath = routeUrl === '/' 
      ? 'dist/index.html' 
      : `dist${routeUrl}.html`
    
    const absolutePath = toAbsolute(filePath)
    
    // Ensure directory exists
    const dir = path.dirname(absolutePath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    
    fs.writeFileSync(absolutePath, html)
    console.log('pre-rendered:', filePath)
  }
})()
