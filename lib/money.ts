const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

export function formatCents(cents: number) {
  if (!Number.isInteger(cents)) throw new Error('Money values must be integer cents')
  return brl.format(cents / 100)
}

export function formatCountdown(totalSeconds: number) {
  const safe = Math.max(0, totalSeconds)
  const m = Math.floor(safe / 60)
  const s = safe % 60
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}
