import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Product } from "@/data/products";

export function CompareBar({ selected }: { selected: Product[] }) {
  if (selected.length < 2) return null;
  return (
    <div className="sticky bottom-4 z-40 mx-auto w-fit rounded-full border bg-background/90 px-3 py-2 shadow-lg backdrop-blur">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Compare {selected.length}</Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Compare Products</DialogTitle>
          </DialogHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left">Spec</th>
                  {selected.map((p) => (
                    <th key={p.id} className="text-left">
                      {p.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-medium">Type</td>
                  {selected.map((p) => (
                    <td key={p.id}>{p.type}</td>
                  ))}
                </tr>
                <tr>
                  <td className="font-medium">Key Specs</td>
                  {selected.map((p) => (
                    <td key={p.id}>{p.specs.join(" · ")}</td>
                  ))}
                </tr>
                <tr>
                  <td className="font-medium">Features</td>
                  {selected.map((p) => (
                    <td key={p.id}>{p.features.join(", ")}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
