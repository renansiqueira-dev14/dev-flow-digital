import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const base = '/dev-flow-digital/'
const root = path.resolve('dist')
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.xml': 'application/xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8' }
const server = createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname)
    if (!pathname.startsWith(base)) { res.writeHead(404).end(); return }
    let relative = pathname.slice(base.length)
    let file = path.resolve(root, relative || 'index.html')
    if (!file.startsWith(`${root}${path.sep}`) && file !== path.join(root, 'index.html')) { res.writeHead(403).end(); return }
    let info = await stat(file)
    if (info.isDirectory()) { file = path.join(file, 'index.html'); info = await stat(file) }
    if (!info.isFile()) { res.writeHead(404).end(); return }
    res.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream' })
    res.end(req.method === 'HEAD' ? undefined : await readFile(file))
  } catch {
    res.writeHead(404).end()
  }
})

await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
try {
  const address = server.address()
  const host = `http://127.0.0.1:${address.port}`
  const sitemap = await readFile(path.join(root, 'sitemap.xml'), 'utf8')
  const entryHtml = await readFile(path.join(root, 'index.html'), 'utf8')
  const appScript = entryHtml.match(/<script type="module" crossorigin src="([^"]+)"/)?.[1]
  if (!appScript) throw new Error('Bundle principal não foi encontrado no HTML de produção')
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => new URL(match[1]).pathname)
  const titles = new Set()
  for (const url of urls) {
    const response = await fetch(`${host}${url}`)
    const html = await response.text()
    const title = html.match(/<title>(.*?)<\/title>/)?.[1]
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1]
    if (response.status !== 200) throw new Error(`HTTP ${response.status} em ${url}`)
    if (!title || titles.has(title)) throw new Error(`Título ausente ou duplicado em ${url}: ${title}`)
    if (canonical !== `https://renansiqueira-dev14.github.io${url}`) throw new Error(`Canonical incorreta em ${url}: ${canonical}`)
    if (!html.includes('<div id="root"><header')) throw new Error(`Conteúdo React não pré-renderizado em ${url}`)
    titles.add(title)
  }
  for (const file of ['robots.txt', 'sitemap.xml', appScript.slice(base.length), 'logo-dfd.png', 'project-demos/petshop/assets/banho.jpg']) {
    const url = `${host}${base}${file}`
    const response = await fetch(url)
    if (response.status !== 200) throw new Error(`Recurso sem HTTP 200: ${file} (${response.status})`)
  }
  const missing = await fetch(`${host}${base}rota-inexistente/`)
  if (missing.status !== 404) throw new Error(`Rota inexistente retornou ${missing.status}, esperado 404`)
  console.log(`OK: ${urls.length} rotas diretas com conteúdo, título e canonical únicos; robots, sitemap e recursos; rota inexistente = 404.`)
} finally {
  await new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve()))
}
