import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  BookOpen, PlayCircle, FileText, Moon, Sun,
  ArrowRight, Sparkles, Clock,
} from 'lucide-react';
import { useNoteStore } from '../store/useNotes';
import { useThemeStore } from '../store/useTheme';
import { validateYouTubeUrl } from '../lib/validate';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { cn } from '../lib/utils';

// A curated demo video (CS50 intro — publicly available educational content)
const DEMO_URL = 'https://www.youtube.com/watch?v=8mAITcNt710';

export default function Home() {
  const setUrl        = useNoteStore((s) => s.setUrl);
  const videoId       = useNoteStore((s) => s.videoId);
  const { theme, toggleTheme } = useThemeStore();
  const navigate      = useNavigate();

  const [inputValue, setInputValue] = useState('');
  const [urlError, setUrlError]     = useState<string | null>(null);

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

  const handleContinueSession = () => {
    navigate('/edunotes');
  };

  // Feature pill actions
  const featurePills = [
    {
      icon: Clock,
      label: 'Timestamped notes',
      description: 'Notes tagged with video time',
      onClick: () => {
        // Scroll to / focus the URL input so user can start a session
        document.getElementById('yt-url')?.focus();
      },
    },
    {
      icon: FileText,
      label: 'Export to PDF',
      description: 'Download notes as PDF',
      onClick: () => {
        // Navigate to edunotes if session exists, else focus input
        if (videoId) {
          navigate('/edunotes');
        } else {
          document.getElementById('yt-url')?.focus();
        }
      },
    },
    {
      icon: theme === 'dark' ? Sun : Moon,
      label: 'Dark mode',
      description: theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode',
      onClick: toggleTheme,
    },
    {
      icon: PlayCircle,
      label: 'YouTube player',
      description: 'Built-in video player',
      onClick: handleTryDemo,
    },
  ];

  return (
    <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 sm:py-20 overflow-x-hidden">
      <div className="flex flex-col items-center text-center gap-8 max-w-2xl w-full">

        {/* Icon badge */}
        <div
          className="flex items-center justify-center w-20 h-20 rounded-3xl shadow-lg"
          style={{ background: 'linear-gradient(135deg, var(--primary) 0%, oklch(52% 0.20 260) 100%)' }}
        >
          <BookOpen className="w-10 h-10 text-white" aria-hidden="true" />
        </div>

        {/* Headline */}
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            YtEduNotes
          </h1>
          <p className="text-lg max-w-md mx-auto leading-relaxed text-muted-foreground">
            Paste a YouTube link, watch it, and take timestamped notes — all in one place.
          </p>
        </div>

        {/* URL form */}
        <form onSubmit={handleSubmit} className="w-full max-w-lg flex flex-col gap-2" noValidate>
          <label htmlFor="yt-url" className="sr-only">YouTube video URL</label>
          <div className="flex gap-2 w-full">
            <div className="relative flex-1">
              <PlayCircle
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                id="yt-url"
                type="url"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="https://www.youtube.com/watch?v=..."
                aria-required="true"
                aria-invalid={!!urlError}
                aria-describedby={urlError ? 'yt-url-error' : undefined}
                className={cn(
                  'pl-9 h-12 text-base',
                  urlError && 'border-red-500 focus-visible:ring-red-500'
                )}
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="h-12 px-6 shrink-0 font-semibold shadow-md"
            >
              Start
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Button>
          </div>
          {urlError && (
            <p id="yt-url-error" role="alert" className="text-sm text-red-500 text-left px-1">
              {urlError}
            </p>
          )}
        </form>

        {/* Action buttons row */}
        <div className="flex flex-wrap items-center justify-center gap-3 w-full">

          {/* Try Demo */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleTryDemo}
            className="gap-2 hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            Try a Demo
          </Button>

          {/* Continue Session — only when a previous session exists */}
          {videoId && (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleContinueSession}
              className="gap-2 hover:opacity-80 transition-opacity"
            >
              <Clock className="w-4 h-4" aria-hidden="true" />
              Continue Session
            </Button>
          )}

          {/* About page */}
          <Link to="/about">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Learn More
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Button>
          </Link>

          {/* GitHub repo */}
          <a
            href="https://github.com/web-dev-vishal/Yt_Notes_with_Video"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <GitHubIcon className="w-4 h-4" aria-hidden="true" />
              GitHub
            </Button>
          </a>

        </div>

        {/* Feature pills — now interactive buttons */}
        <div className="flex flex-wrap justify-center gap-2 mt-1">
          {featurePills.map(({ icon: Icon, label, description, onClick }) => (
            <button
              key={label}
              type="button"
              onClick={onClick}
              title={description}
              aria-label={description}
              className={cn(
                'group flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border',
                'cursor-pointer transition-all duration-150',
                'hover:scale-105 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-1'
              )}
              style={{
                backgroundColor: 'var(--secondary)',
                color: 'var(--secondary-foreground)',
                borderColor: 'var(--border)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--accent)';
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--primary)';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--primary)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--secondary)';
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--secondary-foreground)';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)';
              }}
            >
              <Icon className="w-3 h-3 transition-transform group-hover:scale-110" aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>

      </div>
    </main>
  );
}

// Inline GitHub SVG (lucide-react v1.8 doesn't include brand icons)
function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}
