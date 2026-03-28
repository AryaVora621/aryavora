import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { SmoothScroll } from './components/SmoothScroll';
import { Preloader } from './components/Preloader';
import { Marquee } from './components/Marquee';
import { ParallaxImage } from './components/ParallaxImage';
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
    <SmoothScroll>
      {/* === PRELOADER === */}
      <Preloader />

      {/* === CUSTOM CURSOR === */}
      <motion.div
        className="custom-cursor"
        animate={{
          x: x - 16,
          y: y - 16,
          scale: isHovering ? 2.5 : 1,
          opacity: isHovering ? 0.15 : 0.8
        }}
        transition={{
          type: 'spring',
          damping: 25,
          mass: 0.5,
          stiffness: 350
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
          zIndex: 99998
        }}
      />

      {/* === SCROLL PROGRESS === */}
      <motion.div
        style={{
          scaleX: scrollYProgress,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, #FFFFFF, #555555)',
          transformOrigin: '0%',
          zIndex: 9999
        }}
      />

      {/* === NAV === */}
      <nav className="glass-nav">
        <div className="container items-center">
          <div className="nav-brand" style={{ mixBlendMode: 'difference', color: '#fff' }}>
            Arya Vora
          </div>
          <div className="nav-links flex items-center" style={{ mixBlendMode: 'difference' }}>
            <a href="#about" style={{ color: '#fff' }}>About</a>
            <a href="#experience" style={{ color: '#fff' }}>Experience</a>
            <a href="#contact" style={{ color: '#fff' }}>Contact</a>
            <a 
              href="https://github.com/AryaVora621" 
              target="_blank" rel="noopener noreferrer" 
              className="btn-apple" 
              style={{ 
                padding: '0.35rem 0.9rem', fontSize: '0.8rem', marginLeft: '1.5rem', 
                mixBlendMode: 'difference' 
              }}
            >
              GitHub
            </a>
          </div>
        </div>
      </nav>

      {/* === MAIN CONTENT === */}
      <main>
        <Hero />
        
        {/* Skills Marquee */}
        <Marquee 
          items={['Robotics', 'React', 'TypeScript', 'Photography', '3D Printing', 'CAD', 'YouTube', 'FTC 23786', 'Edison NJ', 'Frinklyy']}
          speed={25}
        />
        
        <About />
        
        {/* Parallax Break */}
        <ParallaxImage 
          src="/robot.png" 
          alt="FTC Robot on competition field"
          overlay="Built to Compete."
        />
        
        <Experience />
        
        {/* Second Marquee */}
        <Marquee 
          items={['Full-Stack', 'Framer Motion', 'Node.js', 'Python', 'Java', 'Figma', 'Blender', 'Arduino', 'Control Systems']}
          speed={30}
        />
        
        <Contact />
      </main>
    </SmoothScroll>
  );
}

export default App;
