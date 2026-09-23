import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X, Sparkles, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
      className="sticky top-0 z-50 w-full border-b transition-colors duration-300"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--bg-base) 82%, transparent)',
        borderColor: 'var(--border-subtle)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo & Branded Mark */}
          <Link
            to="/"
            className="flex items-center gap-2.5 font-display font-bold text-lg tracking-tight group"
            style={{ color: 'var(--text-primary)' }}
          >
            <div
              className="flex items-center justify-center w-8 h-8 rounded-xl text-white shadow-md transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3"
              style={{ background: 'var(--signature-gradient)' }}
            >
              <BookOpen className="w-4 h-4" aria-hidden="true" />
            </div>
            <span className="flex items-center gap-1.5">
              <span>YtEduNotes</span>
              <span
                className="hidden sm:inline-block text-[10px] uppercase font-mono font-semibold px-1.5 py-0.5 rounded-full border"
                style={{
                  backgroundColor: 'var(--bg-surface-2)',
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--accent-violet)',
                }}
              >
                v2.0
              </span>
            </span>
          </Link>

          {/* Desktop Nav with Animated Sliding Pill */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-1">
            <div
              className="flex items-center p-1 rounded-full border shadow-inner relative"
              style={{
                backgroundColor: 'var(--bg-surface-2)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              {navLinks.map((link) => {
                const active = isActive(link.to);
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={cn(
                      'relative px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors duration-200 z-10 select-none',
                      active ? 'text-white' : 'hover:opacity-100'
                    )}
                    style={{
                      color: active ? '#FFFFFF' : 'var(--text-secondary)',
                    }}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-full -z-10 shadow-md"
                        style={{
                          background: 'var(--signature-gradient)',
                        }}
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Separator */}
            <div
              className="mx-2.5 h-5 w-px"
              style={{ backgroundColor: 'var(--border-subtle)' }}
              aria-hidden="true"
            />

            {/* GitHub Quick Link */}
            <a
              href="https://github.com/web-dev-vishal/Yt_Notes_with_Video"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 hover:scale-105 border"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-secondary)',
              }}
              aria-label="View source on GitHub"
            >
              <GitHubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            {/* Theme Toggle with Sun/Moon Morph */}
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  whileTap={{ scale: 0.9, rotate: 15 }}
                  onClick={toggleTheme}
                  aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                  className="p-2 rounded-lg border transition-colors cursor-pointer ml-1"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--text-primary)',
                  }}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {theme === 'dark' ? (
                      <motion.div
                        key="sun"
                        initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Sun className="w-4 h-4 text-amber-400" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="moon"
                        initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: -90, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Moon className="w-4 h-4 text-indigo-500" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </TooltipTrigger>
              <TooltipContent>{theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</TooltipContent>
            </Tooltip>
          </nav>

          {/* Mobile controls */}
          <div className="flex items-center gap-1.5 md:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-2 rounded-lg border transition-colors cursor-pointer"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-primary)',
              }}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
            </motion.button>

            <Button
              variant="outline"
              size="icon"
              aria-label="Open navigation menu"
              onClick={() => setDrawerOpen(true)}
              className="h-9 w-9 rounded-lg border"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile drawer with slide-in motion */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerContent
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-subtle)',
          }}
        >
          <DrawerHeader className="flex items-center justify-between pr-4 border-b pb-3" style={{ borderColor: 'var(--border-subtle)' }}>
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-md flex items-center justify-center text-white"
                style={{ background: 'var(--signature-gradient)' }}
              >
                <BookOpen className="w-3.5 h-3.5" />
              </div>
              <DrawerTitle className="font-display font-bold text-base" style={{ color: 'var(--text-primary)' }}>
                YtEduNotes
              </DrawerTitle>
            </div>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Close menu">
                <X className="w-4 h-4" />
              </Button>
            </DrawerClose>
          </DrawerHeader>

          <nav aria-label="Mobile navigation" className="flex flex-col gap-1.5 px-4 py-6">
            {navLinks.map((link) => (
              <DrawerClose asChild key={link.to}>
                <Link
                  to={link.to}
                  className="px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-between"
                  style={
                    isActive(link.to)
                      ? {
                          background: 'var(--signature-gradient)',
                          color: '#FFFFFF',
                          boxShadow: '0 4px 15px -2px var(--signature-glow)',
                        }
                      : {
                          backgroundColor: 'var(--bg-surface-2)',
                          color: 'var(--text-primary)',
                        }
                  }
                >
                  <span>{link.label}</span>
                  {isActive(link.to) && <Sparkles className="w-3.5 h-3.5 text-amber-200" />}
                </Link>
              </DrawerClose>
            ))}

            <div
              className="my-3 h-px"
              style={{ backgroundColor: 'var(--border-subtle)' }}
              aria-hidden="true"
            />

            <a
              href="https://github.com/web-dev-vishal/Yt_Notes_with_Video"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors border"
              style={{
                backgroundColor: 'var(--bg-surface-2)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-secondary)',
              }}
              onClick={() => setDrawerOpen(false)}
            >
              <div className="flex items-center gap-2">
                <GitHubIcon className="w-4 h-4" />
                <span>GitHub Repository</span>
              </div>
              <span className="text-xs font-mono text-purple-400">★ Open Source</span>
            </a>
          </nav>
        </DrawerContent>
      </Drawer>
    </header>
  );
}
