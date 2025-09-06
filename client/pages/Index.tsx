import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { BadgeCheck, ShieldCheck, Truck, Star, Quote, DoorOpen, Elevator, Timer } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLang } from "@/components/site/LanguageContext";

function useAutoAdvance(api: any, delay = 4000) {
  useEffect(() => {
    if (!api) return;
    const id = setInterval(() => api.scrollNext(), delay);
    return () => clearInterval(id);
  }, [api, delay]);
}

function Counter({ to, duration = 1500 }: { to: number; duration?: number }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start: number | null = null;
    const step = (t: number) => {
      if (start === null) start = t;
      const p = Math.min(1, (t - start) / duration);
      setVal(Math.floor(p * to));
      if (p < 1) requestAnimationFrame(step);
    };
    const r = requestAnimationFrame(step);
    return () => cancelAnimationFrame(r);
  }, [to, duration]);
  return <span aria-live="polite">{val.toLocaleString()}</span>;
}

const featured = [
  {
    type: "door",
    title: "Luxury Steel Door – Oak Finish",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop",
    specs: "2x1m, sound-proof, fire-resistant",
    price: "9,800 ETB/m²",
  },
  {
    type: "door",
    title: "Security Iron Door – Walnut",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop",
    specs: "1.9x0.9m, reinforced frame",
    price: "9,550 ETB/m²",
  },
  {
    type: "elevator",
    title: "Mona-Go KRC Passenger Elevator",
    image: "https://images.unsplash.com/photo-1505691723518-36a5ac3b2d39?q=80&w=1200&auto=format&fit=crop",
    specs: "800 kg, 1.6 m/s, ARD/UPS",
    price: "Request Quote",
  },
  {
    type: "elevator",
    title: "KRC Elevator – Commercial",
    image: "https://images.unsplash.com/photo-1537721664796-76f77222a5d9?q=80&w=1200&auto=format&fit=crop",
    specs: "1000 kg, 1.0–2.0 m/s, 10 floors",
    price: "Request Quote",
  },
];

const portfolio = [
  "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop",
];

const testimonials = [
  {
    name: "Mekdes T.",
    body: "Installed a beautiful oak-finish security door—looks like wood, feels like a vault.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop",
  },
  {
    name: "Abel G.",
    body: "Our office elevator is smooth and quiet. Fast delivery and professional team.",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=256&auto=format&fit=crop",
  },
  {
    name: "Selam A.",
    body: "Great service! The KRC elevator with ARD gives us peace of mind.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&auto=format&fit=crop",
  },
];

export default function Index() {
  const { t } = useLang();
  const [api, setApi] = useState<any>(null);
  useAutoAdvance(api, 5000);

  const heroSlides = useMemo(
    () => [
      "https://images.unsplash.com/photo-1505691723518-36a5ac3b2d39?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1537721664796-76f77222a5d9?q=80&w=1600&auto=format&fit=crop",
    ],
    [],
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section – image carousel background with overlay text and dual CTAs */}
      <section className="relative isolate">
        <Carousel opts={{ loop: true }} setApi={setApi}>
          <CarouselContent>
            {heroSlides.map((src, i) => (
              <CarouselItem key={i} className="">
                <div className="relative h-[68vh] md:h-[80vh] w-full overflow-hidden">
                  <img src={src} alt="Premium doors and elevators" className="h-full w-full object-cover" loading="eager" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white" />
          <CarouselNext className="right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white" />
        </Carousel>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="pointer-events-auto container mx-auto text-center text-white">
            <h1 className="mx-auto max-w-4xl text-3xl font-extrabold drop-shadow md:text-5xl">
              {t("heroTitle")}
            </h1>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a href="/products#doors">
                <Button size="lg" className="bg-brand-primary hover:bg-brand-primary/90">
                  {t("exploreDoors")}
                </Button>
              </a>
              <a href="/products#elevators">
                <Button size="lg" variant="secondary" className="backdrop-blur">
                  {t("discoverElevators")}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="container mx-auto py-10 grid gap-6 md:grid-cols-4">
        <div className="flex items-center gap-3 rounded-lg border bg-card p-4 shadow-sm">
          <ShieldCheck className="text-brand-metal" />
          <div>
            <p className="font-semibold">KRC Authorized</p>
            <p className="text-xs text-muted-foreground">Official partner</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-lg border bg-card p-4 shadow-sm">
          <BadgeCheck className="text-brand-metal" />
          <div>
            <p className="font-semibold">1-Year Warranty</p>
            <p className="text-xs text-muted-foreground">On selected products</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-lg border bg-card p-4 shadow-sm">
          <Truck className="text-brand-metal" />
          <div>
            <p className="font-semibold">Fast Delivery</p>
            <p className="text-xs text-muted-foreground">25–30 days</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-lg border bg-card p-4 shadow-sm">
          <DoorOpen className="text-brand-metal" />
          <div>
            <p className="font-semibold"><Counter to={500} />+ Doors Installed</p>
            <p className="text-xs text-muted-foreground">Across Ethiopia</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto py-14">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <p className="text-sm text-muted-foreground">High-quality doors and KRC elevators</p>
          </div>
          <a href="/products">
            <Button variant="outline">View All</Button>
          </a>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => (
            <Card key={i} className="group overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={p.image} alt={p.title} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" loading="lazy" />
                {p.type === "elevator" ? (
                  <span className="absolute left-3 top-3 rounded bg-black/70 px-2 py-1 text-xs text-white">KRC</span>
                ) : null}
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{p.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground">{p.specs}</p>
                <div className="mt-3 flex items-center justify-between">
                  <p className="font-semibold">{p.price}</p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm">Request Quote</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Request a Quote</DialogTitle>
                      </DialogHeader>
                      <form className="space-y-3" onSubmit={(e) => e.preventDefault()} aria-label="Request quote form">
                        <Input placeholder="Name" required aria-label="Name" />
                        <Input type="email" placeholder="Email" required aria-label="Email" />
                        <Input placeholder="Phone" aria-label="Phone" />
                        <Textarea placeholder={`Details about: ${p.title}`} aria-label="Details" />
                        <Button type="submit">Send Request</Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="bg-muted/30 py-14">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-6">Testimonials</h2>
          <Carousel opts={{ loop: true }}>
            <CarouselContent>
              {testimonials.map((t, i) => (
                <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <img src={t.image} alt={t.name} className="h-10 w-10 rounded-full object-cover" loading="lazy" />
                        <div>
                          <p className="font-medium">{t.name}</p>
                          <div className="flex text-amber-500" aria-label="5 star rating">
                            {Array.from({ length: 5 }).map((_, idx) => (
                              <Star key={idx} className="h-4 w-4 fill-amber-400" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="mt-4 text-sm text-muted-foreground">{t.body}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Mini Portfolio */}
      <section className="container mx-auto py-14">
        <h2 className="text-2xl font-bold mb-6">Recent Installations</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {portfolio.map((src, i) => (
            <figure key={i} className="group relative overflow-hidden rounded-lg border">
              <img src={src} alt="Project installation" className="h-56 w-full object-cover transition duration-300 group-hover:scale-105" loading="lazy" />
              <figcaption className="absolute bottom-0 w-full bg-black/50 px-3 py-2 text-xs text-white">Project #{i + 1}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
