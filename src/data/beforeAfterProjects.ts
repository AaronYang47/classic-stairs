export interface BeforeAfterProject {
  id: number;
  title: string;
  description: string;
  before: string;
  after: string;
  tags: string[];
}

export const beforeAfterProjects: BeforeAfterProject[] = [
  {
    id: 1,
    title: 'Victorian to Modern Floating',
    description:
      'Replaced a cramped Victorian staircase with an open floating design featuring glass balustrades and LED-lit oak treads.',
    before:
      'https://images.unsplash.com/photo-1572025442646-866d16c84a54?auto=format&fit=crop&w=800&q=80',
    after:
      'https://images.unsplash.com/photo-1704040686324-e0552fbc9167?auto=format&fit=crop&w=800&q=80',
    tags: ['Oak', 'Glass Railing', 'LED Lighting'],
  },
  {
    id: 2,
    title: 'Carpeted to Marble Grand',
    description:
      'Transformed a dated carpeted stairway into an elegant marble showpiece with brass-finished handrails and herringbone detailing.',
    before:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    after:
      'https://images.unsplash.com/photo-1740403016700-28f659e3c7ec?auto=format&fit=crop&w=800&q=80',
    tags: ['Marble', 'Brass Handrail', 'Herringbone'],
  },
  {
    id: 3,
    title: 'Industrial Loft Spiral',
    description:
      'Converted a basic ladder access into a sculptural steel spiral staircase — the centrepiece of a converted warehouse loft.',
    before:
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    after:
      'https://images.unsplash.com/photo-1559401029-c05353168280?auto=format&fit=crop&w=800&q=80',
    tags: ['Steel', 'Spiral', 'Warehouse Conversion'],
  },
];
