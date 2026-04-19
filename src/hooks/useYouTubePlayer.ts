import { useEffect, useRef, useState } from 'react';

interface UseYouTubePlayerOptions {
  videoId: string | null;
  onReady?: (player: YT.Player) => void;
}

interface UseYouTubePlayerResult {
  playerRef: React.RefObject<HTMLDivElement | null>;
  isReady: boolean;
  error: string | null;
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

  // Keep onReadyRef current without re-running the effect
  onReadyRef.current = onReady;

  useEffect(() => {
    if (!videoId) return;

    const initPlayer = () => {
      if (!playerRef.current) return;

      // Destroy previous player instance if videoId changed
      if (playerInstanceRef.current) {
        try {
          playerInstanceRef.current.destroy();
        } catch {
          // ignore
        }
        playerInstanceRef.current = null;
        setIsReady(false);
      }

      playerInstanceRef.current = new window.YT.Player(playerRef.current, {
        videoId,
        width: '100%',
        height: '100%',
        playerVars: { autoplay: 0, modestbranding: 1, rel: 0 },
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
      // API already loaded
      initPlayer();
    } else if (!scriptInjected) {
      scriptInjected = true;
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      tag.onerror = () => setError('Failed to load YouTube player API.');
      document.body.appendChild(tag);
      window.onYouTubeIframeAPIReady = initPlayer;
    } else {
      // Script injected but API not ready yet — wait for the global callback
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prev?.();
        initPlayer();
      };
    }

    return () => {
      // Cleanup on unmount
      if (playerInstanceRef.current) {
        try {
          playerInstanceRef.current.destroy();
        } catch {
          // ignore
        }
        playerInstanceRef.current = null;
      }
    };
  }, [videoId]); // eslint-disable-line react-hooks/exhaustive-deps

  return { playerRef, isReady, error };
}
