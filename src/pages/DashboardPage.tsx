import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, ArrowRight } from 'lucide-react'
import { Topbar } from '@/components/layout/Topbar'
import { Button } from '@/components/ui/button'
import { InitialsAvatar } from '@/components/shared/InitialsAvatar'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { formatCurrency } from '@/lib/utils'

interface KPICardProps {
  label: string
  value: string
  subText: string
  trend?: { value: string, color: string }
}

const KPICard: React.FC<KPICardProps> = ({ label, value, subText, trend }) => (
  <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 border-l-4 border-l-[#4F46E5] shadow-sm">
    <div className="text-[10px] font-bold text-[#475569] uppercase tracking-wider mb-2">{label}</div>
    <div className="text-2xl font-bold text-[#0F172A]">{value}</div>
    <div className="flex items-center gap-1.5 mt-1">
      {trend && <span className={cn("text-[11px] font-bold", trend.color)}>{trend.value}</span>}
      <span className="text-[11px] text-[#94A3B8]">{subText}</span>
    </div>
  </div>
)

import { cn } from '@/lib/utils'

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate()

  const recentPayments = [
    { name: 'Nimal Perera', product: 'Samsung TV 43"', amount: 4500, date: '18 Apr', status: 'PAID' },
    { name: 'Sunethra De Silva', product: 'LG Fridge 250L', amount: 3200, date: '17 Apr', status: 'PARTIALLY_PAID' },
    { name: 'Roshan Fernando', product: 'Washing Machine', amount: 6000, date: '16 Apr', status: 'PAID' },
    { name: 'Dilini Jayawardena', product: 'Sofa Set 3+1', amount: 2800, date: '15 Apr', status: 'PAID' },
    { name: 'Chamara Bandara', product: 'Air Cooler', amount: 1500, date: '14 Apr', status: 'PENDING' },
  ]

  const overdueInstallments = [
    { name: 'Anura Kumara', product: 'Sony Speaker', days: 72, amount: 7500 },
    { name: 'Priya Wickrama', product: 'Dining Table', days: 45, amount: 5200 },
    { name: 'Tharaka Samaratunge', product: 'Water Pump', days: 18, amount: 2800 },
    { name: 'Malani Gunawardena', product: 'Gas Cooker', days: 12, amount: 3100 },
  ]

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      <Topbar 
        pageTitle="Dashboard" 
        pageSubtitle="April 2026 overview" 
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
        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard 
            label="Total Outstanding" 
            value="LKR 284,500" 
            subText="42 active sales" 
          />
          <KPICard 
            label="Collected this Month" 
            value="LKR 48,200" 
            subText="+12% vs last month"
            trend={{ value: '↑ 12%', color: 'text-green-600' }}
          />
          <KPICard 
            label="Overdue Installments" 
            value="9" 
            subText="3 over 60 days"
            trend={{ value: '!!', color: 'text-red-500' }}
          />
          <KPICard 
            label="New Sales This Month" 
            value="7" 
            subText="LKR 92,000 total value"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          {/* Recent Payments */}
          <div className="xl:col-span-3 bg-white rounded-xl border border-[#E2E8F0] shadow-sm flex flex-col">
            <div className="p-5 border-b border-[#E2E8F0] flex items-center justify-between">
              <h3 className="font-semibold text-[#0F172A]">Recent Payments</h3>
              <button 
                onClick={() => navigate('/sales')}
                className="text-[#4F46E5] text-xs font-bold flex items-center gap-1 hover:underline"
              >
                View All <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#F8FAFC] text-[10px] text-[#475569] uppercase tracking-widest font-bold">
                  <tr>
                    <th className="px-5 py-3 border-b">Customer</th>
                    <th className="px-5 py-3 border-b">Product</th>
                    <th className="px-5 py-3 border-b">Amount</th>
                    <th className="px-5 py-3 border-b">Date</th>
                    <th className="px-5 py-3 border-b">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {recentPayments.map((p, idx) => (
                    <tr key={idx} className="hover:bg-[#F8FAFC] transition-colors group">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <InitialsAvatar name={p.name} size="sm" />
                          <span className="text-sm font-semibold text-[#0F172A]">{p.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-sm text-[#475569]">{p.product}</td>
                      <td className="px-5 py-3.5 text-sm font-semibold text-[#0F172A]">{formatCurrency(p.amount)}</td>
                      <td className="px-5 py-3.5 text-sm text-[#475569]">{p.date}</td>
                      <td className="px-5 py-3.5">
                        <StatusBadge status={p.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Overdue List */}
          <div className="xl:col-span-2 bg-white rounded-xl border border-[#E2E8F0] shadow-sm flex flex-col">
            <div className="p-5 border-b border-[#E2E8F0] flex items-center justify-between">
              <h3 className="font-semibold text-[#0F172A]">Overdue Installments</h3>
              <button 
                onClick={() => navigate('/overdue')}
                className="text-red-500 text-xs font-bold flex items-center gap-1 hover:underline text-red-600"
              >
                Send Reminders <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="flex-1 divide-y divide-[#E2E8F0]">
              {overdueInstallments.map((o, idx) => (
                <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <InitialsAvatar name={o.name} size="sm" className="bg-red-50 text-red-600 border border-red-100" />
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-[#0F172A] group-hover:text-[#4F46E5] transition-colors">{o.name}</span>
                      <span className="text-[11px] text-[#94A3B8]">{o.product}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] font-bold text-red-500 uppercase tracking-tighter">{o.days} DAYS OVERDUE</div>
                    <div className="text-sm font-bold text-[#0F172A]">{formatCurrency(o.amount)}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-[#F8FAFC] rounded-b-xl border-t">
              <p className="text-[11px] text-center text-[#94A3B8]">Manual reminders recommended for 60+ days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
