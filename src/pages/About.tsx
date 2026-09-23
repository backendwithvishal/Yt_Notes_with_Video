import {
  BookOpen, Clock, FileDown, Moon, ExternalLink, Code2, Sparkles,
  Layers, Shield, Laptop, Globe, User
} from 'lucide-react';
import { motion } from 'framer-motion';
import SpotlightGlow from '../components/ui/SpotlightGlow';
import TiltCard from '../components/ui/TiltCard';

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

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
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

const techStack = [
  { name: 'React 19',           category: 'UI Core',       desc: 'Concurrent React UI engine'   },
  { name: 'TypeScript',         category: 'Types',         desc: 'Strict type verification'     },
  { name: 'Vite 8',             category: 'Build',         desc: 'Instant HMR development'      },
  { name: 'Tailwind CSS v4',    category: 'Design System', desc: 'CSS theme tokens & variants'  },
  { name: 'Framer Motion',      category: 'Motion',        desc: 'Smooth physics & gestures'    },
  { name: 'React Three Fiber',  category: '3D Graphics',   desc: 'Interactive WebGL canvas'     },
  { name: 'Zustand',            category: 'State',         desc: 'Atomic state management'      },
  { name: 'YouTube IFrame API', category: 'Media',         desc: 'Low-latency video controls'   },
  { name: 'jsPDF',              category: 'Export',        desc: 'Vector study document engine' },
  { name: 'Radix UI',           category: 'A11y',          desc: 'Headless accessible dialogs'  },
];

const keyFeatures = [
  {
    icon: Clock,
    title: 'Precise Timestamp Navigation',
    desc: 'Each note is tagged with video playback coordinates down to the millisecond. Click any timestamp to rewind directly.',
    accentColor: 'var(--accent-violet)',
    bgAccent: 'rgba(124, 92, 252, 0.12)',
  },
  {
    icon: FileDown,
    title: 'Instant PDF Study Guides',
    desc: 'Generate clean, printable PDF documents with video metadata, chapter titles, and notes ready for offline revision.',
    accentColor: 'var(--accent-cyan)',
    bgAccent: 'rgba(74, 222, 222, 0.12)',
  },
  {
    icon: Moon,
    title: 'Adaptive Dual Palette',
    desc: 'Fine-tuned light and dark modes with WCAG AA compliance, ensuring optimal contrast during midnight study marathons.',
    accentColor: 'var(--accent-amber)',
    bgAccent: 'rgba(255, 180, 84, 0.12)',
  },
  {
    icon: YouTubeIcon,
    title: 'Native YouTube Controls',
    desc: 'Seamlessly embeds YouTube educational talks alongside your workspace without sluggish external tab switches.',
    accentColor: 'var(--success)',
    bgAccent: 'rgba(52, 211, 153, 0.12)',
  },
];

