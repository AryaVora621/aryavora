import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Target, MonitorPlay, Code2 } from 'lucide-react';

const experiences = [
  {
    role: "Captain",
    company: "MakEMinds FTC 23786",
    period: "2023 - Present",
    description: "Founded and lead a competitive robotics team in Edison, NJ. Focusing on STEM education, advanced control systems, and innovative engineering.",
    icon: <Target size={32} color="#ffffff" />
  },
  {
    role: "Content Creator",
    company: "Frinklyy (YouTube)",
    period: "Ongoing",
    description: "Documenting building, coding, gaming, and 3D printing projects. Sharing high school experiences and technical knowledge.",
    icon: <MonitorPlay size={32} color="#ffffff" />
  },
  {
    role: "Full-Stack Developer",
    company: "Freelance",
    period: "Ongoing",
    description: "Building bleeding-edge web applications using React, TypeScript, and Framer Motion. Focused on creating immersive, award-winning user experiences.",
    icon: <Code2 size={32} color="#ffffff" />
  }
];

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 300vh gives enough scroll room so the horizontal movement occurs smoothly
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // A wide translation mapping the vertical scroll completely into horizontal translation
  const xTranslate = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);

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
          background: '#000000'
        }}
      >
        <motion.div 
          style={{ 
            display: 'flex', 
            gap: '4rem', 
            paddingLeft: '10vw', 
            x: xTranslate 
          }}
        >
          {/* Introductory Title Card */}
          <div style={{ minWidth: '40vw', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 className="h-massive text-gradient-white">The Journey.</h2>
            <p className="p-large" style={{ marginTop: '1rem', opacity: 0.7 }}>Scroll right to explore.</p>
          </div>

          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              className="exp-card"
              style={{
                minWidth: '50vw',
                height: '60vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
              whileHover={{ 
                scale: 1.02, 
                backgroundColor: 'rgba(30, 30, 30, 0.6)' 
              }}
              transition={{ duration: 0.3 }}
            >
              <div style={{ marginBottom: '2rem' }}>
                {exp.icon}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem' }}>
                <h3 className="h-large text-gradient-white">{exp.role}</h3>
                <span className="p-medium" style={{ border: '1px solid #333', padding: '0.5rem 1rem', borderRadius: '100px' }}>
                  {exp.period}
                </span>
              </div>
              <h4 className="p-large" style={{ color: '#ffffff', marginBottom: '1.5rem' }}>{exp.company}</h4>
              <p className="p-medium" style={{ fontSize: '1.25rem' }}>{exp.description}</p>
            </motion.div>
          ))}

          {/* Spacer at the end so the last card doesn't hit the absolute edge */}
          <div style={{ minWidth: '10vw' }} />
        </motion.div>
      </div>
    </section>
  );
}
