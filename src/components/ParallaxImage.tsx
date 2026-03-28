import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface ParallaxImageProps {
  src: string;
  alt: string;
  overlay?: string;
}

export function ParallaxImage({ src, alt, overlay }: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Image moves slower than scroll — classic parallax
  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.15]);

  return (
    <section
      ref={containerRef}
      className="parallax-section"
    >
      <motion.div
        className="parallax-image-wrapper"
        style={{ y, scale }}
      >
        <img src={src} alt={alt} className="parallax-image" />
      </motion.div>
      {overlay && (
        <div className="parallax-overlay">
          <motion.p
            className="h-massive text-gradient-white"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
          >
            {overlay}
          </motion.p>
        </div>
      )}
    </section>
  );
}
