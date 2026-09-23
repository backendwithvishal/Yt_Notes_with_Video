import { useState, useRef, type ReactNode } from 'react';
import { motion, useSpring } from 'framer-motion';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  glowColor?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export default function TiltCard({
  children,
  className = '',
  maxTilt = 7,
  glowColor = 'var(--accent-violet)',
  style = {},
  onClick,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

  const springConfig = { damping: 20, stiffness: 260, mass: 0.5 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -maxTilt;
    const rotY = ((x - centerX) / centerX) * maxTilt;

    rotateX.set(rotX);
    rotateY.set(rotY);

    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
        ...style,
      }}
      className={`relative rounded-2xl transition-shadow duration-300 ${
        isHovered ? 'shadow-xl' : 'shadow-sm'
      } ${className}`}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="w-full h-full rounded-2xl"
      >
        {children}

        {/* Dynamic Sheen Glare */}
        {isHovered && (
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-20 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, ${glowColor} 0%, transparent 65%)`,
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}
