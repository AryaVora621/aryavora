import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end center"]
  });

  // Give the hero a 3D parallax effect as you scroll away from it
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section ref={containerRef} style={{ height: '150vh', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: '#000000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        
        <motion.div 
          style={{ 
            scale, 
            opacity,
            y,
            display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'
          }}
        >
          <motion.h1 
            className="h-massive text-gradient-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Arya Vora.
          </motion.h1>
          
          <motion.p 
            className="p-large" 
            style={{ marginTop: '2rem', maxWidth: '800px', padding: '0 2rem' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Captain of MakEMinds. Photographer. Frinklyy.
            <br/>Building the future of competitive robotics from Edison, NJ.
          </motion.p>
        </motion.div>

      </div>
    </section>
  );
}
