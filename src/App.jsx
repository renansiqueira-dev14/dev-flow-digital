import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation, useParams } from 'react-router-dom'
import {
  ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Bell, Bot, Boxes, BriefcaseBusiness,
  Building2, Check, ChevronDown, ContactRound, Instagram, LayoutDashboard, Menu,
  MessageCircle, Monitor, Send, Store, TrendingUp, Utensils, X,
} from 'lucide-react'
import { differentiators, processSteps, projectSlots, segments, services, serviceDetails, segmentDetails, studio } from './content'

const nav = [['Início', '/'], ['Projetos', '/projetos'], ['Serviços', '/servicos'], ['Sobre', '/sobre'], ['Contato', '/contato']]
const planetServices = services.filter(service => ['sites', 'clientes', 'ia'].includes(service.id))
const planetIcons = { sites: Monitor, clientes: ContactRound, ia: Bot }
const segmentIcons = { restaurantes: Utensils, distribuidoras: Boxes, lojas: Store, servicos: BriefcaseBusiness, crescimento: TrendingUp }
const formatCurrency = value => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
const whatsappHref = message => `https://wa.me/${studio.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ''}`
const publicUrl = path => path?.startsWith('/') ? `${import.meta.env.BASE_URL}${path.slice(1)}` : path
const projectsUrl = `${import.meta.env.BASE_URL}projects.json`
const withPublicUrls = project => ({ ...project, image: publicUrl(project.image), demoUrl: publicUrl(project.demoUrl) })

function usePortfolioProjects() {
  const [projects, setProjects] = useState([])
  useEffect(() => {
    const controller = new AbortController()
    fetch(projectsUrl, { signal: controller.signal, cache: 'no-store' })
      .then(response => response.ok ? response.json() : [])
      .then(data => setProjects(Array.isArray(data) ? data.filter(item => item?.name && item?.segment).map(withPublicUrls) : []))
      .catch(() => setProjects([]))
    return () => controller.abort()
  }, [])
  return projects
}

function Brand({ footer = false }) {
  return <Link className={`brand ${footer ? 'brand-footer' : ''}`} to="/" aria-label="DevFlow Digital, início">
    <img className="brand-logo" src={publicUrl('/logo-dfd.png')} alt="" />
    <span className="brand-name">devflow<span>digital</span></span>
  </Link>
}

function Header() {
  const [open, setOpen] = useState(false)
  return <header className="header"><div className="container header-inner"><Brand />
    <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} aria-controls="primary-nav">{open ? <X /> : <Menu />}</button>
    <nav id="primary-nav" className={open ? 'nav nav-open' : 'nav'} aria-label="Navegação principal">
      {nav.map(([label, href]) => <NavLink key={href} to={href} end={href === '/'} onClick={() => setOpen(false)} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>{label}</NavLink>)}
      <Link className="button button-small nav-cta" to="/contato" onClick={() => setOpen(false)}>Fale com a gente <ArrowUpRight size={15} /></Link>
    </nav>
  </div></header>
}

function Footer() {
  return <footer className="footer"><div className="container">
    <div className="footer-top"><div><Brand footer /><p className="footer-desc">Sites, gestão de clientes e inteligência artificial para negócios reais.</p></div>
      <div className="footer-links"><span className="eyebrow">NAVEGUE</span>{nav.slice(1).map(([label, href]) => <Link key={href} to={href}>{label}</Link>)}</div>
      <div className="footer-links"><span className="eyebrow">CONTATO</span>
        {studio.whatsapp ? <a href={`https://wa.me/${studio.whatsapp}`} target="_blank" rel="noreferrer">WhatsApp · {studio.phone} <ArrowUpRight size={13} /></a> : <span className="footer-pending">WhatsApp a informar</span>}
        {studio.email ? <a href={`mailto:${studio.email}`}>{studio.email} <ArrowUpRight size={13} /></a> : <span className="footer-pending">E-mail comercial a informar</span>}
        {studio.instagram && <a href={studio.instagram} target="_blank" rel="noreferrer">Instagram · @devflowdigital.com.br <ArrowUpRight size={13} /></a>}
      </div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} DevFlow Digital. Todos os direitos reservados.</span><span>Feito para evoluir.</span></div>
  </div></footer>
}

