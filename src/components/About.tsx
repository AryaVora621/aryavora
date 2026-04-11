import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { TextReveal } from './TextReveal';
import { HoverImageReveal } from './HoverImageReveal';

function AnimatedCounter({ target, suffix = '', duration = 2, useCommas = true }: { target: number; suffix?: string; duration?: number; useCommas?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const increment = target / (duration * 60); // 60fps
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="stat-number">
      {useCommas ? count.toLocaleString() : count}{suffix}
    </span>
  );
}

const stats = [
  { number: 23786, suffix: '', label: 'FTC Team Number', useCommas: false },
  { number: 3, suffix: '+', label: 'Years Building', useCommas: true },
  { number: 50, suffix: '+', label: 'Projects Shipped', useCommas: true },
  { number: 10, suffix: 'K+', label: 'Lines of Code', useCommas: true },
];

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      ref={containerRef} 
      id="about"
      className="scroll-section section-pad"
      style={{ padding: '15vh 0' }}
    >
      <div className="container">
        <TextReveal 
          text="I believe in elegant solutions to complex problems."
          as="h2"
          className="h-large"
          staggerSpeed={0.03}
        />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
        >
          <p className="p-large" style={{ maxWidth: '750px', marginTop: '2rem', lineHeight: 1.8 }}>
            Whether it's designing{' '}
            <HoverImageReveal imageSrc="/robot.png" rotation={-4}>
              precise control systems
            </HoverImageReveal>
            {' '}for{' '}
            <HoverImageReveal imageSrc="/robot.png" rotation={6}>
              competitive robotics
            </HoverImageReveal>
            , writing{' '}
            <HoverImageReveal imageSrc="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop" rotation={-2}>
              scalable applications
            </HoverImageReveal>
            , or shooting{' '}
            <HoverImageReveal imageSrc="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop" rotation={5}>
              stunning photography
            </HoverImageReveal>
            {' '}— the goal is always perfection.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="stats-grid" style={{ display: 'flex', gap: '1.5rem', marginTop: '5rem', flexWrap: 'wrap' }}>
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              className="stat-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
            >
              <AnimatedCounter target={stat.number} suffix={stat.suffix} useCommas={stat.useCommas} />
              <span className="stat-label">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
