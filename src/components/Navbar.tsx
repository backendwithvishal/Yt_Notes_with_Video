import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useThemeStore } from '../store/useTheme';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from './ui/drawer';
import { cn } from '../lib/utils';

const navLinks = [
  { label: 'Home',    to: '/'        },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Contact', to: '/contact' },
  { label: 'About',   to: '/about'   },
];

// Inline GitHub SVG (lucide-react v1.8 doesn't include brand icons)
function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export default function Navbar() {
  const { theme, toggleTheme } = useThemeStore();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const isActive = (to: string) => location.pathname === to;

  return (
    <header
      className="sticky top-0 z-50 w-full border-b theme-transition"
      style={{
        backgroundColor: 'color-mix(in oklch, var(--background) 90%, transparent)',
        borderColor: 'var(--border)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-semibold text-base tracking-tight transition-opacity hover:opacity-80"
            style={{ color: 'var(--foreground)' }}
          >
            {/* Small brand mark */}
            <span
              className="flex items-center justify-center w-6 h-6 rounded-md text-xs font-bold text-white"
              style={{ backgroundColor: 'var(--primary)' }}
              aria-hidden="true"
            >
              Y
            </span>
            YtEduNotes
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  'px-3 py-1.5 rounded-md text-sm transition-colors',
                  isActive(link.to)
                    ? 'font-medium'
                    : 'font-normal hover:opacity-80'
                )}
                style={
                  isActive(link.to)
                    ? { backgroundColor: 'var(--accent)', color: 'var(--primary)' }
                    : { color: 'var(--muted-foreground)' }
                }
              >
                {link.label}
              </Link>
            ))}

            {/* Separator */}
            <div
              className="mx-2 h-4 w-px"
              style={{ backgroundColor: 'var(--border)' }}
              aria-hidden="true"
            />

            <a
              href="https://github.com/web-dev-vishal/Yt_Notes_with_Video"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-normal transition-colors hover:opacity-80"
              style={{ color: 'var(--muted-foreground)' }}
              aria-label="View source on GitHub"
            >
              <GitHubIcon className="w-4 h-4" />
              GitHub
            </a>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                  onClick={toggleTheme}
                  className="ml-0.5 h-8 w-8"
                >
                  {theme === 'dark'
                    ? <Sun className="w-4 h-4" />
                    : <Moon className="w-4 h-4" />
                  }
                </Button>
              </TooltipTrigger>
              <TooltipContent>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</TooltipContent>
            </Tooltip>
          </nav>

          {/* Mobile controls */}
          <div className="flex items-center gap-0.5 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              onClick={toggleTheme}
              className="h-8 w-8"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open navigation menu"
              onClick={() => setDrawerOpen(true)}
              className="h-8 w-8"
            >
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerContent>
          <DrawerHeader className="flex items-center justify-between pr-4">
            <DrawerTitle style={{ color: 'var(--foreground)' }}>Menu</DrawerTitle>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Close menu">
                <X className="w-4 h-4" />
              </Button>
            </DrawerClose>
          </DrawerHeader>
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1 px-4 pb-8">
            {navLinks.map((link) => (
              <DrawerClose asChild key={link.to}>
                <Link
                  to={link.to}
                  className="px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
                  style={
                    isActive(link.to)
                      ? { backgroundColor: 'var(--accent)', color: 'var(--primary)' }
                      : { color: 'var(--foreground)' }
                  }
                >
                  {link.label}
                </Link>
              </DrawerClose>
            ))}
            <div
              className="my-2 h-px"
              style={{ backgroundColor: 'var(--border)' }}
              aria-hidden="true"
            />
            <a
              href="https://github.com/web-dev-vishal/Yt_Notes_with_Video"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors hover:opacity-80"
              style={{ color: 'var(--muted-foreground)' }}
              onClick={() => setDrawerOpen(false)}
            >
              <GitHubIcon className="w-4 h-4" />
              GitHub
            </a>
          </nav>
        </DrawerContent>
      </Drawer>
    </header>
  );
}
