"use client"

import { useFinance, categoryById } from "./finance-context"
import { formatMoney, formatDayLabel } from "@/lib/finance-data"
import { cn } from "@/lib/utils"

export function RecentTransactions({ limit }: { limit?: number }) {
  const { transactions } = useFinance()
  const list = limit ? transactions.slice(0, limit) : transactions

  // group by date
  const groups = new Map<string, typeof transactions>()
  for (const t of list) {
    const arr = groups.get(t.date) ?? []
    arr.push(t)
    groups.set(t.date, arr)
  }

  return (
    <section className="rounded-3xl border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold tracking-tight">Movimientos recientes</h2>
        <span className="text-sm text-muted-foreground">{list.length} operaciones</span>
      </div>

      <div className="mt-5 space-y-6">
        {[...groups.entries()].map(([date, items]) => {
          const dayTotal = items.reduce((s, t) => s + t.amount, 0)
          return (
            <div key={date}>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {formatDayLabel(date)}
                </span>
                <span
                  className={cn(
                    "text-xs font-medium tabular-nums",
                    dayTotal >= 0 ? "text-muted-foreground" : "text-muted-foreground",
                  )}
                >
                  {formatMoney(dayTotal, true)}
                </span>
              </div>
              <ul className="space-y-1">
                {items.map((t) => {
                  const cat = categoryById(t.categoryId)
                  const Icon = cat.icon
                  const positive = t.amount > 0
                  return (
                    <li
                      key={t.id}
                      className="flex items-center gap-3 rounded-2xl px-2 py-2 transition-colors hover:bg-secondary"
                    >
                      <span
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                          positive
                            ? "bg-income text-income-foreground"
                            : "bg-secondary text-foreground",
                        )}
                      >
                        <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{t.title}</p>
                        <p className="truncate text-xs text-muted-foreground">
                          {cat.label} · {t.account}
                        </p>
                      </div>
                      <span
                        className={cn(
                          "shrink-0 text-sm font-semibold tabular-nums",
                          positive ? "text-expense" : "text-foreground",
                        )}
                        style={positive ? { color: "oklch(0.55 0.14 145)" } : undefined}
                      >
                        {formatMoney(t.amount, true)}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>
    </section>
  )
}
