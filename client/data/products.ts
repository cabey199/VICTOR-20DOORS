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

const IMG = {
  door1:
    "https://images.pexels.com/photos/2564866/pexels-photo-2564866.jpeg?auto=compress&cs=tinysrgb&w=1200",
  door2:
    "https://images.pexels.com/photos/5845681/pexels-photo-5845681.jpeg?auto=compress&cs=tinysrgb&w=1200",
  door3:
    "https://images.pexels.com/photos/965878/pexels-photo-965878.jpeg?auto=compress&cs=tinysrgb&w=1200",
  lock: "https://images.pexels.com/photos/792031/pexels-photo-792031.jpeg?auto=compress&cs=tinysrgb&w=1200",
  elevCabin:
    "https://images.pexels.com/photos/8243095/pexels-photo-8243095.jpeg?auto=compress&cs=tinysrgb&w=1200",
  elevButtons:
    "https://images.pexels.com/photos/7706391/pexels-photo-7706391.jpeg?auto=compress&cs=tinysrgb&w=1200",
  escalator:
    "https://images.pexels.com/photos/3605255/pexels-photo-3605255.jpeg?auto=compress&cs=tinysrgb&w=1200",
};

export const demoProducts: Product[] = [
  {
    id: "door-1",
    type: "door",
    title: "Luxury Steel Door – Oak Finish (2x1m)",
    images: [IMG.door1],
    specs: ["Sound-proof", "Fire-resistant"],
    priceETBPerM2: 9800,
    features: ["Wood-like finish", "Reinforced frame"],
    available: true,
  },
  {
    id: "door-2",
    type: "door",
    title: "Security Iron Door – Walnut (1.9x0.9m)",
    images: [IMG.door2],
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
    images: [IMG.door3],
    specs: ["Powder-coated", "Acoustic core"],
    priceETBPerM2: 9650,
    features: ["Custom handles", "Tamper-proof hinges"],
    available: false,
  },
  {
    id: "door-4",
    type: "door",
    title: "Premium Entrance Door – Double Leaf",
    images: [IMG.door1],
    specs: ["Double-leaf", "Heavy-duty hinges"],
    priceETBPerM2: 11500,
    features: ["Insulated core", "Decorative panels"],
    available: true,
  },
  {
    id: "door-5",
    type: "door",
    title: "Modern Handle Set – Stainless",
    images: [IMG.lock],
    specs: ["Stainless steel", "Scratch resistant"],
    priceETBPerM2: 9900,
    features: ["Anti-bacterial coating", "Matte finish"],
    available: true,
  },
  {
    id: "elev-1",
    type: "elevator",
    title: "Mona-Go KRC Passenger Elevator – 800 kg",
    images: [IMG.elevCabin],
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
    images: [IMG.escalator],
    specs: ["1.0–2.0 m/s", "Up to 10 floors"],
    capacityKg: 1000,
    speedMs: 2.0,
    floors: 10,
    features: ["Remote monitoring", "Stainless cabin"],
    available: true,
  },
  {
    id: "elev-3",
    type: "elevator",
    title: "KRC Elevator – Control Panel ARD",
    images: [IMG.elevButtons],
    specs: ["Panel with ARD", "Emergency power"],
    features: ["Braille buttons", "LED indicators"],
    available: true,
  },
  {
    id: "elev-4",
    type: "elevator",
    title: "Escalator System – Heavy Duty",
    images: [IMG.escalator],
    specs: ["Indoor", "Energy saving"],
    features: ["Auto start/stop", "Skirt lighting"],
    available: true,
  },
];

export function formatPriceETBPerM2(value?: number) {
  if (!value && value !== 0) return "Request Quote";
  return `${value.toLocaleString()} ETB/m²`;
}
