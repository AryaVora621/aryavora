import { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

interface HoverImageRevealProps {
  children: React.ReactNode;
  imageSrc: string;
  width?: number;
  height?: number;
  rotation?: number;
}

export function HoverImageReveal({ 
  children, 
  imageSrc, 
  width = 320, 
  height = 220, 
  rotation = 6 
}: HoverImageRevealProps) {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring physics for the trailing image giving it a slight "delay" compared to cursor
  const springConfig = { damping: 20, stiffness: 200, mass: 0.8 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    let animationFrameId: number;
    
    // Only track mouse when active to save performance
    if (!isHovered) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - width / 2);
      mouseY.set(e.clientY - height / 2);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered, mouseX, mouseY, width, height]);

  return (
    <span 
      className="hover-reveal-text"
      onMouseEnter={(e) => {
        // Set initial position instantly to avoid flying in from corner on first hover
        mouseX.set(e.clientX - width / 2);
        mouseY.set(e.clientY - height / 2);
        setIsHovered(true);
      }} 
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        display: 'inline', 
        position: 'relative', 
        cursor: 'none',
        color: 'var(--text-bright)',
        fontWeight: 600,
        textDecoration: 'underline',
        textDecorationColor: 'rgba(255,255,255,0.2)',
        textUnderlineOffset: '4px'
      }}
    >
      {children}
      
      <motion.img
        src={imageSrc}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width,
          height,
          objectFit: 'cover',
          borderRadius: '12px',
          pointerEvents: 'none',
          // Ensure it's above content but below the custom cursor
          zIndex: 99990, 
          x,
          y,
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
        }}
        initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
        animate={{ 
          opacity: isHovered ? 1 : 0, 
          scale: isHovered ? 1 : 0.8,
          // Subtle rotate adds to the dynamic feel
          rotate: isHovered ? rotation : 0 
        }}
        transition={{ 
          // Image fade in/out speed
          opacity: { duration: 0.2 },
          scale: { duration: 0.3, ease: [0.33, 1, 0.68, 1] },
          rotate: { duration: 0.5, ease: [0.33, 1, 0.68, 1] }
        }}
      />
    </span>
  );
}
