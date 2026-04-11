import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export type CursorVariant = 'default' | 'hover' | 'drag';

export function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const [variant, setVariant] = useState<CursorVariant>('default');
  const [text, setText] = useState<string>('');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 16);
      mouseY.set(e.clientY - 16);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const handleCursorChange = (e: CustomEvent<{ variant: CursorVariant; text?: string }>) => {
      setVariant(e.detail.variant);
      setText(e.detail.text || '');
    };

    window.addEventListener('cursorChange', handleCursorChange as EventListener);
    return () => window.removeEventListener('cursorChange', handleCursorChange as EventListener);
  }, []);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // If we are currently in 'drag' state, don't override with hover
      if (variant === 'drag') return;
      
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button')
      ) {
        setVariant('hover');
      } else {
        setVariant('default');
      }
    };
    
    // We only attach this if we aren't in another overriding state
    window.addEventListener('mouseover', handleMouseOver);
    return () => window.removeEventListener('mouseover', handleMouseOver);
  }, [variant]);

  const variants = {
    default: {
      scale: 1,
      opacity: 0.8,
      backgroundColor: '#ffffff',
    },
    hover: {
      scale: 2.5,
      opacity: 0.15,
      backgroundColor: '#ffffff',
    },
    drag: {
      scale: 2.5,
      opacity: 1,
      backgroundColor: '#ffffff',
      color: '#000000',
    }
  };

  return (
    <motion.div
      className="custom-cursor flex items-center justify-center font-bold"
      animate={variants[variant]}
      transition={{
        type: 'spring',
        damping: 25,
        mass: 0.5,
        stiffness: 350
      }}
      style={{
        x: cursorX,
        y: cursorY,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        pointerEvents: 'none',
        mixBlendMode: 'difference',
        zIndex: 99998,
        fontSize: '4px',
        lineHeight: 1,
        letterSpacing: '0.05em'
      }}
    >
      {variant === 'drag' && text && <span style={{ mixBlendMode: 'normal' }}>{text}</span>}
    </motion.div>
  );
}

// Helper to trigger cursor from anywhere
export const setCursor = (variant: CursorVariant, text?: string) => {
  window.dispatchEvent(new CustomEvent('cursorChange', { detail: { variant, text } }));
};
