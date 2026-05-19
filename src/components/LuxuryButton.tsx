import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

interface LuxuryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'glass';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const LuxuryButton = ({ children, onClick, variant = 'primary', className = '', type = 'button' }: LuxuryButtonProps) => {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`group relative overflow-hidden px-8 py-3 rounded-full font-medium transition-all duration-500 flex items-center gap-2 cursor-none ${
        variant === 'primary' 
          ? 'bg-zinc-900 text-white hover:bg-zinc-800' 
          : variant === 'secondary'
          ? 'bg-transparent border border-zinc-200 text-zinc-900 hover:border-zinc-900'
          : 'glass-card text-zinc-900'
      } ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg]"
        initial={{ x: '-100%' }}
        whileHover={{ x: '200%' }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
      <span className="relative z-10">{children}</span>
      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
    </motion.button>
  );
};
