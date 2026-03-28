import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll just for the hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end center"], // triggers as the section leaves the viewport
  });

  // Calculate transforms based on scroll
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 25]); // 3D tilt back

  return (
    <section 
      ref={containerRef} 
      className="scroll-section" 
      style={{ height: '150vh' }} // Make it tall to allow scroll
    >
      <div className="sticky-container">
        <motion.div 
          className="flex-col items-center justify-center gap-4"
          style={{ 
            scale, 
            opacity, 
            y, 
            rotateX,
            perspective: 1000,
            transformStyle: "preserve-3d"
          }}
        >
          <motion.h1 
            className="h-massive text-gradient-white"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            Arya Vora.
          </motion.h1>
          
          <motion.p 
            className="p-large text-center max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Captain of MakEMinds. Photographer. Frinklyy. <br />
            Building the future of competitive robotics from Edison, NJ.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