export default function About() {
  return (
    <main className="flex-1 overflow-x-hidden relative">
      <SpotlightGlow showBlobs={true} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 sm:py-20 flex flex-col gap-16 relative z-10">

        {/* ── PROJECT OVERVIEW ── */}
        <section aria-labelledby="overview-heading" className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md"
              style={{ background: 'var(--signature-gradient)' }}
            >
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-purple-400">
                Philosophy & Purpose
              </span>
              <h1 id="overview-heading" className="text-display-2" style={{ color: 'var(--text-primary)' }}>
                Project Overview
              </h1>
            </div>
          </div>

          <div
            className="p-6 sm:p-8 rounded-3xl border space-y-4 text-sm sm:text-base leading-relaxed"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-secondary)',
            }}
          >
            <p>
              <strong style={{ color: 'var(--text-primary)' }}>YtEduNotes</strong> was designed around a simple insight:
              watching YouTube educational lectures is one of the highest-yield ways to learn modern topics, but taking notes
              is fragmented. Constantly toggling between browser tabs, pausing, writing in another app, and losing track of timestamps
              destroys cognitive flow.
            </p>
            <p>
              YtEduNotes unifies video playback and structured note-taking into a single focused workspace. All notes are indexed
              to the timeline, stored locally for privacy, and exportable as formatted PDFs with one click.
            </p>
          </div>
        </section>

        {/* ── KEY FEATURES (Distinct Accents) ── */}
        <section aria-labelledby="features-heading">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 id="features-heading" className="font-display font-bold text-2xl" style={{ color: 'var(--text-primary)' }}>
              Key Features
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {keyFeatures.map((feat) => {
              const Icon = feat.icon;
              return (
                <TiltCard
                  key={feat.title}
                  glowColor={feat.accentColor}
                  className="p-6 rounded-2xl border flex gap-4 items-start"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    borderColor: 'var(--border-subtle)',
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
                    style={{
                      backgroundColor: feat.bgAccent,
                      color: feat.accentColor,
                      border: `1px solid ${feat.accentColor}33`,
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base mb-1.5" style={{ color: 'var(--text-primary)' }}>
                      {feat.title}
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {feat.desc}
                    </p>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </section>

        {/* ── TECH STACK ── */}
        <section aria-labelledby="tech-heading">
          <div className="flex items-center gap-2 mb-6">
            <Code2 className="w-5 h-5 text-cyan-400" />
            <h2 id="tech-heading" className="font-display font-bold text-2xl" style={{ color: 'var(--text-primary)' }}>
              Modern Tech Stack
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {techStack.map((tech, idx) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                className="p-3.5 rounded-xl border flex flex-col justify-between gap-1 transition-all hover:scale-105"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-subtle)',
                }}
              >
                <span
                  className="text-[10px] font-mono font-bold uppercase"
                  style={{ color: 'var(--accent-violet)' }}
                >
                  {tech.category}
                </span>
                <span className="font-display font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                  {tech.name}
                </span>
                <span className="text-[11px] leading-tight" style={{ color: 'var(--text-muted)' }}>
                  {tech.desc}
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── CREATOR PROFILE ── */}
        <section aria-labelledby="creator-heading">
          <div className="flex items-center gap-2 mb-6">
            <User className="w-5 h-5 text-purple-400" />
            <h2 id="creator-heading" className="font-display font-bold text-2xl" style={{ color: 'var(--text-primary)' }}>
              Creator
            </h2>
          </div>

          <TiltCard
            glowColor="var(--accent-violet)"
            className="p-6 sm:p-8 rounded-3xl border flex flex-col sm:flex-row items-start sm:items-center gap-6"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-subtle)',
            }}
          >
            {/* Custom Illustrated Developer Avatar */}
            <div className="relative shrink-0">
              <div
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden flex items-center justify-center shadow-lg border-2"
                style={{
                  background: 'linear-gradient(135deg, #7C5CFC 0%, #4ADEDE 100%)',
                  borderColor: 'var(--border-strong)',
                }}
              >
                {/* SVG Illustrated Avatar with Tech Vibe */}
                <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                  <circle cx="50" cy="50" r="48" fill="#111116" />
                  <path
                    d="M30 85 C30 65 70 65 70 85"
                    fill="#7C5CFC"
                    opacity="0.85"
                  />
                  <circle cx="50" cy="45" r="20" fill="#F5F5F7" />
                  {/* Glasses */}
                  <rect x="36" y="42" width="11" height="8" rx="2" stroke="#111116" strokeWidth="2.5" fill="#4ADEDE" fillOpacity="0.4" />
                  <rect x="53" y="42" width="11" height="8" rx="2" stroke="#111116" strokeWidth="2.5" fill="#4ADEDE" fillOpacity="0.4" />
                  <line x1="47" y1="46" x2="53" y2="46" stroke="#111116" strokeWidth="2.5" />
                  {/* Smile */}
                  <path d="M44 56 Q50 61 56 56" stroke="#111116" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 border-2 border-[var(--bg-surface)]" title="Active developer" />
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h3 className="font-display font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                    Vishal Sanam
                  </h3>
                  <p className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                    Frontend Engineer · Thane, Maharashtra, India
                  </p>
                </div>
                <span
                  className="px-2.5 py-0.5 rounded-full text-xs font-mono border"
                  style={{
                    backgroundColor: 'var(--bg-surface-2)',
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--accent-violet)',
                  }}
                >
                  Creator & Lead
                </span>
              </div>

              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Passionate about building fast, resilient productivity software that removes friction from learning.
                YtEduNotes is crafted to help students absorb complex topics effortlessly.
              </p>

              {/* Social Links Row */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="https://github.com/web-dev-vishal/Yt_Notes_with_Video"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all hover:scale-105"
                  style={{
                    backgroundColor: 'var(--bg-surface-2)',
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--accent-violet)',
                  }}
                >
                  <GitHubIcon className="w-3.5 h-3.5" />
                  GitHub Repository
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>

                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all hover:scale-105"
                  style={{
                    backgroundColor: 'var(--bg-surface-2)',
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--accent-cyan)',
                  }}
                >
                  <LinkedInIcon className="w-3.5 h-3.5" />
                  LinkedIn
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>

                <a
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all hover:scale-105"
                  style={{
                    backgroundColor: 'var(--bg-surface-2)',
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--accent-amber)',
                  }}
                >
                  <XIcon className="w-3.5 h-3.5" />
                  Twitter/X
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </div>
            </div>
          </TiltCard>
        </section>

      </div>
    </main>
  );
}
