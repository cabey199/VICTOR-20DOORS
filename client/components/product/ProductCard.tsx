import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Product, formatPriceETBPerM2 } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  const price =
    product.type === "door"
      ? formatPriceETBPerM2(product.priceETBPerM2)
      : "Request Quote";
  return (
    <Card className="group overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          loading="lazy"
          decoding="async"
          sizes="(max-width: 1024px) 50vw, 25vw"
        />
        {product.badge ? (
          <span className="absolute left-3 top-3 rounded bg-black/70 px-2 py-1 text-xs text-white">
            {product.badge}
          </span>
        ) : null}
        {!product.available ? (
          <span className="absolute right-3 top-3 rounded bg-red-600 px-2 py-1 text-xs text-white">
            Sold Out
          </span>
        ) : null}
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{product.title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground">
          {product.specs.join(" · ")}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <p className="font-semibold">{price}</p>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">View Details</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{product.title}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 md:grid-cols-2">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full rounded-md object-cover"
                />
                <div className="space-y-2 text-sm">
                  <p className="font-medium">Key Specs</p>
                  <ul className="list-disc pl-5 text-muted-foreground">
                    {product.specs.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                  <p className="font-medium mt-4">Features</p>
                  <ul className="list-disc pl-5 text-muted-foreground">
                    {product.features.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
