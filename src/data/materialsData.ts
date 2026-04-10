export interface MaterialInfo {
  id: string;
  name: string;
  description: string;
  image: string;
  durability: number;
  aesthetics: number;
  priceLevel: number;
  traits: string[];
}

export const materialsData: MaterialInfo[] = [
  {
    id: 'oak',
    name: 'European Oak',
    description:
      'The gold standard for staircase timber. Prized for its tight grain, warm honey tones, and exceptional hardness that only improves with age.',
    image:
      'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=600&q=80',
    durability: 88,
    aesthetics: 90,
    priceLevel: 65,
    traits: ['Warm Tone', 'Hard-wearing', 'Ages Beautifully'],
  },
  {
    id: 'walnut',
    name: 'American Walnut',
    description:
      'Deep chocolate hues and flowing grain patterns make walnut the choice for spaces that demand richness and sophistication.',
    image:
      'https://images.unsplash.com/photo-1541123603104-512919d6a96c?auto=format&fit=crop&w=600&q=80',
    durability: 82,
    aesthetics: 95,
    priceLevel: 80,
    traits: ['Rich Color', 'Flowing Grain', 'Premium'],
  },
  {
    id: 'marble',
    name: 'Carrara Marble',
    description:
      'Quarried in Tuscany for centuries. Its luminous white surface and grey veining evoke timeless grandeur in every step.',
    image:
      'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=600&q=80',
    durability: 75,
    aesthetics: 98,
    priceLevel: 92,
    traits: ['Luminous', 'Iconic Veining', 'Luxury'],
  },
  {
    id: 'glass',
    name: 'Tempered Glass',
    description:
      'Engineered for safety and transparency. Structural glass treads and panels flood interiors with light while maintaining strength.',
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
    durability: 80,
    aesthetics: 85,
    priceLevel: 78,
    traits: ['Transparent', 'Light-flooding', 'Modern'],
  },
  {
    id: 'brass',
    name: 'Brushed Brass',
    description:
      'Hand-finished brass elements add a layer of warmth and artisan quality. Develops a living patina that tells the story of your home.',
    image:
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=600&q=80',
    durability: 85,
    aesthetics: 92,
    priceLevel: 75,
    traits: ['Living Patina', 'Artisan', 'Warm Metallic'],
  },
  {
    id: 'steel',
    name: 'Blackened Steel',
    description:
      'Raw industrial character meets precision engineering. Blackened steel structures provide the backbone for contemporary and loft designs.',
    image:
      'https://images.unsplash.com/photo-1505409859467-3a796fd5a263?auto=format&fit=crop&w=600&q=80',
    durability: 95,
    aesthetics: 78,
    priceLevel: 60,
    traits: ['Industrial', 'Structural', 'Matte Black'],
  },
];
