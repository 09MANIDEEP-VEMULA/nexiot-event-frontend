import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const CountdownTimer = ({ targetDate = '2024-12-31T00:00:00' }) => {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference > 0) {
        setTime({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!mounted) return null;

  const TimeUnit = ({ label, value }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center"
    >
      <div className="relative">
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/50 flex items-center justify-center backdrop-blur-sm">
          <motion.span
            key={value}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-3xl md:text-4xl font-bold text-cyan-400 font-mono"
          >
            {String(value).padStart(2, '0')}
          </motion.span>
        </div>
      </div>
      <span className="text-gray-400 text-sm md:text-base mt-2 uppercase tracking-widest">
        {label}
      </span>
    </motion.div>
  );

  return (
    <div className="flex justify-center items-center gap-4 md:gap-8 py-8">
      <TimeUnit label="Days" value={time.days} />
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="text-2xl md:text-3xl text-cyan-400 font-bold"
      >
        :
      </motion.div>
      <TimeUnit label="Hours" value={time.hours} />
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="text-2xl md:text-3xl text-cyan-400 font-bold"
      >
        :
      </motion.div>
      <TimeUnit label="Minutes" value={time.minutes} />
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="text-2xl md:text-3xl text-cyan-400 font-bold"
      >
        :
      </motion.div>
      <TimeUnit label="Seconds" value={time.seconds} />
    </div>
  );
};

export default CountdownTimer;