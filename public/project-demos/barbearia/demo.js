const serviceCatalog = [
  ['Acabamento', 20], ['Máquina e Tesoura', 40], ['Corte Máquina', 40], ['Corte Tesoura', 50],
  ['Alisamento Americano', 40], ['Corte Infantil', 50], ['Blindado', 60], ['Corte + Barba', 75],
  ['Barba + Sobrancelha', 55], ['Corte + Botox Prime', 105], ['Corte + Luzes', 115],
]
const productCatalog = [
  ['Pomada líquida', 39.99], ['Leave-in', 39.99], ['Tônico capilar', 49.99],
  ['Balm para barba', 39.99], ['Pomada efeito teia', 34.99],
]
const activeModal = new Map()
let selectedBarber = ''
let selectedService = null
const selectedProducts = new Set()
const money = value => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)

function focusableIn(modal) {
  return [...modal.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')]
    .filter(element => element.getClientRects().length > 0)
}

function openModal(id) {
  const modal = document.getElementById(id)
  if (!modal) return
  activeModal.set(modal, document.activeElement)
  modal.style.display = 'flex'
  modal.setAttribute('aria-hidden', 'false')
  const dialog = modal.querySelector('[role="dialog"]')
  const heading = dialog?.querySelector('h1, h2, h3')
  if (dialog && heading) {
    if (!heading.id) heading.id = `${id}-heading`
    dialog.setAttribute('aria-labelledby', heading.id)
    dialog.setAttribute('aria-modal', 'true')
  }
  requestAnimationFrame(() => {
    const preferred = dialog?.querySelector('[autofocus]')
      || [...(dialog?.querySelectorAll('input:not([type="hidden"]):not([disabled]), select:not([disabled]), textarea:not([disabled])') || [])].find(element => element.getClientRects().length)
    ;(preferred || focusableIn(modal)[0] || dialog)?.focus()
  })
}

function closeModal(id) {
  const modal = document.getElementById(id)
  if (!modal) return
  modal.style.display = 'none'
  modal.setAttribute('aria-hidden', 'true')
  modal.querySelector('[role="dialog"]')?.setAttribute('aria-modal', 'false')
  const previous = activeModal.get(modal)
  if (previous?.isConnected) previous.focus()
  activeModal.delete(modal)
}

window.fecharModal = closeModal
document.addEventListener('keydown', event => {
  const modal = [...document.querySelectorAll('.modal')].find(item => item.getAttribute('aria-hidden') === 'false')
  if (!modal) return
  if (event.key === 'Escape') { closeModal(modal.id); return }
  if (event.key !== 'Tab') return
  const items = focusableIn(modal)
  if (!items.length) { event.preventDefault(); return }
  const first = items[0], last = items.at(-1)
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
})
document.querySelectorAll('.modal').forEach(modal => modal.addEventListener('click', event => {
  if (event.target === modal) closeModal(modal.id)
}))
document.querySelectorAll('.close, .svc-close').forEach(button => button.addEventListener('click', () => closeModal(button.closest('.modal')?.id)))

const menuButton = document.querySelector('.menu-toggle')
const nav = document.querySelector('.nav-links')
menuButton?.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') !== 'true'
  menuButton.setAttribute('aria-expanded', String(expanded))
  nav?.classList.toggle('active', expanded)
})
document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', event => {
  const target = document.querySelector(link.getAttribute('href'))
  if (!target) return
  event.preventDefault()
  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  nav?.classList.remove('active')
  menuButton?.setAttribute('aria-expanded', 'false')
}))

document.querySelectorAll('.openModalBtn').forEach(button => button.addEventListener('click', () => {
  selectedBarber = button.dataset.pro || 'Equipe'
  selectedService = null
  document.getElementById('demoStatus').textContent = ''
  openModal('modalCliente')
}))
document.getElementById('btnClienteContinuar')?.addEventListener('click', () => {
  const name = document.getElementById('nomeCliente')
  if (!name.value.trim()) { name.setCustomValidity('Digite seu nome para continuar.'); name.reportValidity(); name.setCustomValidity(''); return }
  closeModal('modalCliente')
  renderProducts()
  openModal('modalProdutos')
})

function renderProducts() {
  const root = document.getElementById('produtosContainer')
  root.replaceChildren()
  for (const [label, price] of productCatalog) {
    const card = document.createElement('div')
    card.className = 'prod-card'
    card.setAttribute('role', 'checkbox')
    card.setAttribute('aria-checked', String(selectedProducts.has(label)))
    card.tabIndex = 0
    card.innerHTML = `<span class="p-name"></span><span class="p-price"></span><small class="muted">Toque para selecionar</small>`
    card.querySelector('.p-name').textContent = label
    card.querySelector('.p-price').textContent = money(price)
    const toggle = () => {
      if (selectedProducts.has(label)) selectedProducts.delete(label)
      else selectedProducts.add(label)
      card.classList.toggle('active', selectedProducts.has(label))
      card.setAttribute('aria-checked', String(selectedProducts.has(label)))
      document.getElementById('prodTotal').textContent = money([...selectedProducts].reduce((sum, name) => sum + productCatalog.find(item => item[0] === name)[1], 0))
    }
    card.addEventListener('click', toggle)
    card.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggle() } })
    root.appendChild(card)
  }
}

