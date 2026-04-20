import { memo, useRef, useState } from 'react';
import { useYouTubePlayer } from '../hooks/useYouTubePlayer';
import { useNoteStore } from '../store/useNotes';
import { Skeleton } from './ui/skeleton';
import { Button } from './ui/button';
import VideoControls from './VideoControls';

interface VideoPlayerProps {
  onTheatreToggle?: (enabled: boolean) => void;
}

const VideoPlayer = memo(function VideoPlayer({ onTheatreToggle }: VideoPlayerProps) {
  const videoId   = useNoteStore((s) => s.videoId);
  const setPlayer = useNoteStore((s) => s.setPlayer);

  // Ref for the outer container — used for fullscreen
  const containerRef = useRef<HTMLDivElement>(null);

  const { playerRef, playerInstanceRef, isReady, error, retry } = useYouTubePlayer({
    videoId,
    onReady: (player) => setPlayer(player),
  });

  const [theatreMode, setTheatreMode] = useState(false);

  const handleTheatreToggle = (enabled: boolean) => {
    setTheatreMode(enabled);
    onTheatreToggle?.(enabled);
  };

  if (error) {
    return (
      <div
        className="flex flex-col items-center justify-center w-full rounded-xl border"
        style={{
          aspectRatio: '16/9',
          backgroundColor: 'var(--muted)',
          borderColor: 'var(--border)',
        }}
        role="alert"
      >
        <p className="text-sm mb-3" style={{ color: 'var(--destructive)' }}>{error}</p>
        <Button variant="outline" size="sm" onClick={retry}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-xl overflow-hidden shadow-lg group"
      style={{ aspectRatio: '16/9', backgroundColor: '#000' }}
      aria-label="YouTube video player"
    >
      {/* Skeleton shown only while player is initialising */}
      {!isReady && (
        <Skeleton className="absolute inset-0 w-full h-full rounded-xl z-10" />
      )}

      {/* Player mount point — always visible so YT API can attach the iframe */}
      <div
        ref={playerRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Custom control bar — rendered once player is ready */}
      {isReady && (
        <VideoControls
          playerRef={playerInstanceRef}
          containerRef={containerRef}
          onTheatreToggle={handleTheatreToggle}
          theatreMode={theatreMode}
        />
      )}
    </div>
  );
});

export default VideoPlayer;
