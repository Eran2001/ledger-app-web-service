import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, FileDown, MessageSquare, AlertCircle } from 'lucide-react'
import { Topbar } from '@/components/layout/Topbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { InitialsAvatar } from '@/components/shared/InitialsAvatar'
import { Checkbox } from '@/components/ui/checkbox'
import { customers, sales, products, installmentSchedules } from '@/constant/dummy'
import { formatCurrency, cn, formatDate } from '@/lib/utils'
import { differenceInDays } from 'date-fns'

export const OverduePage: React.FC = () => {
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState<'all' | '1-30' | '31-60' | '60+'>('all')
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const navigate = useNavigate()

  const enrichedOverdue = installmentSchedules
    .filter(is => is.status === 'OVERDUE')
    .map(is => {
        const sale = sales.find(s => s.id === is.saleId)
        const customer = customers.find(c => c.id === sale?.customerId)
        const product = products.find(p => p.id === sale?.productId)
        const daysOverdue = differenceInDays(new Date(), new Date(is.dueDate))

        return {
            ...is,
            customerName: customer?.fullName || 'Unknown',
            phone: customer?.phone || 'Unknown',
            productName: product?.name || 'Unknown',
            daysOverdue
        }
    })

  const filteredOverdue = enrichedOverdue.filter(is => {
    const matchesSearch = is.customerName.toLowerCase().includes(search.toLowerCase()) || 
                         is.productName.toLowerCase().includes(search.toLowerCase())
    
    let matchesTab = true;
    if (activeTab === '1-30') matchesTab = is.daysOverdue >= 1 && is.daysOverdue <= 30;
    else if (activeTab === '31-60') matchesTab = is.daysOverdue >= 31 && is.daysOverdue <= 60;
    else if (activeTab === '60+') matchesTab = is.daysOverdue > 60;
                      
    return matchesSearch && matchesTab
  })

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  }

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredOverdue.length) setSelectedIds([])
    else setSelectedIds(filteredOverdue.map(is => is.id))
  }

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      <Topbar 
        pageTitle="Overdue Installments" 
        pageSubtitle="Requires attention" 
        primaryAction={
          <div className="flex gap-2">
            <Button variant="outline" className="h-10 border-slate-200">
               <FileDown className="w-4 h-4 mr-2" />
               Export
            </Button>
            <Button className="bg-[#4F46E5] hover:bg-primary-dark">
               <MessageSquare className="w-4 h-4 mr-2" />
               Send All Reminders
            </Button>
          </div>
        }
      />

      <div className="p-6 overflow-y-auto">
        {/* KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-red-100 p-5 border-l-4 border-l-red-500 shadow-sm">
                <p className="text-[10px] font-bold text-[#475569] uppercase tracking-wider mb-1">Overdue Customers</p>
                <div className="text-3xl font-black text-[#0F172A]">{enrichedOverdue.length}</div>
            </div>
            <div className="bg-white rounded-xl border border-red-100 p-5 border-l-4 border-l-red-500 shadow-sm">
                <p className="text-[10px] font-bold text-[#475569] uppercase tracking-wider mb-1">Total Overdue Amount</p>
                <div className="text-3xl font-black text-red-600">
                    {formatCurrency(enrichedOverdue.reduce((acc, curr) => acc + (curr.expectedAmount - curr.paidAmount), 0))}
                </div>
            </div>
            <div className="bg-white rounded-xl border border-red-100 p-5 border-l-4 border-l-red-500 shadow-sm">
                <p className="text-[10px] font-bold text-[#475569] uppercase tracking-wider mb-1">Longest Overdue</p>
                <div className="text-3xl font-black text-[#0F172A]">{Math.max(...enrichedOverdue.map(is => is.daysOverdue), 0)} Days</div>
                <p className="text-[10px] font-bold text-[#94A3B8] mt-1">{enrichedOverdue.filter(is => is.daysOverdue === Math.max(...enrichedOverdue.map(x => x.daysOverdue), 0))[0]?.customerName}</p>
            </div>
        </div>

        {/* Filters */}
        <div className="mb-6 space-y-4">
            <div className="flex gap-1 bg-slate-200/50 p-1 rounded-lg w-max">
                {(['all', '1-30', '31-60', '60+'] as const).map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                        "px-6 py-1.5 rounded-md text-xs font-bold transition-all capitalize",
                        activeTab === tab 
                            ? "bg-white text-[#0F172A] shadow-sm" 
                            : "text-[#475569] hover:text-[#0F172A]"
                        )}
                    >
                        {tab === 'all' ? 'All' : `${tab} days`}
                    </button>
                ))}
            </div>

            <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                <Input 
                    placeholder="Search by name or product..." 
                    className="pl-10 h-10 border-[#E2E8F0] bg-white"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>
        </div>

        {/* Table Content */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden mb-20">
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-[#F8FAFC] text-[10px] text-[#475569] uppercase tracking-wider font-bold">
                    <tr>
                      <th className="px-5 py-4 border-b w-10">
                        <Checkbox 
                            checked={selectedIds.length === filteredOverdue.length && filteredOverdue.length > 0} 
                            onCheckedChange={toggleSelectAll}
                        />
                      </th>
                      <th className="px-5 py-4 border-b">Customer</th>
                      <th className="px-5 py-4 border-b">Product</th>
                      <th className="px-5 py-4 border-b">Due Date</th>
                      <th className="px-5 py-4 border-b">Days Overdue</th>
                      <th className="px-5 py-4 border-b">Expected</th>
                      <th className="px-5 py-4 border-b text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0]">
                    {filteredOverdue.map((is) => (
                      <tr 
                        key={is.id} 
                        className={cn(
                          "transition-colors group",
                          is.daysOverdue > 60 ? "bg-red-50/30" : "hover:bg-slate-50"
                        )}
                      >
                        <td className="px-5 py-4">
                          <Checkbox 
                            checked={selectedIds.includes(is.id)} 
                            onCheckedChange={() => toggleSelect(is.id)}
                          />
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <InitialsAvatar name={is.customerName} size="sm" />
                            <div className="flex flex-col">
                              <span className="text-sm font-semibold text-[#0F172A]">{is.customerName}</span>
                              <span className="text-[10px] text-[#94A3B8]">{is.phone}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-sm text-[#475569]">{is.productName}</td>
                        <td className="px-5 py-4 text-sm text-[#475569]">{formatDate(is.dueDate)}</td>
                        <td className="px-5 py-4">
                          <span className={cn(
                             "text-xs font-black uppercase tracking-tight",
                             is.daysOverdue > 60 ? "text-red-600" : is.daysOverdue > 30 ? "text-orange-500" : "text-amber-500"
                          )}>
                             {is.daysOverdue} Days
                          </span>
                        </td>
                        <td className="px-5 py-4 text-sm font-bold text-[#0F172A]">{formatCurrency(is.expectedAmount - is.paidAmount)}</td>
                        <td className="px-5 py-4 text-right">
                           <div className="flex gap-2 justify-end">
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="text-xs h-8 border-green-200 text-green-600 hover:bg-green-50"
                                >
                                    <MessageSquare className="w-3.5 h-3.5 mr-1" />
                                    Remind
                                </Button>
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="text-xs h-8"
                                    onClick={() => navigate(`/sales/${is.saleId}`)}
                                >
                                    View
                                </Button>
                           </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
        </div>

        {/* Sticky Actions Bar */}
        {selectedIds.length > 0 && (
            <div className="fixed bottom-6 left-[250px] right-6 z-50 animate-in slide-in-from-bottom duration-300">
                <div className="bg-[#0F172A] text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between border border-white/10">
                    <div className="flex items-center gap-4 px-2">
                        <div className="w-8 h-8 rounded-full bg-[#4F46E5] flex items-center justify-center font-bold text-sm">
                            {selectedIds.length}
                        </div>
                        <span className="font-semibold text-sm">Customers selected for reminders</span>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="ghost" className="text-white hover:bg-white/10" onClick={() => setSelectedIds([])}>Cancel</Button>
                        <Button className="bg-[#4F46E5] hover:bg-primary-dark">Send WhatsApp Reminders</Button>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  )
}
