"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { categories } from "@/lib/finance-data"
import { useFinance } from "./finance-context"
import { cn } from "@/lib/utils"

export function AddTransactionDialog({
  open,
  onClose,
  initialType = "expense",
}: {
  open: boolean
  onClose: () => void
  initialType?: "income" | "expense"
}) {
  const { addTransaction } = useFinance()
  const [type, setType] = useState<"income" | "expense">(initialType)
  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState("")
  const [categoryId, setCategoryId] = useState("groceries")
  const [account, setAccount] = useState("Cuenta principal")

  useEffect(() => {
    if (open) {
      setType(initialType)
      setTitle("")
      setAmount("")
      setCategoryId(categories.find((c) => c.type === initialType)!.id)
      setAccount("Cuenta principal")
    }
  }, [open, initialType])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (open) document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open, onClose])

  if (!open) return null

  const visibleCategories = categories.filter((c) => c.type === type)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const value = Number.parseFloat(amount.replace(",", "."))
    if (!title.trim() || !value || value <= 0) return
    addTransaction({
      title: title.trim(),
      amount: type === "expense" ? -value : value,
      categoryId,
      account,
      date: new Date().toISOString().slice(0, 10),
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40 p-4 backdrop-blur-sm sm:items-center">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-tx-title"
        className="w-full max-w-md rounded-3xl border border-border bg-popover p-6 shadow-xl"
      >
        <div className="flex items-center justify-between">
          <h2 id="add-tx-title" className="font-display text-lg font-semibold tracking-tight">
            Nuevo movimiento
          </h2>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={submit} className="mt-5 space-y-4">
          <div className="grid grid-cols-2 gap-2 rounded-2xl bg-secondary p-1">
            {(["expense", "income"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => {
                  setType(t)
                  setCategoryId(categories.find((c) => c.type === t)!.id)
                }}
                className={cn(
                  "rounded-xl py-2 text-sm font-medium transition-colors",
                  type === t
                    ? t === "expense"
                      ? "bg-expense text-expense-foreground"
                      : "bg-income text-income-foreground"
                    : "text-muted-foreground",
                )}
              >
                {t === "expense" ? "Gasto" : "Ingreso"}
              </button>
            ))}
          </div>

          <div>
            <label htmlFor="tx-amount" className="mb-1.5 block text-sm font-medium">
              Importe
            </label>
            <div className="flex items-center rounded-2xl border border-input bg-background px-4 focus-within:ring-2 focus-within:ring-ring">
              <input
                id="tx-amount"
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0,00"
                className="w-full bg-transparent py-3 font-display text-2xl font-semibold outline-none placeholder:text-muted-foreground/50"
              />
              <span className="text-lg text-muted-foreground">€</span>
            </div>
          </div>

          <div>
            <label htmlFor="tx-title" className="mb-1.5 block text-sm font-medium">
              Concepto
            </label>
            <input
              id="tx-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej. Compra semanal"
              className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="tx-cat" className="mb-1.5 block text-sm font-medium">
                Categoría
              </label>
              <select
                id="tx-cat"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              >
                {visibleCategories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="tx-account" className="mb-1.5 block text-sm font-medium">
                Cuenta
              </label>
              <select
                id="tx-account"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              >
                {["Cuenta principal", "Tarjeta débito", "Tarjeta crédito", "Efectivo"].map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-2xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Guardar movimiento
          </button>
        </form>
      </div>
    </div>
  )
}
