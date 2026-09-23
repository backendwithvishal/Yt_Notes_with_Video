import { useState, useRef, type ReactNode } from 'react';
import { motion, useSpring } from 'framer-motion';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  style?: React.CSSProperties;
}

export default function MagneticButton({
  children,
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  style = {},
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const springConfig = { damping: 15, stiffness: 220, mass: 0.2 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || !btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const pullDistX = (e.clientX - centerX) * 0.25;
    const pullDistY = (e.clientY - centerY) * 0.25;

    x.set(pullDistX);
    y.set(pullDistY);
  };

  const handleMouseEnter = () => {
    if (!disabled) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={btnRef}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        x,
        y,
        ...style,
      }}
      whileTap={{ scale: 0.96 }}
      className={`relative inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none ${className}`}
    >
      {/* Background Soft Glow on Hover */}
      {isHovered && (
        <span
          className="absolute -inset-1 rounded-xl blur-md opacity-70 -z-10 transition-opacity duration-300"
          style={{ background: 'var(--signature-gradient)' }}
        />
      )}
      {children}
    </motion.button>
  );
}
