import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server.js'
import { createServer } from 'vite'

const dist = path.resolve('dist')
const base = `/${(process.env.SITE_BASE_PATH || '').replace(/^\/+|\/+$/g, '')}${process.env.SITE_BASE_PATH ? '/' : ''}`
const origin = (process.env.SITE_ORIGIN || 'https://dev-flow-digital.lovable.app').replace(/\/$/, '')
const projectRows = JSON.parse(await readFile(path.resolve('src/projects.json'), 'utf8'))
const routes = [
  { path: '/', title: 'DevFlow Digital | Sites, CRM e agentes de IA', description: 'Sites personalizados, organização de clientes e vendas e agentes de inteligência artificial para empresas.' },
  { path: '/projetos', title: 'Demonstrações de projetos | DevFlow Digital', description: 'Explore demonstrações interativas de sites e sistemas para beleza, pet shop, logística e alimentação.' },
  { path: '/servicos', title: 'Sites, CRM e agentes de IA | DevFlow Digital', description: 'Soluções digitais para apresentar seu negócio, organizar vendas e automatizar tarefas de atendimento.' },
  { path: '/servicos/sites', title: 'Desenvolvimento de sites para empresas | DevFlow Digital', description: 'Sites personalizados para apresentar serviços, produtos, cardápios e facilitar pedidos de orçamento e contato.' },
  { path: '/servicos/crm', title: 'CRM para clientes, produtos e vendas | DevFlow Digital', description: 'Organize contatos, acompanhe negociações e consulte vendas por dia, produto, quantidade e forma de pagamento.' },
  { path: '/servicos/ia', title: 'Agentes de inteligência artificial | DevFlow Digital', description: 'Automatize respostas e tarefas repetitivas com agentes de IA planejados para o processo da sua empresa.' },
  { path: '/segmentos/restaurantes', title: 'Soluções digitais para restaurantes | DevFlow Digital', description: 'Cardápio digital, pedidos organizados e acompanhamento de vendas para pizzarias, lanchonetes e restaurantes.' },
  { path: '/segmentos/distribuidoras', title: 'Soluções para distribuidoras e atacadistas | DevFlow Digital', description: 'Catálogo B2B, pedidos de cotação e acompanhamento comercial para distribuidoras e atacadistas.' },
  { path: '/segmentos/lojas', title: 'Soluções digitais para lojas e comércio | DevFlow Digital', description: 'Vitrine digital, catálogo de produtos e organização de contatos e vendas para lojas e comércio local.' },
  { path: '/segmentos/servicos', title: 'Sites e sistemas para prestadores de serviços | DevFlow Digital', description: 'Apresente serviços, receba pedidos de orçamento e acompanhe propostas, agendamentos e retornos.' },
  { path: '/segmentos/crescimento', title: 'Soluções digitais para empresas em crescimento | DevFlow Digital', description: 'Organize contatos, responsabilidades, vendas e tarefas quando sua empresa e sua equipe crescem.' },
  { path: '/sobre', title: 'Sobre a DevFlow Digital | Tecnologia para empresas', description: 'Conheça o trabalho da DevFlow Digital com sites, sistemas de gestão de vendas e automação com inteligência artificial.' },
  { path: '/contato', title: 'Contato e orçamento | DevFlow Digital', description: 'Conte o que sua empresa precisa e converse com a DevFlow Digital pelo WhatsApp.' },
  { path: '/privacidade', title: 'Privacidade e uso de dados | DevFlow Digital', description: 'Entenda quais dados o formulário da DevFlow solicita e como o contato é encaminhado ao WhatsApp.' },
]
for (const project of projectRows) {
  routes.push({
    path: `/projetos/${project.slug}`,
    title: `${project.name} · demonstração | DevFlow Digital`,
    description: project.description,
  })
}

const template = await readFile(path.join(dist, 'index.html'), 'utf8')
const vite = await createServer({
  configFile: path.resolve('vite.config.js'),
  base,
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
})
const { default: App } = await vite.ssrLoadModule('/src/App.jsx')
const esc = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')
const pageFor = ({ path: routePath, title, description }) => {
  const routeUrl = `${origin}${base}${routePath.replace(/^\//, '')}`.replace(/\/$/, '') || `${origin}${base}`
  const canonical = routePath === '/' ? `${origin}${base}` : `${routeUrl}/`
  let html = template
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
  html = html.replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${esc(description)}" />`)
  html = html.replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${esc(title)}" />`)
  html = html.replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${esc(description)}" />`)
  html = html.replace(/<meta property="og:image" content="[^"]*" \/>/, `<meta property="og:image" content="${origin}${base}logo-dfd.png" />`)
  html = html.replace('</head>', `  <link rel="canonical" href="${canonical}" />\n  <meta property="og:url" content="${canonical}" />\n  <meta property="og:locale" content="pt_BR" />\n  <meta name="twitter:card" content="summary" />\n  <meta name="twitter:title" content="${esc(title)}" />\n  <meta name="twitter:description" content="${esc(description)}" />\n  <meta name="twitter:image" content="${origin}${base}logo-dfd.png" />\n  </head>`)
  const internalPath = `${base}${routePath.replace(/^\//, '')}`
  const location = routePath === '/' ? base : internalPath
  const body = renderToString(React.createElement(StaticRouter, { basename: base, location }, React.createElement(App)))
  html = html.replace('<div id="root"></div>', `<div id="root">${body}</div>`)
  return html
}

for (const route of routes) {
  const relativePath = route.path === '/' ? '' : route.path.replace(/^\//, '')
  const target = path.join(dist, relativePath, 'index.html')
  await mkdir(path.dirname(target), { recursive: true })
  await writeFile(target, pageFor(route))
}

const sitemap = routes.map(route => {
  const loc = route.path === '/' ? `${origin}${base}` : `${origin}${base}${route.path.replace(/^\//, '')}/`
  return `  <url><loc>${loc}</loc></url>`
}).join('\n')
await writeFile(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemap}\n</urlset>\n`)
await writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${origin}${base}sitemap.xml\n`)
await vite.close()
