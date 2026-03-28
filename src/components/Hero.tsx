import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { TextReveal } from './TextReveal';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const blur = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const filterBlur = useTransform(blur, (v) => `blur(${v}px)`);

  return (
    <section ref={containerRef} style={{ height: '140vh', position: 'relative' }}>
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'hidden',
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        
        <motion.div 
          style={{ 
            scale, opacity, y,
            filter: filterBlur,
            display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
            padding: '0 5%'
          }}
        >
          {/* Staggered label */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            style={{
              fontSize: '0.85rem',
              fontWeight: 500,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              marginBottom: '1.5rem'
            }}
          >
            Edison, NJ · Developer · Creator
          </motion.div>

          {/* Hero words stagger in after preloader */}
          <TextReveal 
            text="Arya Vora." 
            as="h1" 
            className="h-massive text-gradient-white"
            delay={2.5}
            staggerSpeed={0.08}
          />
          
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.0, duration: 1, ease: [0.33, 1, 0.68, 1] }}
          >
            <p className="p-large" style={{ marginTop: '2rem', maxWidth: '700px' }}>
              Captain of MakEMinds FTC 23786. Photographer. Content creator as Frinklyy.
              Building the future of competitive robotics.
            </p>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5, duration: 1 }}
            style={{ marginTop: '4rem' }}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              style={{
                width: '1px',
                height: '40px',
                background: 'linear-gradient(180deg, var(--text-muted), transparent)',
                margin: '0 auto'
              }}
            />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
