import { useState } from 'react';
import { Check, Zap, BookOpen, ArrowRight, Sparkles, Bell, ShieldCheck, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Button } from '../components/ui/button';
import NumberCounter from '../components/ui/NumberCounter';
import TiltCard from '../components/ui/TiltCard';
import { AccordionItem } from '../components/ui/accordion';
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogDescription, DialogFooter
} from '../components/ui/dialog';
import SpotlightGlow from '../components/ui/SpotlightGlow';
import { cn } from '../lib/utils';

const freeFeatures = [
  'Unlimited YouTube video sessions',
  'Precise millisecond timestamping',
  'Export formatted study notes to PDF',
  'Instant Light / Dark theme toggling',
  'Local browser persistent storage',
  'Playback speed controls (0.5x - 2.0x)',
  'Theatre focus mode & Picture-in-Picture',
  'Zero sign-up / 100% private',
];

const proFeatures = [
  'Everything included in Free forever',
  'Encrypted cloud sync across all devices',
  'AI auto-summarization & key takeaways',
  'Nested folders, custom tags & search',
  'Interactive flashcard generation',
  'Export to Markdown, Notion & Obsidian',
  'Priority feature requests & developer support',
];

const faqData = [
  {
    q: 'How is YtEduNotes completely free to use?',
    a: 'YtEduNotes is built on a client-side architecture with no costly backend servers required for the core note-taking engine. Everything runs directly inside your modern browser, allowing us to keep the core tool 100% free and open source forever.',
  },
  {
    q: 'Are my notes and study data private?',
    a: 'Absolutely. We do not store your notes on remote tracking databases. Your notes are saved strictly in your local browser storage. When you clear your browser data or export to PDF, you retain full ownership.',
  },
  {
    q: 'When will the Pro plan launch?',
    a: 'Pro is actively in development. It will introduce cross-device cloud synchronization, AI lecture takeaways, and direct Notion/Obsidian exporters. You can join the early access waitlist above to be notified first with founder discounts.',
  },
  {
    q: 'What format are notes exported in?',
    a: 'You can export all timestamped notes as a formatted, printable PDF document complete with clickable video timestamps and metadata.',
  },
  {
    q: 'Does it work with unlisted or private YouTube videos?',
    a: 'It works with all public and unlisted YouTube educational videos that allow embedding via the official YouTube IFrame API.',
  },
];

