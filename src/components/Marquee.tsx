import { motion } from 'framer-motion';

interface MarqueeProps {
  items: string[];
  speed?: number;
  separator?: string;
}

export function Marquee({ items, speed = 20, separator = '·' }: MarqueeProps) {
  // We render the items 4 times to ensure seamless loop
  const repeatedItems = [...items, ...items, ...items, ...items];
  
  const content = repeatedItems.map((item, i) => (
    <span key={i} className="marquee-item">
      {item} <span className="marquee-sep">{separator}</span>
    </span>
  ));

  return (
    <div className="marquee-container" aria-hidden="true">
      <motion.div
        className="marquee-track"
        animate={{ x: [0, '-50%'] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: speed,
            ease: 'linear',
          },
        }}
      >
        {content}
      </motion.div>
    </div>
  );
}
