/**
 * Bug Condition Exploration Tests
 *
 * These tests encode EXPECTED (fixed) behavior.
 * They MUST FAIL on unfixed code — failure confirms the bugs exist.
 * They PASS after each corresponding fix is applied.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { TooltipProvider } from '../components/ui/tooltip';

// ── Top-level mocks (hoisted by Vitest) ───────────────────────────────────

vi.mock('../store/useNotes', () => ({
  useNoteStore: (selector: (s: unknown) => unknown) => {
    const state = {
      videoId: 'dQw4w9WgXcQ',
      notes: [],
      player: null,
      setUrl: vi.fn(),
      setPlayer: vi.fn(),
      addNote: vi.fn(),
      updateNote: vi.fn(),
      deleteNote: vi.fn(),
      seekTo: vi.fn(),
      clearNotes: vi.fn(),
    };
    return selector(state);
  },
}));

vi.mock('../store/useTheme', () => ({
  useThemeStore: () => ({ theme: 'light', toggleTheme: vi.fn() }),
}));

// ── YT Player mock constructor ─────────────────────────────────────────────

class MockYTPlayer {
  private opts: { events?: { onReady?: (e: { target: MockYTPlayer }) => void } };
  constructor(_el: unknown, opts: { events?: { onReady?: (e: { target: MockYTPlayer }) => void } }) {
    this.opts = opts;
    setTimeout(() => this.opts?.events?.onReady?.({ target: this }), 0);
  }
  destroy = vi.fn();
  playVideo = vi.fn();
  pauseVideo = vi.fn();
  mute = vi.fn();
  unMute = vi.fn();
  isMuted = vi.fn(() => false);
  setVolume = vi.fn();
  getVolume = vi.fn(() => 100);
  seekTo = vi.fn();
  getCurrentTime = vi.fn(() => 0);
  getDuration = vi.fn(() => 300);
  getPlayerState = vi.fn(() => 2);
  getAvailableQualityLevels = vi.fn(() => ['hd720', 'medium']);
  setPlaybackQuality = vi.fn();
  setPlaybackRate = vi.fn();
  getPlaybackRate = vi.fn(() => 1);
}

// ── Test Suite ─────────────────────────────────────────────────────────────

describe('Bug Condition Exploration Tests', () => {

  beforeEach(() => {
    vi.clearAllMocks();
    (window as unknown as Record<string, unknown>).YT = {
      Player: MockYTPlayer,
      PlayerState: { PLAYING: 1, PAUSED: 2, ENDED: 0, BUFFERING: 3, CUED: 5 },
    };
  });

  // ── Bug 4: "All Devices" pill should NOT be present ──────────────────────
  it('Bug 4 — Home page should NOT render "All devices" pill', async () => {
    const { default: Home } = await import('../pages/Home');
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.queryByText('All devices')).toBeNull();
  });

  // ── Bug 6a: Footer should show "Thane, Maharashtra" ─────────────────────
  it('Bug 6a — Footer should display "Thane, Maharashtra" address', async () => {
    const { default: Footer } = await import('../components/Footer');
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByText(/Thane, Maharashtra/i)).toBeTruthy();
    expect(screen.queryByText(/Gurgaon/i)).toBeNull();
  });

  // ── Bug 6b: Footer should have 4 social icon links ───────────────────────
  it('Bug 6b — Footer should render 4 social media links', async () => {
    const { default: Footer } = await import('../components/Footer');
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    const socialLabels = ['Instagram', 'Twitter', 'LinkedIn', 'YouTube'];
    const found = socialLabels.filter((label) =>
      screen.queryByRole('link', { name: new RegExp(label, 'i') })
    );
    expect(found.length).toBe(4);
  });

  // ── Bug 7: About page should render all 4 sections ──────────────────────
  it('Bug 7 — /about route should render "Project Overview" section', async () => {
    const { default: About } = await import('../pages/About');
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );
    expect(screen.getByText(/Project Overview/i)).toBeTruthy();
    expect(screen.getByText(/Key Features/i)).toBeTruthy();
    expect(screen.getByText(/Tech Stack/i)).toBeTruthy();
    expect(screen.getByText(/Creator/i)).toBeTruthy();
  });

  // ── Bug 8: Navbar should have no divider classes ─────────────────────────
  it('Bug 8 — Navbar desktop nav should have no divide-x or border-r/border-l classes', async () => {
    const { default: Navbar } = await import('../components/Navbar');
    const { container } = render(
      <MemoryRouter>
        <TooltipProvider>
          <Navbar />
        </TooltipProvider>
      </MemoryRouter>
    );
    const nav = container.querySelector('nav[aria-label="Main navigation"]');
    expect(nav).toBeTruthy();
    const classStr = nav!.className;
    expect(classStr).not.toMatch(/divide-x/);
    expect(classStr).not.toMatch(/border-r/);
    expect(classStr).not.toMatch(/border-l/);
  });

  // ── Bug 9: VideoPlayer should be visible after player ready ──────────────
  it('Bug 9 — VideoPlayer player div should always be in the DOM (no opacity:0 hiding)', async () => {
    const { default: VideoPlayer } = await import('../components/VideoPlayer');
    const { container } = render(<VideoPlayer />);

    // The player mount div should exist and not be hidden with opacity:0
    const playerWrapper = container.querySelector('[aria-label="YouTube video player"]');
    expect(playerWrapper).toBeTruthy();

    // The inner div (player mount) should not have inline opacity:0
    const innerDivs = playerWrapper!.querySelectorAll('div');
    const hiddenDiv = Array.from(innerDivs).find(
      (d) => (d as HTMLElement).style.opacity === '0'
    );
    expect(hiddenDiv).toBeUndefined();
  });

  // ── Bug 10: VideoPlayer should render custom control bar after ready ──────
  it('Bug 10 — VideoPlayer should render a play/pause button after player ready', async () => {
    const { default: VideoPlayer } = await import('../components/VideoPlayer');
    render(<VideoPlayer />);

    // Wait for onReady to fire and controls to render
    await new Promise((r) => setTimeout(r, 50));

    const playBtn = screen.queryByRole('button', { name: /play|pause/i });
    expect(playBtn).not.toBeNull();
  });

});
