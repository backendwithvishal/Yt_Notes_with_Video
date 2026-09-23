import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Play, Pause, Clock, FileDown, CheckCircle2, Bookmark, Sparkles,
  Layers, Volume2, Maximize2, RotateCcw
} from 'lucide-react';

export default function ProductMockup() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeTimestamp, setActiveTimestamp] = useState('04:18');
  const [copiedTime, setCopiedTime] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [8, 0, -6]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 0.96]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [30, 0, -20]);

  const mockNotes = [
    {
      time: '01:12',
      title: 'Binary Search Concept',
      content: 'Array must be sorted first. Divide search space in half each iteration.',
      tag: 'Core Concept',
      color: 'var(--accent-violet)',
    },
    {
      time: '02:45',
      title: 'Time Complexity Analysis',
      content: 'O(log n) worst and average case. Space complexity is O(1) for iterative approach.',
      tag: 'Complexity',
      color: 'var(--accent-cyan)',
    },
    {
      time: '04:18',
      title: 'Edge Cases & Off-by-One',
      content: 'Use low + (high - low) / 2 to avoid integer overflow when high + low > INT_MAX.',
      tag: 'Best Practice',
      color: 'var(--accent-amber)',
    },
  ];

  const handleTimestampClick = (time: string) => {
    setActiveTimestamp(time);
    setCopiedTime(time);
    setTimeout(() => setCopiedTime(null), 1200);
  };

  return (
    <div ref={containerRef} className="w-full max-w-5xl mx-auto px-2 sm:px-4 py-8 perspective-[1400px]">
      <motion.div
        style={{
          rotateX,
          scale,
          y,
          transformStyle: 'preserve-3d',
        }}
        className="relative rounded-2xl border shadow-2xl overflow-hidden backdrop-blur-xl transition-shadow duration-500"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-strong)',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.5), 0 0 40px -10px var(--signature-glow)',
        }}
      >
        {/* Browser Chrome Header */}
        <div
          className="flex items-center justify-between px-4 py-3 border-b select-none"
          style={{
            backgroundColor: 'var(--bg-surface-2)',
            borderColor: 'var(--border-subtle)',
          }}
        >
          {/* Window dots */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#EF4444]/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#F59E0B]/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#10B981]/80 inline-block" />
          </div>

          {/* Browser address bar */}
          <div
            className="flex items-center justify-center gap-2 px-4 py-1 rounded-full text-xs font-mono border max-w-sm w-full mx-4 shadow-inner"
            style={{
              backgroundColor: 'var(--bg-base)',
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-muted)',
            }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>ytedunotes.app/edunotes?v=8mAITcNt710</span>
          </div>

          {/* Action pill */}
          <div className="flex items-center gap-2">
            <span
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium border"
              style={{
                backgroundColor: 'rgba(124, 92, 252, 0.12)',
                borderColor: 'var(--accent-violet)',
                color: 'var(--accent-violet)',
              }}
            >
              <Sparkles className="w-3 h-3" /> Live Demo
            </span>
          </div>
        </div>

        {/* In-App Workspace Mockup Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px] sm:min-h-[440px]">

          {/* Video Player Mockup Column (7 cols) */}
          <div
            className="lg:col-span-7 flex flex-col justify-between p-4 sm:p-5 border-b lg:border-b-0 lg:border-r relative overflow-hidden"
            style={{
              backgroundColor: '#050508',
              borderColor: 'var(--border-subtle)',
            }}
          >
            {/* Ambient player gradient overlay */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at 60% 30%, var(--accent-violet) 0%, transparent 60%)',
              }}
            />

            {/* Video Header / Badge */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-red-600 text-white tracking-wider">
                  YouTube 4K
                </span>
                <span className="text-xs text-white/80 font-medium truncate max-w-[200px] sm:max-w-xs">
                  CS50 2026 — Algorithms & Binary Search
                </span>
              </div>
              <div className="flex items-center gap-2 text-white/60 text-xs">
                <span className="font-mono text-emerald-400">1080p60</span>
              </div>
            </div>

            {/* Video Center Graphic Simulation */}
            <div className="relative z-10 flex flex-col items-center justify-center py-10 my-auto text-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center cursor-pointer shadow-2xl transition-transform"
                style={{
                  background: 'var(--signature-gradient)',
                  boxShadow: '0 0 30px rgba(124, 92, 252, 0.6)',
                }}
              >
                {isPlaying ? (
                  <Pause className="w-7 h-7 sm:w-8 sm:h-8 text-white fill-white" />
                ) : (
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 text-white fill-white ml-1" />
                )}
              </motion.div>
              <div className="mt-4 flex items-center gap-2 text-xs text-white/70 font-mono">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Current Timestamp: <strong className="text-white">{activeTimestamp}</strong> / 42:15</span>
              </div>
            </div>

            {/* Video Controls Bar */}
            <div className="relative z-10 space-y-2 pt-2">
              {/* Progress bar with timestamp markers */}
              <div className="relative w-full h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: activeTimestamp === '01:12' ? '18%' : activeTimestamp === '02:45' ? '42%' : '65%',
                    background: 'var(--signature-gradient)',
                  }}
                />
              </div>

              <div className="flex items-center justify-between text-white/80 text-xs pt-1">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="hover:text-white transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <RotateCcw className="w-3.5 h-3.5 hover:text-white transition-colors cursor-pointer" />
                  <Volume2 className="w-3.5 h-3.5 hover:text-white transition-colors cursor-pointer" />
                  <span className="font-mono text-[11px] text-white/60">{activeTimestamp} / 42:15</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-purple-300 font-mono">1.25x</span>
                  <Maximize2 className="w-3.5 h-3.5 hover:text-white transition-colors cursor-pointer" />
                </div>
              </div>
            </div>
          </div>

          {/* Notes Workspace Column (5 cols) */}
          <div
            className="lg:col-span-5 flex flex-col justify-between p-4 sm:p-5"
            style={{ backgroundColor: 'var(--bg-surface)' }}
          >
            {/* Notes Panel Header */}
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4" style={{ color: 'var(--accent-violet)' }} />
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-primary)' }}>
                    Notes Timeline (3)
                  </span>
                </div>
                <button
                  type="button"
                  className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-md font-medium transition-all"
                  style={{
                    backgroundColor: 'var(--bg-surface-2)',
                    color: 'var(--accent-violet)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <FileDown className="w-3 h-3" />
                  PDF Export
                </button>
              </div>

              {/* Timestamped Note Cards List */}
              <div className="space-y-2.5">
                {mockNotes.map((note) => {
                  const isActive = activeTimestamp === note.time;
                  return (
                    <motion.div
                      key={note.time}
                      whileHover={{ scale: 1.01 }}
                      onClick={() => handleTimestampClick(note.time)}
                      className="p-3 rounded-xl border transition-all duration-200 cursor-pointer text-left"
                      style={{
                        backgroundColor: isActive ? 'var(--bg-surface-2)' : 'var(--bg-surface)',
                        borderColor: isActive ? note.color : 'var(--border-subtle)',
                        boxShadow: isActive ? `0 0 15px -3px ${note.color}40` : 'none',
                      }}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-1.5">
                          <span
                            className="px-2 py-0.5 rounded text-[10px] font-mono font-bold flex items-center gap-1"
                            style={{
                              backgroundColor: `${note.color}1A`,
                              color: note.color,
                            }}
                          >
                            <Clock className="w-2.5 h-2.5" />
                            {note.time}
                          </span>
                          <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
                            {note.title}
                          </span>
                        </div>
                        <span
                          className="text-[10px] px-1.5 py-0.5 rounded font-medium"
                          style={{
                            backgroundColor: 'var(--bg-base)',
                            color: 'var(--text-muted)',
                          }}
                        >
                          {note.tag}
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                        {note.content}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Quick Note Input Simulation */}
            <div
              className="mt-3 pt-3 border-t flex items-center gap-2"
              style={{ borderColor: 'var(--border-subtle)' }}
            >
              <div
                className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg text-xs border"
                style={{
                  backgroundColor: 'var(--bg-surface-2)',
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--text-muted)',
                }}
              >
                <Bookmark className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>Add note at <strong style={{ color: 'var(--accent-amber)' }}>{activeTimestamp}</strong>...</span>
              </div>
              <button
                type="button"
                className="px-3 py-2 rounded-lg text-xs font-medium text-white shadow-sm flex items-center gap-1 shrink-0"
                style={{ background: 'var(--signature-gradient)' }}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Save
              </button>
            </div>

          </div>

        </div>
      </motion.div>
    </div>
  );
}
