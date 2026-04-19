import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Plus, ArrowLeft } from 'lucide-react'
import { Topbar } from '@/components/layout/Topbar'
import { Button } from '@/components/ui/button'
import { InitialsAvatar } from '@/components/shared/InitialsAvatar'
import { StatPill } from '@/components/shared/StatPill'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { customers, sales, installmentSchedules, products } from '@/data/dummy'
import { formatCurrency, cn, formatDate } from '@/lib/utils'
import { Progress } from '@/components/ui/progress'

export const CustomerDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'sales' | 'history'>('sales')

  const customer = customers.find(c => c.id === id)
  if (!customer) return <div>Customer not found</div>

  const customerSales = sales.filter(s => s.customerId === id)
  const activeSales = customerSales.filter(s => s.status === 'ACTIVE')
  
  // Calculate totals
  const totalOutstanding = installmentSchedules
    .filter(is => customerSales.map(s => s.id).includes(is.saleId))
    .reduce((acc, curr) => acc + (curr.expectedAmount - curr.paidAmount), 0)

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      <Topbar 
        pageTitle={customer.fullName} 
        pageSubtitle="Customer Profile" 
        primaryAction={
          <Button 
            className="bg-[#4F46E5] hover:bg-primary-dark"
            onClick={() => navigate('/sales/new')}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Sale
          </Button>
        }
      />

      <div className="p-6 overflow-y-auto">
        <button 
          onClick={() => navigate('/customers')}
          className="mb-4 text-xs font-bold text-[#4F46E5] flex items-center gap-1 hover:translate-x-[-4px] transition-transform"
        >
          <ArrowLeft className="w-3 h-3" /> Back to list
        </button>

        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 mb-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-[100px] -z-0"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
            <InitialsAvatar name={customer.fullName} size="lg" className="shadow-xl shadow-indigo-100 ring-4 ring-white" />
            
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-[#0F172A]">{customer.fullName}</h2>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1 mt-1 font-medium">
                <span className="text-sm font-mono text-[#475569]">NIC: {customer.nic}</span>
                <span className="text-sm text-[#475569]">Phone: {customer.phone}</span>
              </div>
              <p className="text-sm text-[#94A3B8] mt-2 max-w-md">{customer.address}</p>
            </div>

            <div className="flex flex-col gap-2 shrink-0">
               <StatPill label={`${activeSales.length} Active Sales`} color="indigo" className="py-2" />
               <StatPill label={`${formatCurrency(totalOutstanding)} Outstanding`} color="amber" className="py-2" />
               <StatPill label={`Since ${formatDate(customer.createdAt)}`} color="gray" className="py-2" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-[#E2E8F0] mb-6 flex gap-8 px-2">
          <button 
            onClick={() => setActiveTab('sales')}
            className={cn(
                "pb-3 text-sm font-bold border-b-2 transition-all",
                activeTab === 'sales' ? "border-[#4F46E5] text-[#4F46E5]" : "border-transparent text-[#94A3B8] hover:text-[#475569]"
            )}
          >
            Active Sales
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={cn(
                "pb-3 text-sm font-bold border-b-2 transition-all",
                activeTab === 'history' ? "border-[#4F46E5] text-[#4F46E5]" : "border-transparent text-[#94A3B8] hover:text-[#475569]"
            )}
          >
            Payment History
          </button>
        </div>

        {activeTab === 'sales' && (
          <div className="space-y-4">
            {activeSales.length > 0 ? activeSales.map((sale) => {
              const product = products.find(p => p.id === sale.productId)
              const schedules = installmentSchedules.filter(is => is.saleId === sale.id)
              const paidCount = schedules.filter(is => is.status === 'PAID').length
              const totalAmount = schedules.reduce((acc, curr) => acc + curr.expectedAmount, 0)
              const paidAmount = schedules.reduce((acc, curr) => acc + curr.paidAmount, 0)
              const remaining = totalAmount - paidAmount
              
              return (
                <div key={sale.id} className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h4 className="text-lg font-bold text-[#0F172A]">{product?.name}</h4>
                      <StatPill label={product?.category || ""} color="gray" className="mt-1" />
                    </div>
                    <StatusBadge status={sale.status} />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 text-sm font-medium mb-6">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-[#94A3B8] uppercase tracking-wider mb-0.5">Sold Price</span>
                      <span className="text-[#475569]">{formatCurrency(sale.soldPrice)}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-[#94A3B8] uppercase tracking-wider mb-0.5">Down Payment</span>
                      <span className="text-[#475569]">{formatCurrency(sale.downPayment)}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-[#94A3B8] uppercase tracking-wider mb-0.5">Monthly Payment</span>
                      <span className="text-[#475569]">{formatCurrency(sale.monthlyAmount)}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex justify-between items-center text-xs mb-2">
                       <span className="text-[#475569] font-semibold">{paidCount} of {sale.totalMonths} installments paid</span>
                       <span className="text-[#4F46E5] font-bold">{formatCurrency(remaining)} remaining</span>
                    </div>
                    <Progress value={(paidCount / sale.totalMonths) * 100} className="h-2 bg-indigo-50" />
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                    <span className="text-[11px] text-[#94A3B8] items-center flex gap-1 font-medium">
                       Next due: <span className="text-[#475569] font-bold">18 May 2026</span> · {formatCurrency(sale.monthlyAmount)}
                    </span>
                    <button 
                      onClick={() => navigate(`/sales/${sale.id}`)}
                      className="text-sm font-bold text-[#4F46E5] hover:underline"
                    >
                      View Full Details →
                    </button>
                  </div>
                </div>
              )
            }) : (
                <div className="text-center py-10 bg-white rounded-xl border border-dashed border-slate-200">
                    <p className="text-slate-400 font-medium">No active sales for this customer.</p>
                </div>
            )}
          </div>
        )}

        {activeTab === 'history' && (
           <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden">
               <table className="w-full text-left">
                  <thead className="bg-[#F8FAFC] text-[10px] text-[#475569] uppercase tracking-wider font-bold">
                    <tr>
                      <th className="px-5 py-4 border-b">Date</th>
                      <th className="px-5 py-4 border-b">Product</th>
                      <th className="px-5 py-4 border-b">Amount</th>
                      <th className="px-5 py-4 border-b">Recorded By</th>
                      <th className="px-5 py-4 border-b">Note</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0]">
                    <tr className="hover:bg-slate-50">
                        <td className="px-5 py-4 text-sm text-[#475569]">18 Apr 2026</td>
                        <td className="px-5 py-4 text-sm font-semibold text-[#0F172A]">Samsung TV 43"</td>
                        <td className="px-5 py-4 text-sm font-bold text-[#4F46E5]">LKR 3,500</td>
                        <td className="px-5 py-4 text-sm text-[#475569]">Kamal Silva</td>
                        <td className="px-5 py-4 text-xs text-[#94A3B8]">Customer paid partial</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                        <td className="px-5 py-4 text-sm text-[#475569]">12 Mar 2026</td>
                        <td className="px-5 py-4 text-sm font-semibold text-[#0F172A]">Samsung TV 43"</td>
                        <td className="px-5 py-4 text-sm font-bold text-[#4F46E5]">LKR 5,000</td>
                        <td className="px-5 py-4 text-sm text-[#475569]">Kamal Silva</td>
                        <td className="px-5 py-4 text-xs text-[#94A3B8]">-</td>
                    </tr>
                  </tbody>
               </table>
           </div>
        )}
      </div>
    </div>
  )
}
