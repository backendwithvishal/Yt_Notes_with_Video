import { Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

// Inline SVG social icons (lucide-react v1.8 doesn't include brand icons)
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
    </svg>
  );
}

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/', Icon: InstagramIcon },
  { label: 'Twitter',   href: 'https://twitter.com/',       Icon: XIcon         },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/',  Icon: LinkedInIcon  },
  { label: 'YouTube',   href: 'https://www.youtube.com/',   Icon: YouTubeIcon   },
];

const quickLinks = [
  { label: 'Home',    to: '/'        },
  { label: 'About',   to: '/about'   },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Contact', to: '/contact' },
];

export default function Footer() {
  return (
    <footer
      className="w-full border-t mt-auto theme-transition"
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">

          {/* Branding */}
          <div className="flex flex-col gap-3 max-w-xs">
            <p className="font-semibold text-base" style={{ color: 'var(--foreground)' }}>
              YtEduNotes
            </p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
              Take timestamped notes while watching YouTube videos. Paste a link and start learning.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-1">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="transition-opacity hover:opacity-60"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-10">
            {/* Quick links */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--muted-foreground)' }}>
                Navigation
              </h4>
              <ul className="space-y-2 text-sm">
                {quickLinks.map(({ label, to }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="transition-colors hover:opacity-80"
                      style={{ color: 'var(--foreground)' }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--muted-foreground)' }}>
                Contact
              </h4>
              <ul className="space-y-2.5 text-sm" style={{ color: 'var(--muted-foreground)' }}>
                <li className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <a
                    href="mailto:vishalsanam83@gmail.com"
                    className="hover:underline"
                    style={{ color: 'var(--foreground)' }}
                  >
                    vishalsanam83@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>Thane, Maharashtra, India</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div
          className="mt-8 pt-6 border-t text-xs"
          style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>© {new Date().getFullYear()} YtEduNotes. All rights reserved.</span>
            <span>Built with React · Tailwind CSS · Vite</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
