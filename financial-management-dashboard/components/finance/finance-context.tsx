"use client"

import { createContext, useContext, useMemo, useState, type ReactNode } from "react"
import {
  transactions as seed,
  budgets,
  categoryById,
  type Transaction,
} from "@/lib/finance-data"

type FinanceContextValue = {
  transactions: Transaction[]
  addTransaction: (t: Omit<Transaction, "id">) => void
  totalIncome: number
  totalExpense: number
  balance: number
  byCategory: { categoryId: string; total: number }[]
  budgetProgress: { categoryId: string; limit: number; spent: number }[]
}

const FinanceContext = createContext<FinanceContextValue | null>(null)

export function FinanceProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(seed)

  const addTransaction = (t: Omit<Transaction, "id">) => {
    setTransactions((prev) =>
      [{ ...t, id: `t${Date.now()}` }, ...prev].sort((a, b) => (a.date < b.date ? 1 : -1)),
    )
  }

  const value = useMemo<FinanceContextValue>(() => {
    const totalIncome = transactions
      .filter((t) => t.amount > 0)
      .reduce((s, t) => s + t.amount, 0)
    const totalExpense = transactions
      .filter((t) => t.amount < 0)
      .reduce((s, t) => s + Math.abs(t.amount), 0)

    const catMap = new Map<string, number>()
    for (const t of transactions) {
      if (t.amount < 0) {
        catMap.set(t.categoryId, (catMap.get(t.categoryId) ?? 0) + Math.abs(t.amount))
      }
    }
    const byCategory = [...catMap.entries()]
      .map(([categoryId, total]) => ({ categoryId, total }))
      .sort((a, b) => b.total - a.total)

    const budgetProgress = budgets.map((b) => ({
      categoryId: b.categoryId,
      limit: b.limit,
      spent: catMap.get(b.categoryId) ?? 0,
    }))

    return {
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
      byCategory,
      budgetProgress,
    }
  }, [transactions])

  return (
    <FinanceContext.Provider value={{ transactions, addTransaction, ...value }}>
      {children}
    </FinanceContext.Provider>
  )
}

export function useFinance() {
  const ctx = useContext(FinanceContext)
  if (!ctx) throw new Error("useFinance must be used within FinanceProvider")
  return ctx
}

export { categoryById }
