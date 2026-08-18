"use client"

import { ArrowUpRight, ArrowDownRight, TrendingUp } from "lucide-react"
import { useFinance } from "./finance-context"
import { formatMoney, monthName } from "@/lib/finance-data"

export function SummaryCards() {
  const { totalIncome, totalExpense, balance } = useFinance()
  const savingsRate = totalIncome > 0 ? Math.round((balance / totalIncome) * 100) : 0

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {/* Balance principal */}
      <div className="rounded-3xl bg-primary p-6 text-primary-foreground xl:col-span-2">
        <div className="flex items-center justify-between">
          <p className="text-sm text-primary-foreground/70 capitalize">{monthName}</p>
          <span className="rounded-full bg-primary-foreground/10 px-3 py-1 text-xs font-medium">
            Balance del mes
          </span>
        </div>
        <p className="mt-6 font-display text-5xl font-semibold tracking-tight">
          {formatMoney(balance)}
        </p>
        <div className="mt-6 flex items-center gap-2 text-sm text-primary-foreground/70">
          <TrendingUp className="h-4 w-4" aria-hidden="true" />
          <span>Estás ahorrando el {savingsRate}% de tus ingresos</span>
        </div>
      </div>

      {/* Ingresos */}
      <div
        className="relative overflow-hidden rounded-3xl bg-income p-6 text-income-foreground"
        style={{
          backgroundImage:
            "radial-gradient(currentColor 1.1px, transparent 1.1px)",
          backgroundSize: "14px 0px",
          backgroundPosition: "right -6px bottom -6px",
        }}
      >
        <div className="relative">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Ingresos</p>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-income-foreground/10">
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </div>
          <p className="mt-6 font-display text-3xl font-semibold tracking-tight">
            {formatMoney(totalIncome)}
          </p>
          <p className="mt-1 text-sm text-income-foreground/70">Entradas este mes</p>
        </div>
      </div>

      {/* Gastos */}
      <div
        className="relative overflow-hidden rounded-3xl bg-expense p-6 text-expense-foreground"
        style={{
          backgroundImage:
            "radial-gradient(currentColor 1.1px, transparent 1.1px)",
          backgroundSize: "14px 0px",
          backgroundPosition: "right -6px bottom -6px",
        }}
      >
        <div className="relative">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Gastos</p>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-expense-foreground/10">
              <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </div>
          <p className="mt-6 font-display text-3xl font-semibold tracking-tight">
            {formatMoney(totalExpense)}
          </p>
          <p className="mt-1 text-base text-expense-foreground/70">Salidas este mes</p>
        </div>
      </div>
    </div>
  )
}
