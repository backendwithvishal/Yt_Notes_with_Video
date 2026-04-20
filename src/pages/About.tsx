import { BookOpen, Clock, FileDown, Moon, ExternalLink } from 'lucide-react';

// Inline SVG brand icons (lucide-react v1.8 doesn't include brand icons)
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

const techStack = [
  { name: 'React 19',           desc: 'UI library'                },
  { name: 'TypeScript',         desc: 'Type safety'               },
  { name: 'Vite',               desc: 'Build tool'                },
  { name: 'Tailwind CSS v4',    desc: 'Styling'                   },
  { name: 'Zustand',            desc: 'State management'          },
  { name: 'YouTube IFrame API', desc: 'Video player'              },
  { name: 'jsPDF',              desc: 'PDF export'                },
  { name: 'Vitest',             desc: 'Testing'                   },
  { name: 'Radix UI',           desc: 'Accessible UI primitives'  },
];

const keyFeatures = [
  {
    icon: Clock,
    title: 'Timestamped Notes',
    desc: 'Every note you add is automatically tagged with the current video timestamp, so you can jump back to any moment instantly.',
  },
  {
    icon: FileDown,
    title: 'Export to PDF',
    desc: 'Download all your notes as a clean, formatted PDF — perfect for revision or sharing with others.',
  },
  {
    icon: Moon,
    title: 'Dark Mode',
    desc: 'Easy on the eyes during long study sessions. Toggle between light and dark themes with one click.',
  },
  {
    icon: YouTubeIcon,
    title: 'YouTube Integration',
    desc: 'Paste any YouTube URL and the video loads instantly alongside your notes panel — no switching tabs.',
  },
];

export default function About() {
  return (
    <main className="flex-1 overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-4 py-12 flex flex-col gap-16">

        {/* ── Project Overview ── */}
        <section aria-labelledby="overview-heading">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="flex items-center justify-center w-10 h-10 rounded-xl shadow"
              style={{ background: 'linear-gradient(135deg, var(--primary) 0%, oklch(52% 0.20 260) 100%)' }}
            >
              <BookOpen className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <h1
              id="overview-heading"
              className="text-2xl font-bold"
              style={{ color: 'var(--foreground)' }}
            >
              Project Overview
            </h1>
          </div>
          <p className="text-base leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
            <strong style={{ color: 'var(--foreground)' }}>YtEduNotes</strong> is a focused study tool that
            combines YouTube video playback with a real-time note-taking panel. The idea is simple: instead of
            pausing a video, switching to a notes app, typing something, and switching back — you do it all in
            one place. Paste a YouTube link, watch the video, and add timestamped notes as you go. When you're
            done, export everything to a PDF.
          </p>
          <p className="text-base leading-relaxed mt-3" style={{ color: 'var(--muted-foreground)' }}>
            Built for students, self-learners, and anyone who watches educational content and wants to retain
            more of what they learn.
          </p>
        </section>

        {/* ── Key Features ── */}
        <section aria-labelledby="features-heading">
          <h2
            id="features-heading"
            className="text-2xl font-bold mb-6"
            style={{ color: 'var(--foreground)' }}
          >
            Key Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {keyFeatures.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex gap-4 p-5 rounded-xl border"
                style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
              >
                <div
                  className="flex items-center justify-center w-9 h-9 rounded-lg shrink-0"
                  style={{ backgroundColor: 'var(--accent)' }}
                >
                  <Icon className="w-4 h-4" style={{ color: 'var(--primary)' }} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1" style={{ color: 'var(--foreground)' }}>
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Tech Stack ── */}
        <section aria-labelledby="tech-heading">
          <h2
            id="tech-heading"
            className="text-2xl font-bold mb-6"
            style={{ color: 'var(--foreground)' }}
          >
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-3">
            {techStack.map(({ name, desc }) => (
              <div
                key={name}
                className="flex flex-col px-4 py-3 rounded-xl border text-sm"
                style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
              >
                <span className="font-semibold" style={{ color: 'var(--foreground)' }}>{name}</span>
                <span className="text-xs mt-0.5" style={{ color: 'var(--muted-foreground)' }}>{desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Team / Creator ── */}
        <section aria-labelledby="creator-heading">
          <h2
            id="creator-heading"
            className="text-2xl font-bold mb-6"
            style={{ color: 'var(--foreground)' }}
          >
            Creator
          </h2>
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-5 p-6 rounded-xl border"
            style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
          >
            {/* Avatar */}
            <div
              className="flex items-center justify-center w-16 h-16 rounded-full text-2xl font-bold shrink-0"
              style={{ backgroundColor: 'var(--accent)', color: 'var(--primary)' }}
              aria-hidden="true"
            >
              V
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <p className="font-semibold text-lg" style={{ color: 'var(--foreground)' }}>
                Vishal
              </p>
              <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                Frontend Developer · Thane, Maharashtra, India
              </p>
              <p className="text-sm mt-1 leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                Passionate about building tools that make learning more effective. YtEduNotes was built to
                solve a personal frustration — constantly switching between YouTube and a notes app while
                studying.
              </p>
              <div className="flex items-center gap-3 mt-3">
                <a
                  href="https://github.com/web-dev-vishal/Yt_Notes_with_Video"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub repository"
                  className="flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-70"
                  style={{ color: 'var(--primary)' }}
                >
                  <GitHubIcon className="w-4 h-4" />
                  GitHub
                  <ExternalLink className="w-3 h-3" aria-hidden="true" />
                </a>
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-70"
                  style={{ color: 'var(--primary)' }}
                >
                  <LinkedInIcon className="w-4 h-4" />
                  LinkedIn
                  <ExternalLink className="w-3 h-3" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
