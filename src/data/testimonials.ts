export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  project: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "Luxe Stairs transformed our entryway into a masterpiece. The attention to detail and craftsmanship exceeded our expectations. Our guests are always amazed by the floating glass staircase.",
    author: "Victoria Hartwell",
    role: "Homeowner",
    project: "Modern Glass Floating Stairs",
    rating: 5
  },
  {
    id: 2,
    quote: "Working with Luxe Stairs was seamless from design to installation. They understood our architectural vision perfectly and delivered a spiral staircase that is both functional and stunning.",
    author: "Marcus Chen",
    role: "Architect",
    project: "Custom Spiral Staircase",
    rating: 5
  },
  {
    id: 3,
    quote: "The quality of materials and workmanship is exceptional. Our mahogany staircase is the centerpiece of our luxury penthouse. Worth every penny for the premium quality.",
    author: "Elizabeth Whitmore",
    role: "Interior Designer",
    project: "Mahogany Classic Stairs",
    rating: 5
  },
  {
    id: 4,
    quote: "From the initial consultation to final installation, the team was professional and communicative. The concrete minimalist stairs they created fit perfectly with our modern aesthetic.",
    author: "James Morrison",
    role: "Property Developer",
    project: "Concrete Minimalist Design",
    rating: 5
  }
];