"use client"

import { cn } from "@/lib/utils"
import { LayoutDashboard, ArrowLeftRight, PieChart, CalendarDays, Wallet } from "lucide-react"

const nav = [
  { id: "resumen", label: "Resumen", icon: LayoutDashboard },
  { id: "movimientos", label: "Movim.", icon: ArrowLeftRight },
  { id: "presupuestos", label: "Presup.", icon: PieChart },
  { id: "calendario", label: "Calend.", icon: CalendarDays },
  { id: "cuentas", label: "Cuentas", icon: Wallet },
]

export function MobileNav({
  active,
  onChange,
}: {
  active: string
  onChange: (id: string) => void
}) {
  return (
    <nav
      aria-label="Navegación"
      className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-around border-t border-border bg-sidebar/95 px-2 py-2 backdrop-blur lg:hidden"
    >
      {nav.map((item) => {
        const Icon = item.icon
        const isActive = active === item.id
        return (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            className={cn(
              "flex flex-1 flex-col items-center gap-1 rounded-xl py-1.5 text-[11px] font-medium transition-colors",
              isActive ? "text-foreground" : "text-muted-foreground",
            )}
            aria-current={isActive ? "page" : undefined}
          >
            <Icon
              className={cn("h-5 w-5", isActive && "text-foreground")}
              aria-hidden="true"
            />
            {item.label}
          </button>
        )
      })}
    </nav>
  )
}
