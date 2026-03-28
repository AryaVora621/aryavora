import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { motion, useScroll } from 'framer-motion';
import { useMousePosition } from './hooks/useMousePosition';
import { useEffect, useState } from 'react';

function App() {
  const { scrollYProgress } = useScroll();
  const { x, y } = useMousePosition();
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    window.addEventListener('mouseover', handleMouseOver);
    return () => window.removeEventListener('mouseover', handleMouseOver);
  }, []);

  return (
    <div className="app-container">
      {/* Physics Trailing Cursor Overlay */}
      <motion.div
        className="custom-cursor"
        animate={{
          x: x - 16, // center the 32px cursor
          y: y - 16,
          scale: isHovering ? 2.5 : 1,
          opacity: isHovering ? 0.3 : 1
        }}
        transition={{
          type: 'spring',
          damping: 30, // Higher damping for smoother trail
          mass: 0.8,
          stiffness: 400
        }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          backgroundColor: '#ffffff',
          pointerEvents: 'none',
          mixBlendMode: 'difference',
          zIndex: 99999
        }}
      />

      {/* Global Apple-style Progress indicator */}
      <motion.div
        className="progress-bar"
        style={{
          scaleX: scrollYProgress,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, #FFFFFF, #666666)',
          transformOrigin: '0%',
          zIndex: 9999
        }}
      />

      {/* Ultra Minimal Global Glass Nav */}
      <nav className="glass-nav">
        <div className="container items-center">
          <div className="nav-brand" style={{ mixBlendMode: 'difference', color: '#fff' }}>Arya Vora</div>
          <div className="nav-links flex items-center" style={{ mixBlendMode: 'difference' }}>
            <a href="#about" style={{ color: '#fff' }}>About</a>
            <a href="#experience" style={{ color: '#fff' }}>Experience</a>
            <a href="#contact" style={{ color: '#fff' }}>Contact</a>
            {/* Minimal "Buy Now" styled button but to github */}
            <a href="https://github.com/aryavora" target="_blank" rel="noopener noreferrer" className="btn-apple" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem', marginLeft: '1.5rem', mixBlendMode: 'difference' }}>
              GitHub
            </a>
          </div>
        </div>
      </nav>

      <main style={{ marginTop: '0', perspective: '1200px' }}>
        <Hero />
        <About />
        <Experience />
        <Contact />
      </main>
    </div>
  );
}

export default App;
