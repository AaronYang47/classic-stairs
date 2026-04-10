export interface GalleryImage {
  id: number;
  src: string;
  title: string;
  description: string;
  category: string;
}

/** Unsplash URLs verified to depict staircase subjects matching each category label. */
export const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1704040686324-e0552fbc9167?auto=format&fit=crop&w=800&q=80",
    title: "Floating Elegance",
    description: "Modern floating stairs with glass railing",
    category: "Modern"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1495045197504-5128e3c8469f?auto=format&fit=crop&w=800&q=80",
    title: "Spiral Sanctuary",
    description: "Architectural spiral staircase",
    category: "Spiral"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1740403016700-28f659e3c7ec?auto=format&fit=crop&w=800&q=80",
    title: "Grand Entrance",
    description: "Luxury curved marble staircase",
    category: "Curved"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1752847898156-d4fb8da027aa?auto=format&fit=crop&w=800&q=80",
    title: "Oak Classic",
    description: "Traditional oak wooden stairs",
    category: "Classic"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1758548157499-c61b0730dc42?auto=format&fit=crop&w=800&q=80",
    title: "Glass Transparency",
    description: "Full glass balustrade staircase, bright minimal interior",
    category: "Modern"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1559401029-c05353168280?auto=format&fit=crop&w=800&q=80",
    title: "Industrial Chic",
    description: "Steel and wood combination",
    category: "Industrial"
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1764824080417-2db640c66142?auto=format&fit=crop&w=800&q=80",
    title: "Minimalist Dream",
    description: "Concrete minimalist design",
    category: "Minimalist"
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1766284808343-43bddc472236?auto=format&fit=crop&w=800&q=80",
    title: "Brass Heritage",
    description: "Brass railing with dark wood",
    category: "Classic"
  }
];
