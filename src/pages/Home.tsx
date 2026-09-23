import { useState, lazy, Suspense } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen, PlayCircle, FileText, ArrowRight, Sparkles, Clock,
  CheckCircle2, ShieldCheck, Zap, Download, Star, ChevronRight
} from 'lucide-react';
import { useNoteStore } from '../store/useNotes';
import { validateYouTubeUrl } from '../lib/validate';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import SpotlightGlow from '../components/ui/SpotlightGlow';
import TiltCard from '../components/ui/TiltCard';
import MagneticButton from '../components/ui/MagneticButton';
import NumberCounter from '../components/ui/NumberCounter';
import ProductMockup from '../components/ProductMockup';
import { cn } from '../lib/utils';

// Lazy-load 3D Hero Canvas for performance & quick FCP
const HeroScene = lazy(() => import('../components/canvas/HeroScene'));

const DEMO_URL = 'https://www.youtube.com/watch?v=8mAITcNt710';

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

const keyFeatures = [
  {
    icon: Clock,
    title: 'Precise Timestamping',
    tag: 'Instant Navigation',
    desc: 'Each note anchors directly to the exact millisecond. Click any timestamp to jump the video back instantly.',
    accentColor: 'var(--accent-violet)',
    bgAccent: 'rgba(124, 92, 252, 0.1)',
  },
  {
    icon: FileText,
    title: 'One-Click PDF Export',
    tag: 'Study Summaries',
    desc: 'Generate clean, publication-ready study guides with formatted headers, timestamps, and video metadata.',
    accentColor: 'var(--accent-cyan)',
    bgAccent: 'rgba(74, 222, 222, 0.1)',
  },
  {
    icon: ShieldCheck,
    title: 'Local & Zero Login',
    tag: '100% Privacy',
    desc: 'Your notes live strictly in your browser storage. Zero tracking, zero telemetry, and instant offline reliability.',
    accentColor: 'var(--accent-amber)',
    bgAccent: 'rgba(255, 180, 84, 0.1)',
  },
  {
    icon: PlayCircle,
    title: 'Integrated Player Controls',
    tag: 'Theatre & PiP',
    desc: 'Speed adjustment (0.5x–2x), jump forward/back shortcuts, and theater mode engineered for deep focus.',
    accentColor: 'var(--success)',
    bgAccent: 'rgba(52, 211, 153, 0.1)',
  },
];

const howItWorksSteps = [
  {
    step: '01',
    title: 'Paste Video URL',
    desc: 'Drop in any public YouTube lecture, conference talk, or tutorial link.',
    color: 'var(--accent-violet)',
  },
  {
    step: '02',
    title: 'Note Key Moments',
    desc: 'Hit shortcut or type notes — auto-stamped with your current playback position.',
    color: 'var(--accent-cyan)',
  },
  {
    step: '03',
    title: 'Export & Master',
    desc: 'Download your structured PDF cheat sheet and revise anywhere.',
    color: 'var(--accent-amber)',
  },
];

const testimonials = [
  {
    quote: "YtEduNotes cut my study time in half for CS lectures. Jumping right to formula derivations via timestamps is magic.",
    author: "Aarav Sharma",
    role: "Computer Science Undergraduate",
    institution: "IIT Bombay",
  },
  {
    quote: "Finally a tool that doesn't force me to create an account. Clean UI, instant PDF export, and no clutter.",
    author: "Elena Rostova",
    role: "Full-Stack Engineer & Lifelong Learner",
    institution: "Berlin",
  },
  {
    quote: "The split screen with auto-timestamps transformed how I take notes for marathon system design videos.",
    author: "Devendra Patel",
    role: "Senior Backend Architect",
    institution: "Bangalore",
  },
];

