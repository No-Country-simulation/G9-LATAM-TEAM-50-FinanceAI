"use client"

import { accounts, formatMoney } from "@/lib/finance-data"
import { Landmark, CreditCard, Banknote, Wallet } from "lucide-react"
import { cn } from "@/lib/utils"

const iconByKind: Record<string, typeof Wallet> = {
  Banco: Landmark,
  Débito: CreditCard,
  Crédito: CreditCard,
  Cash: Banknote,
}

export function AccountsPanel() {
  const total = accounts.reduce((s, a) => s + a.balance, 0)

  return (
    <section className="rounded-3xl border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-lg font-semibold tracking-tight">Cuentas</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">Patrimonio total</p>
        </div>
        <span className="font-display text-xl font-semibold tabular-nums">{formatMoney(total)}</span>
      </div>

      <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {accounts.map((a) => {
          const Icon = iconByKind[a.kind] ?? Wallet
          const negative = a.balance < 0
          return (
            <li
              key={a.id}
              className="flex items-center gap-3 rounded-2xl border border-border bg-background p-4"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{a.name}</p>
                <p className="text-xs text-muted-foreground">{a.kind}</p>
              </div>
              <span
                className={cn(
                  "text-sm font-semibold tabular-nums",
                  negative ? "text-expense" : "text-foreground",
                )}
              >
                {formatMoney(a.balance)}
              </span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
