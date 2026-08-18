"use client"

import { useFinance, categoryById } from "./finance-context"
import { formatMoney } from "@/lib/finance-data"
import { cn } from "@/lib/utils"

export function BudgetsPanel() {
  const { budgetProgress } = useFinance()

  return (
    <section className="rounded-3xl border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-lg font-semibold tracking-tight">Presupuestos</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">Límites del mes</p>
        </div>
      </div>

      <ul className="mt-6 space-y-5">
        {budgetProgress.map((b) => {
          const cat = categoryById(b.categoryId)
          const Icon = cat.icon
          const pct = Math.min(Math.round((b.spent / b.limit) * 100), 100)
          const over = b.spent > b.limit
          const near = !over && pct >= 80
          return (
            <li key={b.categoryId}>
              <div className="mb-2 flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="flex-1 text-sm font-medium">{cat.label}</span>
                <span className="text-sm tabular-nums text-muted-foreground">
                  {formatMoney(b.spent)} / {formatMoney(b.limit)}
                </span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className={cn(
                    "h-full rounded-full transition-all",
                    over ? "bg-expense" : near ? "bg-[oklch(0.8_0.12_75)]" : "bg-income",
                  )}
                  style={{ width: `${pct}%` }}
                />
              </div>
              {over && (
                <p className="mt-1 text-xs font-medium text-expense">
                  Te has pasado {formatMoney(b.spent - b.limit)}
                </p>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
