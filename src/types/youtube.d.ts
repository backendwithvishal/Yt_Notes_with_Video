// Minimal YouTube IFrame API type declarations
// Full types available via @types/youtube if needed

declare namespace YT {
  interface Player {
    getCurrentTime(): number;
    seekTo(seconds: number, allowSeekAhead: boolean): void;
    destroy(): void;
    playVideo(): void;
    pauseVideo(): void;
  }

  interface PlayerEvent {
    target: Player;
  }

  interface PlayerOptions {
    videoId?: string;
    width?: string | number;
    height?: string | number;
    playerVars?: {
      autoplay?: 0 | 1;
      modestbranding?: 0 | 1;
      rel?: 0 | 1;
      [key: string]: unknown;
    };
    events?: {
      onReady?: (event: PlayerEvent) => void;
      onError?: (event: PlayerEvent) => void;
      onStateChange?: (event: PlayerEvent) => void;
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Player: new (element: HTMLElement | string, options: PlayerOptions) => Player;
}

interface Window {
  YT: typeof YT;
  onYouTubeIframeAPIReady: (() => void) | undefined;
}
