import { motion } from 'framer-motion';

interface TextRevealProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  delay?: number;
  staggerSpeed?: number;
  once?: boolean;
}

const containerVariants = {
  hidden: {},
  visible: (custom: { staggerSpeed: number; delay: number }) => ({
    transition: {
      staggerChildren: custom.staggerSpeed,
      delayChildren: custom.delay,
    },
  }),
};

const wordVariants = {
  hidden: {
    y: '100%',
    opacity: 0,
  },
  visible: {
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1] as [number, number, number, number],
    },
  },
};

export function TextReveal({
  text,
  className = '',
  as: Tag = 'p',
  delay = 0,
  staggerSpeed = 0.04,
  once = true,
}: TextRevealProps) {
  const words = text.split(' ');

  return (
    <Tag className={className} style={{ margin: 0 }}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: '-50px' }}
        custom={{ staggerSpeed, delay }}
        style={{ display: 'flex', flexWrap: 'wrap', gap: '0 0.3em' }}
      >
        {words.map((word, i) => (
          <span
            key={i}
            style={{ overflow: 'hidden', display: 'inline-block' }}
          >
            <motion.span
              variants={wordVariants}
              style={{ display: 'inline-block' }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