function SectionHeading({ eyebrow, title, text, link, to }) {
  return <div className="section-heading"><div><span className="eyebrow"><i />{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>{link && <Link className="text-link" to={to}>{link}<ArrowRight size={16} /></Link>}</div>
}

function BusinessSitePreview({ kind, business, onAction, cartCount }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const pizza = kind === 'pizzaria'
  const scrollToSection = event => {
    event.preventDefault()
    const target = document.querySelector(event.currentTarget.getAttribute('href'))
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMenuOpen(false)
  }
  const nav = [['Início', '#site-home'], [pizza ? 'Cardápio' : 'Serviços', '#site-services'], ['Avaliações', '#site-reviews'], [pizza ? 'Pedidos' : 'Agendamento', '#site-contact']]
  return <div className={`classic-demo-site ${pizza ? 'classic-pizzeria' : 'classic-workshop'}`}>
    <header className="classic-site-header"><a className="classic-site-brand" href="#site-home" onClick={scrollToSection}><span>{business.name.slice(0, 1)}</span>{business.name}</a><nav className={menuOpen ? 'classic-site-nav is-open' : 'classic-site-nav'}>{nav.map(([label, href]) => <a href={href} key={href} onClick={scrollToSection}>{label}</a>)}</nav><div className="classic-site-actions">{pizza && <span className="classic-cart" aria-label={`Itens no pedido: ${cartCount}`}>Sacola {cartCount}</span>}<button type="button" className="classic-menu-toggle" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Fechar' : 'Menu'} <Menu size={13}/></button></div></header>
    <section className="classic-site-hero" id="site-home" style={{ '--site-hero-image': `url(${business.hero})` }}><div><small>{business.eyebrow}</small><h2>{business.headline}</h2><p>{business.intro}</p><button type="button" onClick={() => document.querySelector('#site-services')?.scrollIntoView({ behavior: 'smooth' })}>{pizza ? 'Conhecer o cardápio' : 'Ver serviços'} <ArrowUpRight size={13}/></button></div><span className="classic-hero-caption">{business.heroCaption}</span></section>
    <section className="classic-site-services" id="site-services"><div className="classic-section-intro"><small>{business.sectionEyebrow}</small><h3>{business.sectionTitle}</h3><p>{business.sectionIntro}</p></div><div className="classic-service-grid">{business.items.map(item => <article className="classic-service-card" key={item.title}><img src={item.image} alt={item.alt} loading="lazy"/><div className="classic-service-info"><span>{item.tag}</span><strong>{item.title}</strong><p>{item.description}</p><div><b>{item.price}</b><button type="button" onClick={() => onAction(item)}>{pizza ? 'Adicionar ao pedido' : 'Agendar serviço'} <ArrowUpRight size={12}/></button></div></div></article>)}</div></section>
    <section className="classic-site-reviews" id="site-reviews"><div className="classic-section-intro"><small>EXPERIÊNCIAS · DEMONSTRAÇÃO</small><h3>{business.reviewsTitle}</h3><p>Exemplos visuais de avaliações que podem ser substituídas pelas avaliações reais do negócio.</p></div><div className="classic-review-grid">{business.reviews.map((review, index) => <article key={review}><span>★★★★★</span><p>“{review}”</p><small>CLIENTE {String(index + 1).padStart(2, '0')} · TEXTO ILUSTRATIVO</small></article>)}</div></section>
    <section className="classic-site-contact" id="site-contact"><div className="classic-section-intro"><small>{pizza ? 'DO SEU JEITO' : 'CUIDADO COM O SEU VEÍCULO'}</small><h3>{business.contactTitle}</h3><p>{business.contactIntro}</p></div><div className="classic-contact-grid">{business.contactCards.map(card => <article key={card.title}><img src={card.image} alt={card.alt} loading="lazy"/><div><small>{card.kicker}</small><strong>{card.title}</strong><p>{card.description}</p><button type="button" onClick={() => onAction(card)}>{card.action} <ArrowUpRight size={12}/></button></div></article>)}</div><div className="classic-business-info"><span><small>HORÁRIO</small>{business.hours}</span><span><small>CONTATO</small>{business.contactLabel}</span><button type="button" onClick={() => onAction({ title: pizza ? 'Pedido pelo WhatsApp' : 'Agendamento pelo WhatsApp' })}><ContactRound size={14}/> {pizza ? 'Fazer pedido' : 'Agendar avaliação'}</button></div></section>
    <section className="classic-site-map"><div><small>ONDE ESTAMOS</small><h3>Venha conhecer</h3><p>Endereço e mapa configurados para o negócio real na entrega do projeto.</p><button type="button" onClick={() => onAction({ title: 'Localização' })}>Ver localização <ArrowUpRight size={12}/></button></div><div className="classic-map-art" aria-label="Espaço para o mapa da empresa"><i/><b>{business.name}</b></div></section>
    <footer className="classic-site-footer"><strong>{business.name}</strong><span>Instagram · WhatsApp · Endereço</span><small>© 2026 {business.name} · Conteúdo de demonstração</small></footer><button className="classic-whatsapp-float" type="button" aria-label="Falar pelo WhatsApp" onClick={() => onAction({ title: 'Atendimento pelo WhatsApp' })}>◉</button>
  </div>
}

function DemoCallToAction({ serviceId }) {
  const service = services.find(item => item.id === serviceId)
  if (!service) return null
  return <div className="demo-cta"><div><strong>Quer uma solução assim para sua empresa?</strong><p>Conte como seu negócio funciona e a DevFlow ajuda a pensar no próximo passo.</p></div><a className="button button-small" href={whatsappHref(`Olá! Vi a demonstração de ${service.title} no site da DevFlow e quero conversar sobre uma solução para o meu negócio.`)} target="_blank" rel="noreferrer">Conversar pelo WhatsApp <ArrowUpRight size={15}/></a></div>
}

function SitesDemo() {
  const examples = {
    pizzaria: { kind: 'PIZZARIA', name: 'Casa Brasa', hero: '/demo/pizzaria-hero.jpg', eyebrow: 'PIZZAS ARTESANAIS · FORNO QUENTE', headline: 'Uma boa noite começa com pizza de verdade.', intro: 'Receitas feitas na hora, ingredientes frescos e o sabor certo para dividir com quem você gosta.', heroCaption: 'MASSA ARTESANAL · INGREDIENTES FRESCOS', sectionEyebrow: 'DO FORNO PARA A SUA MESA', sectionTitle: 'Cardápio da Casa', sectionIntro: 'Escolha um sabor, veja os ingredientes e personalize os adicionais do seu pedido.', contactTitle: 'Como você prefere receber?', contactIntro: 'Peça para entrega ou retire quentinha no balcão.', hours: 'Todos os dias · 18h às 23h', contactLabel: 'Pedidos e dúvidas', reviewsTitle: 'Sabor que reúne todo mundo', reviews: ['Massa leve, recheio generoso e chegou quentinha.', 'A combinação de sabores virou a escolha da família.', 'Pedido simples de fazer e pizza muito bem preparada.'], items: [{ title: 'Margherita', tag: 'CLÁSSICA DA CASA', description: 'Muçarela, tomate fresco, manjericão e molho artesanal.', price: 'A partir de R$ 38', image: '/demo/pizza-margherita.jpg', alt: 'Pizza margherita artesanal com manjericão' }, { title: 'Calabresa da Casa', tag: 'A MAIS PEDIDA', description: 'Calabresa, cebola roxa, muçarela e orégano.', price: 'A partir de R$ 42', image: '/demo/pizza-calabresa.jpg', alt: 'Pizza artesanal de calabresa para compartilhar' }, { title: 'Quatro Queijos', tag: 'CREMOSA E DOURADA', description: 'Muçarela, gorgonzola, provolone e parmesão.', price: 'A partir de R$ 46', image: '/demo/pizza-quatro-queijos.jpg', alt: 'Pizza de quatro queijos com manjericão' }], contactCards: [{ title: 'Entrega em casa', kicker: 'PRÁTICO E QUENTINHO', description: 'Monte seu pedido e escolha os sabores e adicionais.', action: 'Montar pedido', image: '/demo/pizza-combo.jpg', alt: 'Pizzas diferentes prontas para compartilhar' }, { title: 'Retirada no balcão', kicker: 'PASSE PARA BUSCAR', description: 'Peça antes e retire no horário combinado.', action: 'Escolher retirada', image: '/demo/pizza-pepperoni.jpg', alt: 'Pizza pepperoni pronta para retirada' }] },
    barbearia: { kind: 'BARBEARIA', name: 'Barbearia Vitrine', liveUrl: 'https://barbearia-vitrine.vercel.app/#home', repoUrl: 'https://github.com/ronaldandrade25/barbearia-vitrine' },
    oficina: { kind: 'OFICINA MECÂNICA', name: 'Oficina Torque', hero: '/demo/oficina-hero.jpg', eyebrow: 'MECÂNICA DE CONFIANÇA · CUIDADO COMPLETO', headline: 'Seu carro em boas mãos. E você por dentro de cada etapa.', intro: 'Avaliação cuidadosa, explicação sem complicação e serviços feitos com atenção ao seu veículo.', heroCaption: 'DIAGNÓSTICO CLARO · SERVIÇO COM CUIDADO', sectionEyebrow: 'MANUTENÇÃO COM TRANSPARÊNCIA', sectionTitle: 'Serviços da Oficina', sectionIntro: 'Entenda o que cada serviço verifica e peça uma avaliação para o seu carro.', contactTitle: 'Agende a avaliação do seu veículo', contactIntro: 'Conte o que percebeu. A equipe avalia e explica as opções antes de iniciar o serviço.', hours: 'Segunda a sábado · 8h às 18h', contactLabel: 'Agendamento e orçamento', reviewsTitle: 'Confiança em cada etapa', reviews: ['Explicaram o diagnóstico e o orçamento antes de começar.', 'Atendimento atencioso e serviço explicado com clareza.', 'Consegui acompanhar o que precisava ser feito no meu carro.'], items: [{ title: 'Revisão preventiva', tag: 'CUIDADO EM DIA', description: 'Verificação de óleo, filtros, correias e itens de segurança.', price: 'Solicite avaliação', image: '/demo/oficina-servicos.jpg', alt: 'Mecânico fazendo troca de óleo no veículo' }, { title: 'Diagnóstico do motor', tag: 'AVALIAÇÃO TÉCNICA', description: 'Análise do motor e identificação de sinais de falha.', price: 'Solicite avaliação', image: '/demo/oficina-diagnostico.jpg', alt: 'Mecânico avaliando o motor de um veículo' }, { title: 'Freios e suspensão', tag: 'SEGURANÇA AO DIRIGIR', description: 'Inspeção dos componentes e orientação sobre os reparos necessários.', price: 'Solicite avaliação', image: '/demo/oficina-freios.jpg', alt: 'Veículo sendo inspecionado em oficina mecânica' }], contactCards: [{ title: 'Avaliação com a equipe', kicker: 'EXPLIQUE O QUE ACONTECEU', description: 'Relate ruídos, alertas no painel ou mudanças ao dirigir.', action: 'Solicitar avaliação', image: '/demo/oficina-equipe.jpg', alt: 'Equipe mecânica em uma oficina automotiva' }, { title: 'Manutenção programada', kicker: 'REVISÃO E PREVENÇÃO', description: 'Agende uma revisão e tire suas dúvidas antes do serviço.', action: 'Agendar revisão', image: '/demo/oficina-suspensao.jpg', alt: 'Peças automotivas em manutenção profissional' }] },
  }
  const [kind, setKind] = useState('pizzaria')
  const [notice, setNotice] = useState('')
  const [cartCount, setCartCount] = useState(0)
  const selected = examples[kind]
  const act = item => {
    if (kind === 'pizzaria' && item.price?.startsWith('A partir')) setCartCount(count => count + 1)
    setNotice(kind === 'pizzaria' ? `${item.title} selecionada. Tamanho, adicionais e atendimento serão configurados para a pizzaria real.` : `${item.title} selecionado. O agendamento será configurado para a oficina real.`)
  }
  return <section className="service-demo sites-demo" id="demonstracao-sites" aria-labelledby="sites-demo-title">
    <div className="service-demo-heading"><div><span className="eyebrow"><i/>DEMONSTRAÇÃO DE SITES</span><h2 id="sites-demo-title">Seu cliente encontra o que precisa sem esperar uma resposta?</h2><p>Veja como um site pode apresentar serviços, produtos, horários e contato para a pessoa decidir o próximo passo. Troque o exemplo entre barbearia, pizzaria e oficina.</p></div><span className="demo-disclaimer"><span/> {selected.liveUrl ? 'SITE RECEBIDO PARA DEMONSTRAÇÃO' : 'EXEMPLO VISUAL · CONTEÚDO FICTÍCIO'}</span></div>
    <div className="demo-picker" role="group" aria-label="Escolha um exemplo de site">{Object.entries(examples).map(([key, item]) => <button type="button" key={key} aria-pressed={kind === key} className={kind === key ? 'selected' : ''} onClick={() => { setKind(key); setNotice(''); setCartCount(0) }}>{item.kind}</button>)}</div>
    <div className="site-demo-window"><div className="demo-browserbar"><span className="browser-dots"><i/><i/><i/></span><span>prévia do site · devflow digital</span><span>ADAPTÁVEL AO CELULAR</span></div>
      {selected.liveUrl ? <div className="site-live-preview"><div className="site-live-toolbar"><span>Prévia do site da barbearia</span><div><a href={selected.repoUrl} target="_blank" rel="noreferrer">Repositório <ArrowUpRight size={12}/></a><a href={selected.liveUrl} target="_blank" rel="noreferrer">Abrir site <ArrowUpRight size={12}/></a></div></div><iframe title="Site de demonstração da Barbearia Vitrine" src={selected.liveUrl} loading="lazy" sandbox="allow-scripts allow-same-origin allow-forms" referrerPolicy="no-referrer" /></div> : <BusinessSitePreview kind={kind} business={selected} onAction={act} cartCount={cartCount} />}
    </div><p className="service-demo-caption" aria-live="polite">{selected.liveUrl ? 'Esta prévia carrega o site público ligado ao repositório recebido; use os atalhos para abrir o projeto ou consultar o código.' : notice || 'Observe como o cliente pode conhecer os serviços, ver fotos e avaliações, encontrar as informações principais e iniciar um pedido ou agendamento. Os dados são fictícios e podem ser personalizados.'}</p><DemoCallToAction serviceId="sites"/>
  </section>
}

function AgentDemo() {
  const questions = [
    {
      question: 'Tenho seguidores, mas poucos pedidos. Como um site pode ajudar?',
      answer: 'Seguidor não significa que a pessoa encontrou o que precisa para comprar. Se ela precisa mandar mensagem só para descobrir serviços, endereço, horário, cardápio ou como pedir orçamento, parte do caminho fica dependendo de você responder.\n\nUm site organiza essas informações e mostra um próximo passo claro: pedir um orçamento, consultar o cardápio, solicitar um horário ou chamar no WhatsApp. Exemplo: alguém vê uma oficina numa publicação, entra no site, confere os serviços e já envia modelo do carro e descrição do problema. A equipe recebe um pedido mais completo e perde menos tempo perguntando o básico. O site facilita a decisão; não promete clientes ou vendas por conta própria.'
    },
    {
      question: 'O WhatsApp sozinho está virando uma fila de perguntas. O que muda?',
      answer: 'O WhatsApp é ótimo para conversar, mas cada conversa exige atenção. Quando chegam várias ao mesmo tempo, uma pergunta sobre preço pode ficar no meio de pedidos, áudios e clientes esperando retorno. E quem chega fora do horário pode desistir antes de receber resposta.\n\nCom um site, a pessoa consulta antes os serviços, horários, localização, fotos, cardápio ou perguntas frequentes. Com um agente configurado, ela também pode receber respostas iniciais e deixar o pedido organizado. A conversa importante continua no WhatsApp ou com sua equipe; essas ferramentas ajudam a não usar o chat para repetir toda informação básica.'
    },
    {
      question: 'Já esqueci de responder orçamento. Como o CRM evita isso?',
      answer: 'O CRM funciona como uma lista organizada de oportunidades, com o próximo passo visível. Em vez de procurar depois no histórico do WhatsApp quem pediu preço, você registra o contato, o serviço desejado, o valor enviado e a situação: novo pedido, orçamento enviado, aguardando resposta, aprovado ou perdido.\n\nExemplo: uma oficina envia três orçamentos. No CRM, a equipe enxerga quais aguardam retorno e pode priorizar uma ligação ou mensagem. O sistema também pode ter lembretes, se isso for incluído no projeto. Assim, o retorno deixa de depender só da memória. A integração que importa mensagens automaticamente do WhatsApp precisa ser planejada e configurada.'
    },
    {
      question: 'O que exatamente o agente de IA faz enquanto estou ocupado?',
      answer: 'Você define o que ele sabe e quais tarefas pode executar. Por exemplo, ele pode responder perguntas frequentes sobre horário, endereço, serviços e políticas; perguntar o tipo de serviço desejado; coletar nome, telefone e detalhes; separar pedido de orçamento de dúvida comum; e encaminhar para a pessoa responsável com um resumo da conversa.\n\nTambém pode receber uma solicitação de horário ou pedido e pedir os dados que faltam. Para consultar agenda, registrar no CRM, confirmar pagamento ou atualizar pedido, precisa de integração com esses sistemas e regras claras. Sem isso, ele coleta e organiza a solicitação para alguém confirmar. Casos fora do padrão e decisões importantes continuam com uma pessoa.'
    },
    {
      question: 'Como isso funcionaria no meu ramo: barbearia, pizzaria ou oficina?',
      answer: 'Barbearia: o site mostra cortes e serviços; o agente pergunta qual serviço e horário a pessoa prefere. Se a agenda estiver conectada, pode consultar horários; sem integração, registra o pedido para a equipe confirmar.\n\nPizzaria: o site apresenta cardápio e opções; o agente coleta tamanho, sabores, endereço ou retirada e forma de pagamento desejada. O pedido só é confirmado automaticamente se o sistema de pedidos e pagamentos estiver conectado.\n\nOficina: o agente coleta modelo e ano do veículo, sintomas, urgência e fotos, se o cliente quiser enviar. A oficina recebe contexto para avaliar; diagnóstico e orçamento continuam sob responsabilidade do profissional. O fluxo é desenhado para cada empresa.'
    },
    {
      question: 'Como acompanho vendas por dia, produto e forma de pagamento?',
      answer: 'O CRM pode mostrar o total vendido em cada dia e abrir esse número por produto: quantas unidades saíram e quanto cada item representou em vendas. Também pode separar recebimentos por Pix, dinheiro, cartão ou outro método registrado pela empresa.\n\nNa prática, você consegue responder perguntas como: “Qual produto teve mais unidades vendidas esta semana?”, “Quanto entrou hoje?” e “Qual forma de pagamento foi mais usada?”. Para entender lucro, além do valor vendido, é preciso registrar custos e despesas; faturamento sozinho não é lucro. A demonstração do CRM neste site mostra como esse painel pode funcionar.'
    },
    {
      question: 'Sou pequeno e faço tudo sozinho. Preciso mesmo disso?',
      answer: 'Você não precisa começar com um sistema grande. Comece pelo problema que mais toma seu tempo ou faz cliente esperar: um site simples com serviços e botão de contato; um CRM enxuto para não esquecer orçamentos; ou um agente que responde as dúvidas repetidas e coleta os dados do pedido.\n\nExemplo: se você perde tempo explicando sempre como funciona seu serviço, organize essa explicação no site. Se o problema é não lembrar quem precisa de retorno, comece pelo acompanhamento de contatos. A solução é dimensionada para sua rotina e pode crescer quando a operação pedir.'
    },
    {
      question: 'Como as três soluções trabalham juntas na prática?',
      answer: 'O site atrai e orienta: mostra o que você oferece e conduz a pessoa para pedir orçamento ou fazer um pedido. O agente de IA atende a primeira etapa: responde dúvidas e coleta os detalhes necessários. O CRM ajuda sua equipe a acompanhar o contato, o orçamento, a venda e o retorno.\n\nExemplo numa distribuidora: o cliente encontra o catálogo no site, pergunta disponibilidade e informa os produtos e quantidades; o agente organiza a solicitação; a equipe confirma estoque e preço; e o CRM registra o contato e acompanha a venda. A integração entre essas etapas é planejada conforme os sistemas e processos existentes.'
    },
  ]
  const [messages, setMessages] = useState([{ from: 'agent', text: 'Olá! Sou o assistente da DevFlow Digital. Escolha a situação que mais parece com a sua e veja como uma solução pode ajudar na prática.' }])
  const endRef = useRef(null)
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }) }, [messages])

  const askQuestion = item => {
    setMessages(previous => [...previous, { from: 'customer', text: item.question }, { from: 'agent', text: item.answer }])
  }

  return <section className="service-demo agent-demo" id="demonstracao-ia" aria-labelledby="agent-demo-title">
    <div className="service-demo-heading"><div><span className="eyebrow"><i/>DEMONSTRAÇÃO DE AGENTE DE IA</span><h2 id="agent-demo-title">Seu atendimento para quando você está ocupado?</h2><p>Escolha uma situação do dia a dia. Veja como um agente pode responder dúvidas comuns, coletar informações e organizar pedidos para sua equipe.</p></div><span className="demo-disclaimer"><span/> ASSISTENTE DEVFLOW · RESPOSTAS GUIADAS</span></div>
    <div className="agent-demo-window"><div className="agent-chat-header"><span className="agent-avatar"><Bot size={18}/></span><div><strong>Assistente da DevFlow</strong><small><i/>Escolha uma situação para começar</small></div><span className="agent-chat-label">AJUDA PARA SEU NEGÓCIO</span></div><div className="agent-chat-messages" role="log" aria-live="polite" aria-label="Conversa com o assistente">{messages.map((message, index) => <div className={`agent-message ${message.from}`} key={`${index}-${message.from}`}><span>{message.from === 'agent' ? 'ASSISTENTE' : 'VOCÊ'}</span><p>{message.text}</p></div>)}<div ref={endRef}/></div><div className="agent-prompt-area"><span>ESCOLHA O QUE MAIS ACONTECE NA SUA EMPRESA</span><div>{questions.map(item => <button type="button" key={item.question} onClick={() => askQuestion(item)}>{item.question}<ArrowUpRight size={12}/></button>)}</div></div></div>
    <p className="service-demo-caption">Estas respostas são exemplos preparados para explicar possibilidades. O agente real é configurado com as informações, regras e integrações do negócio.</p><DemoCallToAction serviceId="ia"/>
  </section>
}

