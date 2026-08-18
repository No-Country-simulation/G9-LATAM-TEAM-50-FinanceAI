"use client"

import { Search, Plus, Bell, ArrowDownLeft } from "lucide-react"

const titles: Record<string, { title: string; subtitle: string }> = {
  resumen: { title: "Resumen", subtitle: "Una foto clara de tu mes" },
  movimientos: { title: "Movimientos", subtitle: "Todas tus entradas y salidas" },
  presupuestos: { title: "Presupuestos", subtitle: "Controla tus límites" },
  calendario: { title: "Calendario", subtitle: "Tu dinero, día a día" },
  cuentas: { title: "Cuentas", subtitle: "Saldos y balances" },
}

export function Topbar({
  active,
  onAdd,
  onAddIncome,
}: {
  active: string
  onAdd: () => void
  onAddIncome: () => void
}) {
  const t = titles[active] ?? titles.resumen
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          {t.title}
        </h1>
        <p className="mt-0.5 text-sm text-muted-foreground">{t.subtitle}</p>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative hidden md:block">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="Buscar…"
            aria-label="Buscar movimientos"
            className="w-44 rounded-full border border-border bg-card py-2.5 pl-9 pr-4 text-sm outline-none transition-colors focus:ring-2 focus:ring-ring"
          />
        </div>
        <button
          aria-label="Notificaciones"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-secondary"
        >
          <Bell className="h-[18px] w-[18px]" aria-hidden="true" />
        </button>
        <button
          onClick={onAddIncome}
          className="flex items-center gap-2 rounded-full bg-income px-5 py-2.5 text-sm font-semibold text-income-foreground transition-opacity hover:opacity-90"
        >
          <ArrowDownLeft className="h-4 w-4" aria-hidden="true" />
          Ingresos
        </button>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Gasto
        </button>
      </div>
    </header>
  )
}
