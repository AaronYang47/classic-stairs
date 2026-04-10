# SPEC.md - Luxe Stairs Website

## 1. Concept & Vision

An ultra-premium, immersive website for a luxury staircase company that feels like stepping into an architectural showroom. The design evokes the sensation of floating through a meticulously crafted staircase — ethereal, elegant, and engineered to impress discerning clients. Every interaction whispers sophistication, with frosted glass panels floating over subtle animated gradients that evoke the clean lines of modern staircases.

## 2. Design Language

### Aesthetic Direction
**Architectural Glassmorphism** — Inspired by high-end architectural visualization portfolios and luxury real estate presentations. Think Zaha Hadid meets Apple: dramatic negative space, crystalline UI elements that catch light, and an overall feeling of transparency and precision.

### Color Palette
- **Primary**: `#1a1a2e` (Deep Midnight) — Main background
- **Secondary**: `#16213e` (Navy Shadow) — Section variations
- **Accent**: `#c9a962` (Brushed Gold) — CTAs, highlights
- **Accent Alt**: `#e8d5b7` (Warm Champagne) — Secondary highlights
- **Glass White**: `rgba(255, 255, 255, 0.08)` — Glass panel fills
- **Glass Border**: `rgba(255, 255, 255, 0.18)` — Glass panel borders
- **Text Primary**: `#ffffff` — Headlines
- **Text Secondary**: `rgba(255, 255, 255, 0.7)` — Body text
- **Gradient Orb 1**: `#667eea` (Soft Indigo)
- **Gradient Orb 2**: `#764ba2` (Royal Purple)
- **Gradient Orb 3**: `#f093fb` (Soft Pink)

### Typography
- **Headlines**: `Playfair Display` (700, 600)
- **Body/UI**: `Inter` (300, 400, 500, 600)
- **Accent Text**: `Cormorant Garamond` (500 italic)

### Motion Philosophy
- Smooth scroll with cubic-bezier(0.4, 0, 0.2, 1), 600ms
- Glassmorphism panels: Subtle floating animation (translateY ±8px), 6s infinite
- Gradient orbs: Slow drift animation, 20s infinite
- Hover states: Scale 1.02, shadow expansion, 300ms ease-out
- Stagger reveals: Elements fade in from bottom with 100ms stagger

## 3. Layout & Structure

1. **Hero** — Full viewport, animated gradient background
2. **About/Story** — Company story with parallax image
3. **Services** — Three glass cards: Custom Design, Manufacturing, Installation
4. **Gallery** — Masonry grid of staircase projects with lightbox
5. **Process** — Horizontal timeline: Consultation → Design → Manufacturing → Installation
6. **Testimonials** — Client quotes carousel
7. **Quote Calculator** — Multi-step form with real-time pricing
8. **Contact** — Contact info + form
9. **Footer** — Minimal with logo, links, social icons

## 4. Features

- Smooth scroll navigation
- Scroll-triggered animations
- Gallery lightbox
- Quote calculator (5 steps)
- Live chat widget
- Contact form with validation
- Mobile hamburger menu

## 5. Technical Stack

- Vite + React 18 + TypeScript
- Tailwind CSS + custom glassmorphism utilities
- Framer Motion for animations
- Lucide React for icons
- Google Fonts (Playfair Display, Inter, Cormorant Garamond)