function continueToClub() { closeModal('modalProdutos'); openModal('modalRAClub') }
document.getElementById('btnProdutosPular')?.addEventListener('click', continueToClub)
document.getElementById('btnProdutosContinuar')?.addEventListener('click', continueToClub)
document.getElementById('btnRAJaMembro')?.addEventListener('click', openBooking)
document.getElementById('btnRANao')?.addEventListener('click', openBooking)
document.getElementById('btnRAAssinar')?.addEventListener('click', () => showNotice('Benefício ilustrativo. Nenhuma assinatura ou cobrança será iniciada.'))

function openBooking() {
  closeModal('modalRAClub')
  const date = document.getElementById('data')
  const now = new Date()
  date.min = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
  date.value = ''
  const time = document.getElementById('hora')
  time.value = ''
  selectedService = null
  document.getElementById('servicoDisplay').value = ''
  document.getElementById('demoStatus').textContent = ''
  openModal('modal')
}

function renderServices(query = '') {
  const list = document.getElementById('servicoLista')
  list.replaceChildren()
  serviceCatalog.filter(([name]) => name.toLocaleLowerCase('pt-BR').includes(query.toLocaleLowerCase('pt-BR'))).forEach(([name, price]) => {
    const row = document.createElement('label')
    row.className = 'svc-row'
    const info = document.createElement('span')
    info.className = 'svc-left'
    const title = document.createElement('span')
    title.className = 'svc-name'
    title.textContent = name
    const amount = document.createElement('span')
    amount.className = 'svc-muted'
    amount.textContent = money(price)
    info.append(title, amount)
    const radio = document.createElement('input')
    radio.type = 'radio'; radio.name = 'svc'; radio.value = name; radio.setAttribute('aria-label', `${name}, ${money(price)}`)
    radio.addEventListener('change', () => { selectedService = { name, price } })
    row.append(info, radio)
    list.appendChild(row)
  })
}
document.getElementById('servicoDisplay')?.addEventListener('click', () => {
  const search = document.getElementById('svcSearch')
  search.value = ''
  renderServices()
  openModal('servicoModal')
})
document.getElementById('svcSearch')?.addEventListener('input', event => renderServices(event.target.value))
document.getElementById('servicoCancelar')?.addEventListener('click', () => closeModal('servicoModal'))
document.getElementById('servicoConfirmarWpp')?.addEventListener('click', () => {
  const chosen = document.querySelector('input[name="svc"]:checked')
  if (!chosen) { showNotice('Escolha um serviço para ver a próxima etapa.'); return }
  const row = chosen.closest('.svc-row')
  selectedService = { name: row.querySelector('.svc-name').textContent, price: Number(row.querySelector('.svc-muted').textContent.replace(/[^\d,]/g, '').replace(',', '.')) }
  document.getElementById('servicoDisplay').value = `${selectedService.name} — ${money(selectedService.price)}`
  closeModal('servicoModal')
})
document.getElementById('confirmarBtn')?.addEventListener('click', () => {
  const date = document.getElementById('data'), time = document.getElementById('hora')
  if (!date.value) { date.reportValidity(); return }
  if (!time.value) { time.reportValidity(); return }
  if (!selectedService) { document.getElementById('servicoDisplay').focus(); showNotice('Selecione um serviço para continuar.'); return }
  document.getElementById('demoStatus').textContent = `Prévia concluída para ${selectedBarber}: nenhum agendamento foi registrado e nenhuma mensagem foi enviada.`
})

function showNotice(message) {
  let toast = document.getElementById('demo-toast')
  if (!toast) { toast = document.createElement('p'); toast.id = 'demo-toast'; toast.className = 'demo-toast'; toast.setAttribute('role', 'status'); toast.setAttribute('aria-live', 'polite'); document.body.appendChild(toast) }
  toast.textContent = message
}
document.querySelectorAll('.demo-contact-button').forEach(button => button.addEventListener('click', () => showNotice('Contato ilustrativo: esta prévia não abre o WhatsApp nem envia mensagens.')))
document.getElementById('btnAvaliarGoogle')?.addEventListener('click', event => { event.preventDefault(); showNotice('Adicione o link oficial de avaliações da barbearia antes de habilitar esta ação.') })