function ServicesPlanet() {
  const [active, setActive] = useState(null)
  const [dragging, setDragging] = useState(false)
  const dragPoint = useRef({ x: 0, y: 0, rotation: 0, tilt: 0 })
  const stopDrag = event => {
    if (!dragging) return
    setDragging(false)
    setActive(null)
    dragPoint.current = { x: 0, y: 0, rotation: 0, tilt: 0 }
    const universe = event.currentTarget.closest('.service-universe')
    universe?.style.setProperty('--drag-rotation', '0deg')
    universe?.style.setProperty('--drag-tilt', '0deg')
    universe?.style.setProperty('--image-rotation', '0deg')
  }
  return <div className={`service-universe ${active ? `service-active-${active}` : ''} ${dragging ? 'is-dragging' : ''}`}>
    <div className="orbit-system"><span className="orbit-track orbit-track-one"/><span className="orbit-track orbit-track-two"/><span className="orbit-track orbit-track-three"/>
      {planetServices.map(service => {
        const Icon = planetIcons[service.id]
        return <Link key={service.id} to={service.detailPath} className={`service-node service-node-${service.id} ${active === service.id ? 'is-active' : ''}`} onMouseEnter={() => setActive(service.id)} onFocus={() => setActive(service.id)} onBlur={() => setActive(null)}>
          <span className={`service-sphere sphere-${service.id}`}><Icon size={22}/></span>
          <span className="node-copy"><small>{service.number} / DEVFLOW</small><strong>{service.short}</strong><span>{service.nodeText}</span></span>
        </Link>
      })}
      <span className="orbit-particle particle-one"/><span className="orbit-particle particle-two"/><span className="orbit-particle particle-three"/><span className="planet-halo"/>
      <div className="planet-body" style={{ translate: '-50% calc(-50% - 8px)' }} role="button" tabIndex="0" aria-label="Planeta DevFlow. Use as setas para girar e inclinar, ou segure e arraste com o mouse."
        onKeyDown={event => {
          if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' ', 'Enter'].includes(event.key)) return
          event.preventDefault()
          const universe = event.currentTarget.closest('.service-universe')
          const currentRotation = Number.parseFloat(universe.style.getPropertyValue('--drag-rotation')) || 0
          const currentTilt = Number.parseFloat(universe.style.getPropertyValue('--drag-tilt')) || 0
          const rotation = event.key === 'ArrowRight' ? 12 : event.key === 'ArrowLeft' ? -12 : event.key === ' ' || event.key === 'Enter' ? 15 : 0
          const tilt = event.key === 'ArrowDown' ? 8 : event.key === 'ArrowUp' ? -8 : 0
          const nextRotation = Math.max(-58, Math.min(58, currentRotation + rotation))
          const nextTilt = Math.max(-32, Math.min(32, currentTilt + tilt))
          universe.style.setProperty('--drag-rotation', `${nextRotation}deg`)
          universe.style.setProperty('--drag-tilt', `${nextTilt}deg`)
          universe.style.setProperty('--image-rotation', `${-nextRotation}deg`)
        }}
        onPointerDown={event => { if (event.button !== 0) return; event.preventDefault(); event.currentTarget.setPointerCapture(event.pointerId); dragPoint.current = { ...dragPoint.current, x: event.clientX, y: event.clientY }; setDragging(true); setActive('planet') }}
        onPointerMove={event => { if (!dragging) return; const dx = event.clientX - dragPoint.current.x; const dy = event.clientY - dragPoint.current.y; dragPoint.current.x = event.clientX; dragPoint.current.y = event.clientY; dragPoint.current.rotation = Math.max(-58, Math.min(58, dragPoint.current.rotation + dx * .85)); dragPoint.current.tilt = Math.max(-32, Math.min(32, dragPoint.current.tilt + dy * .65)); const universe = event.currentTarget.closest('.service-universe'); universe.style.setProperty('--drag-rotation', `${dragPoint.current.rotation}deg`); universe.style.setProperty('--drag-tilt', `${dragPoint.current.tilt}deg`); universe.style.setProperty('--image-rotation', `${-dragPoint.current.rotation}deg`) }}
        onPointerUp={stopDrag} onPointerCancel={stopDrag} onLostPointerCapture={stopDrag}>
        <img src={publicUrl('/logo-dfd.png')} alt="" draggable="false"/><span>DEVFLOW DIGITAL</span>
      </div>
    </div>
    <div className="universe-caption"><span className="status-dot"/>SITES · GESTÃO DE CLIENTES · AGENTES DE IA</div>
  </div>
}

