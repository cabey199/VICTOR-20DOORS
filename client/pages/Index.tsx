import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { BadgeCheck, ShieldCheck, Truck, Star, DoorOpen } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const IMG = {
  door1: "https://images.pexels.com/photos/2564866/pexels-photo-2564866.jpeg?auto=compress&cs=tinysrgb&w=1600",
  door2: "https://images.pexels.com/photos/5845681/pexels-photo-5845681.jpeg?auto=compress&cs=tinysrgb&w=1600",
  door3: "https://images.pexels.com/photos/965878/pexels-photo-965878.jpeg?auto=compress&cs=tinysrgb&w=1600",
  elevCabin: "https://images.pexels.com/photos/8243095/pexels-photo-8243095.jpeg?auto=compress&cs=tinysrgb&w=1600",
  elevButtons: "https://images.pexels.com/photos/7706391/pexels-photo-7706391.jpeg?auto=compress&cs=tinysrgb&w=1600",
  escalator: "https://images.pexels.com/photos/3605255/pexels-photo-3605255.jpeg?auto=compress&cs=tinysrgb&w=1600",
};

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
    image: IMG.door1,
    specs: "2x1m, sound-proof, fire-resistant",
    price: "9,800 ETB/m²",
  },
  {
    type: "door",
    title: "Security Iron Door – Walnut",
    image: IMG.door2,
    specs: "1.9x0.9m, reinforced frame",
    price: "9,550 ETB/m²",
  },
  {
    type: "elevator",
    title: "Mona-Go KRC Passenger Elevator",
    image: IMG.elevCabin,
    specs: "800 kg, 1.6 m/s, ARD/UPS",
    price: "Request Quote",
  },
  {
    type: "elevator",
    title: "KRC Escalator – Commercial",
    image: IMG.escalator,
    specs: "Heavy-duty, energy saving",
    price: "Request Quote",
  },
];

const portfolio = [IMG.door1, IMG.door2, IMG.door3, IMG.elevCabin, IMG.elevButtons, IMG.escalator];

const testimonials = [
  {
    name: "Mekdes T.",
    body: "Installed a beautiful oak-finish security door—looks like wood, feels like a vault.",
    image: IMG.door3,
  },
  {
    name: "Abel G.",
    body: "Our office elevator is smooth and quiet. Fast delivery and professional team.",
    image: IMG.elevCabin,
  },
  {
    name: "Selam A.",
    body: "Great service! The KRC elevator with ARD gives us peace of mind.",
    image: IMG.elevButtons,
  },
];

export default function Index() {
  const [api, setApi] = useState<any>(null);
  useAutoAdvance(api, 5000);

  const heroSlides = useMemo(
    () => [IMG.elevCabin, IMG.door1, IMG.escalator],
    [],
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
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
              Secure Your Future with Ethiopia’s Trusted Doors & Elevators
            </h1>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a href="/products#doors">
                <Button size="lg" className="bg-brand-primary hover:bg-brand-primary/90">
                  Explore Doors
                </Button>
              </a>
              <a href="/products#elevators">
                <Button size="lg" variant="secondary" className="backdrop-blur">
                  Discover Elevators
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
                        <img src={t.image} alt={t.name} className="h-10 w-10 rounded object-cover" loading="lazy" />
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
