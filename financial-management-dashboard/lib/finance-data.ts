import type { LucideIcon } from "lucide-react"
import {
  ShoppingCart,
  Utensils,
  Car,
  Home,
  Zap,
  Clapperboard,
  HeartPulse,
  Briefcase,
  Gift,
  Coffee,
  Plane,
  Wallet,
} from "lucide-react"

export type TxType = "income" | "expense"

export type Category = {
  id: string
  label: string
  icon: LucideIcon
  type: TxType
}

export const categories: Category[] = [
  { id: "salary", label: "Salario", icon: Briefcase, type: "income" },
  { id: "freelance", label: "Freelance", icon: Wallet, type: "income" },
  { id: "gifts", label: "Regalos", icon: Gift, type: "income" },
  { id: "groceries", label: "Supermercado", icon: ShoppingCart, type: "expense" },
  { id: "dining", label: "Restaurantes", icon: Utensils, type: "expense" },
  { id: "transport", label: "Transporte", icon: Car, type: "expense" },
  { id: "rent", label: "Alquiler", icon: Home, type: "expense" },
  { id: "utilities", label: "Servicios", icon: Zap, type: "expense" },
  { id: "fun", label: "Ocio", icon: Clapperboard, type: "expense" },
  { id: "health", label: "Salud", icon: HeartPulse, type: "expense" },
  { id: "coffee", label: "Café", icon: Coffee, type: "expense" },
  { id: "travel", label: "Viajes", icon: Plane, type: "expense" },
]

export function categoryById(id: string): Category {
  return categories.find((c) => c.id === id) ?? categories[0]
}

export type Transaction = {
  id: string
  categoryId: string
  title: string
  amount: number
  date: string // ISO yyyy-mm-dd
  account: string
}

// Current month reference
const now = new Date()
const y = now.getFullYear()
const m = now.getMonth()
function d(day: number) {
  return new Date(y, m, day).toISOString().slice(0, 10)
}

export const transactions: Transaction[] = [
  { id: "t1", categoryId: "salary", title: "Nómina mensual", amount: 3200, date: d(1), account: "Cuenta principal" },
  { id: "t2", categoryId: "rent", title: "Alquiler piso", amount: -1050, date: d(2), account: "Cuenta principal" },
  { id: "t3", categoryId: "groceries", title: "Mercadona", amount: -86.4, date: d(3), account: "Tarjeta débito" },
  { id: "t4", categoryId: "coffee", title: "Café con Marta", amount: -4.2, date: d(3), account: "Efectivo" },
  { id: "t5", categoryId: "transport", title: "Recarga metro", amount: -30, date: d(4), account: "Tarjeta débito" },
  { id: "t6", categoryId: "dining", title: "Cena tailandesa", amount: -42.5, date: d(5), account: "Tarjeta crédito" },
  { id: "t7", categoryId: "freelance", title: "Proyecto web", amount: 640, date: d(6), account: "Cuenta principal" },
  { id: "t8", categoryId: "utilities", title: "Factura luz", amount: -74.9, date: d(7), account: "Cuenta principal" },
  { id: "t9", categoryId: "fun", title: "Cine + palomitas", amount: -21, date: d(8), account: "Tarjeta débito" },
  { id: "t10", categoryId: "groceries", title: "Fruta y verdura", amount: -33.15, date: d(9), account: "Efectivo" },
  { id: "t11", categoryId: "health", title: "Farmacia", amount: -18.7, date: d(10), account: "Tarjeta débito" },
  { id: "t12", categoryId: "coffee", title: "Café oficina", amount: -3.5, date: d(11), account: "Efectivo" },
  { id: "t13", categoryId: "dining", title: "Comida trabajo", amount: -13.9, date: d(12), account: "Tarjeta crédito" },
  { id: "t14", categoryId: "travel", title: "Tren fin de semana", amount: -58, date: d(13), account: "Tarjeta crédito" },
  { id: "t15", categoryId: "groceries", title: "Compra semanal", amount: -94.3, date: d(14), account: "Tarjeta débito" },
  { id: "t16", categoryId: "gifts", title: "Reembolso amigo", amount: 45, date: d(15), account: "Efectivo" },
  { id: "t17", categoryId: "utilities", title: "Internet", amount: -39.99, date: d(16), account: "Cuenta principal" },
  { id: "t18", categoryId: "fun", title: "Suscripción música", amount: -10.99, date: d(17), account: "Tarjeta crédito" },
  { id: "t19", categoryId: "transport", title: "Gasolina", amount: -55, date: d(18), account: "Tarjeta débito" },
  { id: "t20", categoryId: "dining", title: "Brunch domingo", amount: -28.5, date: d(20), account: "Tarjeta crédito" },
  { id: "t21", categoryId: "coffee", title: "Café especial", amount: -5.8, date: d(21), account: "Efectivo" },
  { id: "t22", categoryId: "groceries", title: "Supermercado", amount: -61.2, date: d(22), account: "Tarjeta débito" },
]

export type Budget = {
  categoryId: string
  limit: number
}

export const budgets: Budget[] = [
  { categoryId: "groceries", limit: 400 },
  { categoryId: "dining", limit: 150 },
  { categoryId: "transport", limit: 120 },
  { categoryId: "fun", limit: 80 },
  { categoryId: "coffee", limit: 40 },
]

export type Account = {
  id: string
  name: string
  balance: number
  kind: string
}

export const accounts: Account[] = [
  { id: "a1", name: "Cuenta principal", balance: 4820.55, kind: "Banco" },
  { id: "a2", name: "Tarjeta débito", balance: 640.1, kind: "Débito" },
  { id: "a3", name: "Tarjeta crédito", balance: -312.4, kind: "Crédito" },
  { id: "a4", name: "Efectivo", balance: 95.0, kind: "Cash" },
]

// 6-month history for the trend chart
export const monthlyHistory = [
  { month: "Feb", income: 3450, expense: 2380 },
  { month: "Mar", income: 3610, expense: 2510 },
  { month: "Abr", income: 3200, expense: 2740 },
  { month: "May", income: 3980, expense: 2290 },
  { month: "Jun", income: 3540, expense: 2620 },
  { month: "Jul", income: 3885, expense: 1880 },
]

export function formatMoney(n: number, withSign = false): string {
  const abs = Math.abs(n)
  const formatted = abs.toLocaleString("es-ES", {
    minimumFractionDigits: abs % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })
  const sign = withSign ? (n < 0 ? "−" : "+") : n < 0 ? "−" : ""
  return `${sign}${formatted} €`
}

export const monthName = now.toLocaleDateString("es-ES", { month: "long", year: "numeric", timeZone: "UTC" })

// Deterministic day label (forces UTC so server and client render identically)
export function formatDayLabel(isoDate: string): string {
  const [yy, mm, dd] = isoDate.split("-").map(Number)
  const date = new Date(Date.UTC(yy, mm - 1, dd))
  return date.toLocaleDateString("es-ES", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  })
}
