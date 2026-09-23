import { useState } from 'react';
import { Mail, MapPin, ArrowRight, ShieldCheck, Sparkles, CheckCircle2, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogDescription, DialogFooter
} from './ui/dialog';
import { Button } from './ui/button';

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

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/',                             Icon: InstagramIcon },
  { label: 'Twitter',   href: 'https://twitter.com/',                                   Icon: XIcon         },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/',                              Icon: LinkedInIcon  },
  { label: 'YouTube',   href: 'https://www.youtube.com/',                               Icon: YouTubeIcon   },
];

const navigationLinks = [
  { label: 'Home',           to: '/'        },
  { label: 'Study Workspace', to: '/edunotes' },
  { label: 'Pricing Plans',  to: '/pricing' },
  { label: 'About Project',  to: '/about'   },
  { label: 'Contact Us',     to: '/contact' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }
    setIsSubscribed(true);
    toast.success('Thank you! We will notify you when Pro releases.');
    setEmail('');
  };

  return (
    <footer
      className="w-full border-t mt-auto relative z-10 overflow-hidden"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)',
      }}
    >
      {/* Decorative top gradient accent */}
      <div
        className="h-[2px] w-full"
        style={{ background: 'var(--signature-gradient)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

          {/* Column 1: Brand & Bio (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-xs"
                style={{ background: 'var(--signature-gradient)' }}
              >
                Y
              </div>
              <span className="font-display font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                YtEduNotes
              </span>
            </div>

            <p className="text-sm leading-relaxed max-w-sm" style={{ color: 'var(--text-secondary)' }}>
              A high-precision educational note-taking workstation built for YouTube learners.
              Capture insights seamlessly with zero tab switching.
            </p>

            {/* Location & Live Operational Status */}
            <div className="flex flex-col gap-1.5 pt-1 text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span style={{ color: 'var(--text-secondary)' }}>Thane, Maharashtra, India</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>100% Client-Side Privacy & Local Storage</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2 mt-2">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 rounded-lg border transition-all duration-200 hover:scale-110"
                  style={{
                    backgroundColor: 'var(--bg-surface-2)',
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Navigation Links (3 cols) */}
          <div className="lg:col-span-3">
            <h4
              className="text-xs font-mono font-semibold uppercase tracking-wider mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              {navigationLinks.map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="transition-colors hover:text-[var(--accent-violet)]"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Pro Notification & Newsletter (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" style={{ color: 'var(--accent-amber)' }} />
              <h4
                className="text-xs font-mono font-semibold uppercase tracking-wider"
                style={{ color: 'var(--text-primary)' }}
              >
                Pro Launch Radar
              </h4>
            </div>

            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Be the first to get cloud sync, AI summarization, and multi-device note backups when Pro drops.
            </p>

            {isSubscribed ? (
              <div
                className="p-3 rounded-xl border flex items-center gap-2 text-xs text-emerald-400 font-medium"
                style={{
                  backgroundColor: 'rgba(16, 185, 129, 0.08)',
                  borderColor: 'rgba(16, 185, 129, 0.25)',
                }}
              >
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>You're on the early access radar!</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@email.com"
                  className="flex-1 px-3 py-2 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-[var(--accent-violet)]"
                  style={{
                    backgroundColor: 'var(--bg-surface-2)',
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--text-primary)',
                  }}
                  aria-label="Email for updates"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="h-auto py-2 px-3.5 text-xs rounded-xl font-medium text-white shadow-sm"
                  style={{ background: 'var(--signature-gradient)' }}
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </form>
            )}

            <div className="flex items-center gap-4 text-xs pt-1" style={{ color: 'var(--text-muted)' }}>
              <button
                type="button"
                onClick={() => setPrivacyOpen(true)}
                className="hover:underline cursor-pointer"
              >
                Privacy Policy
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => setTermsOpen(true)}
                className="hover:underline cursor-pointer"
              >
                Terms of Service
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div
          className="mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{
            borderColor: 'var(--border-subtle)',
            color: 'var(--text-muted)',
          }}
        >
          <div className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} YtEduNotes.</span>
            <span>Crafted with</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" />
            <span>for curious minds worldwide.</span>
          </div>

          <div className="flex items-center gap-3 font-mono text-[11px]">
            <span>React 19</span>
            <span>•</span>
            <span>Tailwind v4</span>
            <span>•</span>
            <span>Framer Motion</span>
          </div>
        </div>
      </div>

      {/* Privacy Policy Dialog */}
      <Dialog open={privacyOpen} onOpenChange={setPrivacyOpen}>
        <DialogContent
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-strong)',
            color: 'var(--text-primary)',
          }}
        >
          <DialogHeader>
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <DialogTitle className="font-display text-lg">Privacy Policy</DialogTitle>
            </div>
            <DialogDescription style={{ color: 'var(--text-secondary)' }}>
              How YtEduNotes handles your notes and data.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            <p>
              <strong style={{ color: 'var(--text-primary)' }}>100% Client-Side Architecture:</strong> All notes you type, video timestamps, and active sessions are stored strictly inside your browser's local storage (IndexedDB/localStorage).
            </p>
            <p>
              <strong style={{ color: 'var(--text-primary)' }}>No Remote Database Storage:</strong> We do not transmit or store your note contents on remote servers. When you clear your browser storage or delete notes, they are permanently removed.
            </p>
            <p>
              <strong style={{ color: 'var(--text-primary)' }}>YouTube IFrame:</strong> Videos are embedded directly through official YouTube IFrame APIs subject to Google/YouTube's terms.
            </p>
          </div>
          <DialogFooter>
            <Button size="sm" onClick={() => setPrivacyOpen(false)}>Understood</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Terms of Service Dialog */}
      <Dialog open={termsOpen} onOpenChange={setTermsOpen}>
        <DialogContent
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-strong)',
            color: 'var(--text-primary)',
          }}
        >
          <DialogHeader>
            <DialogTitle className="font-display text-lg">Terms of Service</DialogTitle>
            <DialogDescription style={{ color: 'var(--text-secondary)' }}>
              Terms governing the usage of YtEduNotes.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            <p>
              <strong style={{ color: 'var(--text-primary)' }}>Educational Use:</strong> YtEduNotes is provided for free educational and personal productivity purposes.
            </p>
            <p>
              <strong style={{ color: 'var(--text-primary)' }}>Exported Content:</strong> You own all PDF exports and written notes generated within the application.
            </p>
            <p>
              <strong style={{ color: 'var(--text-primary)' }}>Open Source:</strong> Code is freely available under the MIT license on GitHub.
            </p>
          </div>
          <DialogFooter>
            <Button size="sm" onClick={() => setTermsOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </footer>
  );
}
