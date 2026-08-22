export const money = (value) => new Intl.NumberFormat('es-DO', { style: 'currency', currency: 'DOP', maximumFractionDigits: 0 }).format(Number(value || 0))
export const dateLabel = (value) => value ? new Intl.DateTimeFormat('es-DO', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(value)) : '—'

export function normalizeType(value) {
  return String(value || '').toUpperCase() === 'INGRESO' ? 'INGRESO' : 'GASTO'
}

export function summarize(transactions) {
  const ingresos = transactions.filter(t => normalizeType(t.tipo) === 'INGRESO').reduce((s, t) => s + Number(t.monto || 0), 0)
  const gastos = transactions.filter(t => normalizeType(t.tipo) === 'GASTO').reduce((s, t) => s + Number(t.monto || 0), 0)
  const balance = ingresos - gastos
  const savingsRate = ingresos ? Math.round((balance / ingresos) * 100) : 0
  const byCategory = transactions.filter(t => normalizeType(t.tipo) === 'GASTO').reduce((acc, t) => {
    const key = t.categoria || 'Otros'
    acc[key] = (acc[key] || 0) + Number(t.monto || 0)
    return acc
  }, {})
  const topCategory = Object.entries(byCategory).sort((a,b) => b[1] - a[1])[0]
  return { ingresos, gastos, balance, savingsRate, byCategory, topCategory }
}

export function monthlySeries(transactions) {
  const map = new Map()
  transactions.forEach(t => {
    const d = new Date(t.fecha)
    if (Number.isNaN(d.getTime())) return
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    if (!map.has(key)) map.set(key, { ingresos: 0, gastos: 0, label: d.toLocaleDateString('es-DO', { month:'short' }) })
    map.get(key)[normalizeType(t.tipo) === 'INGRESO' ? 'ingresos' : 'gastos'] += Number(t.monto || 0)
  })
  return [...map.entries()].sort((a,b) => a[0].localeCompare(b[0])).slice(-6).map(([, v]) => v)
}

export function extractRecommendations(profile) {
  if (!profile || typeof profile !== 'object') return []
  const candidates = []
  const walk = (value, key = '') => {
    if (Array.isArray(value)) value.forEach(v => walk(v, key))
    else if (value && typeof value === 'object') Object.entries(value).forEach(([k,v]) => walk(v, k))
    else if (typeof value === 'string' && /(recomend|suger|accion|mejor)/i.test(key)) candidates.push(value)
  }
  walk(profile)
  return candidates.slice(0, 4)
}
