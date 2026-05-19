import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const BootSequence: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [stage, setStage] = useState(0);
  const messages = [
    "Initializing Workspace...",
    "Loading Systems...",
    "Connecting Intelligence...",
    "Ready"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStage((prev) => {
        if (prev >= messages.length - 1) {
          clearInterval(timer);
          setTimeout(onComplete, 400);
          return prev;
        }
        return prev + 1;
      });
    }, 300);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center font-mono gap-4"
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 1, ease: [0.6, 0.01, -0.05, 0.95] }}
    >
      <div className="relative w-64 h-1 bg-zinc-900 overflow-hidden rounded-full">
        <motion.div
          className="absolute inset-0 bg-white"
          initial={{ x: "-100%" }}
          animate={{ x: `${((stage + 1) / messages.length) * 100 - 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={stage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-white text-xs tracking-[0.2em] uppercase"
        >
          {messages[stage]}
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="h-full w-full bg-[radial-gradient(circle_at_center,_transparent_0%,_black_100%)]" />
        <div className="h-full w-full bg-[repeating-linear-gradient(0deg,_transparent_0px,_transparent_1px,_rgba(255,255,255,0.05)_1px,_rgba(255,255,255,0.05)_2px)] bg-[length:100%_2px]" />
      </div>
    </motion.div>
  );
};
