import { useEffect, useRef, useState, useCallback } from 'react';

interface UseYouTubePlayerOptions {
  videoId: string | null;
  onReady?: (player: YT.Player) => void;
}

interface UseYouTubePlayerResult {
  playerRef: React.RefObject<HTMLDivElement | null>;
  playerInstanceRef: React.RefObject<YT.Player | null>;
  isReady: boolean;
  error: string | null;
  retry: () => void;
}

let scriptInjected = false;

export function useYouTubePlayer({
  videoId,
  onReady,
}: UseYouTubePlayerOptions): UseYouTubePlayerResult {
  const playerRef = useRef<HTMLDivElement | null>(null);
  const playerInstanceRef = useRef<YT.Player | null>(null);
  const onReadyRef = useRef(onReady);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Incrementing this triggers a re-init without changing videoId
  const [retryKey, setRetryKey] = useState(0);

  // Keep onReadyRef current without re-running the effect
  onReadyRef.current = onReady;

  // Expose a retry function that resets error state and re-initialises the player
  const retry = useCallback(() => {
    setError(null);
    setIsReady(false);
    if (playerInstanceRef.current) {
      try { playerInstanceRef.current.destroy(); } catch { /* ignore */ }
      playerInstanceRef.current = null;
    }
    setRetryKey((k) => k + 1);
  }, []);

  useEffect(() => {
    if (!videoId) return;

    const initPlayer = () => {
      // Guard: DOM node must be present
      if (!playerRef.current) return;

      // Guard: prevent Strict Mode double-invoke from creating duplicate players
      if (playerInstanceRef.current) return;

      playerInstanceRef.current = new window.YT.Player(playerRef.current, {
        videoId,
        width: '100%',
        height: '100%',
        playerVars: {
          autoplay: 0,
          modestbranding: 1,
          rel: 0,
          controls: 0,       // hide native controls — custom bar handles this
          disablekb: 1,      // disable keyboard shortcuts on the iframe
          iv_load_policy: 3, // hide annotations
          fs: 0,             // hide native fullscreen button
        },
        events: {
          onReady: (event: YT.PlayerEvent) => {
            setIsReady(true);
            onReadyRef.current?.(event.target);
          },
          onError: () => {
            setError('Failed to load video. Please check the URL and try again.');
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      // API already loaded — init immediately
      initPlayer();
    } else if (!scriptInjected) {
      scriptInjected = true;
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      tag.onerror = () => setError('Failed to load YouTube player API.');
      document.body.appendChild(tag);
      window.onYouTubeIframeAPIReady = initPlayer;
    } else {
      // Script injected but API not ready yet — chain the global callback
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prev?.();
        initPlayer();
      };
    }

    return () => {
      // Cleanup: destroy player and reset ready state so next mount re-initialises
      if (playerInstanceRef.current) {
        try {
          playerInstanceRef.current.destroy();
        } catch {
          // ignore
        }
        playerInstanceRef.current = null;
      }
      setIsReady(false);
    };
  }, [videoId, retryKey]); // eslint-disable-line react-hooks/exhaustive-deps

  return { playerRef, playerInstanceRef, isReady, error, retry };
}
