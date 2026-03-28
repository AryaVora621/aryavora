import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end center"] // start animating when top of container hits 80% of viewport
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);

  return (
    <section 
      ref={containerRef} 
      className="scroll-section"
      style={{ height: '100vh', padding: '10vh 5vw' }}
    >
      <motion.div 
        style={{ scale, opacity }}
        className="flex-col gap-8 justify-center h-full container"
      >
        <p className="h-large" style={{ color: 'var(--text-main)', maxWidth: '900px' }}>
          I believe in <span className="text-gradient-white">elegant solutions</span> to complex problems. 
        </p>
        
        <p className="p-large" style={{ maxWidth: '800px' }}>
          Whether it's designing precise control systems, writing scalable full-stack applications, 
          or shooting stunning photography, the goal is always perfection.
        </p>

        <div className="flex gap-4 mt-8">
          <div className="exp-card flex-col items-center justify-center p-8" style={{ width: '100%', maxWidth: '300px' }}>
            <h3 className="h-large">23786</h3>
            <p className="p-medium">MakEMinds FTC</p>
          </div>
          <div className="exp-card flex-col items-center justify-center p-8" style={{ width: '100%', maxWidth: '300px' }}>
            <h3 className="h-large">3D</h3>
            <p className="p-medium">Printing & CAD</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
