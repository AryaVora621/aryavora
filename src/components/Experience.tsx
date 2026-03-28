import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Target, MonitorPlay, Code2 } from 'lucide-react';
import { TextReveal } from './TextReveal';

const experiences = [
  {
    role: "Captain",
    company: "MakEMinds FTC 23786",
    period: "2023 — Present",
    description: "Founded and lead a competitive robotics team in Edison, NJ. Focusing on STEM education, advanced control systems, and innovative engineering.",
    icon: <Target size={28} />,
    color: '#0ff0fc',
  },
  {
    role: "Content Creator",
    company: "Frinklyy (YouTube)",
    period: "Ongoing",
    description: "Documenting building, coding, gaming, and 3D printing projects. Sharing high school experiences and technical knowledge with a growing audience.",
    icon: <MonitorPlay size={28} />,
    color: '#ff6b6b',
  },
  {
    role: "Full-Stack Developer",
    company: "Freelance",
    period: "Ongoing",
    description: "Building bleeding-edge web applications with React, TypeScript, and modern animation frameworks. Creating immersive, award-worthy digital experiences.",
    icon: <Code2 size={28} />,
    color: '#9d4edd',
  }
];

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const xTranslate = useTransform(scrollYProgress, [0, 1], ["0%", "-66%"]);

  return (
    <section ref={containerRef} id="experience" style={{ height: '300vh', position: 'relative' }}>
      <div 
        style={{ 
          position: 'sticky', 
          top: 0, 
          height: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          overflow: 'hidden',
          background: '#000'
        }}
      >
        <motion.div 
          style={{ 
            display: 'flex', 
            gap: '3rem', 
            paddingLeft: '8vw', 
            x: xTranslate 
          }}
        >
          {/* Lead-in Title */}
          <div style={{ minWidth: '40vw', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <TextReveal 
              text="The Journey."
              as="h2"
              className="h-massive text-gradient-white"
              staggerSpeed={0.08}
            />
            <motion.p 
              className="p-large" 
              style={{ marginTop: '1.5rem', opacity: 0.6 }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.6 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Scroll to explore →
            </motion.p>
          </div>

          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              className="exp-card"
              style={{
                minWidth: '48vw',
                height: '65vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
              }}
              whileHover={{ 
                scale: 1.015,
                borderColor: `${exp.color}33`,
              }}
              transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
            >
              {/* Subtle accent glow */}
              <div style={{
                position: 'absolute',
                top: '-50%',
                right: '-20%',
                width: '300px',
                height: '300px',
                borderRadius: '50%',
                background: `radial-gradient(circle, ${exp.color}08, transparent 70%)`,
                pointerEvents: 'none',
              }} />

              <div>
                <div style={{ 
                  display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', 
                  marginBottom: '2rem',
                }}>
                  <div style={{ 
                    width: '56px', height: '56px', 
                    borderRadius: '16px', 
                    background: `${exp.color}15`,
                    border: `1px solid ${exp.color}25`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: exp.color,
                  }}>
                    {exp.icon}
                  </div>
                  <span className="p-medium" style={{ 
                    border: '1px solid var(--border-subtle)', 
                    padding: '0.4rem 1rem', 
                    borderRadius: '100px',
                    fontSize: '0.85rem',
                  }}>
                    {exp.period}
                  </span>
                </div>

                <h3 className="h-large text-gradient-white" style={{ marginBottom: '0.5rem' }}>
                  {exp.role}
                </h3>
                <h4 className="p-large" style={{ color: '#ffffff', marginBottom: '1.5rem', opacity: 0.9 }}>
                  {exp.company}
                </h4>
              </div>

              <p className="p-medium" style={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
                {exp.description}
              </p>
            </motion.div>
          ))}

          <div style={{ minWidth: '10vw' }} />
        </motion.div>
      </div>
    </section>
  );
}
