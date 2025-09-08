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
    specs: [
      "Modern metal door with wood-like nature",
      "Rubber sill for soundproofing & pest barrier",
      "Fully washable",
    ],
    priceETBPerM2: 17700,
    features: [
      "6–10 key locks with master key",
      "Camera lens & bell ready",
      "2-year warranty",
      "Reinforced frame",
    ],
    available: true,
  },
  {
    id: "door-2",
    type: "door",
    title: "Security Iron Door – Walnut (1.9x0.9m)",
    images: [IMG.door2],
    specs: [
      "Modern metal door with wood-like nature",
      "Rubber sill for soundproofing & pest barrier",
      "Thermally insulated",
    ],
    priceETBPerM2: 17700,
    features: [
      "6–10 key locks with master key",
      "Multi-point locking",
      "Weather sealed",
      "2-year warranty",
      "Camera lens & bell ready",
    ],
    available: true,
    badge: "KRC Partner",
    discountUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
  },
  {
    id: "door-3",
    type: "door",
    title: "Classic Steel Door – Teak Finish (2.1x1m)",
    images: [IMG.door3],
    specs: [
      "Modern metal door with wood-like nature",
      "Rubber sill for soundproofing & pest barrier",
      "Powder-coated",
    ],
    priceETBPerM2: 17700,
    features: [
      "6–10 key locks with master key",
      "Tamper-proof hinges",
      "2-year warranty",
      "Camera lens & bell ready",
    ],
    available: false,
  },
  {
    id: "door-4",
    type: "door",
    title: "Premium Entrance Door – Double Leaf",
    images: [IMG.door1],
    specs: [
      "Modern metal door with wood-like nature",
      "Rubber sill for soundproofing & pest barrier",
      "Double-leaf",
    ],
    priceETBPerM2: 17700,
    features: [
      "6–10 key locks with master key",
      "Insulated core",
      "Decorative panels",
      "2-year warranty",
    ],
    available: true,
  },
  {
    id: "door-5",
    type: "door",
    title: "Modern Handle Set – Stainless",
    images: [IMG.lock],
    specs: ["Stainless steel", "Scratch resistant"],
    priceETBPerM2: 17700,
    features: [
      "Anti-bacterial coating",
      "Matte finish",
      "6–10 key locks with master key (compatible)",
    ],
    available: true,
  },
  {
    id: "elev-1",
    type: "elevator",
    title: "Mona-Go KRC Passenger Elevator – 800 kg",
    images: [IMG.elevCabin],
    specs: [
      "ISO Certified • European Standard",
      "45+ years in European market",
      "Free 12 cabin designs & decoration",
    ],
    capacityKg: 800,
    speedMs: 1.6,
    floors: 12,
    features: [
      "Official KRC Turkey partner",
      "Free maintenance 1 year • 2-year full warranty",
      "Free ERD & UPS safety components",
      "Supply & install in 2 months",
    ],
    available: true,
  },
  {
    id: "elev-2",
    type: "elevator",
    title: "KRC Commercial Elevator – 1000 kg",
    images: [IMG.escalator],
    specs: [
      "ISO Certified • European Standard",
      "Free 12 cabin designs & decoration",
    ],
    capacityKg: 1000,
    speedMs: 2.0,
    floors: 10,
    features: [
      "Official KRC Turkey partner",
      "Free maintenance 1 year • 2-year full warranty",
      "Free ERD & UPS safety components",
      "Supply & install in 2 months",
    ],
    available: true,
  },
  {
    id: "elev-3",
    type: "elevator",
    title: "KRC Elevator – Control Panel ARD",
    images: [IMG.elevButtons],
    specs: [
      "ISO Certified • European Standard",
      "Emergency power (ARD)",
    ],
    features: [
      "Official KRC Turkey partner",
      "Braille buttons",
      "LED indicators",
      "UPS ready",
    ],
    available: true,
  },
  {
    id: "elev-4",
    type: "elevator",
    title: "Escalator System – Heavy Duty",
    images: [IMG.escalator],
    specs: ["ISO Certified • European Standard", "Energy saving"],
    features: [
      "Official KRC Turkey partner",
      "Auto start/stop",
      "Skirt lighting",
      "Supply & install in 2 months",
    ],
    available: true,
  },
];

export function formatPriceETBPerM2(value?: number) {
  if (!value && value !== 0) return "Request Quote";
  return `${value.toLocaleString()} ETB/m²`;
}
