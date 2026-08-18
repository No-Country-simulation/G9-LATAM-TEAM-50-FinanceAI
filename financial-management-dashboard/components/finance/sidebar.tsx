"use client"

import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  ArrowLeftRight,
  PieChart,
  CalendarDays,
  Wallet,
  Settings,
} from "lucide-react"

const nav = [
  { id: "resumen", label: "Resumen", icon: LayoutDashboard },
  { id: "movimientos", label: "Movimientos", icon: ArrowLeftRight },
  { id: "presupuestos", label: "Presupuestos", icon: PieChart },
  { id: "calendario", label: "Calendario", icon: CalendarDays },
  { id: "cuentas", label: "Cuentas", icon: Wallet },
]

export function Sidebar({
  active,
  onChange,
}: {
  active: string
  onChange: (id: string) => void
}) {
  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col justify-between border-r border-border bg-sidebar px-5 py-6">
      <div>
        <div className="flex items-center gap-2.5 px-1.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Wallet className="h-5 w-5" aria-hidden="true" />
          </div>
          <span className="font-display text-xl font-semibold tracking-tight">Saldo</span>
        </div>

        <nav className="mt-10 flex flex-col gap-1" aria-label="Navegación principal">
          {nav.map((item) => {
            const Icon = item.icon
            const isActive = active === item.id
            return (
              <button
                key={item.id}
                onClick={() => onChange(item.id)}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                {item.label}
              </button>
            )
          })}
        </nav>
      </div>

      <div className="space-y-4">
        <button className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
          <Settings className="h-[18px] w-[18px]" aria-hidden="true" />
          Ajustes
        </button>
        <div className="flex items-center gap-3 rounded-2xl bg-secondary p-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-accent-foreground font-display text-sm font-semibold">
            E
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">Elvin</p>
            <p className="truncate text-xs text-muted-foreground">Elvin@saldo.app</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
