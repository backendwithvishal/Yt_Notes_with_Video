import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, PlayCircle, FileText, Moon, Smartphone } from 'lucide-react';
import { useNoteStore } from '../store/useNotes';
import { validateYouTubeUrl } from '../lib/validate';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { cn } from '../lib/utils';

const features = [
  { icon: PlayCircle, label: 'Timestamped notes' },
  { icon: FileText,   label: 'Export to PDF'      },
  { icon: Moon,       label: 'Dark mode'           },
  { icon: Smartphone, label: 'All devices'         },
];

export default function Home() {
  const setUrl = useNoteStore((s) => s.setUrl);
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

  return (
    <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 sm:py-24">
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
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight" style={{ color: 'var(--foreground)' }}>
            YtEduNotes
          </h1>
          <p className="text-lg max-w-md mx-auto leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
            Paste a YouTube link, watch it, and take timestamped notes — all in one place.
          </p>
        </div>

        {/* URL form */}
        <form onSubmit={handleSubmit} className="w-full max-w-lg flex flex-col gap-2" noValidate>
          <label htmlFor="yt-url" className="sr-only">YouTube video URL</label>
          <div className="flex gap-2 w-full">
            <div className="relative flex-1">
              <PlayCircle
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                style={{ color: 'var(--muted-foreground)' }}
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
              Start →
            </Button>
          </div>
          {urlError && (
            <p id="yt-url-error" role="alert" className="text-sm text-red-500 text-left px-1">
              {urlError}
            </p>
          )}
        </form>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-2">
          {features.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border"
              style={{
                backgroundColor: 'var(--secondary)',
                color: 'var(--secondary-foreground)',
                borderColor: 'var(--border)',
              }}
            >
              <Icon className="w-3.5 h-3.5" aria-hidden="true" />
              {label}
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
