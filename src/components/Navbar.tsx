import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, ExternalLink } from 'lucide-react';
import { useThemeStore } from '../store/useTheme';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from './ui/drawer';
import { cn } from '../lib/utils';

const navLinks = [
  { label: 'Home',  to: '/'      },
  { label: 'About', to: '/about' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useThemeStore();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const isActive = (to: string) => location.pathname === to;

  return (
    <header
      className="sticky top-0 z-50 w-full border-b backdrop-blur-md bg-[color-mix(in_oklch,var(--background)_85%,transparent)] border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link
            to="/"
            className="font-bold text-xl tracking-tight transition-opacity hover:opacity-75 text-primary"
          >
            YtEduNotes
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  'px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
                  isActive(link.to)
                    ? 'font-semibold'
                    : 'hover:opacity-80'
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

            <Button
              variant="outline"
              size="sm"
              className="ml-2 gap-1.5"
              onClick={() => window.open('https://github.com/web-dev-vishal/Yt_Notes_with_Video', '_blank', 'noopener,noreferrer')}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              GitHub
            </Button>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                  onClick={toggleTheme}
                  className="ml-1"
                >
                  {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</TooltipContent>
            </Tooltip>
          </nav>

          {/* Mobile controls */}
          <div className="flex items-center gap-1 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              onClick={toggleTheme}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open navigation menu"
              onClick={() => setDrawerOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle style={{ color: 'var(--foreground)' }}>Navigation</DrawerTitle>
          </DrawerHeader>
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1 px-4 pb-8">
            {navLinks.map((link) => (
              <DrawerClose asChild key={link.to}>
                <Link
                  to={link.to}
                  className="px-4 py-3 rounded-lg text-sm font-medium transition-colors"
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
            <Button
              variant="outline"
              className="mt-3 gap-2"
              onClick={() => {
                window.open('https://github.com/web-dev-vishal/Yt_Notes_with_Video', '_blank', 'noopener,noreferrer');
                setDrawerOpen(false);
              }}
            >
              <ExternalLink className="w-4 h-4" />
              GitHub
            </Button>
          </nav>
        </DrawerContent>
      </Drawer>
    </header>
  );
}
