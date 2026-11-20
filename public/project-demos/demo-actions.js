document.addEventListener('click', event => {
  const button = event.target.closest('.demo-external-action')
  if (!button) return
  event.preventDefault()
  document.dispatchEvent(new CustomEvent('demo:external-action', { detail: 'Esta é uma prévia: nenhum contato externo será aberto.' }))
})

document.addEventListener('demo:external-action', event => {
  let status = document.getElementById('demoActionStatus')
  if (!status) {
    status = document.createElement('p')
    status.id = 'demoActionStatus'
    status.className = 'demo-banner demo-action-status'
    status.setAttribute('role', 'status')
    status.setAttribute('aria-live', 'polite')
    document.body.append(status)
  }
  status.textContent = event.detail || 'Ação demonstrativa.'
})
