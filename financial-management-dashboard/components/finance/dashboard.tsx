"use client"

import { useState } from "react"
import { FinanceProvider } from "./finance-context"
import { Sidebar } from "./sidebar"
import { MobileNav } from "./mobile-nav"
import { Topbar } from "./topbar"
import { SummaryCards } from "./summary-cards"
import { TrendChart } from "./trend-chart"
import { CategoryBreakdown } from "./category-breakdown"
import { RecentTransactions } from "./recent-transactions"
import { CategorizedTransactions } from "./categorized-transactions"
import { BudgetsPanel } from "./budgets-panel"
import { CalendarView } from "./calendar-view"
import { AccountsPanel } from "./accounts-panel"
import { AddTransactionDialog } from "./add-transaction-dialog"

export function Dashboard() {
  const [active, setActive] = useState("resumen")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogType, setDialogType] = useState<"income" | "expense">("expense")

  const openDialog = (type: "income" | "expense") => {
    setDialogType(type)
    setDialogOpen(true)
  }

  return (
    <FinanceProvider>
      <div className="flex min-h-screen">
        <Sidebar active={active} onChange={setActive} />

        <main className="flex-1 px-4 pb-24 pt-6 sm:px-6 lg:px-10 lg:pb-10">
          <div className="mx-auto max-w-6xl space-y-6">
            <Topbar
              active={active}
              onAdd={() => openDialog("expense")}
              onAddIncome={() => openDialog("income")}
            />

            {active === "resumen" && (
              <div className="space-y-6">
                <SummaryCards />
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                  <div className="space-y-6 xl:col-span-2">
                    <TrendChart />
                    <CategoryBreakdown />
                  </div>
                  <div className="space-y-6">
                    <BudgetsPanel />
                    <RecentTransactions limit={6} />
                  </div>
                </div>
              </div>
            )}

            {active === "movimientos" && (
              <div className="space-y-6">
                <SummaryCards />
                <CategorizedTransactions />
                <RecentTransactions />
              </div>
            )}

            {active === "presupuestos" && (
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <BudgetsPanel />
                <CategoryBreakdown />
              </div>
            )}

            {active === "calendario" && (
              <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                <div className="xl:col-span-2">
                  <CalendarView />
                </div>
                <RecentTransactions limit={8} />
              </div>
            )}

            {active === "cuentas" && (
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <AccountsPanel />
                <TrendChart />
              </div>
            )}
          </div>
        </main>

        <MobileNav active={active} onChange={setActive} />
        <AddTransactionDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          initialType={dialogType}
        />
      </div>
    </FinanceProvider>
  )
}
