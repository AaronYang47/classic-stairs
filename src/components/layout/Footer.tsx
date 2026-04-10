import { SITE } from '../../lib/siteInfo';
import { scrollToSection } from '../../lib/scrollToSection';

const SocialIcon = ({ name }: { name: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    {name === 'facebook' && <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>}
    {name === 'instagram' && <><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></>}
    {name === 'twitter' && <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>}
    {name === 'linkedin' && <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></>}
  </svg>
);

const quickLinks = [
  { label: 'About Us', href: '#about' as const },
  { label: 'Services', href: '#services' as const },
  { label: 'Gallery', href: '#gallery' as const },
  { label: 'Process', href: '#process' as const },
  { label: 'Get a Quote', href: '#calculator' as const },
  { label: 'Contact', href: '#contact' as const },
];

export function Footer() {
  return (
    <footer className="py-16 px-6 border-t border-white/10 bg-black/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-accent" aria-hidden>
                <path d="M8 32L20 8L32 32H8Z" stroke="currentColor" strokeWidth="2" fill="none" />
                <line x1="12" y1="24" x2="28" y2="24" stroke="currentColor" strokeWidth="2" />
                <line x1="14" y1="18" x2="26" y2="18" stroke="currentColor" strokeWidth="2" />
              </svg>
              <span className="font-display text-2xl font-semibold text-ink">{SITE.name}</span>
            </div>
            <p className="text-secondary max-w-md leading-relaxed">
              Crafting exceptional staircases since 1985. Each piece is a testament to our dedication
              to quality, innovation, and timeless design.
            </p>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold text-ink mb-4">Quick links</h4>
            <ul className="space-y-2 text-secondary">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(link.href)}
                    className="hover:text-accent transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold text-ink mb-4">Contact</h4>
            <ul className="space-y-2 text-secondary">
              <li>{SITE.addressLine1}</li>
              <li>{SITE.addressLine2}</li>
              <li className="pt-2">
                <a href={`mailto:${SITE.email}`} className="hover:text-accent transition-colors">
                  {SITE.email}
                </a>
              </li>
              <li>
                <a href={`tel:${SITE.phoneTel}`} className="hover:text-accent transition-colors">
                  {SITE.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10">
          <p className="text-secondary text-sm mb-4 md:mb-0">
            © 2026 {SITE.name}. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a
              href={SITE.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-accent transition-colors"
              aria-label="Facebook"
            >
              <SocialIcon name="facebook" />
            </a>
            <a
              href={SITE.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-accent transition-colors"
              aria-label="Instagram"
            >
              <SocialIcon name="instagram" />
            </a>
            <a
              href={SITE.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-accent transition-colors"
              aria-label="X (Twitter)"
            >
              <SocialIcon name="twitter" />
            </a>
            <a
              href={SITE.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-accent transition-colors"
              aria-label="LinkedIn"
            >
              <SocialIcon name="linkedin" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
