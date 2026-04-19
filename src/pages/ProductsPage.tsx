import React, { useState } from 'react'
import { Search, Plus, Archive, Edit2, Check, X } from 'lucide-react'
import { Topbar } from '@/components/layout/Topbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { products as dummyProducts } from '@/constant/dummy'
import { formatCurrency, cn, formatDate } from '@/lib/utils'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'

export const ProductsPage: React.FC = () => {
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState('All')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [products, setProducts] = useState(dummyProducts)

  const categories = ['All', 'Electronics', 'Appliances', 'Furniture', 'Hardware', 'Other']

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchesTab = activeTab === 'All' || p.category === activeTab
    return matchesSearch && matchesTab
  })

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      <Topbar 
        pageTitle="Products" 
        pageSubtitle="Manage product catalog" 
        primaryAction={
          <Button className="bg-[#4F46E5] hover:bg-primary-dark shadow-lg shadow-indigo-100">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        }
      />

      <div className="p-6 overflow-y-auto">
        {/* Category Filters */}
        <div className="mb-6 flex gap-1 bg-slate-200/50 p-1 rounded-lg w-max">
            {categories.map(cat => (
                <button
                    key={cat}
                    onClick={() => setActiveTab(cat)}
                    className={cn(
                    "px-6 py-1.5 rounded-md text-xs font-bold transition-all capitalize",
                    activeTab === cat 
                        ? "bg-white text-[#0F172A] shadow-sm" 
                        : "text-[#475569] hover:text-[#0F172A]"
                    )}
                >
                    {cat}
                </button>
            ))}
        </div>

        {/* Search */}
        <div className="mb-4 relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
            <Input 
                placeholder="Search products..." 
                className="pl-10 h-10 border-[#E2E8F0] bg-white"
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
        </div>

        {/* Table Content */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden">
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-[#F8FAFC] text-[10px] text-[#475569] uppercase tracking-wider font-bold">
                    <tr>
                      <th className="px-5 py-4 border-b">Product Name</th>
                      <th className="px-5 py-4 border-b">Category</th>
                      <th className="px-5 py-4 border-b">Base Price</th>
                      <th className="px-5 py-4 border-b text-center">Active Sales</th>
                      <th className="px-5 py-4 border-b">Added Date</th>
                      <th className="px-5 py-4 border-b text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0]">
                    {filteredProducts.map((p) => (
                      <tr 
                        key={p.id} 
                        className={cn(
                          "transition-colors",
                          editingId === p.id ? "bg-indigo-50/30" : "hover:bg-slate-50"
                        )}
                      >
                        <td className="px-5 py-4">
                          {editingId === p.id ? (
                            <Input defaultValue={p.name} className="h-9 font-medium" />
                          ) : (
                            <span className="text-sm font-semibold text-[#0F172A]">{p.name}</span>
                          )}
                        </td>
                        <td className="px-5 py-4">
                           {editingId === p.id ? (
                              <Select defaultValue={p.category}>
                                <SelectTrigger className="h-9 border-slate-200">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.filter(c => c !== 'All').map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                                </SelectContent>
                              </Select>
                           ) : (
                                <span className={cn(
                                    "px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider",
                                    p.category === 'Electronics' ? "bg-indigo-50 text-indigo-500" :
                                    p.category === 'Appliances' ? "bg-teal-50 text-teal-500" :
                                    p.category === 'Furniture' ? "bg-amber-50 text-amber-500" : "bg-slate-100 text-slate-400"
                                )}>
                                    {p.category}
                                </span>
                           )}
                        </td>
                        <td className="px-5 py-4">
                          {editingId === p.id ? (
                             <Input type="number" defaultValue={p.basePrice} className="h-9 font-bold" />
                          ) : (
                                <span className="text-sm font-bold text-[#475569]">{formatCurrency(p.basePrice)}</span>
                          )}
                        </td>
                        <td className="px-5 py-4 text-center">
                           <span className={cn(
                             "text-xs font-bold",
                             p.activeSales > 0 ? "text-[#0F172A]" : "text-[#94A3B8]"
                           )}>
                             {p.activeSales}
                           </span>
                        </td>
                        <td className="px-5 py-4 text-sm text-[#94A3B8] font-medium">
                           {formatDate(p.createdAt)}
                        </td>
                        <td className="px-5 py-4 text-right">
                           <div className="flex gap-2 justify-end">
                                {editingId === p.id ? (
                                    <>
                                        <Button 
                                            size="sm" 
                                            className="h-8 w-8 p-0 bg-green-500 hover:bg-green-600"
                                            onClick={() => setEditingId(null)}
                                        >
                                            <Check className="w-4 h-4" />
                                        </Button>
                                        <Button 
                                            variant="outline"
                                            size="sm" 
                                            className="h-8 w-8 p-0 border-slate-200"
                                            onClick={() => setEditingId(null)}
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button 
                                            variant="outline" 
                                            size="sm" 
                                            className="h-8 border-slate-200 text-slate-500 hover:text-[#4F46E5]"
                                            onClick={() => setEditingId(p.id)}
                                        >
                                            <Edit2 className="w-3.5 h-3.5 mr-1" />
                                            Edit
                                        </Button>
                                        <Button 
                                            variant="outline" 
                                            size="sm" 
                                            className="h-8 border-slate-100 text-red-300 hover:text-red-500 hover:border-red-100"
                                        >
                                            <Archive className="w-3.5 h-3.5" />
                                        </Button>
                                    </>
                                )}
                           </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
        </div>
      </div>
    </div>
  )
}
