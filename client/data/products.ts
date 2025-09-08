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
  // Doors
  doorA:
    "https://cdn.builder.io/api/v1/image/assets%2F2011eb17d4ef4e78b5785e909c9c2e55%2F0bed01f0d3a14829bcb24d39d0ad26cd?format=webp&width=1200",
  doorB:
    "https://cdn.builder.io/api/v1/image/assets%2F2011eb17d4ef4e78b5785e909c9c2e55%2F921bb1b7096044f0bea754b873cbe30f?format=webp&width=1200",
  doorC:
    "https://cdn.builder.io/api/v1/image/assets%2F2011eb17d4ef4e78b5785e909c9c2e55%2F6acd3fd746bd422fadd0a01ed582d976?format=webp&width=1200",
  doorD:
    "https://cdn.builder.io/api/v1/image/assets%2F2011eb17d4ef4e78b5785e909c9c2e55%2F9dfdc41fa8ab4696a88d7a10ceb3cc06?format=webp&width=1200",
  doorE:
    "https://cdn.builder.io/api/v1/image/assets%2F2011eb17d4ef4e78b5785e909c9c2e55%2Fd391aa14b94342cf8ec49a21271e5745?format=webp&width=1200",
  doorF:
    "https://cdn.builder.io/api/v1/image/assets%2F2011eb17d4ef4e78b5785e909c9c2e55%2Fb6ebe3a7dddb4cb09a45851b1260f913?format=webp&width=1200",
  doorG:
    "https://cdn.builder.io/api/v1/image/assets%2F2011eb17d4ef4e78b5785e909c9c2e55%2F389405e1644548cdae8f0e5e2075fb73?format=webp&width=1200",
  doorH:
    "https://cdn.builder.io/api/v1/image/assets%2F2011eb17d4ef4e78b5785e909c9c2e55%2F7ec4ad8856a544b2b6d3846456c5d9b6?format=webp&width=1200",
  doorI:
    "https://cdn.builder.io/api/v1/image/assets%2F2011eb17d4ef4e78b5785e909c9c2e55%2F676ab9a4abf44c7786f389a4cad9e9f9?format=webp&width=1200",
  doorCatalog:
    "https://cdn.builder.io/api/v1/image/assets%2F2011eb17d4ef4e78b5785e909c9c2e55%2F99b0ba51465b4a758432afbef766b3f1?format=webp&width=1200",
  lockDetail:
    "https://cdn.builder.io/api/v1/image/assets%2F2011eb17d4ef4e78b5785e909c9c2e55%2F3b92a1bab9e5457e8515b4cf18e438a7?format=webp&width=1200",
  // Elevators
  elevPanelA:
    "https://cdn.builder.io/api/v1/image/assets%2F2011eb17d4ef4e78b5785e909c9c2e55%2F0f164c1559a44b8bbf2f287ba47fe8dc?format=webp&width=1200",
  elevCabinA:
    "https://cdn.builder.io/api/v1/image/assets%2F2011eb17d4ef4e78b5785e909c9c2e55%2F54a575ace73a4c3eac275ccb53c35e7d?format=webp&width=1200",
  elevCabinB:
    "https://cdn.builder.io/api/v1/image/assets%2F2011eb17d4ef4e78b5785e909c9c2e55%2Ff1d28ef89fd140b691bea379e704e1f6?format=webp&width=1200",
  elevPanelB:
    "https://cdn.builder.io/api/v1/image/assets%2F2011eb17d4ef4e78b5785e909c9c2e55%2Ffaa20e19979f49b08c4511ba08513cfc?format=webp&width=1200",
};

export const demoProducts: Product[] = [
  {
    id: "door-1",
    type: "door",
    title: "Luxury Steel Door – Oak Finish (2x1m)",
    images: [IMG.doorA, IMG.lockDetail],
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
    images: [IMG.doorB, IMG.lockDetail],
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
    images: [IMG.doorD, IMG.doorC],
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
    images: [IMG.doorA, IMG.lockDetail],
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
    images: [IMG.doorCatalog, IMG.lockDetail],
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
    images: [IMG.elevCabinA, IMG.elevPanelA],
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
    images: [IMG.elevCabinB, IMG.elevPanelB],
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
    images: [IMG.elevPanelA, IMG.elevCabinA],
    specs: ["ISO Certified • European Standard", "Emergency power (ARD)"],
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
    images: [IMG.elevCabinB, IMG.elevPanelB],
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
