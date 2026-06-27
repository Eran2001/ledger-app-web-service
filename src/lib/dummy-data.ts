import type {
  User,
  Customer,
  Product,
  Sale,
  InstallmentSchedule,
  Payment,
  PendingRegistration,
  InstallmentStatus,
} from "@/lib/types"
import { addMonths, format, subDays, subMonths } from "date-fns"

const today = new Date(2026, 4, 3) // 3 May 2026 - matches today's date

const iso = (d: Date) => format(d, "yyyy-MM-dd")

export const users: User[] = [
  {
    id: "u1",
    name: "Kamal Silva",
    email: "kamal@silvatraders.lk",
    role: "ADMIN",
    status: "active",
    lastLogin: iso(subDays(today, 0)),
  },
  {
    id: "u2",
    name: "Nirosha Perera",
    email: "nirosha@silvatraders.lk",
    role: "STAFF",
    status: "active",
    lastLogin: iso(subDays(today, 1)),
  },
  {
    id: "u3",
    name: "Asanka De Silva",
    email: "asanka@silvatraders.lk",
    role: "VIEWER",
    status: "active",
    lastLogin: iso(subDays(today, 5)),
  },
]

export const pendingRegistrations: PendingRegistration[] = [
  {
    id: "pr1",
    name: "Sahan Wijesinghe",
    email: "sahan.w@gmail.com",
    phone: "+94 77 234 5678",
    requestedRole: "STAFF",
    message: "I have 3 years experience in retail collection management at Abans.",
    requestedAt: iso(subDays(today, 2)),
  },
  {
    id: "pr2",
    name: "Madhavi Senanayake",
    email: "madhavi.s@yahoo.com",
    phone: "+94 71 998 7654",
    requestedRole: "VIEWER",
    message: "Auditor for the Silva Traders accounts. Need read-only access for monthly reports.",
    requestedAt: iso(subDays(today, 6)),
  },
]

export const customers: Customer[] = [
  {
    id: "c1",
    fullName: "Nimal Perera",
    phone: "+94 77 123 4567",
    nic: "198512345678",
    address: "No 45, Galle Road, Colombo 03",
    city: "Colombo",
    createdAt: iso(subMonths(today, 8)),
    email: "nimal.p@gmail.com",
  },
  {
    id: "c2",
    fullName: "Sunethra De Silva",
    phone: "+94 71 234 5678",
    nic: "197823456789",
    address: "12/A, Kandy Road, Kadawatha",
    city: "Kadawatha",
    createdAt: iso(subMonths(today, 6)),
  },
  {
    id: "c3",
    fullName: "Roshan Fernando",
    phone: "+94 76 345 6789",
    nic: "199034567890",
    address: "88, Negombo Road, Wattala",
    city: "Wattala",
    createdAt: iso(subMonths(today, 5)),
    email: "roshan.f@gmail.com",
  },
  {
    id: "c4",
    fullName: "Dilini Jayawardena",
    phone: "+94 70 456 7890",
    nic: "199245678901",
    address: "23, Lake Road, Nugegoda",
    city: "Nugegoda",
    createdAt: iso(subMonths(today, 4)),
  },
  {
    id: "c5",
    fullName: "Chamara Bandara",
    phone: "+94 77 567 8901",
    nic: "198856789012",
    address: "67, Peradeniya Road, Kandy",
    city: "Kandy",
    createdAt: iso(subMonths(today, 3)),
    email: "chamara.b@hotmail.com",
  },
  {
    id: "c6",
    fullName: "Anura Kumara",
    phone: "+94 71 678 9012",
    nic: "198067890123",
    address: "9, Main Street, Matara",
    city: "Matara",
    createdAt: iso(subMonths(today, 12)),
  },
  {
    id: "c7",
    fullName: "Priya Wickrama",
    phone: "+94 76 789 0123",
    nic: "199578901234",
    address: "34, Temple Road, Galle",
    city: "Galle",
    createdAt: iso(subMonths(today, 2)),
    email: "priya.w@gmail.com",
  },
  {
    id: "c8",
    fullName: "Tharaka Samaratunge",
    phone: "+94 70 890 1234",
    nic: "198689012345",
    address: "112, Park Avenue, Battaramulla",
    city: "Battaramulla",
    createdAt: iso(subMonths(today, 10)),
  },
]