export default function Home() {
  const setUrl = useNoteStore((s) => s.setUrl);
  const videoId = useNoteStore((s) => s.videoId);
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState('');
  const [urlError, setUrlError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (urlError) {
      const result = validateYouTubeUrl(e.target.value);
      if (result.valid) setUrlError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateYouTubeUrl(inputValue);
    if (!result.valid) {
      setUrlError(result.error);
      return;
    }
    setUrlError(null);
    setUrl(inputValue.trim());
    navigate('/edunotes');
  };

  const handleTryDemo = () => {
    setUrl(DEMO_URL);
    navigate('/edunotes');
  };

  return (
    <main className="flex-1 flex flex-col items-center overflow-x-hidden relative">

      {/* Ambient Spotlight & Aurora Background */}
      <SpotlightGlow />

      {/* ── SECTION 1: HERO ── */}
      <section className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-16 flex flex-col items-center text-center">

        {/* 3D Background Canvas Layer */}
        <div className="absolute inset-0 h-[480px] pointer-events-none -top-10 opacity-70 dark:opacity-85 -z-10">
          <Suspense fallback={<div className="w-full h-full" />}>
            <HeroScene />
          </Suspense>
        </div>

        {/* Eyebrow Chip */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 border shadow-sm backdrop-blur-md"
          style={{
            backgroundColor: 'var(--bg-surface-2)',
            borderColor: 'var(--border-subtle)',
            color: 'var(--accent-violet)',
          }}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Next-Gen Video Note Taking</span>
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
        </motion.div>

        {/* Hero Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col gap-4 max-w-3xl mx-auto"
        >
          <h1 className="text-display-1" style={{ color: 'var(--text-primary)' }}>
            Learn Smarter with{' '}
            <span className="text-gradient-aurora">Timestamped Notes</span>
          </h1>
          <p
            className="text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            Paste any YouTube educational video. Take real-time notes synchronized with playback. Export pristine PDFs with zero distractions.
          </p>
        </motion.div>

        {/* Input Form Box */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-xl mt-8"
        >
          <form
            onSubmit={handleSubmit}
            className="relative flex flex-col gap-2 p-2 rounded-2xl border shadow-xl backdrop-blur-md"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--bg-surface) 90%, transparent)',
              borderColor: 'var(--border-strong)',
            }}
            noValidate
          >
            <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
              <div className="relative flex-1 w-full">
                <YouTubeIcon
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500 pointer-events-none"
                  aria-hidden="true"
                />
                <Input
                  id="yt-url"
                  type="url"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Paste YouTube Link (e.g., https://youtube.com/watch?v=...)"
                  aria-required="true"
                  aria-invalid={!!urlError}
                  className={cn(
                    'pl-11 h-12 text-sm rounded-xl border-none shadow-none focus-visible:ring-2 focus-visible:ring-[var(--accent-violet)]',
                    urlError && 'focus-visible:ring-red-500'
                  )}
                  style={{
                    backgroundColor: 'var(--bg-surface-2)',
                    color: 'var(--text-primary)',
                  }}
                />
              </div>

              <MagneticButton
                type="submit"
                className="w-full sm:w-auto h-12 px-6 rounded-xl text-white font-semibold text-sm shadow-md gap-2"
                style={{ background: 'var(--signature-gradient)' }}
              >
                <span>Launch Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
            </div>

            {urlError && (
              <p
                role="alert"
                className="text-xs text-left px-2 pt-1 font-medium"
                style={{ color: 'var(--error)' }}
              >
                {urlError}
              </p>
            )}
          </form>

          {/* Quick Actions Strip */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-4 text-xs">
            <button
              type="button"
              onClick={handleTryDemo}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all hover:scale-105 cursor-pointer font-medium"
              style={{
                backgroundColor: 'var(--bg-surface-2)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--accent-violet)',
              }}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Try Interactive Demo (CS50)
            </button>

            {videoId && (
              <button
                type="button"
                onClick={() => navigate('/edunotes')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all hover:scale-105 cursor-pointer font-medium"
                style={{
                  backgroundColor: 'var(--bg-surface-2)',
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--accent-cyan)',
                }}
              >
                <Clock className="w-3.5 h-3.5" />
                Resume Active Session
              </button>
            )}

            <a
              href="https://github.com/web-dev-vishal/Yt_Notes_with_Video"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all hover:scale-105 font-medium"
              style={{
                backgroundColor: 'var(--bg-surface-2)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-secondary)',
              }}
            >
              <GitHubIcon className="w-3.5 h-3.5" />
              ★ Star on GitHub
            </a>
          </div>
        </motion.div>

      </section>

      {/* ── SECTION 2: LIVE PRODUCT MOCKUP SHOWCASE ── */}
      <section className="w-full relative z-10 py-6">
        <ProductMockup />
      </section>

      {/* ── SECTION 3: TRUST & STATS BAR ── */}
      <section
        className="w-full border-y py-10 my-10 relative z-10"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-subtle)',
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">

            <div className="flex flex-col items-center">
              <span className="font-display text-2xl sm:text-3xl font-bold text-gradient-aurora">
                <NumberCounter value={100} suffix="%" />
              </span>
              <span className="text-xs font-mono uppercase tracking-wider mt-1" style={{ color: 'var(--text-muted)' }}>
                Client-Side Privacy
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="font-display text-2xl sm:text-3xl font-bold text-gradient-aurora">
                <NumberCounter value={0} prefix="₹" />
              </span>
              <span className="text-xs font-mono uppercase tracking-wider mt-1" style={{ color: 'var(--text-muted)' }}>
                Free Forever Core
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="font-display text-2xl sm:text-3xl font-bold text-gradient-aurora">
                <NumberCounter value={12000} suffix="+" />
              </span>
              <span className="text-xs font-mono uppercase tracking-wider mt-1" style={{ color: 'var(--text-muted)' }}>
                Notes Captured
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="font-display text-2xl sm:text-3xl font-bold text-gradient-aurora">
                <NumberCounter value={100} suffix="% MIT" />
              </span>
              <span className="text-xs font-mono uppercase tracking-wider mt-1" style={{ color: 'var(--text-muted)' }}>
                Open Source
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 4: 4-FEATURE SHOWCASE GRID ── */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-16 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span
            className="text-xs font-mono font-semibold uppercase tracking-wider px-3 py-1 rounded-full border"
            style={{
              backgroundColor: 'var(--bg-surface-2)',
              borderColor: 'var(--border-subtle)',
              color: 'var(--accent-violet)',
            }}
          >
            Engineered For Deep Learning
          </span>
          <h2 className="text-display-2 mt-3" style={{ color: 'var(--text-primary)' }}>
            Everything You Need To Master Video Content
          </h2>
          <p className="text-sm sm:text-base mt-2" style={{ color: 'var(--text-secondary)' }}>
            No tab flipping. No losing your spot in complex explanations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {keyFeatures.map((feat) => {
            const Icon = feat.icon;
            return (
              <TiltCard
                key={feat.title}
                glowColor={feat.accentColor}
                className="p-6 sm:p-8 border rounded-2xl flex flex-col justify-between gap-6"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-subtle)',
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md shrink-0"
                    style={{
                      backgroundColor: feat.bgAccent,
                      color: feat.accentColor,
                      border: `1px solid ${feat.accentColor}33`,
                    }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span
                    className="text-[11px] font-mono font-semibold uppercase px-2.5 py-1 rounded-md"
                    style={{
                      backgroundColor: 'var(--bg-surface-2)',
                      color: feat.accentColor,
                    }}
                  >
                    {feat.tag}
                  </span>
                </div>

                <div>
                  <h3 className="font-display font-bold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>
                    {feat.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {feat.desc}
                  </p>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </section>

      {/* ── SECTION 5: HOW IT WORKS ── */}
      <section
        className="w-full py-20 relative z-10"
        style={{ backgroundColor: 'var(--bg-surface-2)' }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span
              className="text-xs font-mono font-semibold uppercase tracking-wider px-3 py-1 rounded-full border"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--accent-cyan)',
              }}
            >
              Streamlined Flow
            </span>
            <h2 className="text-display-2 mt-3" style={{ color: 'var(--text-primary)' }}>
              How It Works In 3 Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {howItWorksSteps.map((step, idx) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="p-6 rounded-2xl border flex flex-col gap-4 relative"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-subtle)',
                }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="font-display text-3xl font-extrabold"
                    style={{ color: step.color }}
                  >
                    {step.step}
                  </span>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold"
                    style={{ backgroundColor: `${step.color}18`, color: step.color }}
                  >
                    ✓
                  </div>
                </div>

                <h3 className="font-display font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 6: SOCIAL PROOF / TESTIMONIALS ── */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-20 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span
            className="text-xs font-mono font-semibold uppercase tracking-wider px-3 py-1 rounded-full border"
            style={{
              backgroundColor: 'var(--bg-surface-2)',
              borderColor: 'var(--border-subtle)',
              color: 'var(--accent-amber)',
            }}
          >
            Learner Feedback
          </span>
          <h2 className="text-display-2 mt-3" style={{ color: 'var(--text-primary)' }}>
            Loved By Students & Developers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-2xl border flex flex-col justify-between gap-6"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              <div>
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed italic" style={{ color: 'var(--text-secondary)' }}>
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t flex flex-col" style={{ borderColor: 'var(--border-subtle)' }}>
                <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                  {t.author}
                </span>
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {t.role} · {t.institution}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── SECTION 7: BOTTOM CTA ── */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 pb-20 relative z-10">
        <div
          className="p-8 sm:p-12 rounded-3xl border text-center flex flex-col items-center gap-6 relative overflow-hidden"
          style={{
            backgroundColor: 'var(--bg-surface-2)',
            borderColor: 'var(--border-strong)',
            boxShadow: '0 20px 50px -10px var(--signature-glow)',
          }}
        >
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg"
            style={{ background: 'var(--signature-gradient)' }}
          >
            <BookOpen className="w-6 h-6" />
          </div>

          <div className="max-w-xl">
            <h2 className="text-display-2" style={{ color: 'var(--text-primary)' }}>
              Ready To Upgrade Your Study Flow?
            </h2>
            <p className="text-sm sm:text-base mt-2" style={{ color: 'var(--text-secondary)' }}>
              Start taking timestamped notes right now. Completely free, no registration required.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                document.getElementById('yt-url')?.focus();
              }}
              size="lg"
              className="rounded-xl text-white font-semibold text-sm px-8 gap-2 shadow-lg"
              style={{ background: 'var(--signature-gradient)' }}
            >
              Get Started Now
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Link to="/pricing">
              <Button variant="outline" size="lg" className="rounded-xl text-sm px-6">
                Explore Pro Roadmap
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
