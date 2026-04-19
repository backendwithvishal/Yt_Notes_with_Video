import { memo } from 'react';
import { useYouTubePlayer } from '../hooks/useYouTubePlayer';
import { useNoteStore } from '../store/useNotes';
import { Skeleton } from './ui/skeleton';
import { Button } from './ui/button';

const VideoPlayer = memo(function VideoPlayer() {
  const videoId  = useNoteStore((s) => s.videoId);
  const setPlayer = useNoteStore((s) => s.setPlayer);

  const { playerRef, isReady, error } = useYouTubePlayer({
    videoId,
    onReady: (player) => setPlayer(player),
  });

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
        <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div
      className="relative w-full rounded-xl overflow-hidden shadow-lg"
      style={{ aspectRatio: '16/9', backgroundColor: '#000' }}
      aria-label="YouTube video player"
    >
      {/* Skeleton shown while player initialises */}
      {!isReady && (
        <Skeleton className="absolute inset-0 w-full h-full rounded-xl" />
      )}

      {/* YouTube mounts here — must have explicit pixel dimensions */}
      <div
        ref={playerRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: isReady ? 1 : 0, transition: 'opacity 0.3s ease' }}
      />
    </div>
  );
});

export default VideoPlayer;