export const products: Product[] = [
  { id: "p1", name: 'Samsung TV 43"', category: "Electronics", basePrice: 85000, activeSales: 2, createdAt: iso(subMonths(today, 14)) },
  { id: "p2", name: "LG Fridge 250L", category: "Appliances", basePrice: 120000, activeSales: 1, createdAt: iso(subMonths(today, 12)) },
  { id: "p3", name: "Washing Machine", category: "Appliances", basePrice: 95000, activeSales: 1, createdAt: iso(subMonths(today, 10)) },
  { id: "p4", name: "Sofa Set 3+1", category: "Furniture", basePrice: 65000, activeSales: 1, createdAt: iso(subMonths(today, 9)) },
  { id: "p5", name: "Air Cooler", category: "Electronics", basePrice: 35000, activeSales: 0, createdAt: iso(subMonths(today, 8)) },
  { id: "p6", name: "Sony Speaker", category: "Electronics", basePrice: 45000, activeSales: 1, createdAt: iso(subMonths(today, 7)) },
  { id: "p7", name: "Dining Table", category: "Furniture", basePrice: 55000, activeSales: 0, createdAt: iso(subMonths(today, 6)) },
  { id: "p8", name: "Water Pump", category: "Hardware", basePrice: 28000, activeSales: 1, createdAt: iso(subMonths(today, 5)) },
  { id: "p9", name: "Gas Cooker", category: "Appliances", basePrice: 32000, activeSales: 1, createdAt: iso(subMonths(today, 4)) },
  { id: "p10", name: "Rice Cooker", category: "Appliances", basePrice: 18000, activeSales: 0, createdAt: iso(subMonths(today, 3)) },
]

interface SaleSpec {
  id: string
  customerId: string
  productId: string
  soldPrice: number
  downPayment: number
  totalMonths: number
  monthsAgo: number
  paidUpTo: number // installments paid (PAID status)
  partialOnNext?: number // partial amount paid on the next installment
  status: "ACTIVE" | "COMPLETED" | "WRITTEN_OFF"
  notes?: string
}

const saleSpecs: SaleSpec[] = [
  // 1. Active, perfectly on track
  { id: "s1", customerId: "c1", productId: "p1", soldPrice: 92000, downPayment: 20000, totalMonths: 12, monthsAgo: 5, paidUpTo: 5, status: "ACTIVE", notes: "Customer prefers WhatsApp reminders." },
  // 2. Active, has overdue installments
  { id: "s2", customerId: "c2", productId: "p2", soldPrice: 130000, downPayment: 30000, totalMonths: 10, monthsAgo: 6, paidUpTo: 3, status: "ACTIVE", notes: "Late on payment - call before reminder." },
  // 3. Active, partial payment on current installment
  { id: "s3", customerId: "c3", productId: "p3", soldPrice: 100000, downPayment: 20000, totalMonths: 12, monthsAgo: 4, paidUpTo: 3, partialOnNext: 3000, status: "ACTIVE" },
  // 4. Completed
  { id: "s4", customerId: "c6", productId: "p4", soldPrice: 70000, downPayment: 15000, totalMonths: 8, monthsAgo: 10, paidUpTo: 8, status: "COMPLETED", notes: "Repeat customer." },
  // 5. Active, recent sale - no overdue yet
  { id: "s5", customerId: "c5", productId: "p6", soldPrice: 48000, downPayment: 10000, totalMonths: 6, monthsAgo: 2, paidUpTo: 2, status: "ACTIVE" },
  // 6. Active, severely overdue (60+ days)
  { id: "s6", customerId: "c4", productId: "p9", soldPrice: 35000, downPayment: 8000, totalMonths: 6, monthsAgo: 5, paidUpTo: 1, status: "ACTIVE", notes: "Two reminders sent. No response." },
  // 7. Active, on schedule
  { id: "s7", customerId: "c7", productId: "p8", soldPrice: 30000, downPayment: 5000, totalMonths: 5, monthsAgo: 3, paidUpTo: 3, status: "ACTIVE" },
  // 8. Active, two months overdue
  { id: "s8", customerId: "c8", productId: "p1", soldPrice: 88000, downPayment: 20000, totalMonths: 10, monthsAgo: 4, paidUpTo: 1, status: "ACTIVE" },
]

