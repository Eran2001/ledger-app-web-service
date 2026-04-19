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
    <div className="flex flex-col h-full bg-surface">
      <Topbar
        pageTitle="Products"
        pageSubtitle="Manage product catalog"
        primaryAction={
          <Button className="bg-primary hover:bg-primary-dark shadow-lg shadow-indigo-100">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        }
      />

      <div className="p-6 overflow-y-auto">
        {/* Category Filters */}
        <div className="mb-6 flex gap-1 bg-muted/50 p-1 global-rounded w-max">
            {categories.map(cat => (
                <button
                    key={cat}
                    onClick={() => setActiveTab(cat)}
                    className={cn(
                    "px-6 py-1.5 global-rounded t-caption-bold transition-all capitalize",
                    activeTab === cat
                        ? "bg-card text-heading shadow-sm"
                        : "text-body hover:text-heading"
                    )}
                >
                    {cat}
                </button>
            ))}
        </div>

        {/* Search */}
        <div className="mb-4 relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hint" />
            <Input
                placeholder="Search products..."
                className="pl-10 h-10 border-border bg-card"
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
        </div>

        {/* Table Content */}
        <div className="bg-card card-rounded border border-border shadow-sm overflow-hidden">
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-surface t-micro-bold text-body uppercase tracking-wider">
                    <tr>
                      <th className="px-5 py-4 border-b">Product Name</th>
                      <th className="px-5 py-4 border-b">Category</th>
                      <th className="px-5 py-4 border-b">Base Price</th>
                      <th className="px-5 py-4 border-b text-center">Active Sales</th>
                      <th className="px-5 py-4 border-b">Added Date</th>
                      <th className="px-5 py-4 border-b text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredProducts.map((p) => (
                      <tr
                        key={p.id}
                        className={cn(
                          "transition-colors",
                          editingId === p.id ? "bg-primary-light/30" : "hover:bg-surface"
                        )}
                      >
                        <td className="px-5 py-4">
                          {editingId === p.id ? (
                            <Input defaultValue={p.name} className="h-9 fw-medium" />
                          ) : (
                            <span className="t-body fw-semibold text-heading">{p.name}</span>
                          )}
                        </td>
                        <td className="px-5 py-4">
                           {editingId === p.id ? (
                              <Select defaultValue={p.category}>
                                <SelectTrigger className="h-9 border-border">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.filter(c => c !== 'All').map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                                </SelectContent>
                              </Select>
                           ) : (
                                <span className={cn(
                                    "px-2 py-0.5 global-rounded t-micro fw-bold uppercase tracking-wider",
                                    p.category === 'Electronics' ? "pill-indigo" :
                                    p.category === 'Appliances' ? "bg-teal-50 text-teal-500" :
                                    p.category === 'Furniture' ? "pill-amber" : "pill-gray"
                                )}>
                                    {p.category}
                                </span>
                           )}
                        </td>
                        <td className="px-5 py-4">
                          {editingId === p.id ? (
                             <Input type="number" defaultValue={p.basePrice} className="h-9 fw-bold" />
                          ) : (
                                <span className="t-body fw-bold text-body">{formatCurrency(p.basePrice)}</span>
                          )}
                        </td>
                        <td className="px-5 py-4 text-center">
                           <span className={cn(
                             "t-caption fw-bold",
                             p.activeSales > 0 ? "text-heading" : "text-hint"
                           )}>
                             {p.activeSales}
                           </span>
                        </td>
                        <td className="px-5 py-4 t-body fw-medium text-hint">
                           {formatDate(p.createdAt)}
                        </td>
                        <td className="px-5 py-4 text-right">
                           <div className="flex gap-2 justify-end">
                                {editingId === p.id ? (
                                    <>
                                        <Button
                                            size="sm"
                                            className="h-8 w-8 p-0 bg-success hover:bg-success"
                                            onClick={() => setEditingId(null)}
                                        >
                                            <Check className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-8 w-8 p-0 border-border"
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
                                            className="h-8 border-border text-hint hover:text-primary"
                                            onClick={() => setEditingId(p.id)}
                                        >
                                            <Edit2 className="w-3.5 h-3.5 mr-1" />
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-8 border-border text-destructive/40 hover:text-destructive hover:border-destructive/30"
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