function ProjectCard({ project, index = 0 }) {
  const title = project.name
  const destination = project.slug ? `/projetos/${project.slug}` : project.demoUrl || project.url
  const content = <><div className={`project-art ${project.image ? 'has-image' : ''}`} style={project.image ? { backgroundImage: `linear-gradient(0deg,rgba(17,18,15,.64),rgba(17,18,15,.04)),url("${project.image}")` } : undefined}>
    {!project.image && <span className="art-icon"><LayoutDashboard size={30}/></span>}<span className="art-index">0{index + 1}</span><span className="art-label">{project.segment}</span>
  </div><div className="project-info"><span className="eyebrow">{project.segment}</span><h3>{title}</h3><p>{project.description}</p>{destination && <span className="project-view">Ver demonstração <ArrowUpRight size={14}/></span>}</div></>
  return <article className="project-card">{destination ? <Link to={destination} aria-label={`Abrir demonstração de ${title}`}>{content}</Link> : content}</article>
}

function ProjectPlaceholder({ segment, index }) {
  return <article className="project-card project-placeholder"><div className="project-art placeholder-art"><span className="placeholder-frame"><LayoutDashboard size={24}/><span>IMAGEM DO PROJETO</span></span><span className="art-index">0{index + 1}</span><span className="art-label">{segment}</span></div><div className="project-info"><span className="eyebrow">{segment}</span><h3>Espaço para projeto</h3><p>Adicione aqui a imagem, a descrição e o link de um trabalho real.</p></div></article>
}