function buildSalesAndSchedules() {
  const sales: Sale[] = []
  const schedules: InstallmentSchedule[] = []
  const payments: Payment[] = []

  saleSpecs.forEach((spec) => {
    const remaining = spec.soldPrice - spec.downPayment
    const monthlyAmount = Math.ceil(remaining / spec.totalMonths)
    const saleDate = subMonths(today, spec.monthsAgo)

    sales.push({
      id: spec.id,
      customerId: spec.customerId,
      productId: spec.productId,
      soldPrice: spec.soldPrice,
      downPayment: spec.downPayment,
      monthlyAmount,
      totalMonths: spec.totalMonths,
      saleDate: iso(saleDate),
      status: spec.status,
      notes: spec.notes,
    })

    for (let i = 1; i <= spec.totalMonths; i++) {
      const dueDate = addMonths(saleDate, i)
      const isPaid = i <= spec.paidUpTo
      const isPartial = i === spec.paidUpTo + 1 && spec.partialOnNext
      const isOverdue = !isPaid && !isPartial && dueDate < today

      let status: InstallmentStatus = "PENDING"
      let paidAmount = 0

      if (isPaid) {
        status = "PAID"
        paidAmount = monthlyAmount
      } else if (isPartial) {
        status = "PARTIALLY_PAID"
        paidAmount = spec.partialOnNext as number
      } else if (isOverdue) {
        status = "OVERDUE"
      }

      const schedId = `${spec.id}-i${i}`
      schedules.push({
        id: schedId,
        saleId: spec.id,
        installmentNumber: i,
        dueDate: iso(dueDate),
        expectedAmount: monthlyAmount,
        paidAmount,
        status,
      })

      if (paidAmount > 0) {
        const paidDate = isPaid ? iso(addMonths(saleDate, i)) : iso(subDays(today, 8))
        payments.push({
          id: `pay-${spec.id}-${i}`,
          installmentScheduleId: schedId,
          paidAmount,
          paidDate,
          recordedBy: i % 2 === 0 ? "Nirosha Perera" : "Kamal Silva",
          notes: isPartial ? "Customer requested 5-day extension for the balance." : undefined,
        })
      }
    }
  })

  return { sales, schedules, payments }
}

const built = buildSalesAndSchedules()

export const sales: Sale[] = built.sales
export const installmentSchedules: InstallmentSchedule[] = built.schedules
export const payments: Payment[] = built.payments

// Lookup helpers
export const customerById = (id: string) => customers.find((c) => c.id === id)
export const productById = (id: string) => products.find((p) => p.id === id)
export const saleById = (id: string) => sales.find((s) => s.id === id)
export const userById = (id: string) => users.find((u) => u.id === id)
export const schedulesForSale = (saleId: string) =>
  installmentSchedules.filter((s) => s.saleId === saleId).sort((a, b) => a.installmentNumber - b.installmentNumber)
export const paymentsForSale = (saleId: string) => {
  const ids = new Set(installmentSchedules.filter((s) => s.saleId === saleId).map((s) => s.id))
  return payments
    .filter((p) => ids.has(p.installmentScheduleId))
    .sort((a, b) => new Date(b.paidDate).getTime() - new Date(a.paidDate).getTime())
}

export function saleStats(saleId: string) {
  const scheds = schedulesForSale(saleId)
  const sale = saleById(saleId)
  if (!sale) return { totalPaid: 0, outstanding: 0, paidCount: 0, totalCount: 0, nextDue: undefined as string | undefined, hasOverdue: false }
  const totalPaid = sale.downPayment + scheds.reduce((sum, s) => sum + s.paidAmount, 0)
  const outstanding = Math.max(0, sale.soldPrice - totalPaid)
  const paidCount = scheds.filter((s) => s.status === "PAID").length
  const next = scheds.find((s) => s.status !== "PAID")
  const hasOverdue = scheds.some((s) => s.status === "OVERDUE")
  return { totalPaid, outstanding, paidCount, totalCount: scheds.length, nextDue: next?.dueDate, hasOverdue }
}

export function customerStats(customerId: string) {
  const customerSales = sales.filter((s) => s.customerId === customerId)
  let outstanding = 0
  let totalPaid = 0
  let activeSalesCount = 0
  let hasOverdue = false
  let nextDue: string | undefined = undefined
  customerSales.forEach((s) => {
    const stat = saleStats(s.id)
    outstanding += stat.outstanding
    totalPaid += stat.totalPaid
    if (s.status === "ACTIVE") activeSalesCount++
    if (stat.hasOverdue) hasOverdue = true
    if (stat.nextDue) {
      if (!nextDue || new Date(stat.nextDue) < new Date(nextDue)) {
        nextDue = stat.nextDue
      }
    }
  })
  return { outstanding, totalPaid, activeSalesCount, hasOverdue, totalSales: customerSales.length, nextDue }
}
