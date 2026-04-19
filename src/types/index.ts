export type Role = 'ADMIN' | 'STAFF' | 'VIEWER'
export type SaleStatus = 'ACTIVE' | 'COMPLETED' | 'WRITTEN_OFF'
export type InstallmentStatus = 
  'PENDING' | 'PARTIALLY_PAID' | 'PAID' | 'OVERDUE' | 'WRITTEN_OFF'

export interface User {
  id: string
  name: string
  email: string
  role: Role
  status: 'active' | 'inactive'
  lastLogin: string
}

export interface PendingRegistration {
  id: string
  name: string
  email: string
  phone: string
  requestedRole: 'STAFF' | 'VIEWER'
  message: string
  requestedAt: string
}

export interface Customer {
  id: string
  fullName: string
  phone: string
  nic: string
  address: string
  createdAt: string
  email?: string
}

export interface Product {
  id: string
  name: string
  category: 'Electronics' | 'Appliances' | 'Furniture' | 'Hardware' | 'Other'
  basePrice: number
  activeSales: number
  createdAt: string
}

export interface Sale {
  id: string
  customerId: string
  productId: string
  soldPrice: number
  downPayment: number
  monthlyAmount: number
  totalMonths: number
  saleDate: string
  status: SaleStatus
  notes?: string
}

export interface InstallmentSchedule {
  id: string
  saleId: string
  installmentNumber: number
  dueDate: string
  expectedAmount: number
  paidAmount: number
  status: InstallmentStatus
}

export interface Payment {
  id: string
  installmentScheduleId: string
  paidAmount: number
  paidDate: string
  recordedBy: string
  notes?: string
}
