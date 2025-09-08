import { useMemo, useState } from "react";
import { demoProducts, Product } from "@/data/products";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filters, FiltersState } from "@/components/product/Filters";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CompareBar } from "@/components/product/CompareBar";

const initialFilters: FiltersState = {
  type: "all",
  search: "",
  minPrice: 0,
  maxPrice: 20000,
  feature: "",
  sort: "newest",
};

export default function Products() {
  const [filters, setFilters] = useState<FiltersState>(initialFilters);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  const filtered = useMemo(() => {
    let list = demoProducts.filter((p) =>
      filters.type === "all" ? true : p.type === filters.type,
    );
    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter((p) => p.title.toLowerCase().includes(q));
    }
    list = list.filter(
      (p) =>
        (p.priceETBPerM2 ?? 0) <= filters.maxPrice || p.type === "elevator",
    );
    if (filters.sort === "price-asc")
      list = [...list].sort(
        (a, b) => (a.priceETBPerM2 ?? 9e9) - (b.priceETBPerM2 ?? 9e9),
      );
    if (filters.sort === "price-desc")
      list = [...list].sort(
        (a, b) => (b.priceETBPerM2 ?? 0) - (a.priceETBPerM2 ?? 0),
      );
    return list;
  }, [filters]);

  const perPage = 8;
  const pageCount = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  const selectedList: Product[] = Object.entries(selected)
    .filter(([, v]) => v)
    .map(([id]) => demoProducts.find((p) => p.id === id)!)
    .filter(Boolean);

  return (
    <section className="container mx-auto py-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Products Catalog</h1>
          <p className="text-sm text-muted-foreground">
            Official KRC Turkey partner • ISO & European standard • Free 1-year maintenance and 2-year warranty • Supply & install in 2 months
          </p>
        </div>
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger
              value="all"
              onClick={() => setFilters({ ...filters, type: "all" })}
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="doors"
              onClick={() => setFilters({ ...filters, type: "door" })}
            >
              Doors
            </TabsTrigger>
            <TabsTrigger
              value="elevators"
              onClick={() => setFilters({ ...filters, type: "elevator" })}
            >
              Elevators
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all" />
          <TabsContent value="doors" />
          <TabsContent value="elevators" />
        </Tabs>
      </div>

      <div className="mt-6">
        <Filters
          value={filters}
          onChange={(v) => {
            setPage(1);
            setFilters(v);
          }}
        />
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {pageItems.map((p) => (
          <div key={p.id} className="relative">
            <label className="absolute left-2 top-2 z-10 rounded-md bg-background/80 p-1 shadow">
              <Checkbox
                checked={!!selected[p.id]}
                onCheckedChange={(v) =>
                  setSelected({ ...selected, [p.id]: Boolean(v) })
                }
              />
            </label>
            <ProductCard product={p} />
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Page {page} of {pageCount}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Prev
          </Button>
          <Button
            disabled={page === pageCount}
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
          >
            Next
          </Button>
        </div>
      </div>

      <CompareBar selected={selectedList.slice(0, 3)} />
    </section>
  );
}
