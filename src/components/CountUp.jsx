import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

export default function CountUp({ value, duration = 0.8, className = '' }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, latest => {
    return Number(latest).toFixed(2);
  });

  useEffect(() => {
    const controls = animate(count, value, {
      duration,
      ease: 'easeOut',
    });
    return () => controls.stop();
  }, [value]);

  return (
    <motion.span
      className={className}
      style={{ display: 'inline-block' }}
      animate={{ scale: [1, 1.03, 1] }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {rounded}
    </motion.span>
  );
}

