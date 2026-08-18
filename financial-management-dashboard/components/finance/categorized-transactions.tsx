"use client"

import { useMemo, useState } from "react"
import { ArrowDownLeft, ArrowUpRight, ChevronDown } from "lucide-react"
import { useFinance, categoryById } from "./finance-context"
import { formatMoney, formatDayLabel, type Transaction } from "@/lib/finance-data"
import { cn } from "@/lib/utils"

type CategoryGroup = {
  categoryId: string
  total: number
  items: Transaction[]
}

function buildGroups(list: Transaction[], type: "income" | "expense"): CategoryGroup[] {
  const map = new Map<string, CategoryGroup>()
  for (const t of list) {
    const isIncome = t.amount > 0
    if ((type === "income") !== isIncome) continue
    const group = map.get(t.categoryId) ?? { categoryId: t.categoryId, total: 0, items: [] }
    group.total += Math.abs(t.amount)
    group.items.push(t)
    map.set(t.categoryId, group)
  }
  return [...map.values()].sort((a, b) => b.total - a.total)
}

function CategorySection({
  type,
  groups,
  total,
}: {
  type: "income" | "expense"
  groups: CategoryGroup[]
  total: number
}) {
  const isIncome = type === "income"
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <section className="rounded-3xl border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full",
              isIncome ? "bg-income text-income-foreground" : "bg-expense text-expense-foreground",
            )}
          >
            {isIncome ? (
              <ArrowDownLeft className="h-5 w-5" aria-hidden="true" />
            ) : (
              <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
            )}
          </span>
          <div>
            <h2 className="font-display text-lg font-semibold tracking-tight">
              {isIncome ? "Ingresos" : "Gastos"}
            </h2>
            <p className="text-xs text-muted-foreground">
              {groups.length} {groups.length === 1 ? "categoría" : "categorías"}
            </p>
          </div>
        </div>
        <span className="font-display text-lg font-semibold tabular-nums">
          {formatMoney(total, true)}
        </span>
      </div>

      {groups.length === 0 ? (
        <p className="mt-6 rounded-2xl bg-secondary/60 py-6 text-center text-sm text-muted-foreground">
          Aún no hay {isIncome ? "ingresos" : "gastos"} registrados.
        </p>
      ) : (
        <ul className="mt-5 space-y-1.5">
          {groups.map((g) => {
            const cat = categoryById(g.categoryId)
            const Icon = cat.icon
            const share = total > 0 ? Math.round((g.total / total) * 100) : 0
            const isOpen = openId === g.categoryId
            return (
              <li key={g.categoryId} className="rounded-2xl bg-secondary/40">
                <button
                  onClick={() => setOpenId(isOpen ? null : g.categoryId)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition-colors hover:bg-secondary"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-card text-foreground">
                    <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-medium">{cat.label}</p>
                      <span className="shrink-0 text-sm font-semibold tabular-nums">
                        {formatMoney(g.total)}
                      </span>
                    </div>
                    <div className="mt-1.5 flex items-center gap-2">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-border">
                        <div
                          className={cn("h-full rounded-full", isIncome ? "bg-income" : "bg-expense")}
                          style={{ width: `${share}%` }}
                        />
                      </div>
                      <span className="w-16 shrink-0 text-right text-xs text-muted-foreground">
                        {share}% · {g.items.length}
                      </span>
                    </div>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
                      isOpen && "rotate-180",
                    )}
                    aria-hidden="true"
                  />
                </button>

                {isOpen && (
                  <ul className="space-y-1 px-3 pb-3">
                    {g.items.map((t) => (
                      <li
                        key={t.id}
                        className="flex items-center justify-between gap-3 rounded-xl bg-card px-3 py-2"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">{t.title}</p>
                          <p className="truncate text-xs text-muted-foreground">
                            {formatDayLabel(t.date)} · {t.account}
                          </p>
                        </div>
                        <span
                          className={cn(
                            "shrink-0 text-sm font-semibold tabular-nums",
                            isIncome ? "text-income-foreground" : "text-foreground",
                          )}
                        >
                          {formatMoney(t.amount, true)}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}

export function CategorizedTransactions() {
  const { transactions } = useFinance()

  const { incomeGroups, expenseGroups, totalIncome, totalExpense } = useMemo(() => {
    const incomeGroups = buildGroups(transactions, "income")
    const expenseGroups = buildGroups(transactions, "expense")
    return {
      incomeGroups,
      expenseGroups,
      totalIncome: incomeGroups.reduce((s, g) => s + g.total, 0),
      totalExpense: expenseGroups.reduce((s, g) => s + g.total, 0),
    }
  }, [transactions])

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <CategorySection type="income" groups={incomeGroups} total={totalIncome} />
      <CategorySection type="expense" groups={expenseGroups} total={totalExpense} />
    </div>
  )
}
