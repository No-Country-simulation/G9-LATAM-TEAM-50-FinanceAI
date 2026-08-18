"use client"

import { monthlyHistory, formatMoney } from "@/lib/finance-data"

export function TrendChart() {
  const max = Math.max(...monthlyHistory.flatMap((m) => [m.income, m.expense]))

  return (
    <section className="rounded-3xl border border-border bg-card p-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="font-display text-lg font-semibold tracking-tight">Flujo de caja</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">Ingresos vs gastos · 6 meses</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-income" aria-hidden="true" />
            Ingresos
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-expense" aria-hidden="true" />
            Gastos
          </span>
        </div>
      </div>

      <div className="mt-8 flex h-52 items-stretch justify-between gap-3">
        {monthlyHistory.map((m) => (
          <div key={m.month} className="group flex h-full flex-1 flex-col items-center gap-3">
            <div className="relative flex h-full w-full items-end justify-center gap-1.5">
              <div className="absolute -top-1 left-1/2 z-10 -translate-x-1/2 -translate-y-full rounded-lg bg-primary px-2.5 py-1.5 text-center text-[11px] leading-tight text-primary-foreground opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
                <span className="block whitespace-nowrap">{formatMoney(m.income)}</span>
                <span className="block whitespace-nowrap text-primary-foreground/60">
                  {formatMoney(-m.expense)}
                </span>
              </div>
              <div
                className="w-1/2 max-w-6 rounded-t-md bg-income transition-all"
                style={{ height: `${(m.income / max) * 100}%` }}
                aria-label={`Ingresos ${m.month}: ${formatMoney(m.income)}`}
              />
              <div
                className="w-1/2 max-w-6 rounded-t-md bg-expense transition-all"
                style={{ height: `${(m.expense / max) * 100}%` }}
                aria-label={`Gastos ${m.month}: ${formatMoney(m.expense)}`}
              />
            </div>
            <span className="text-xs font-medium text-muted-foreground">{m.month}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
