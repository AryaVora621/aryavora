import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';
import type { ReactNode } from 'react';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  as?: 'a' | 'button';
  href?: string;
  target?: string;
  rel?: string;
  strength?: number;
  style?: React.CSSProperties;
}

export function MagneticButton({
  children,
  className = '',
  as: Tag = 'button',
  href,
  target,
  rel,
  strength = 0.3,
  style,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 300, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const MotionTag = Tag === 'a' ? motion.a : motion.button;

  return (
    <MotionTag
      ref={ref as any}
      className={className}
      href={href}
      target={target}
      rel={rel}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ ...style, x: springX, y: springY }}
    >
      {children}
    </MotionTag>
  );
}
