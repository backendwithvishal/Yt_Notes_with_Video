// YouTube IFrame API type declarations

declare namespace YT {
  interface Player {
    // Playback control
    playVideo(): void;
    pauseVideo(): void;
    stopVideo(): void;
    seekTo(seconds: number, allowSeekAhead: boolean): void;
    destroy(): void;

    // Playback status
    getCurrentTime(): number;
    getDuration(): number;
    getPlayerState(): number;
    getVideoLoadedFraction(): number;

    // Volume
    mute(): void;
    unMute(): void;
    isMuted(): boolean;
    setVolume(volume: number): void;
    getVolume(): number;

    // Playback rate
    setPlaybackRate(suggestedRate: number): void;
    getPlaybackRate(): number;
    getAvailablePlaybackRates(): number[];

    // Quality
    setPlaybackQuality(suggestedQuality: string): void;
    getPlaybackQuality(): string;
    getAvailableQualityLevels(): string[];

    // Video info
    getVideoUrl(): string;
    getVideoEmbedCode(): string;
  }

  interface PlayerEvent {
    target: Player;
    data?: number;
  }

  interface PlayerOptions {
    videoId?: string;
    width?: string | number;
    height?: string | number;
    playerVars?: {
      autoplay?: 0 | 1;
      modestbranding?: 0 | 1;
      rel?: 0 | 1;
      controls?: 0 | 1 | 2;
      disablekb?: 0 | 1;
      iv_load_policy?: 1 | 3;
      fs?: 0 | 1;
      [key: string]: unknown;
    };
    events?: {
      onReady?: (event: PlayerEvent) => void;
      onError?: (event: PlayerEvent) => void;
      onStateChange?: (event: PlayerEvent) => void;
    };
  }

  const Player: new (element: HTMLElement | string, options: PlayerOptions) => Player;

  const PlayerState: {
    UNSTARTED: -1;
    ENDED: 0;
    PLAYING: 1;
    PAUSED: 2;
    BUFFERING: 3;
    CUED: 5;
  };
}

interface Window {
  YT: typeof YT;
  onYouTubeIframeAPIReady: (() => void) | undefined;
}
