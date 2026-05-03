"use client"

import { useMemo, useState } from "react"
import { Archive, Check, Edit2, Plus, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { products as initialProducts } from "@/lib/dummy-data"
import { formatCurrency, formatDate } from "@/lib/utils"
import type { Product } from "@/lib/types"
import { toast } from "sonner"

const TABS = ["All", "Electronics", "Appliances", "Furniture", "Hardware", "Other"] as const
type Tab = (typeof TABS)[number]

const CATEGORIES: Product["category"][] = [
  "Electronics",
  "Appliances",
  "Furniture",
  "Hardware",
  "Other",
]

function categoryPillClass(cat: Product["category"]): string {
  switch (cat) {
    case "Electronics":
      return "pill-indigo"
    case "Appliances":
      return "pill-teal"
    case "Furniture":
      return "pill-purple"
    case "Hardware":
      return "pill-amber"
    default:
      return "pill-gray"
  }
}

interface EditDraft {
  name: string
  category: Product["category"]
  basePrice: number
}

export default function ProductsPage() {
  const [list, setList] = useState<Product[]>(initialProducts)
  const [tab, setTab] = useState<Tab>("All")
  const [query, setQuery] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [draft, setDraft] = useState<EditDraft | null>(null)

  const filtered = useMemo(() => {
    return list.filter((p) => {
      if (tab !== "All" && p.category !== tab) return false
      if (query && !p.name.toLowerCase().includes(query.toLowerCase())) return false
      return true
    })
  }, [list, tab, query])

  function startEdit(p: Product) {
    setEditingId(p.id)
    setDraft({ name: p.name, category: p.category, basePrice: p.basePrice })
  }

  function cancelEdit() {
    setEditingId(null)
    setDraft(null)
  }

  function saveEdit() {
    if (!editingId || !draft) return
    setList((prev) =>
      prev.map((p) =>
        p.id === editingId
          ? { ...p, name: draft.name.trim() || p.name, category: draft.category, basePrice: draft.basePrice }
          : p,
      ),
    )
    toast.success("Product updated")
    cancelEdit()
  }

  function archive(id: string) {
    setList((prev) => prev.filter((p) => p.id !== id))
    toast.success("Product archived")
  }

  function addProduct() {
    const id = `p${Date.now()}`
    const newP: Product = {
      id,
      name: "New Product",
      category: "Other",
      basePrice: 10000,
      activeSales: 0,
      createdAt: new Date().toISOString(),
    }
    setList((prev) => [newP, ...prev])
    startEdit(newP)
    toast.success("New product added — edit details")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="t-section text-main">Products</h1>
          <p className="t-meta text-soft mt-1">Manage your product catalog and base prices.</p>
        </div>
        <Button onClick={addProduct} className="surface-brand text-inverse surface-brand-strong-hover gap-2">
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      <div className="flex items-center gap-1 surface-tab-list p-1 tab-rounded w-fit">
        {TABS.map((t) => {
          const active = tab === t
          return (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`tabs-trigger px-3 py-1.5 tab-rounded transition-colors ${
                active ? "surface-card text-main shadow-sm" : ""
              }`}
              data-state={active ? "active" : "inactive"}
            >
              {t}
            </button>
          )
        })}
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-faint" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="pl-9"
        />
      </div>

      <div className="card-base overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="table-header text-left px-4 py-3">Product Name</th>
                <th className="table-header text-left px-4 py-3">Category</th>
                <th className="table-header text-left px-4 py-3">Base Price</th>
                <th className="table-header text-center px-4 py-3">Active Sales</th>
                <th className="table-header text-left px-4 py-3">Added</th>
                <th className="table-header text-right px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 align-text-center text-faint t-meta">
                    No products found.
                  </td>
                </tr>
              ) : (
                filtered.map((p) => {
                  const isEditing = editingId === p.id && draft
                  return (
                    <tr key={p.id} className="border-t" style={{ borderColor: "var(--border)" }}>
                      <td className="px-4 py-3 align-top">
                        {isEditing ? (
                          <Input
                            value={draft.name}
                            onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                            className="max-w-[220px]"
                          />
                        ) : (
                          <span className="table-title-text fw-semibold">{p.name}</span>
                        )}
                      </td>
                      <td className="px-4 py-3 align-top">
                        {isEditing ? (
                          <Select
                            value={draft.category}
                            onValueChange={(v) =>
                              setDraft({ ...draft, category: v as Product["category"] })
                            }
                          >
                            <SelectTrigger className="w-[160px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {CATEGORIES.map((c) => (
                                <SelectItem key={c} value={c}>
                                  {c}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <span
                            className={`${categoryPillClass(p.category)} t-caption-bold px-2.5 py-0.5 global-rounded`}
                          >
                            {p.category}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 align-top">
                        {isEditing ? (
                          <Input
                            type="number"
                            value={draft.basePrice}
                            onChange={(e) =>
                              setDraft({ ...draft, basePrice: Number(e.target.value) })
                            }
                            className="max-w-[140px]"
                          />
                        ) : (
                          <span className="table-text fw-bold text-main">
                            {formatCurrency(p.basePrice)}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 align-top align-text-center">
                        <span className="table-text fw-semibold text-main">{p.activeSales}</span>
                      </td>
                      <td className="px-4 py-3 align-top">
                        <span className="table-text">{formatDate(p.createdAt)}</span>
                      </td>
                      <td className="px-4 py-3 align-top">
                        <div className="flex items-center gap-1 justify-end">
                          {isEditing ? (
                            <>
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={saveEdit}
                                className="icon-button h-8 w-8 surface-success-soft-hover"
                              >
                                <Check className="h-4 w-4 text-success-role" />
                                <span className="sr-only">Save</span>
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={cancelEdit}
                                className="icon-button h-8 w-8"
                              >
                                <X className="h-4 w-4" />
                                <span className="sr-only">Cancel</span>
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => startEdit(p)}
                                className="icon-button h-8 w-8"
                              >
                                <Edit2 className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => archive(p.id)}
                                className="icon-button h-8 w-8 surface-danger-soft-hover hover:text-danger"
                              >
                                <Archive className="h-4 w-4" />
                                <span className="sr-only">Archive</span>
                              </Button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
