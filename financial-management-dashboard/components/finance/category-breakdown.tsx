"use client"

import { useFinance, categoryById } from "./finance-context"
import { formatMoney } from "@/lib/finance-data"

// Distinctive warm palette for slices
const palette = [
  "oklch(0.87 0.19 118)", // lima
  "oklch(0.72 0.14 45)", // coral
  "oklch(0.24 0.008 60)", // negro
  "oklch(0.78 0.09 200)", // azul suave
  "oklch(0.8 0.12 75)", // ámbar
  "oklch(0.6 0.1 320)", // malva apagado
  "oklch(0.7 0.11 150)", // verde salvia
]

export function CategoryBreakdown() {
  const { byCategory, totalExpense } = useFinance()
  const top = byCategory.slice(0, 6)
  const rest = byCategory.slice(6)
  const restTotal = rest.reduce((s, c) => s + c.total, 0)
  const slices = restTotal > 0 ? [...top, { categoryId: "otros", total: restTotal }] : top

  const radius = 60
  const circ = 2 * Math.PI * radius
  let offset = 0

  return (
    <section className="rounded-3xl border border-border bg-card p-6">
      <h2 className="font-display text-lg font-semibold tracking-tight">Gasto por categoría</h2>
      <p className="mt-0.5 text-sm text-muted-foreground">Reparto de tus salidas</p>

      <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:items-center">
        <div className="relative h-40 w-40 shrink-0">
          <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90">
            {slices.map((s, i) => {
              const fraction = totalExpense > 0 ? s.total / totalExpense : 0
              const dash = fraction * circ
              const seg = (
                <circle
                  key={s.categoryId}
                  cx="80"
                  cy="80"
                  r={radius}
                  fill="none"
                  stroke={palette[i % palette.length]}
                  strokeWidth="22"
                  strokeDasharray={`${dash} ${circ - dash}`}
                  strokeDashoffset={-offset}
                />
              )
              offset += dash
              return seg
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xs text-muted-foreground">Total</span>
            <span className="font-display text-lg font-semibold">{formatMoney(totalExpense)}</span>
          </div>
        </div>

        <ul className="w-full space-y-2.5">
          {slices.map((s, i) => {
            const label =
              s.categoryId === "otros" ? "Otros" : categoryById(s.categoryId).label
            const pct = totalExpense > 0 ? Math.round((s.total / totalExpense) * 100) : 0
            return (
              <li key={s.categoryId} className="flex items-center gap-3 text-sm">
                <span
                  className="h-3 w-3 shrink-0 rounded-full"
                  style={{ backgroundColor: palette[i % palette.length] }}
                  aria-hidden="true"
                />
                <span className="flex-1 truncate">{label}</span>
                <span className="text-muted-foreground tabular-nums">{pct}%</span>
                <span className="w-20 text-right font-medium tabular-nums">
                  {formatMoney(s.total)}
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