function Home() {
  const projects = usePortfolioProjects()
  return <main>
    <section className="hero services-hero"><div className="hero-grid"/><div className="container services-hero-content">
      <div className="services-hero-heading"><span className="eyebrow hero-eyebrow"><i/>DEVFLOW DIGITAL · SOLUÇÕES PARA EMPRESAS</span>
        <h1><span className="hero-heading-line">Seu negócio merece</span>{' '}<span className="hero-heading-line">soluções digitais <em>à altura.</em></span></h1>
        <p>Criamos sites profissionais, sistemas para organizar clientes e vendas, e agentes de inteligência artificial para ajudar sua empresa a crescer e conquistar clientes.</p>
        <div className="hero-actions"><a className="button" href="#servicos">Conheça nossas soluções <ArrowDown size={15}/></a><a className="button button-outline" href="#contato">Fale com a DevFlow <ArrowUpRight size={15}/></a></div>
      </div>
      <ServicesPlanet />
    </div><div className="container hero-bottom"><span>TECNOLOGIA FEITA PARA NEGÓCIOS REAIS</span><span className="hero-scroll">CONHEÇA AS SOLUÇÕES <ArrowDown size={13}/></span></div></section>

    <section className="section services-preview" id="servicos"><div className="container"><SectionHeading eyebrow="O QUE FAZEMOS" title={<>Soluções para o<br/><em>dia a dia da sua empresa.</em></>} text="Tecnologia clara e personalizada, feita para resolver necessidades reais."/>
      <div className="service-grid">{services.map(item => <article className={`service-card ${item.id === 'clientes' ? 'service-card-clients' : ''}`} id={`service-${item.id}`} key={item.id}><div className="service-top"><span>{item.number}</span><span className="service-icon">{item.icon}</span></div><h3>{item.title}</h3><p>{item.text}</p><small className="service-examples">{item.examples}</small><Link className="service-more" to={item.detailPath || `/servicos#${item.id}`}>{item.id === 'clientes' ? 'Ver detalhes' : 'Ver demonstração'} <ArrowRight size={14}/></Link></article>)}</div>
      <div className="home-service-demos"><SitesDemo/><CRMDemo/><AgentDemo/></div>
    </div></section>

    <section className="section segments-section" id="segmentos"><div className="container"><SectionHeading eyebrow="SOLUÇÕES POR SEGMENTO" title={<>Seu negócio tem<br/><em>espaço para crescer.</em></>} text="Exemplos de soluções digitais que podem apoiar diferentes tipos de empresa."/>
      <div className="segments-list">{segments.map((segment, index) => { const Icon = segmentIcons[segment.id]; return <article className="segment-row" key={segment.id}><Link className="segment-row-link" to={`/segmentos/${segment.id}`}><span className="segment-number">0{index + 1}</span><span className="segment-icon"><Icon size={19}/></span><div className="segment-main"><h3>{segment.name}</h3><p>{segment.examples.join(' · ')}</p></div><ArrowUpRight className="segment-arrow" size={17}/></Link></article> })}</div>
    </div></section>

    <section className="section portfolio-preview" id="projetos"><div className="container"><SectionHeading eyebrow="PORTFÓLIO" title={<>Projetos feitos para<br/><em>negócios reais.</em></>} text="A área está preparada para receber trabalhos da DevFlow Digital." link="Ver espaço de projetos" to="/projetos"/>
      {projects.length ? <div className="project-grid">{projects.slice(0, 4).map((project, index) => <ProjectCard key={`${project.name}-${index}`} project={project} index={index}/>)}{projectSlots.slice(projects.slice(0, 4).length).map((segment, index) => <ProjectPlaceholder key={segment} segment={segment} index={projects.slice(0, 4).length + index}/>)}</div> : <div className="portfolio-empty"><span className="empty-mark"><LayoutDashboard size={22}/></span><p><strong>Portfólio em atualização.</strong><br/>Quatro espaços estão preparados para receber projetos. Nenhum cliente ou trabalho fictício foi adicionado.</p><Link to="/projetos" className="text-link">Conheça os espaços reservados <ArrowRight size={15}/></Link></div>}
    </div></section>

    <ContactSection />
  </main>
}

function PageHero({ eyebrow, title, text }) { return <section className="page-hero"><div className="container"><span className="eyebrow"><i/>{eyebrow}</span><h1>{title}</h1>{text && <p>{text}</p>}</div></section> }

function ProjectsPage() {
  const projects = usePortfolioProjects()
  return <main><PageHero eyebrow="PORTFÓLIO" title={<>Projetos para<br/><em>negócios reais.</em></>} text="Explore quatro exemplos interativos de soluções digitais para diferentes tipos de negócio."/>
    <section className="section page-projects"><div className="container">
      {projects.length ? <div className="project-grid">{projects.slice(0, 4).map((project, index) => <ProjectCard key={`${project.name}-${index}`} project={project} index={index}/>)}</div> : <><div className="portfolio-empty"><span className="empty-mark"><LayoutDashboard size={22}/></span><p><strong>Portfólio em atualização.</strong><br/>Os espaços abaixo estão prontos para receber descrições e imagens dos projetos.</p></div><div className="project-grid slot-grid">{projectSlots.map((segment, index) => <ProjectPlaceholder key={segment} segment={segment} index={index}/>)}</div></>}
    </div></section>
  </main>
}

function ProjectDemoPage() {
  const { slug } = useParams()
  const [project, setProject] = useState(null)
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    const controller = new AbortController()
    fetch(projectsUrl, { signal: controller.signal, cache: 'no-store' })
      .then(response => response.ok ? response.json() : [])
      .then(data => {
        const match = Array.isArray(data) ? data.find(item => item.slug === slug) : null
        setProject(match ? withPublicUrls(match) : null)
      })
      .catch(() => setProject(null))
      .finally(() => setLoaded(true))
    return () => controller.abort()
  }, [slug])

  if (!loaded) return <main><PageHero eyebrow="DEMONSTRAÇÃO" title={<>Abrindo o <em>projeto.</em></>} text="Carregando a prévia incorporada."/></main>
  if (!project) return <NotFound />
  return <main><PageHero eyebrow={`${project.segment.toUpperCase()} · DEMONSTRAÇÃO`} title={<>{project.name}</>} text={project.description}/>
    <section className="section project-demo-detail"><div className="container">
      <div className="project-demo-toolbar"><span><i/> PRÉVIA DO SITE DENTRO DO PORTFÓLIO</span><Link className="text-link" to="/projetos"><ArrowLeft size={15}/> Voltar aos projetos</Link></div>
      <div className="project-iframe-shell"><iframe src={project.demoUrl} title={`Demonstração: ${project.name}`} loading="eager" sandbox="allow-scripts allow-forms allow-same-origin" referrerPolicy="no-referrer" allow="fullscreen"/></div>
      <p className="project-demo-note">Esta prévia é incorporada ao portfólio. Formulários, agenda, mensagens e dados que dependem de serviços externos aparecem apenas como demonstração; nenhuma solicitação é enviada.</p>
      <DemoCallToAction serviceId={project.serviceId || 'sites'}/>
    </div></section>
  </main>
}

