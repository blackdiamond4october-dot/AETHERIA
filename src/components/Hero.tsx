import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LuxuryButton } from './LuxuryButton';
import { Magnetic } from './Magnetic';

const directions = [
  { x: 0, y: -50 }, // top
  { x: 0, y: 50 },  // bottom
  { x: -50, y: 0 }, // left
  { x: 50, y: 0 }   // right
];

const AnimatedWord = ({ word, delay = 0, scaleStart = 0.8, className = "", isHovered = false }: { word: string, delay?: number, scaleStart?: number, className?: string, isHovered?: boolean }) => {
  return (
    <span className={`inline-flex ${className}`}>
      {word.split('').map((char, i) => {
        const dir = directions[i % 4];
        // Special logic for 2nd 'i' in "Engineering"
        // In "Engineering", indices of 'i' are 3 and 8.
        const isSecondI = word.toLowerCase() === "engineering" && i === 8;

        return (
          <motion.span
            key={i}
            initial={{ 
              opacity: 0, 
              x: dir.x, 
              y: dir.y,
              scale: scaleStart,
              rotateX: 0
            }}
            animate={{ 
              opacity: 1, 
              x: 0, 
              y: 0, 
              scale: 1,
              rotateX: isHovered ? 360 : (isSecondI ? [0, 360] : 0)
            }}
            transition={{
              rotateX: isHovered 
                ? { duration: 0.8, delay: i * 0.04, ease: "easeInOut" }
                : (isSecondI ? {
                    delay: delay + (i * 0.05) + 1.5,
                    duration: 1,
                    repeat: Infinity,
                    repeatDelay: 1,
                    ease: "easeInOut"
                  } : { duration: 0 }),
              default: { 
                duration: 1.2, 
                delay: delay + (i * 0.05),
                ease: [0.16, 1, 0.3, 1]
              }
            }}
            whileHover={{ 
              color: "#06b6d4", // Cyan-500
              scale: 1.1,
              transition: { duration: 0.2 }
            }}
            className="inline-block py-2 transition-colors duration-300" 
            style={{ transformStyle: "preserve-3d" }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        );
      })}
    </span>
  );
};

export const Hero = ({ onStart, onExplore }: { onStart?: () => void, onExplore?: () => void }) => {
  const [isHoveredEngineering, setIsHoveredEngineering] = React.useState(false);
  const [isHoveredFuture, setIsHoveredFuture] = React.useState(false);

  const [hoveredButton, setHoveredButton] = React.useState<string | null>(null);

  const heroFacts: Record<string, string> = {
    start: "Average setup time: < 24h",
    explore: "12+ Specialized Architecture Engines"
  };

  return (
    <section className="relative w-full h-full flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      {/* Cinematic Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/A_breathtaking_rooftop_perspective_photograph_202605151324.jpeg" 
          alt="Breathtaking rooftop perspective of modern architecture representing Etherea's high-end digital agency capabilities" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        {/* Luxury White/Glass Overlay */}
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-linear-to-b from-white/20 via-transparent to-white" />
      </div>

      {/* Background Accents */}
      <div className="cinematic-glow -top-40 -left-40 w-[800px] h-[800px] z-1" />
      <div className="cinematic-glow -bottom-40 -right-40 w-[600px] h-[600px] z-1" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl relative z-10"
      >
        <motion.div 
          className="flex items-center justify-center gap-2 mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="w-8 h-8 bg-zinc-900 text-white rounded-lg flex items-center justify-center font-bold text-lg rotate-12">E</div>
          <span className="font-bold tracking-tight text-xl">Etherea</span>
        </motion.div>
        
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[1] text-zinc-900 mb-8 font-sans flex flex-col items-center">
          <span className="sr-only block w-0 h-0 overflow-hidden absolute">Etherea - Premium Digital Agency & High-End Software Engineering</span>
          <div className="flex flex-col items-center select-none" style={{ perspective: "2000px", transformStyle: "preserve-3d" }} aria-hidden="true">
            <div 
              className="overflow-hidden py-1 cursor-pointer"
              onMouseEnter={() => setIsHoveredEngineering(true)}
              onMouseLeave={() => setIsHoveredEngineering(false)}
            >
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <AnimatedWord word="Engineering" delay={0.5} scaleStart={0.8} isHovered={isHoveredEngineering} />
              </motion.div>
            </div>
            <div 
              className="flex gap-4 text-zinc-400 overflow-hidden py-1 cursor-pointer"
              onMouseEnter={() => setIsHoveredFuture(true)}
              onMouseLeave={() => setIsHoveredFuture(false)}
            >
              <motion.div
                className="flex gap-4"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <AnimatedWord word="The" delay={1.5} scaleStart={0.2} isHovered={isHoveredFuture} />
                <AnimatedWord word="Future" delay={1.8} scaleStart={0.2} isHovered={isHoveredFuture} />
              </motion.div>
            </div>
          </div>
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-500 max-w-xl mx-auto mb-12 font-light leading-relaxed">
          We craft custom software architectures and intelligent systems for visionaries who demand excellence.
        </p>
        
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Magnetic strength={0.3}>
              <div 
                onMouseEnter={() => setHoveredButton('start')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <LuxuryButton onClick={onStart}>Start Your Project</LuxuryButton>
              </div>
            </Magnetic>
            <Magnetic strength={0.2}>
              <div 
                onMouseEnter={() => setHoveredButton('explore')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <LuxuryButton variant="secondary" onClick={onExplore}>Explore Services</LuxuryButton>
              </div>
            </Magnetic>
          </div>
          
          <div className="h-6">
            <AnimatePresence>
              {hoveredButton && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="text-[10px] uppercase tracking-[0.4em] text-cyan-500 font-bold"
                >
                  {heroFacts[hoveredButton]}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Aesthetic Decoration */}
      <div className="absolute left-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-24 items-center">
         <div className="w-[1px] h-32 bg-linear-to-b from-transparent via-zinc-200 to-transparent" />
         <div className="text-[10px] rotate-90 text-zinc-300 uppercase tracking-widest whitespace-nowrap">
            Est. 2024 / London Studio
         </div>
      </div>
    </section>
  );
};
