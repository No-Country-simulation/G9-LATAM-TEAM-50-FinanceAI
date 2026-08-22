import { ShieldCheck, TrendingUp, Wallet, PieChart, Repeat, CheckCircle } from 'lucide-react'

const defaultData = {
  perfil_financiero: 'Constructor Estable',
  financial_score: 78,
  score_ahorro: 82,
  score_gasto: 65,
  score_diversificacion: 71,
  score_frecuencia: 88,
  categoria_principal: 'Vivienda y Servicios',
  porcentaje_categoria_principal: 34.5,
  recomendaciones: [
    'Destina un 5% adicional de tus ingresos a tu fondo de emergencia este trimestre.',
    'Diversifica tus gastos variables: hoy el 34% se concentra en una sola categoría.',
    'Mantén tu racha de aportes mensuales, es tu métrica más sólida.',
  ],
}

const METRICS = [
  { key: 'score_ahorro', title: 'Ahorro', icon: Wallet, tint: 'emerald' },
  { key: 'score_gasto', title: 'Gastos', icon: TrendingUp, tint: 'orange' },
  { key: 'score_diversificacion', title: 'Diversificación', icon: PieChart, tint: 'amber' },
  { key: 'score_frecuencia', title: 'Frecuencia', icon: Repeat, tint: 'teal' },
]

const TINTS = {
  emerald: { bar: 'bg-emerald-400', icon: 'text-emerald-400', iconBg: 'bg-emerald-950/60', ring: 'group-hover:border-emerald-500/40' },
  orange: { bar: 'bg-orange-400', icon: 'text-orange-400', iconBg: 'bg-orange-950/60', ring: 'group-hover:border-orange-500/40' },
  amber: { bar: 'bg-amber-400', icon: 'text-amber-400', iconBg: 'bg-amber-950/60', ring: 'group-hover:border-amber-500/40' },
  teal: { bar: 'bg-teal-400', icon: 'text-teal-400', iconBg: 'bg-teal-950/60', ring: 'group-hover:border-teal-500/40' },
}

export default function FinancialAnalysis({ data = defaultData }) {
  if (!data) return null

  const porcentaje = typeof data.porcentaje_categoria_principal === 'number'
    ? data.porcentaje_categoria_principal.toFixed(2)
    : data.porcentaje_categoria_principal || '0.00'

  return (
    <div className="space-y-5 font-sans">
      {/* Encabezado tipo estado de cuenta, con sello circular de score */}
      <div className="bg-stone-950 border border-stone-800 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-amber-400/70">Reporte · Salud Financiera</span>
            <h2 className="font-serif text-2xl text-stone-50 mt-2 leading-snug">{data.perfil_financiero || 'Perfil General'}</h2>
          </div>

          <div className="w-24 h-24 rounded-full border-2 border-dashed border-amber-400/30 flex items-center justify-center p-1 shrink-0">
            <div className="w-full h-full rounded-full bg-gradient-to-b from-stone-900 to-stone-950 border border-amber-400/50 flex flex-col items-center justify-center">
              <span className="font-serif text-2xl font-bold text-amber-300 leading-none">{data.financial_score ?? 0}</span>
              <span className="font-mono text-xs text-stone-500 mt-1">/ 100</span>
            </div>
          </div>
        </div>

        <div className="border-t border-dashed border-stone-800 mt-5 pt-4">
          <span className="font-mono text-xs text-stone-500">Puntaje global calculado sobre 4 indicadores clave</span>
        </div>
      </div>

      {/* Grid de métricas, cada una con su color de categoría */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {METRICS.map(({ key, title, icon: Icon, tint }) => {
          const t = TINTS[tint]
          return (
            <div
              key={key}
              className={`group bg-stone-900/40 border border-stone-800 ${t.ring} rounded-xl p-4 transition-all duration-200 hover:-translate-y-0.5`}
            >
              <div className={`w-8 h-1 rounded-full ${t.bar} mb-3 opacity-70`} />
              <div className="flex items-center gap-2.5">
                <div className={`p-2 ${t.iconBg} rounded-lg shrink-0`}>
                  <Icon size={16} className={t.icon} />
                </div>
                <div className="min-w-0">
                  <span className="block text-xs text-stone-500">{title}</span>
                  <span className="font-mono text-lg font-bold text-stone-100">{data[key] ?? 0}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Categoría principal, estilo línea de recibo */}
      <div className="bg-stone-900/40 border border-stone-800 rounded-xl p-5">
        <span className="font-mono text-xs uppercase tracking-widest text-stone-500">Categoría principal de gasto</span>
        <div className="flex items-baseline justify-between mt-2 gap-3">
          <span className="font-serif text-lg text-stone-100 truncate">{data.categoria_principal || 'Sin registrar'}</span>
          <span className="font-mono text-xl font-bold text-amber-400 shrink-0">{porcentaje}%</span>
        </div>
        <div className="w-full bg-stone-800 h-1.5 rounded-full mt-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-amber-500 to-amber-300 h-full rounded-full transition-all duration-700 ease-out"
            style={{ width: `${Math.min(Number(porcentaje), 100)}%` }}
          />
        </div>
      </div>

      {/* Recomendaciones, con sello de "verificado" */}
      {Array.isArray(data.recomendaciones) && data.recomendaciones.length > 0 && (
        <div className="relative bg-stone-900/40 border border-stone-800 rounded-xl p-5 pt-6">
          <div className="absolute -top-3 right-5 -rotate-6 border-2 border-emerald-500/70 rounded-md px-2 py-0.5 bg-stone-950">
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-400">Verificado</span>
          </div>

          <h3 className="font-mono text-xs uppercase tracking-widest text-stone-500 mb-4 flex items-center gap-2">
            <ShieldCheck size={15} className="text-emerald-400" />
            Recomendaciones personalizadas
          </h3>

          <ul>
            {data.recomendaciones.map((rec, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-stone-300 text-sm py-3 border-b border-dashed border-stone-800/70 last:border-b-0"
              >
                <CheckCircle size={15} className="text-emerald-400 mt-0.5 shrink-0" />
                <span className="leading-relaxed">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
