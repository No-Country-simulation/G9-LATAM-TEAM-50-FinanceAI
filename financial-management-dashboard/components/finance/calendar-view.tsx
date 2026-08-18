"use client"

import { useFinance } from "./finance-context"
import { formatMoney, monthName } from "@/lib/finance-data"
import { cn } from "@/lib/utils"

const weekDays = ["L", "M", "X", "J", "V", "S", "D"]

export function CalendarView() {
  const { transactions } = useFinance()

  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  // JS getDay: 0=Sun..6=Sat -> convert to Mon-first index
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7

  const perDay = new Map<number, { income: number; expense: number }>()
  for (const t of transactions) {
    const [ty, tm, td] = t.date.split("-").map(Number)
    if (tm - 1 !== month || ty !== year) continue
    const day = td
    const entry = perDay.get(day) ?? { income: 0, expense: 0 }
    if (t.amount > 0) entry.income += t.amount
    else entry.expense += Math.abs(t.amount)
    perDay.set(day, entry)
  }

  const cells: (number | null)[] = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  return (
    <section className="rounded-3xl border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-lg font-semibold tracking-tight">Calendario</h2>
          <p className="mt-0.5 text-sm capitalize text-muted-foreground">{monthName}</p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-income" aria-hidden="true" />
            Ingreso
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-expense" aria-hidden="true" />
            Gasto
          </span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-7 gap-1.5">
        {weekDays.map((d) => (
          <div key={d} className="pb-1 text-center text-xs font-medium text-muted-foreground">
            {d}
          </div>
        ))}
        {cells.map((day, i) => {
          if (day === null) return <div key={`e${i}`} />
          const data = perDay.get(day)
          const isToday = day === now.getDate()
          return (
            <div
              key={day}
              className={cn(
                "flex min-h-16 flex-col rounded-xl border p-1.5 text-left transition-colors",
                data ? "border-border bg-background" : "border-transparent bg-background/40",
              )}
            >
              <span
                className={cn(
                  "text-[11px] font-medium",
                  isToday
                    ? "flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground"
                    : "text-muted-foreground",
                )}
              >
                {day}
              </span>
              <div className="mt-auto space-y-0.5">
                {data?.income ? (
                  <span className="block truncate text-[10px] font-semibold leading-tight text-[oklch(0.5_0.13_145)]">
                    +{Math.round(data.income)}
                  </span>
                ) : null}
                {data?.expense ? (
                  <span className="block truncate text-[10px] font-semibold leading-tight text-expense">
                    −{Math.round(data.expense)}
                  </span>
                ) : null}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
