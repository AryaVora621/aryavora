import { motion } from 'framer-motion';

export function Contact() {
  return (
    <section className="scroll-section flex-col items-center justify-center container" style={{ minHeight: '80vh' }}>
      <motion.div 
        className="flex-col items-center justify-center text-center gap-8"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h2 className="h-massive text-gradient-white">Let's build.</h2>
        <p className="p-large max-w-2xl mb-8">
          Interested in robotics, software architecture, or just want to chat?
        </p>

        <div className="flex gap-4 items-center justify-center">
          <a href="mailto:contact@aryavora.com" className="btn-apple">
            Get in Touch
          </a>
          <a href="https://youtube.com/@frinklyy" target="_blank" rel="noopener noreferrer" className="btn-apple" style={{ background: 'transparent', color: '#fff', border: '1px solid #333' }}>
            YouTube
          </a>
        </div>
      </motion.div>
      
      <div className="w-full text-center mt-32 border-t border-subtle pt-8" style={{ borderColor: 'var(--border-subtle)' }}>
        <p className="text-dim text-sm">© {new Date().getFullYear()} Arya Vora (@frinklyy). Edison, NJ.</p>
      </div>
    </section>
  );
}