export default function Pricing() {
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifyEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(notifyEmail)) {
      toast.error('Please enter a valid email address.');
      return;
    }
    toast.success('You have been added to the Pro VIP early access list!');
    setNotifyOpen(false);
    setNotifyEmail('');
  };

  return (
    <main className="flex-1 overflow-x-hidden relative">
      <SpotlightGlow showBlobs={true} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20 flex flex-col gap-16 relative z-10">

        {/* ── HEADER ── */}
        <div className="flex flex-col items-center text-center gap-3 max-w-2xl mx-auto">
          <span
            className="text-xs font-mono font-semibold uppercase tracking-wider px-3 py-1 rounded-full border"
            style={{
              backgroundColor: 'var(--bg-surface-2)',
              borderColor: 'var(--border-subtle)',
              color: 'var(--accent-violet)',
            }}
          >
            Transparent Pricing
          </span>
          <h1 className="text-display-1" style={{ color: 'var(--text-primary)' }}>
            Simple Plans, <span className="text-gradient-aurora">Maximum Focus</span>
          </h1>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Start completely free with zero friction. Upgrade to Pro for cloud synchronization and multi-device learning.
          </p>
        </div>

        {/* ── PRICING CARDS (Free vs Pro) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto w-full">

          {/* FREE CARD */}
          <TiltCard
            glowColor="var(--accent-cyan)"
            className="p-8 border rounded-3xl flex flex-col justify-between"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-subtle)',
            }}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                    style={{ background: 'linear-gradient(135deg, #14B8C4, #4ADEDE)' }}
                  >
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-xl" style={{ color: 'var(--text-primary)' }}>
                      Free Forever
                    </h2>
                    <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                      For Solo Students
                    </span>
                  </div>
                </div>
                <span
                  className="text-xs font-mono font-bold uppercase px-2.5 py-1 rounded-md"
                  style={{
                    backgroundColor: 'rgba(20, 184, 196, 0.1)',
                    color: 'var(--accent-cyan)',
                  }}
                >
                  Standard
                </span>
              </div>

              <div className="flex items-baseline gap-1 my-6">
                <span className="font-display text-4xl sm:text-5xl font-extrabold" style={{ color: 'var(--text-primary)' }}>
                  <NumberCounter value={0} prefix="₹" />
                </span>
                <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
                  / forever free
                </span>
              </div>

              <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                Full core workstation experience with unlimited videos and instant PDF exports.
              </p>

              <Link to="/" className="w-full">
                <Button
                  variant="outline"
                  className="w-full h-12 rounded-xl text-sm font-semibold gap-2 border-2 transition-all hover:scale-[1.02]"
                >
                  Launch Free Workspace
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>

              {/* Divider */}
              <div className="my-8 h-px" style={{ backgroundColor: 'var(--border-subtle)' }} />

              {/* Features List */}
              <div className="space-y-3">
                <p className="text-xs font-mono font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-primary)' }}>
                  Included Capabilities:
                </p>
                {freeFeatures.map((f) => (
                  <div key={f} className="flex items-start gap-2.5 text-xs sm:text-sm">
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: 'rgba(20, 184, 196, 0.15)', color: 'var(--accent-cyan)' }}
                    >
                      <Check className="w-3 h-3" />
                    </div>
                    <span style={{ color: 'var(--text-secondary)' }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </TiltCard>

          {/* PRO CARD (Elevated with Conic Gradient Border) */}
          <div className="conic-border-wrap transform lg:-translate-y-2">
            <div
              className="p-8 rounded-3xl h-full flex flex-col justify-between relative overflow-hidden"
              style={{
                backgroundColor: 'var(--bg-surface-2)',
              }}
            >
              {/* Coming Soon Glowing Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg"
                    style={{ background: 'var(--signature-gradient)' }}
                  >
                    <Zap className="w-5 h-5 text-amber-300" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-xl" style={{ color: 'var(--text-primary)' }}>
                      Pro Power
                    </h2>
                    <span className="text-xs font-mono text-purple-400">
                      Cloud & AI Supercharged
                    </span>
                  </div>
                </div>

                <div
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase shadow-sm"
                  style={{
                    backgroundColor: 'rgba(255, 180, 84, 0.15)',
                    color: 'var(--accent-amber)',
                    border: '1px solid rgba(255, 180, 84, 0.4)',
                  }}
                >
                  <Sparkles className="w-3 h-3" />
                  Coming Soon
                </div>
              </div>

              <div className="flex items-baseline gap-1 my-6">
                <span className="font-display text-4xl sm:text-5xl font-extrabold text-gradient-aurora">
                  <NumberCounter value={199} prefix="₹" />
                </span>
                <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
                  / month (launch price)
                </span>
              </div>

              <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                For power students and researchers who need seamless cloud sync, AI summaries, and Notion integration.
              </p>

              <Button
                onClick={() => setNotifyOpen(true)}
                className="w-full h-12 rounded-xl text-sm font-semibold text-white shadow-xl gap-2 transition-all hover:scale-[1.02] cursor-pointer"
                style={{ background: 'var(--signature-gradient)' }}
              >
                <Bell className="w-4 h-4" />
                Notify Me at Launch (50% Off)
              </Button>

              {/* Divider */}
              <div className="my-8 h-px" style={{ backgroundColor: 'var(--border-subtle)' }} />

              {/* Pro Features */}
              <div className="space-y-3">
                <p className="text-xs font-mono font-semibold uppercase tracking-wider mb-2 text-purple-400">
                  Everything in Free, plus:
                </p>
                {proFeatures.map((f) => (
                  <div key={f} className="flex items-start gap-2.5 text-xs sm:text-sm">
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: 'rgba(124, 92, 252, 0.2)', color: 'var(--accent-violet-2)' }}
                    >
                      <Check className="w-3 h-3 font-bold" />
                    </div>
                    <span style={{ color: 'var(--text-primary)' }} className="font-medium">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* ── FAQ ACCORDION SECTION ── */}
        <div className="max-w-3xl mx-auto w-full mt-10">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <HelpCircle className="w-5 h-5 text-purple-400" />
              <h2 className="font-display font-bold text-2xl" style={{ color: 'var(--text-primary)' }}>
                Frequently Asked Questions
              </h2>
            </div>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Everything you need to know about plans, privacy, and roadmap.
            </p>
          </div>

          <div className="space-y-3">
            {faqData.map((item, idx) => (
              <AccordionItem
                key={item.q}
                question={item.q}
                answer={item.a}
                isOpen={openFaqIndex === idx}
                onToggle={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
              />
            ))}
          </div>

          <div
            className="mt-8 p-4 rounded-2xl border text-center text-xs"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-muted)',
            }}
          >
            Have a custom requirement or question?{' '}
            <Link to="/contact" className="font-semibold underline hover:text-[var(--accent-violet)]" style={{ color: 'var(--text-primary)' }}>
              Contact our team
            </Link>
          </div>
        </div>

      </div>

      {/* Early Access Notification Dialog */}
      <Dialog open={notifyOpen} onOpenChange={setNotifyOpen}>
        <DialogContent
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-strong)',
            color: 'var(--text-primary)',
          }}
        >
          <DialogHeader>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <DialogTitle className="font-display text-lg">Join the Pro Waitlist</DialogTitle>
            </div>
            <DialogDescription style={{ color: 'var(--text-secondary)' }}>
              Get 50% lifetime discount on launch day + early beta access.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleNotifySubmit} className="space-y-4 py-2">
            <div>
              <label htmlFor="pro-email" className="text-xs font-medium block mb-1.5" style={{ color: 'var(--text-primary)' }}>
                Your Email Address
              </label>
              <input
                id="pro-email"
                type="email"
                value={notifyEmail}
                onChange={(e) => setNotifyEmail(e.target.value)}
                placeholder="name@university.edu"
                required
                className="w-full px-3.5 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-[var(--accent-violet)]"
                style={{
                  backgroundColor: 'var(--bg-surface-2)',
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--text-primary)',
                }}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" size="sm" onClick={() => setNotifyOpen(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                className="text-white font-medium"
                style={{ background: 'var(--signature-gradient)' }}
              >
                Claim VIP Invite
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  );
}
