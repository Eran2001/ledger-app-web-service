import { useCallback, useMemo, useState } from "react";
import { Plus } from "lucide-react";

import { SearchField } from "@/components/ui/search-field";
import { Tabs, TabsList, TabsTrigger, TabsCount } from "@/components/ui/tabs";
import { Notification } from "@/components/ui/custom-toast";

import { products as initialProducts } from "@/constant/product-data";
import { useTopBarOverride } from "@/hooks/use-top-bar-override";
import { useWidth } from "@/hooks/use-width";
import type { ProductFormValues } from "@/schemas/product-schema";
import type { Product } from "@/types/product-types";

import { ProductSheet } from "./components/product-sheet";
import { ProductsGrid } from "./components/products-grid";
import { ProductsTable } from "./components/products-table";

type ProductTab = "active" | "archived";

function Products() {
  const { width, breakpoints } = useWidth();
  const isMaxLg = width < breakpoints.lg;
  const [list, setList] = useState<Product[]>(initialProducts);
  const [archivedIds, setArchivedIds] = useState<Set<string>>(new Set());
  const [tab, setTab] = useState<ProductTab>("active");
  const [query, setQuery] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const searched = list.filter((p) => {
    const q = query.trim().toLowerCase();
    return !q || p.name.toLowerCase().includes(q);
  });

  const tabCounts = {
    active: searched.filter((p) => !archivedIds.has(p.id)).length,
    archived: searched.filter((p) => archivedIds.has(p.id)).length,
  };

  const filtered = searched.filter((p) =>
    tab === "archived" ? archivedIds.has(p.id) : !archivedIds.has(p.id),
  );

  function archive(id: string) {
    setArchivedIds((prev) => new Set(prev).add(id));
    Notification.success("Product archived");
  }

  function unarchive(id: string) {
    setArchivedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    Notification.success("Product activated");
  }

  const openCreateSheet = useCallback(() => {
    setEditingProduct(null);
    setSheetOpen(true);
  }, []);

  function openEditSheet(product: Product) {
    setEditingProduct(product);
    setSheetOpen(true);
  }

  function closeSheet() {
    setSheetOpen(false);
    setEditingProduct(null);
  }

  function handleProductSubmit(values: ProductFormValues) {
    if (editingProduct) {
      setList((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                name: values.name,
                category: values.category,
                basePrice: values.basePrice,
                updatedAt: new Date().toISOString(),
              }
            : p,
        ),
      );
      Notification.success("Product updated");
    } else {
      const now = new Date().toISOString();
      const newProduct: Product = {
        id: `p${Date.now()}`,
        name: values.name,
        category: values.category,
        basePrice: values.basePrice,
        activeSales: 0,
        createdAt: now,
        updatedAt: now,
      };
      setList((prev) => [newProduct, ...prev]);
      Notification.success("Product created");
    }
  }

  const topBarOverride = useMemo(
    () => ({
      primaryAction: {
        onClick: openCreateSheet,
        icon: Plus,
        label: "Add Product",
      },
    }),
    [openCreateSheet],
  );

  useTopBarOverride(topBarOverride);

  const listProps = {
    rows: filtered,
    isArchivedView: tab === "archived",
    onEdit: openEditSheet,
    onArchive: archive,
    onUnarchive: unarchive,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <SearchField
          value={query}
          onChange={setQuery}
          placeholder="Search products…"
          containerClassName="w-full lg:flex-1 md:min-w-40 md:max-w-xs lg:min-w-60 lg:max-w-sm"
        />
        <div className="flex flex-col xs:flex-row xs:items-center items-start gap-3 w-full min-w-0 lg:w-auto">
          <Tabs
            value={tab}
            onValueChange={(v) => setTab(v as ProductTab)}
            className="w-full xs:w-auto"
          >
            <TabsList>
              <TabsTrigger value="active">
                Active <TabsCount>{tabCounts.active}</TabsCount>
              </TabsTrigger>
              <TabsTrigger value="archived">
                Archived <TabsCount>{tabCounts.archived}</TabsCount>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {isMaxLg ? (
        <ProductsGrid {...listProps} />
      ) : (
        <ProductsTable {...listProps} />
      )}

      <ProductSheet
        open={sheetOpen}
        product={editingProduct}
        onClose={closeSheet}
        onSubmit={handleProductSubmit}
      />
    </div>
  );
}

export default Products;
