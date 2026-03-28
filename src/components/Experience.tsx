import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const experiences = [
  {
    role: "Captain",
    team: "MakEMinds FTC 23786",
    year: "2023 - Present",
    desc: "Founded and lead a competitive robotics team in Edison, NJ. Focusing on STEM education, advanced control systems, and innovative engineering."
  },
  {
    role: "Content Creator",
    team: "Frinklyy (YouTube)",
    year: "Ongoing",
    desc: "Documenting building, coding, gaming, and 3D printing projects. Sharing high school experiences and technical knowledge."
  },
  {
    role: "Full-Stack Developer",
    team: "Freelance",
    year: "2021 - Present",
    desc: "Crafting modern web applications with beautiful UX, clean architecture, and highly performant codebases."
  }
];

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  return (
    <section 
      ref={containerRef} 
      className="scroll-section"
      style={{ height: '300vh' }} // Huge height to allow 3 sticky cards to scroll over
    >
      <div className="sticky-container">
        <div className="container flex-col justify-center h-full gap-8 w-full max-w-4xl pt-24">
          <h2 className="h-large mb-8">The Journey.</h2>
          
          <div className="stack-container" style={{ position: 'relative', height: '60vh' }}>
            {experiences.map((exp, index) => {
              // Calculate specific scroll constraints for each card to stack
              const start = index * 0.25;
              const safeStart = Math.max(0, start);
              const fadeStart = Math.max(0, start - 0.1);
              const fadeEnd = Math.max(fadeStart + 0.01, start + 0.1);

              const opacity = useTransform(scrollYProgress, [fadeStart, fadeEnd, 1], [0, 1, 1]);
              const yPush = useTransform(scrollYProgress, [safeStart, Math.min(1, safeStart + 0.3)], [100, 0]);
              
              const rotStart = Math.min(0.99, safeStart + 0.3);
              const scaleDown = useTransform(scrollYProgress, [rotStart, 1], [1, 0.9 - (index * 0.05)]);
              const rotateX = useTransform(scrollYProgress, [rotStart, 1], [0, 5]);
              const zIndex = index + 1;

              return (
                <motion.div
                  key={index}
                  className="exp-card absolute top-0 left-0 w-full"
                  style={{ 
                    opacity, 
                    y: index === 0 ? 0 : yPush,
                    scale: scaleDown,
                    rotateX,
                    zIndex,
                    marginTop: `${index * 40}px`,
                    background: index % 2 === 0 ? '#111111' : '#1a1a1a'
                  }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="h-large" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}>{exp.role}</h3>
                    <span className="p-medium" style={{ color: 'var(--text-main)', border: '1px solid var(--border-subtle)', padding: '0.2rem 1rem', borderRadius: '99px' }}>{exp.year}</span>
                  </div>
                  <h4 className="p-large text-gradient-white mb-4">{exp.team}</h4>
                  <p className="p-medium">{exp.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
