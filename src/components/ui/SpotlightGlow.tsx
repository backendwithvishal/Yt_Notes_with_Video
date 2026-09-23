import { useState, useEffect } from 'react';

interface SpotlightGlowProps {
  className?: string;
  showBlobs?: boolean;
}

export default function SpotlightGlow({ className = '', showBlobs = true }: SpotlightGlowProps) {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {/* Dynamic Cursor Spotlight */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[100px] opacity-25 dark:opacity-20 transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle, var(--accent-violet) 0%, var(--accent-cyan) 60%, transparent 80%)',
          left: `${mousePos.x - 300}px`,
          top: `${mousePos.y - 300}px`,
          transform: 'translate3d(0, 0, 0)',
        }}
      />

      {/* Drifting Aurora Blobs */}
      {showBlobs && (
        <>
          <div
            className="animate-blob-1 absolute top-[5%] left-[15%] w-[450px] h-[450px] rounded-full blur-[120px] opacity-35 dark:opacity-25"
            style={{
              background: 'radial-gradient(circle, var(--accent-violet) 0%, var(--accent-violet-2) 70%, transparent 100%)',
            }}
          />
          <div
            className="animate-blob-2 absolute top-[25%] right-[10%] w-[400px] h-[400px] rounded-full blur-[130px] opacity-25 dark:opacity-20"
            style={{
              background: 'radial-gradient(circle, var(--accent-cyan) 0%, var(--accent-violet) 60%, transparent 100%)',
            }}
          />
          <div
            className="animate-blob-1 absolute bottom-[10%] left-[35%] w-[350px] h-[350px] rounded-full blur-[140px] opacity-20 dark:opacity-15"
            style={{
              background: 'radial-gradient(circle, var(--accent-amber) 0%, var(--accent-violet-2) 60%, transparent 100%)',
            }}
          />
        </>
      )}
    </div>
  );
}
