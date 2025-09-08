import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Product, formatPriceETBPerM2 } from "@/data/products";
import { OrderRequestForm } from "./OrderRequestForm";

export function ProductCard({ product }: { product: Product }) {
  const price =
    product.type === "door"
      ? formatPriceETBPerM2(product.priceETBPerM2)
      : "Request Quote";
  const warranty =
    product.type === "door" ? "1-year warranty" : "2-year service";
  const leadTime = product.type === "door" ? "25–30 days" : "45–60 days";

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
              <Button size="sm">View & Order</Button>
            </DialogTrigger>
            <DialogContent className="p-4 sm:p-6 max-w-md md:max-w-xl" title={`${product.title} — Details & Order`}>
              <DialogHeader>
                <DialogTitle>{product.title} — Details & Order</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3 md:grid-cols-2">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="hidden md:block w-full rounded-md object-cover"
                  />
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-medium">Key Specs</p>
                      <ul className="list-disc pl-5 text-muted-foreground">
                        {product.specs.map((s) => (
                          <li key={s}>{s}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium">Features</p>
                      <ul className="list-disc pl-5 text-muted-foreground">
                        {product.features.map((s) => (
                          <li key={s}>{s}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-muted-foreground">
                      <div>
                        <p className="text-xs">Price</p>
                        <p className="font-medium text-foreground">{price}</p>
                      </div>
                      <div>
                        <p className="text-xs">Lead Time</p>
                        <p className="font-medium text-foreground">
                          {leadTime}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs">Warranty</p>
                        <p className="font-medium text-foreground">
                          {warranty}
                        </p>
                      </div>
                      {product.type === "elevator" && product.capacityKg ? (
                        <div>
                          <p className="text-xs">Capacity</p>
                          <p className="font-medium text-foreground">
                            {product.capacityKg} kg
                          </p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <p className="mb-3 font-medium">
                    Place Order / Request Quote
                  </p>
                  <OrderRequestForm product={product} />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
