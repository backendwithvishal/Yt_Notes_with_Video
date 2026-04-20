import { useEffect, useRef, useState, useCallback } from 'react';
import {
  Play, Pause,
  Volume2, VolumeX,
  SkipBack, SkipForward,
  Maximize, Minimize,
  Settings,
  Tv2,
  PictureInPicture2,
} from 'lucide-react';
import { cn } from '../lib/utils';

// ── Helpers ────────────────────────────────────────────────────────────────

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || seconds < 0) return '0:00';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
}

const SPEEDS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
const QUALITY_LABELS: Record<string, string> = {
  highres: '4K', hd1440: '1440p', hd1080: '1080p', hd720: '720p',
  large: '480p', medium: '360p', small: '240p', tiny: '144p', auto: 'Auto',
};

// ── Types ──────────────────────────────────────────────────────────────────

interface VideoControlsProps {
  playerRef: React.RefObject<YT.Player | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onTheatreToggle: (enabled: boolean) => void;
  theatreMode: boolean;
}

// ── Component ──────────────────────────────────────────────────────────────

export default function VideoControls({
  playerRef,
  containerRef,
  onTheatreToggle,
  theatreMode,
}: VideoControlsProps) {
  const [isPlaying, setIsPlaying]       = useState(false);
  const [isMuted, setIsMuted]           = useState(false);
  const [volume, setVolume]             = useState(100);
  const [currentTime, setCurrentTime]   = useState(0);
  const [duration, setDuration]         = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [qualities, setQualities]       = useState<string[]>([]);
  const [currentQuality, setCurrentQuality] = useState<string>('auto');
  const [pipSupported, setPipSupported] = useState(false);
  const [visible, setVisible]           = useState(true);

  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pollRef   = useRef<ReturnType<typeof setInterval> | null>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  // ── Auto-hide controls ──────────────────────────────────────────────────
  const showControls = useCallback(() => {
    setVisible(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setVisible(false), 3000);
  }, []);

  useEffect(() => {
    showControls();
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [showControls]);

  // ── Poll player state ───────────────────────────────────────────────────
  useEffect(() => {
    pollRef.current = setInterval(() => {
      const p = playerRef.current;
      if (!p) return;
      try {
        const state = p.getPlayerState();
        setIsPlaying(state === 1); // YT.PlayerState.PLAYING
        setCurrentTime(p.getCurrentTime() ?? 0);
        setDuration(p.getDuration() ?? 0);
        setIsMuted(p.isMuted());
        setVolume(p.getVolume());
        setPlaybackRate(p.getPlaybackRate());

        const qs = p.getAvailableQualityLevels?.() ?? [];
        if (qs.length > 0) setQualities(qs);
      } catch {
        // player may not be ready yet
      }
    }, 500);

    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [playerRef]);

  // ── Fullscreen listener ─────────────────────────────────────────────────
  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  // ── PiP support detection ───────────────────────────────────────────────
  useEffect(() => {
    setPipSupported(document.pictureInPictureEnabled ?? false);
  }, []);

  // ── Close settings on outside click ────────────────────────────────────
  useEffect(() => {
    if (!showSettings) return;
    const handler = (e: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) {
        setShowSettings(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showSettings]);

  // ── Handlers ────────────────────────────────────────────────────────────

  const togglePlay = () => {
    const p = playerRef.current;
    if (!p) return;
    isPlaying ? p.pauseVideo() : p.playVideo();
  };

  const toggleMute = () => {
    const p = playerRef.current;
    if (!p) return;
    isMuted ? p.unMute() : p.mute();
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    playerRef.current?.setVolume(val);
    if (val === 0) playerRef.current?.mute();
    else if (isMuted) playerRef.current?.unMute();
  };

  const skipBack = () => {
    const p = playerRef.current;
    if (!p) return;
    p.seekTo(Math.max(0, p.getCurrentTime() - 10), true);
  };

  const skipForward = () => {
    const p = playerRef.current;
    if (!p) return;
    p.seekTo(p.getCurrentTime() + 10, true);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    const time = (val / 100) * duration;
    playerRef.current?.seekTo(time, true);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleSpeed = (rate: number) => {
    playerRef.current?.setPlaybackRate(rate);
    setPlaybackRate(rate);
    setShowSettings(false);
  };

  const handleQuality = (q: string) => {
    playerRef.current?.setPlaybackQuality(q);
    setCurrentQuality(q);
    setShowSettings(false);
  };

  const handlePiP = async () => {
    try {
      const iframe = containerRef.current?.querySelector('iframe');
      if (!iframe) return;
      // Access the video element inside the iframe (same-origin only)
      const video = iframe.contentDocument?.querySelector('video');
      if (video && document.pictureInPictureEnabled) {
        await video.requestPictureInPicture();
      }
    } catch {
      // PiP not available or cross-origin restriction
    }
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div
      className={cn(
        'absolute inset-0 flex flex-col justify-end transition-opacity duration-300',
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
      onMouseMove={showControls}
      onMouseEnter={showControls}
      onFocus={showControls}
      role="group"
      aria-label="Video controls"
    >
      {/* Gradient overlay so controls are readable */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

      {/* Control bar */}
      <div className="relative z-10 flex flex-col gap-1.5 px-3 pb-3">

        {/* Progress bar */}
        <div className="flex items-center gap-2">
          <span className="text-white text-xs tabular-nums shrink-0">{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={100}
            step={0.1}
            value={progress}
            onChange={handleSeek}
            aria-label="Seek video"
            className="flex-1 h-1 accent-white cursor-pointer"
            style={{ accentColor: 'var(--primary)' }}
          />
          <span className="text-white text-xs tabular-nums shrink-0">{formatTime(duration)}</span>
        </div>

        {/* Buttons row */}
        <div className="flex items-center gap-1">

          {/* Play / Pause */}
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause' : 'Play'}
            className="text-white hover:text-white/80 p-1 rounded transition-colors"
          >
            {isPlaying
              ? <Pause className="w-5 h-5" aria-hidden="true" />
              : <Play  className="w-5 h-5" aria-hidden="true" />
            }
          </button>

          {/* Skip back 10s */}
          <button
            onClick={skipBack}
            aria-label="Skip back 10 seconds"
            className="text-white hover:text-white/80 p-1 rounded transition-colors"
          >
            <SkipBack className="w-4 h-4" aria-hidden="true" />
          </button>

          {/* Skip forward 10s */}
          <button
            onClick={skipForward}
            aria-label="Skip forward 10 seconds"
            className="text-white hover:text-white/80 p-1 rounded transition-colors"
          >
            <SkipForward className="w-4 h-4" aria-hidden="true" />
          </button>

          {/* Mute / Volume */}
          <button
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
            className="text-white hover:text-white/80 p-1 rounded transition-colors"
          >
            {isMuted || volume === 0
              ? <VolumeX className="w-4 h-4" aria-hidden="true" />
              : <Volume2 className="w-4 h-4" aria-hidden="true" />
            }
          </button>

          {/* Volume slider */}
          <input
            type="range"
            min={0}
            max={100}
            value={isMuted ? 0 : volume}
            onChange={handleVolume}
            aria-label="Volume"
            className="w-16 h-1 cursor-pointer"
            style={{ accentColor: 'var(--primary)' }}
          />

          {/* Spacer */}
          <div className="flex-1" />

          {/* Playback speed indicator */}
          {playbackRate !== 1 && (
            <span className="text-white text-xs font-medium px-1">{playbackRate}x</span>
          )}

          {/* Settings */}
          <div className="relative" ref={settingsRef}>
            <button
              onClick={() => setShowSettings((v) => !v)}
              aria-label="Settings"
              aria-expanded={showSettings}
              className="text-white hover:text-white/80 p-1 rounded transition-colors"
            >
              <Settings className="w-4 h-4" aria-hidden="true" />
            </button>

            {showSettings && (
              <div
                className="absolute bottom-8 right-0 rounded-lg shadow-xl border overflow-hidden min-w-[160px] z-20"
                style={{ backgroundColor: 'rgba(0,0,0,0.9)', borderColor: 'rgba(255,255,255,0.15)' }}
              >
                {/* Playback speed */}
                <div className="px-3 py-2 border-b" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                  <p className="text-white/60 text-xs mb-1.5 font-medium uppercase tracking-wide">Speed</p>
                  <div className="flex flex-wrap gap-1">
                    {SPEEDS.map((s) => (
                      <button
                        key={s}
                        onClick={() => handleSpeed(s)}
                        className={cn(
                          'px-2 py-0.5 rounded text-xs transition-colors',
                          playbackRate === s
                            ? 'text-black font-semibold'
                            : 'text-white hover:bg-white/10'
                        )}
                        style={playbackRate === s ? { backgroundColor: 'var(--primary)' } : {}}
                      >
                        {s === 1 ? 'Normal' : `${s}x`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quality */}
                {qualities.length > 0 && (
                  <div className="px-3 py-2">
                    <p className="text-white/60 text-xs mb-1.5 font-medium uppercase tracking-wide">Quality</p>
                    <div className="flex flex-col gap-0.5">
                      {qualities.map((q) => (
                        <button
                          key={q}
                          onClick={() => handleQuality(q)}
                          className={cn(
                            'text-left px-2 py-1 rounded text-xs transition-colors',
                            currentQuality === q
                              ? 'text-black font-semibold'
                              : 'text-white hover:bg-white/10'
                          )}
                          style={currentQuality === q ? { backgroundColor: 'var(--primary)' } : {}}
                        >
                          {QUALITY_LABELS[q] ?? q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Theatre mode */}
          <button
            onClick={() => onTheatreToggle(!theatreMode)}
            aria-label={theatreMode ? 'Exit theatre mode' : 'Theatre mode'}
            aria-pressed={theatreMode}
            className="text-white hover:text-white/80 p-1 rounded transition-colors"
          >
            <Tv2 className="w-4 h-4" aria-hidden="true" />
          </button>

          {/* Picture-in-Picture */}
          {pipSupported && (
            <button
              onClick={handlePiP}
              aria-label="Picture in picture"
              className="text-white hover:text-white/80 p-1 rounded transition-colors"
            >
              <PictureInPicture2 className="w-4 h-4" aria-hidden="true" />
            </button>
          )}

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
            className="text-white hover:text-white/80 p-1 rounded transition-colors"
          >
            {isFullscreen
              ? <Minimize className="w-4 h-4" aria-hidden="true" />
              : <Maximize className="w-4 h-4" aria-hidden="true" />
            }
          </button>

        </div>
      </div>
    </div>
  );
}
