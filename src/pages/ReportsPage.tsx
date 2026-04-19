import React from 'react'
import { FileText, FileDown, TrendingUp, TrendingDown } from 'lucide-react'
import { Topbar } from '@/components/layout/Topbar'
import { Button } from '@/components/ui/button'
import { InitialsAvatar } from '@/components/shared/InitialsAvatar'
import { Progress } from '@/components/ui/progress'
import { formatCurrency } from '@/lib/utils'

const ReportCard: React.FC<{ label: string, value: string, sub?: React.ReactNode }> = ({ label, value, sub }) => (
  <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-sm">
    <p className="text-[10px] font-bold text-[#475569] uppercase tracking-wider mb-2">{label}</p>
    <div className="text-2xl font-black text-[#0F172A]">{value}</div>
    {sub && <div className="mt-2">{sub}</div>}
  </div>
)

export const ReportsPage: React.FC = () => {
  const chartData = [
    { label: 'Nov', expected: 48000, collected: 41200 },
    { label: 'Dec', expected: 52000, collected: 44800 },
    { label: 'Jan', expected: 55000, collected: 48100 },
    { label: 'Feb', expected: 50000, collected: 38900 },
    { label: 'Mar', expected: 53000, collected: 42500 },
    { label: 'Apr', expected: 34000, collected: 29000 },
  ]

  const maxVal = 60000;

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      <Topbar 
        pageTitle="Reports" 
        pageSubtitle="Financial overview" 
        primaryAction={
          <Button variant="outline" className="border-slate-200 gap-2 font-bold shadow-sm h-10">
            <FileDown className="w-4 h-4" />
            Export PDF
          </Button>
        }
      />

      <div className="p-6 overflow-y-auto">
        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <ReportCard 
                label="Total Collected" 
                value="LKR 248,500" 
                sub={<div className="flex items-center gap-1 text-[11px] font-bold text-green-600"><TrendingUp className="w-3 h-3" /> +8.4% vs prev 6m</div>}
            />
            <ReportCard 
                label="Total Expected" 
                value="LKR 312,000" 
                sub={<p className="text-[11px] text-[#94A3B8] font-medium">92% reach predicted</p>}
            />
            <ReportCard 
                label="Collection Rate" 
                value="79.6%" 
                sub={
                    <div className="space-y-1">
                        <Progress value={79.6} className="h-1.5 bg-indigo-50" />
                        <p className="text-[10px] text-[#94A3B8] font-medium text-right">Target: 85%</p>
                    </div>
                }
            />
            <ReportCard 
                label="Write-offs" 
                value="LKR 8,200" 
                sub={<div className="flex items-center gap-1 text-[11px] font-bold text-red-500"><TrendingDown className="w-3 h-3" /> 2.6% of total book</div>}
            />
        </div>

        {/* Charts Section */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 shadow-sm mb-8">
             <div className="flex flex-wrap items-center justify-between mb-10">
                <div>
                    <h3 className="text-lg font-bold text-[#0F172A]">Monthly Collection vs Expected</h3>
                    <p className="text-sm text-[#94A3B8] mt-0.5">Performance tracking for last 6 months</p>
                </div>
                <div className="flex gap-6 mt-4 sm:mt-0">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-[#EEF2FF] border border-[#4F46E5] shrink-0"></div>
                        <span className="text-xs font-bold text-[#475569]">Expected</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-[#4F46E5] shrink-0"></div>
                        <span className="text-xs font-bold text-[#475569]">Collected</span>
                    </div>
                </div>
             </div>

             <div className="h-[300px] flex items-end justify-between gap-4 sm:px-4">
                {chartData.map((d) => (
                    <div key={d.label} className="flex-1 flex flex-col items-center group">
                        <div className="w-full flex justify-center items-end gap-1.5 h-full relative">
                            {/* Expected Bar */}
                            <div 
                                className="w-full max-w-[40px] bg-[#EEF2FF] border border-[#4F46E5] rounded-t-lg transition-all duration-700 hover:opacity-80 relative"
                                style={{ height: `${(d.expected / maxVal) * 100}%` }}
                            >
                                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-black text-[#475569] opacity-0 group-hover:opacity-100 transition-opacity">
                                    {d.expected.toLocaleString()}
                                </span>
                            </div>
                            {/* Collected Bar */}
                            <div 
                                className="w-full max-w-[40px] bg-[#4F46E5] rounded-t-lg transition-all duration-700 delay-100 hover:brightness-110 relative"
                                style={{ height: `${(d.collected / maxVal) * 100}%` }}
                            >
                                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-black text-[#4F46E5] opacity-0 group-hover:opacity-100 transition-opacity">
                                    {d.collected.toLocaleString()}
                                </span>
                            </div>
                        </div>
                        <div className="mt-4 text-xs font-bold text-[#475569] uppercase tracking-wider">{d.label}</div>
                    </div>
                ))}
             </div>
        </div>

        {/* Breakdown Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Overdue Aging */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden flex flex-col">
                <div className="p-5 border-b border-[#E2E8F0]">
                    <h3 className="font-bold text-[#0F172A]">Overdue Aging Analysis</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[#F8FAFC] text-[10px] text-[#475569] uppercase tracking-wider font-bold">
                            <tr>
                                <th className="px-5 py-4 border-b">Customer</th>
                                <th className="px-5 py-4 border-b text-right">1-30d</th>
                                <th className="px-5 py-4 border-b text-right">31-60d</th>
                                <th className="px-5 py-4 border-b text-right">60d+</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E2E8F0]">
                             <tr className="hover:bg-slate-50 transition-colors">
                                <td className="px-5 py-3.5 text-xs font-bold text-[#0F172A]">Anura Kumara</td>
                                <td className="px-5 py-3.5 text-right text-xs text-slate-300">—</td>
                                <td className="px-5 py-3.5 text-right text-xs text-slate-300">—</td>
                                <td className="px-5 py-3.5 text-right text-xs font-black text-red-600">7,500</td>
                             </tr>
                             <tr className="hover:bg-slate-50 transition-colors">
                                <td className="px-5 py-3.5 text-xs font-bold text-[#0F172A]">Priya Wickrama</td>
                                <td className="px-5 py-3.5 text-right text-xs text-slate-300">—</td>
                                <td className="px-5 py-3.5 text-right text-xs font-bold text-orange-600">5,200</td>
                                <td className="px-5 py-3.5 text-right text-xs text-slate-300">—</td>
                             </tr>
                             <tr className="bg-[#F8FAFC]">
                                <td className="px-5 py-4 text-xs font-black text-[#0F172A] uppercase">Total Book</td>
                                <td className="px-5 py-4 text-right text-xs font-black text-[#4F46E5]">6,950</td>
                                <td className="px-5 py-4 text-right text-xs font-black text-orange-600">5,200</td>
                                <td className="px-5 py-4 text-right text-xs font-black text-red-600">7,500</td>
                             </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Top Outstanding */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col">
                <div className="p-5 border-b border-[#E2E8F0]">
                    <h3 className="font-bold text-[#0F172A]">Top Outstanding Customers</h3>
                </div>
                <div className="flex-1 divide-y divide-[#E2E8F0]">
                    {[
                        { name: 'Roshan Fernando', amount: 24000, sales: 3, rank: 1 },
                        { name: 'Nimal Perera', amount: 18500, sales: 2, rank: 2 },
                        { name: 'Chamara Bandara', amount: 9800, sales: 2, rank: 3 },
                        { name: 'Priya Wickrama', amount: 5200, sales: 1, rank: 4 },
                    ].map((c) => (
                        <div key={c.rank} className="p-4 flex items-center justify-between group hover:bg-slate-50 transition-colors cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className="w-7 h-7 bg-[#EEF2FF] text-[#4F46E5] text-[10px] font-black rounded-full flex items-center justify-center shrink-0 border border-indigo-100 shadow-sm">
                                    {c.rank}
                                </div>
                                <InitialsAvatar name={c.name} size="sm" />
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-[#0F172A] group-hover:text-[#4F46E5] transition-colors">{c.name}</span>
                                    <span className="text-[10px] text-[#94A3B8] font-medium uppercase tracking-tight">{c.sales} Active Sales</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm font-black text-[#0F172A]">{formatCurrency(c.amount)}</div>
                                <button className="text-[10px] font-bold text-[#4F46E5] hover:underline uppercase tracking-widest mt-0.5">Profile →</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}
