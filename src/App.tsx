import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { motion, useScroll } from 'framer-motion';

function App() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="app-container">
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
          <div className="nav-brand">Arya Vora</div>
          <div className="nav-links flex items-center">
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
            {/* Minimal "Buy Now" styled button but to github */}
            <a href="https://github.com/aryavora" target="_blank" rel="noopener noreferrer" className="btn-apple" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem', marginLeft: '1.5rem' }}>
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
