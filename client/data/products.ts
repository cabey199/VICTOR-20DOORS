export type ProductType = "door" | "elevator";

export type Product = {
  id: string;
  type: ProductType;
  title: string;
  images: string[];
  specs: string[];
  priceETBPerM2?: number; // for doors
  capacityKg?: number; // for elevators
  speedMs?: number; // elevators
  floors?: number; // elevators
  features: string[];
  available: boolean;
  badge?: string; // e.g., "15% Off"
  discountUntil?: string; // ISO date
};

export const demoProducts: Product[] = [
  {
    id: "door-1",
    type: "door",
    title: "Luxury Steel Door – Oak Finish (2x1m)",
    images: [
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop",
    ],
    specs: ["Sound-proof", "Fire-resistant"],
    priceETBPerM2: 9800,
    features: ["Wood-like finish", "Reinforced frame"],
    available: true,
  },
  {
    id: "door-2",
    type: "door",
    title: "Security Iron Door – Walnut (1.9x0.9m)",
    images: [
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200&auto=format&fit=crop",
    ],
    specs: ["Anti-pry locks", "Thermal insulated"],
    priceETBPerM2: 9550,
    features: ["Multi-point locking", "Weather sealed"],
    available: true,
    badge: "15% Off",
    discountUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
  },
  {
    id: "door-3",
    type: "door",
    title: "Classic Steel Door – Teak Finish (2.1x1m)",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
    ],
    specs: ["Powder-coated", "Acoustic core"],
    priceETBPerM2: 9650,
    features: ["Custom handles", "Tamper-proof hinges"],
    available: false,
  },
  {
    id: "elev-1",
    type: "elevator",
    title: "Mona-Go KRC Passenger Elevator – 800 kg",
    images: [
      "https://images.unsplash.com/photo-1505691723518-36a5ac3b2d39?q=80&w=1200&auto=format&fit=crop",
    ],
    specs: ["1.6 m/s", "ARD/UPS"],
    capacityKg: 800,
    speedMs: 1.6,
    floors: 12,
    features: ["Smooth ride", "Energy efficient"],
    available: true,
  },
  {
    id: "elev-2",
    type: "elevator",
    title: "KRC Commercial Elevator – 1000 kg",
    images: [
      "https://images.unsplash.com/photo-1537721664796-76f77222a5d9?q=80&w=1200&auto=format&fit=crop",
    ],
    specs: ["1.0–2.0 m/s", "Up to 10 floors"],
    capacityKg: 1000,
    speedMs: 2.0,
    floors: 10,
    features: ["Remote monitoring", "Stainless cabin"],
    available: true,
  },
];

export function formatPriceETBPerM2(value?: number) {
  if (!value && value !== 0) return "Request Quote";
  return `${value.toLocaleString()} ETB/m²`;
}
