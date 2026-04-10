export interface StairType {
  id: string;
  name: string;
  description: string;
  basePrice: number;
}

export interface Material {
  id: string;
  name: string;
  priceMultiplier: number;
}

export interface Finish {
  id: string;
  name: string;
  priceAddition: number;
}

export interface Extra {
  id: string;
  name: string;
  price: number;
}

export const stairTypes: StairType[] = [
  { id: "straight", name: "Straight Stairs", description: "Classic linear design", basePrice: 8000 },
  { id: "l-shape", name: "L-Shape Stairs", description: "With landing platform", basePrice: 12000 },
  { id: "u-shape", name: "U-Shape Stairs", description: "Elegant switchback", basePrice: 18000 },
  { id: "spiral", name: "Spiral Stairs", description: "Space-saving circular", basePrice: 15000 },
  { id: "curved", name: "Curved Stairs", description: "Sweeping architectural", basePrice: 25000 },
];

export const materials: Material[] = [
  { id: "oak", name: "Solid Oak", priceMultiplier: 1.0 },
  { id: "mahogany", name: "Mahogany", priceMultiplier: 1.4 },
  { id: "walnut", name: "Black Walnut", priceMultiplier: 1.6 },
  { id: "steel", name: "Structural Steel", priceMultiplier: 1.2 },
  { id: "brass", name: "Brass & Steel", priceMultiplier: 1.8 },
  { id: "glass", name: "Tempered Glass", priceMultiplier: 2.0 },
  { id: "concrete", name: "Polished Concrete", priceMultiplier: 1.1 },
];

export const finishes: Finish[] = [
  { id: "matte", name: "Matte", priceAddition: 0 },
  { id: "satin", name: "Satin", priceAddition: 500 },
  { id: "polished", name: "High Gloss Polished", priceAddition: 1200 },
  { id: "brushed", name: "Brushed", priceAddition: 800 },
];

export const extras: Extra[] = [
  { id: "led", name: "LED Ambient Lighting", price: 2500 },
  { id: "glass-railing", name: "Glass Railing System", price: 4000 },
  { id: "smart-sensors", name: "Smart Motion Sensors", price: 1800 },
  { id: "storage", name: "Under-Stair Storage", price: 3000 },
  { id: "artisan-carving", name: "Artisan Wood Carving", price: 5000 },
];

export function calculatePrice(
  typeId: string,
  width: number,
  height: number,
  steps: number,
  materialId: string,
  finishId: string,
  selectedExtras: string[]
): { min: number; max: number } {
  const type = stairTypes.find(t => t.id === typeId);
  const material = materials.find(m => m.id === materialId);
  const finish = finishes.find(f => f.id === finishId);

  if (!type || !material || !finish) {
    return { min: 0, max: 0 };
  }

  const dimensionFactor = (width * height * steps) / 10000;
  const base = type.basePrice * material.priceMultiplier;
  const dimensionPrice = base * dimensionFactor * 0.3;
  const finishPrice = finish.priceAddition * (steps / 10);
  const extrasPrice = selectedExtras.reduce((sum, extraId) => {
    const extra = extras.find(e => e.id === extraId);
    return sum + (extra?.price || 0);
  }, 0);

  const total = base + dimensionPrice + finishPrice + extrasPrice;

  return {
    min: Math.round(total * 0.85),
    max: Math.round(total * 1.15)
  };
}