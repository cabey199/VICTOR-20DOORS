import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

export type FiltersState = {
  type: "all" | "door" | "elevator";
  search: string;
  minPrice: number;
  maxPrice: number;
  feature: string | "";
  sort: "price-asc" | "price-desc" | "newest";
};

export function Filters({ value, onChange }: { value: FiltersState; onChange: (s: FiltersState) => void }) {
  return (
    <div className="grid gap-4 rounded-lg border bg-card p-4 md:grid-cols-4">
      <div>
        <Label htmlFor="search">Search</Label>
        <Input id="search" placeholder="Search products" value={value.search} onChange={(e) => onChange({ ...value, search: e.target.value })} />
      </div>
      <div>
        <Label>Type</Label>
        <Select value={value.type} onValueChange={(v) => onChange({ ...value, type: v as FiltersState["type"] })}>
          <SelectTrigger>
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="door">Doors</SelectItem>
            <SelectItem value="elevator">Elevators</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Sort</Label>
        <Select value={value.sort} onValueChange={(v) => onChange({ ...value, sort: v as FiltersState["sort"] })}>
          <SelectTrigger>
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Max Price (ETB/m²)</Label>
        <Slider value={[value.maxPrice]} onValueChange={([v]) => onChange({ ...value, maxPrice: v })} min={5000} max={20000} step={250} />
        <div className="text-xs text-muted-foreground mt-1">Up to {value.maxPrice.toLocaleString()}</div>
      </div>
    </div>
  );
}