function ServicesPage() {
  return <main><PageHero eyebrow="SERVIÇOS" title={<>Tecnologia para<br/>o seu <em>negócio.</em></>} text="Sites, gestão de clientes e agentes de inteligência artificial, explicados sem complicação."/>
    <section className="section service-list-section"><div className="container service-list">{services.map(item => <article className={`service-row ${item.id === 'clientes' ? 'service-row-clients' : ''}`} id={item.id} key={item.id}><span className="row-number">{item.number}</span><span className="row-icon">{item.icon}</span><div><h2>{item.title}</h2><p>{item.text}</p><small>{item.examples}</small>{item.detailPath && <Link className="service-more" to={item.detailPath}>{item.id === 'clientes' ? 'Ver detalhes deste serviço' : 'Ver detalhes e demonstração'} <ArrowRight size={14}/></Link>}</div><ArrowUpRight className="row-arrow" size={18}/></article>)}<CRMDemo /></div></section>
    <section className="section process-section"><div className="container"><SectionHeading eyebrow="ETAPAS DO PROJETO" title={<>Sem complicação.<br/><em>Combinado desde o começo.</em></>} text="Um processo transparente ajuda a construir a solução certa."/><ol className="process-grid">{processSteps.map((step, index) => <li className="process-step" key={step.title}><span className="process-number">0{index + 1}</span><span className="process-rule"/><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol><Link className="button" to="/contato">Conte sua ideia <ArrowUpRight size={16}/></Link></div></section>
  </main>
}

function CRMDemo() {
  const [period, setPeriod] = useState('7 dias')
  const reports = {
    Hoje: {
      total: 1860.5, orders: 26, average: 71.56,
      trend: [{ label: 'Hoje', value: 1860.5 }],
      products: [{ name: 'Pão francês', quantity: 180, revenue: 270 }, { name: 'Bolo de rolo', quantity: 12, revenue: 420 }, { name: 'Coxinha', quantity: 30, revenue: 180 }, { name: 'Café', quantity: 48, revenue: 192 }],
      payments: [{ name: 'Pix', count: 14 }, { name: 'Cartão de crédito', count: 8 }, { name: 'Cartão de débito', count: 4 }],
    },
    '7 dias': {
      total: 8742.9, orders: 114, average: 76.69,
      trend: [{ label: 'Seg', value: 880 }, { label: 'Ter', value: 1040 }, { label: 'Qua', value: 930 }, { label: 'Qui', value: 1320 }, { label: 'Sex', value: 1680 }, { label: 'Sáb', value: 1810 }, { label: 'Dom', value: 1082.9 }],
      products: [{ name: 'Pão francês', quantity: 1240, revenue: 1860 }, { name: 'Bolo de rolo', quantity: 36, revenue: 1260 }, { name: 'Coxinha', quantity: 180, revenue: 1080 }, { name: 'Café', quantity: 260, revenue: 1040 }],
      payments: [{ name: 'Pix', count: 61 }, { name: 'Cartão de crédito', count: 34 }, { name: 'Cartão de débito', count: 19 }],
    },
  }
  const report = reports[period]
  const maxTrend = Math.max(...report.trend.map(item => item.value))
  const maxProduct = Math.max(...report.products.map(item => item.revenue))
  const maxPayments = Math.max(...report.payments.map(item => item.count))
  return <section className="crm-demo" id="demonstracao" aria-labelledby="crm-demo-title">
    <div className="crm-demo-head"><div><span className="eyebrow"><i/>DEMONSTRAÇÃO DE CRM · CLIENTES, MENSAGENS E VENDAS</span><h2 id="crm-demo-title">Atenda clientes e acompanhe vendas no mesmo lugar.</h2><p>Alterne o período para ver vendas, produtos, quantidades e pagamentos. Na caixa de entrada abaixo, veja como o CRM pode reunir conversas de WhatsApp, respostas com IA, pedidos e alertas.</p></div><span className="demo-disclaimer"><span/> EXEMPLO DE PADARIA · DADOS FICTÍCIOS</span></div>
    <div className="crm-app-window">
      <div className="crm-app-topbar"><div className="crm-app-brand"><span className="crm-app-mark">D</span><span>DevFlow <small>CRM</small></span></div><div className="crm-app-user"><span>Exemplo de padaria</span><b>PA</b></div></div>
      <div className="crm-app-content">
        <div className="crm-app-title"><div><small>VISÃO GERAL · PADARIA EXEMPLO</small><h3>Resumo de vendas</h3></div><div className="crm-period-switch" role="group" aria-label="Período do relatório">{Object.keys(reports).map(option => <button type="button" key={option} aria-pressed={period === option} className={period === option ? 'selected' : ''} onClick={() => setPeriod(option)}>{option}</button>)}</div></div>
        <div className="crm-kpi-grid"><article><span>Vendido no período</span><strong>{formatCurrency(report.total)}</strong><small>Valor registrado</small></article><article><span>Vendas registradas</span><strong>{report.orders}</strong><small>Pedidos concluídos</small></article><article><span>Valor médio por venda</span><strong>{formatCurrency(report.average)}</strong><small>Total ÷ quantidade de vendas</small></article></div>
        <div className="crm-chart-panel"><div className="crm-panel-heading"><div><span>VENDAS</span><strong>Valor vendido por dia</strong></div><span className="crm-panel-legend"><i/>Total recebido</span></div><div className="crm-bar-chart" role="img" aria-label={`Gráfico ilustrativo de vendas no período de ${period}`}>{report.trend.map(item => <div className="crm-bar-column" key={item.label}><span>{formatCurrency(item.value)}</span><div><i style={{ height: `${Math.max(8, item.value / maxTrend * 100)}%` }}/></div><small>{item.label}</small></div>)}</div></div>
        <div className="crm-report-grid"><section className="crm-chart-panel"><div className="crm-panel-heading"><div><span>PRODUTOS</span><strong>O que mais vendeu</strong></div><small>Quantidade e valor</small></div><div className="crm-product-list">{report.products.map((item, index) => <div className="crm-product-row" key={item.name}><span className="crm-product-rank">0{index + 1}</span><div className="crm-product-detail"><strong>{item.name}</strong><div className="crm-product-track"><i style={{ width: `${item.revenue / maxProduct * 100}%` }}/></div><small>{item.quantity} unidades</small></div><strong className="crm-product-value">{formatCurrency(item.revenue)}</strong></div>)}</div></section>
          <section className="crm-chart-panel"><div className="crm-panel-heading"><div><span>PAGAMENTOS</span><strong>Como os clientes pagaram</strong></div></div><div className="crm-payment-list">{report.payments.map(item => <div className="crm-payment-row" key={item.name}><span>{item.name}</span><strong>{item.count} vendas</strong><div><i style={{ width: `${item.count / maxPayments * 100}%` }}/></div></div>)}</div></section></div>
        <div className="crm-kanban-preview"><div><span className="crm-kanban-dot new"/>Novos contatos <strong>08</strong></div><div><span className="crm-kanban-dot proposal"/>Em negociação <strong>12</strong></div><div><span className="crm-kanban-dot return"/>Para retornar <strong>05</strong></div><small>ETAPAS DO FUNIL · CONTROLE ILUSTRATIVO</small></div>
      </div>
    </div>
    <CRMInboxDemo />
    <p className="crm-demo-caption">Os números, conversas e valores são exemplos fictícios. O CRM da sua empresa pode ser configurado com seus canais, produtos, preços e regras de atendimento.</p><DemoCallToAction serviceId="clientes"/>
  </section>
}

function CRMInboxDemo() {
  const conversations = [
    {
      id: 'encomenda', name: 'Mariana Costa', initials: 'MC', subject: 'Encomenda · bolo de chocolate', time: '10:42', status: 'IA organizou o pedido', amount: 'R$ 320,00', amountLabel: 'Estimativa pela tabela cadastrada',
      messages: [
        { from: 'customer', text: 'Oi! Vocês fazem bolo de chocolate para sábado? É para 20 pessoas.' },
        { from: 'agent', text: 'Fazemos, Mariana! Pela tabela cadastrada, a estimativa para esse tamanho é R$ 320,00. Vou deixar o pedido organizado para a equipe confirmar disponibilidade e horário.' },
      ]
    },
    {
      id: 'orcamento', name: 'Bruno Lima', initials: 'BL', subject: 'Coffee break · 30 pessoas', time: '10:31', status: 'Aguardando confirmação', amount: 'R$ 420,00', amountLabel: 'Pré-orçamento · pacote cadastrado',
      messages: [
        { from: 'customer', text: 'Preciso de um coffee break para 30 pessoas na sexta. Vocês fazem?' },
        { from: 'agent', text: 'Fazemos! Organizei a solicitação e calculei um pré-orçamento de R$ 420,00 com base no pacote cadastrado. Vou encaminhar para a equipe confirmar os detalhes.' },
      ]
    },
    {
      id: 'atendente', name: 'Ana Souza', initials: 'AS', subject: 'Pedido especial · atendente', time: '10:18', status: 'Atendente foi avisado', amount: 'Precisa de avaliação', amountLabel: 'Condição fora das regras cadastradas',
      messages: [
        { from: 'customer', text: 'Quero uma encomenda grande, mas preciso negociar um desconto diferente.' },
        { from: 'agent', text: 'Vou chamar uma pessoa da equipe para avaliar essa condição e continuar o atendimento com você.' },
      ]
    },
  ]
  const [activeId, setActiveId] = useState('encomenda')
  const active = conversations.find(item => item.id === activeId) || conversations[0]

  return <section className="crm-inbox-demo" aria-labelledby="crm-inbox-title">
    <div className="crm-inbox-intro"><span className="eyebrow"><i/>WHATSAPP E AGENTE DE IA DENTRO DO CRM</span><h3 id="crm-inbox-title">Responda por uma caixa de entrada só. Deixe o repetitivo com a IA.</h3><p>A equipe pode ler e responder mensagens de WhatsApp nesta tela, sem sair do CRM. O agente usa as informações e respostas aprovadas pela equipe, organiza pedidos, prepara orçamentos conforme as regras cadastradas e chama uma pessoa quando precisa.</p></div>
    <div className="crm-inbox-window">
      <div className="crm-inbox-topbar"><div><MessageCircle size={16}/><strong>Caixa de entrada</strong><span>· WhatsApp</span></div><span className="crm-inbox-online"><i/>Canal conectado · exemplo</span></div>
      <div className="crm-inbox-layout">
        <div className="crm-thread-list" role="tablist" aria-label="Conversas de demonstração">
          {conversations.map(item => <button type="button" role="tab" aria-selected={activeId === item.id} className={activeId === item.id ? 'selected' : ''} key={item.id} onClick={() => setActiveId(item.id)}><span className="crm-thread-avatar">{item.initials}</span><span className="crm-thread-summary"><strong>{item.name}</strong><small>{item.subject}</small><em>{item.status}</em></span><time>{item.time}</time></button>)}
        </div>
        <div className="crm-conversation-panel" role="tabpanel">
          <div className="crm-conversation-top"><span className="crm-thread-avatar">{active.initials}</span><div><strong>{active.name}</strong><small>{active.subject}</small></div><span className="crm-conversation-channel"><MessageCircle size={13}/> WhatsApp</span></div>
          <div className="crm-conversation-messages">{active.messages.map((message, index) => <div className={`crm-chat-bubble ${message.from}`} key={`${active.id}-${index}`}><small>{message.from === 'agent' ? 'AGENTE DE IA · EXEMPLO' : active.name.toUpperCase()}</small><p>{message.text}</p></div>)}</div>
          <div className="crm-ai-summary"><Bot size={15}/><span><strong>Pedido identificado</strong><small>{active.status}</small></span><div><small>{active.amountLabel}</small><strong>{active.amount}</strong></div></div>
          <div className="crm-reply-preview"><span>Responder a {active.name} pelo CRM…</span><button type="button" aria-label="Prévia ilustrativa do envio pelo CRM"><Send size={14}/></button></div>
        </div>
        <aside className="crm-agent-panel"><div className="crm-agent-panel-title"><span><Bot size={15}/></span><div><strong>Agente DevFlow</strong><small><i/>Apoio no atendimento</small></div></div>
          <div className="crm-agent-feature"><strong>Responde o repetitivo</strong><p>Horários, serviços, produtos e dúvidas comuns, com base nas informações da empresa.</p></div>
          <div className="crm-agent-feature"><strong>Prepara pedidos e orçamentos</strong><p>Coleta detalhes e calcula valores usando as tabelas e regras cadastradas.</p></div>
          <div className="crm-agent-feature"><strong>Usa o padrão da equipe</strong><p>Respostas aprovadas e correções da equipe ajudam o agente a seguir o jeito de atender da empresa.</p></div>
          <div className="crm-agent-feature handoff"><strong>Chama uma pessoa quando precisa</strong><p>Se o pedido sair das regras ou exigir uma decisão, transfere a conversa e sinaliza a equipe.</p></div>
        </aside>
      </div>
      <div className="crm-inbox-alerts"><span><Bell size={14}/>AVISOS PARA A EQUIPE</span><div><strong>Novo pedido</strong><small>Encomenda de bolo · Mariana Costa</small></div><div><strong>Venda registrada · R$ 86,00</strong><small>Pedido pago · padaria exemplo</small></div><div><strong>Orçamento · R$ 420,00</strong><small>Coffee break · aguardando confirmação</small></div><div><strong>Atendente solicitado</strong><small>Ana Souza · condição especial</small></div></div>
    </div>
    <p className="crm-inbox-caption">Prévia ilustrativa: nenhuma mensagem é enviada pelo site. No projeto real, a caixa de entrada e o agente são configurados com os canais, preços, permissões e regras da empresa.</p>
  </section>
}

function SiteImpactEvidence() {
  return <section className="site-impact-section" aria-labelledby="site-impact-title">
    <div className="site-impact-panel">
      <div className="site-impact-intro">
        <span className="eyebrow"><i/>POR QUE VELOCIDADE E EXPERIÊNCIA IMPORTAM</span>
        <h2 id="site-impact-title">Um site bem feito pode transformar mais visitas em pedidos.</h2>
        <p>Quando a página abre rápido no celular e facilita o próximo passo, mais visitantes conseguem chegar ao orçamento, pedido ou contato. Os números abaixo vêm de estudos sobre melhorias concretas de velocidade:</p>
      </div>
      <div className="site-impact-study-context"><strong>Estudo de velocidade · Deloitte Digital e Google</strong><span>37 marcas de varejo, viagens, luxo e geração de contatos, na Europa e nos EUA, acompanhadas por quatro semanas. Os resultados abaixo foram observados após melhorar em 0,1 segundo a velocidade das páginas móveis.</span></div>
      <div className="site-impact-stats">
        <article><strong>+8,4%</strong><span>mais conversões no varejo</span><p>Resultado observado no grupo de marcas de varejo após a melhoria de velocidade móvel.</p></article>
        <article><strong>+10,1%</strong><span>mais conversões em viagens</span><p>Resultado observado no grupo de marcas de viagens após a mesma melhoria de velocidade móvel.</p></article>
        <article><strong>+10%</strong><span>mais formulários de contato</span><small>Paisabazaar · Índia · experimento de anúncios de busca por duas semanas</small><p>A página móvel ficou 60% mais rápida. O aumento foi em pedidos de contato vindos dos anúncios, não em vendas totais.</p></article>
      </div>
      <p className="site-impact-commitment">Um site rápido, claro e fácil de usar ajuda seu cliente a encontrar o que procura e dar o próximo passo: pedir orçamento, consultar um produto ou chamar sua equipe. Na DevFlow, aplicamos esses cuidados ao seu negócio para aproveitar melhor cada visita e abrir mais caminhos para novos clientes.</p>
      <div className="site-impact-sources"><span>Referências de velocidade móvel: Deloitte Digital e Google acompanharam 37 marcas na Europa e nos EUA por quatro semanas; o caso Paisabazaar foi um experimento de anúncios de busca na Índia por duas semanas. São resultados observados nesses cenários e ajudam a mostrar o potencial de uma experiência mais rápida.</span><div><a href="https://www.thinkwithgoogle.com/_qs/documents/9757/Milliseconds_Make_Millions_report_hQYAbZJ.pdf" target="_blank" rel="noreferrer">Relatório de velocidade · Google e Deloitte <ArrowUpRight size={12}/></a><a href="https://www.thinkwithgoogle.com/_qs/documents/7766/Experiment_How_Paisabazaar_increased_leads_by_enhancing_its_mobile_speed.pdf" target="_blank" rel="noreferrer">Experimento Paisabazaar · Google Ads <ArrowUpRight size={12}/></a></div></div>
    </div>
  </section>
}

function ServiceDetailPage({ serviceId }) {
  const service = services.find(item => item.id === serviceId)
  const detail = serviceDetails[serviceId]
  if (!service || !detail) return <NotFound />
  return <main><PageHero eyebrow={detail.eyebrow} title={<>{detail.headline}</>} text={detail.intro}/>
    {serviceId === 'clientes' && <section className="section crm-demo-section"><div className="container"><CRMDemo /></div></section>}
    {serviceId === 'sites' && <section className="section service-demo-section"><div className="container"><SitesDemo /></div></section>}
    {serviceId === 'sites' && <SiteImpactEvidence />}
    {serviceId === 'ia' && <section className="section service-demo-section"><div className="container"><AgentDemo /></div></section>}
    <section className="section detail-section"><div className="container detail-layout">
      <article className="detail-panel detail-panel-main"><span className="eyebrow"><i/>O QUE ESTE SERVIÇO PODE FAZER</span><h2>Recursos pensados para a rotina da sua empresa.</h2><ul className="detail-list">{detail.features.map(item => <li key={item}><Check size={17}/><span>{item}</span></li>)}</ul></article>
      <article className="detail-panel detail-panel-benefits"><span className="eyebrow"><i/>GANHOS NO DIA A DIA</span><h2>Mais organização. Mais tempo para avançar.</h2><ul className="detail-list">{detail.benefits.map(item => <li key={item}><Check size={17}/><span>{item}</span></li>)}</ul><p className="detail-closing">{detail.closing}</p></article>
      <div className="detail-actions"><a className="button" href={whatsappHref(`Olá! Vi a página de ${service.title} da DevFlow e quero conversar sobre esse serviço.`)} target="_blank" rel="noreferrer">Quero conversar sobre {service.short.toLowerCase()} <ArrowUpRight size={16}/></a><Link className="text-link" to="/servicos">Conheça todos os serviços <ArrowRight size={15}/></Link></div>
    </div></section>
  </main>
}

function SegmentDetailPage({ segmentId }) {
  const segment = segments.find(item => item.id === segmentId)
  const detail = segmentDetails[segmentId]
  if (!segment || !detail) return <NotFound />
  const servicePaths = { sites: '/servicos/sites', clientes: '/servicos/crm', ia: '/servicos/ia' }
  const serviceNames = { sites: 'Sites para negócios', clientes: 'CRM e gestão de vendas', ia: 'Agentes de IA' }
  return <main><PageHero eyebrow={detail.eyebrow} title={<>{detail.headline}</>} text={detail.intro}/>
    <section className="section detail-section"><div className="container detail-layout">
      <article className="detail-panel detail-panel-main"><span className="eyebrow"><i/>O QUE PODEMOS MONTAR PARA {segment.name.toUpperCase()}</span><h2>Serviços aplicados à rotina deste negócio.</h2><ul className="detail-list">{detail.features.map(item => <li key={item}><Check size={17}/><span>{item}</span></li>)}</ul></article>
      <article className="detail-panel detail-panel-benefits"><span className="eyebrow"><i/>COMO ISSO AJUDA</span><h2>Mais tempo para atender e fazer o negócio avançar.</h2><ul className="detail-list">{detail.benefits.map(item => <li key={item}><Check size={17}/><span>{item}</span></li>)}</ul></article>
      <section className="segment-examples"><span className="eyebrow"><i/>EXEMPLOS CONCRETOS PARA {segment.name.toUpperCase()}</span><div>{detail.examples.map((example, index) => <article key={example.title}><span>0{index + 1}</span><h3>{example.title}</h3><p>{example.text}</p></article>)}</div></section>
      <section className="segment-workflow"><span className="eyebrow"><i/>UM FLUXO PRÁTICO PARA {segment.name.toUpperCase()}</span><ol>{detail.workflow.map((step, index) => <li key={step}><span>0{index + 1}</span><p>{step}</p></li>)}</ol></section>
      <div className="segment-detail-services"><span className="eyebrow">CONHEÇA AS SOLUÇÕES</span><div>{detail.services.map(serviceId => <Link key={serviceId} to={servicePaths[serviceId]}>{serviceNames[serviceId]} <ArrowUpRight size={14}/></Link>)}</div></div>
      <div className="detail-actions"><a className="button" href={whatsappHref(`Olá! Tenho um negócio do segmento ${segment.name} e vi a página da DevFlow. Quero conversar sobre uma solução para minha empresa.`)} target="_blank" rel="noreferrer">Quero conversar sobre meu negócio <ArrowUpRight size={16}/></a><Link className="text-link" to="/#segmentos">Voltar para os segmentos <ArrowRight size={15}/></Link></div>
    </div></section>
  </main>
}

function AboutPage() {
  return <main><PageHero eyebrow="SOBRE A DEVFLOW" title={<>Tecnologia<br/>com <em>intenção.</em></>} text="Um espaço para apresentar a história, a visão e os valores por trás da DevFlow Digital."/>
    <section className="section about-page"><div className="container about-page-grid"><span className="eyebrow"><i/>SOBRE A EMPRESA</span><div><div className="about-placeholder"><span className="placeholder-icon"><Building2 size={24}/></span><span className="eyebrow">APRESENTAÇÃO DA EMPRESA</span><p>{studio.about}</p></div><p className="about-instruction">Quando você enviar seu texto, este espaço será atualizado com a apresentação da empresa.</p></div></div></section>
    <section className="section why-section"><div className="container"><span className="eyebrow"><i/>NOSSO COMPROMISSO</span><ul className="benefit-list">{differentiators.map((item, index) => <li key={item}><span>0{index + 1}</span><Check size={16}/><p>{item}</p></li>)}</ul></div></section>
  </main>
}

function ContactSection() {
  const [status, setStatus] = useState('')
  function submitMessage(event) {
    event.preventDefault()
    if (!studio.whatsapp) {
      setStatus('O WhatsApp comercial ainda não foi configurado.')
      return
    }
    const form = event.currentTarget
    const fields = new FormData(form)
    const body = `Olá, sou ${fields.get('nome')}, da empresa ${fields.get('empresa')}.\n\nTenho interesse em: ${fields.get('servico')}.\nMeu e-mail: ${fields.get('email') || 'não informado'}.\n\nMinha mensagem: ${fields.get('mensagem')}`
    window.location.href = whatsappHref(body)
    setStatus('Abrindo o WhatsApp com sua mensagem pronta para enviar.')
  }
  return <section className="section contact-page" id="contato"><div className="container contact-grid">
    <div className="contact-copy"><span className="eyebrow"><i/>FALE COM A GENTE</span><h2>Conte o que você precisa. Vamos pensar em como ajudar.</h2><p>Explique o que está acontecendo no seu negócio ou o que gostaria de melhorar. A gente conversa com você e ajuda a encontrar um caminho.</p>
      <div className="contact-social">
        <a className="contact-detail contact-primary" href={`https://wa.me/${studio.whatsapp}`} target="_blank" rel="noreferrer"><span className="contact-social-icon">↗</span><span><small>WHATSAPP · CONTATO PRINCIPAL</small><strong>{studio.phone}</strong><em>Toque para conversar agora <ArrowUpRight size={14}/></em></span></a>
        <div className="contact-detail contact-secondary"><span className="contact-social-icon">@</span><span><small>E-MAIL · CONTATO ALTERNATIVO</small>{studio.email ? <a href={`mailto:${studio.email}`}><strong>{studio.email}</strong></a> : <strong>A informar</strong>}</span></div>
        {studio.instagram && <a href={studio.instagram} target="_blank" rel="noreferrer"><span className="contact-social-icon"><Instagram size={18}/></span><span><small>INSTAGRAM</small><strong>@devflowdigital.com.br</strong></span><ArrowUpRight size={17}/></a>}
      </div>
    </div>
    <form className="contact-form" onSubmit={submitMessage}>
      <span className="eyebrow">EXPLIQUE SEU CASO</span>
      <p className="contact-form-intro">Não precisa saber o nome da solução. Conte o que está difícil, o que gostaria de melhorar ou o que precisa fazer.</p>
      <label>Seu nome<input name="nome" autoComplete="name" placeholder="Como podemos te chamar?" required/></label>
      <label>Empresa<input name="empresa" autoComplete="organization" placeholder="Nome da sua empresa" required/></label>
      <label>Seu e-mail (opcional)<input name="email" type="email" autoComplete="email" placeholder="voce@empresa.com.br"/></label>
      <label>Sobre o que você quer conversar?<span className="select-wrap"><select name="servico" defaultValue="" required><option value="" disabled>Escolha uma opção</option><option value="Ainda não sei — quero explicar meu caso">Ainda não sei — quero explicar meu caso</option>{services.map(service => <option key={service.id} value={service.title}>{service.title}</option>)}</select><ChevronDown size={15}/></span></label>
      <label>O que você precisa?<textarea name="mensagem" rows="4" placeholder="O que acontece hoje? O que você gostaria que fosse mais fácil?" required/></label>
      <button className="button form-submit" type="submit">Continuar pelo WhatsApp <ArrowUpRight size={16}/></button>
      <span className="form-note">Vamos abrir uma conversa no WhatsApp com os detalhes preenchidos. Você confere e envia a mensagem por lá.</span>
      <p className="form-status" aria-live="polite">{status}</p>
    </form>
  </div></section>
}

function ContactPage() {
  return <main><PageHero eyebrow="CONTATO" title={<>Conte o que você<br/><em>precisa.</em></>} text="Explique seu caso com suas palavras. A DevFlow conversa com você para entender o negócio e pensar em como ajudar."/><ContactSection/></main>
}

function NotFound() { return <main className="not-found"><div className="container"><span className="eyebrow">404 — CAMINHO NÃO ENCONTRADO</span><h1>Vamos voltar<br/><em>ao início.</em></h1><Link className="button" to="/">Voltar para o início <ArrowLeft size={16}/></Link></div></main> }

export default function App() {
  const location = useLocation()
  const currentService = services.find(item => item.detailPath === location.pathname)
  const currentSegment = segments.find(item => `/segmentos/${item.id}` === location.pathname)
  const meta = currentService
    ? { title: `${currentService.title} para empresas | DevFlow Digital`, description: serviceDetails[currentService.id]?.intro }
    : currentSegment
      ? { title: `Soluções para ${currentSegment.name} | DevFlow Digital`, description: segmentDetails[currentSegment.id]?.intro }
      : location.pathname === '/projetos'
        ? { title: 'Projetos reais | DevFlow Digital', description: 'Conheça os projetos e demonstrações digitais da DevFlow Digital.' }
        : location.pathname === '/servicos'
          ? { title: 'Sites, CRM e agentes de IA | DevFlow Digital', description: 'Soluções digitais personalizadas: sites, organização de clientes e vendas, e automações com agentes de inteligência artificial.' }
          : location.pathname === '/sobre'
            ? { title: 'Sobre a DevFlow Digital', description: 'Conheça a DevFlow Digital e como desenvolvemos soluções digitais para empresas.' }
            : location.pathname === '/contato'
              ? { title: 'Fale com a DevFlow Digital', description: 'Conte sobre seu negócio e converse com a DevFlow Digital pelo WhatsApp.' }
              : { title: 'DevFlow Digital | Soluções digitais para empresas', description: 'Sites, gestão de clientes e vendas, e agentes de inteligência artificial para negócios.' }
  useEffect(() => {
    document.title = meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', meta.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', meta.description)
  }, [meta.title, meta.description])
  useEffect(() => {
    const target = location.hash ? document.querySelector(location.hash) : null
    if (target) {
      const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
      requestAnimationFrame(() => target.scrollIntoView({ behavior, block: 'start' }))
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
  }, [location.pathname, location.hash])
  return <><Header/><Routes location={location}><Route path="/" element={<Home/>}/><Route path="/projetos" element={<ProjectsPage/>}/><Route path="/projetos/:slug" element={<ProjectDemoPage/>}/><Route path="/servicos" element={<ServicesPage/>}/><Route path="/servicos/sites" element={<ServiceDetailPage serviceId="sites"/>}/><Route path="/servicos/crm" element={<ServiceDetailPage serviceId="clientes"/>}/><Route path="/servicos/ia" element={<ServiceDetailPage serviceId="ia"/>}/><Route path="/segmentos/restaurantes" element={<SegmentDetailPage segmentId="restaurantes"/>}/><Route path="/segmentos/distribuidoras" element={<SegmentDetailPage segmentId="distribuidoras"/>}/><Route path="/segmentos/lojas" element={<SegmentDetailPage segmentId="lojas"/>}/><Route path="/segmentos/servicos" element={<SegmentDetailPage segmentId="servicos"/>}/><Route path="/segmentos/crescimento" element={<SegmentDetailPage segmentId="crescimento"/>}/><Route path="/sobre" element={<AboutPage/>}/><Route path="/contato" element={<ContactPage/>}/><Route path="*" element={<NotFound/>}/></Routes><Footer/></>
}
