import { motion } from 'framer-motion';
import { TextReveal } from './TextReveal';
import { MagneticButton } from './MagneticButton';

export function Contact() {
  return (
    <section 
      id="contact"
      className="scroll-section section-pad" 
      style={{ 
        minHeight: '80vh', 
        display: 'flex', flexDirection: 'column', 
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center',
        padding: '15vh 5%'
      }}
    >
      <motion.div 
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}
      >
        <TextReveal 
          text="Let's build something great."
          as="h2"
          className="h-massive text-gradient-white"
          staggerSpeed={0.06}
        />

        <motion.p
          className="p-large"
          style={{ maxWidth: '550px' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
        >
          Interested in robotics, software architecture, or just want to chat about ideas?
        </motion.p>

        <motion.div 
          style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
        >
          <MagneticButton
            as="a"
            href="mailto:contact@aryavora.com"
            className="btn-apple"
            strength={0.25}
          >
            Get in Touch
          </MagneticButton>

          <MagneticButton
            as="a"
            href="https://youtube.com/@frinklyy"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
            strength={0.25}
          >
            YouTube
          </MagneticButton>
        </motion.div>
      </motion.div>
      
      <motion.div 
        style={{ 
          width: '100%', textAlign: 'center', 
          marginTop: '12rem', paddingTop: '2rem',
          borderTop: '1px solid var(--border-subtle)'
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 1 }}
      >
        <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>
          © {new Date().getFullYear()} Arya Vora (@frinklyy). Edison, NJ.
        </p>
      </motion.div>
    </section>
  );
}
