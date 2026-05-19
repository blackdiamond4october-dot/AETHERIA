import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface StageManagerProps {
  children: React.ReactNode[];
}

export const StageManager = ({ children, currentStage, onStageChange }: { children: React.ReactNode[], currentStage: number, onStageChange: (idx: number) => void }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const accumulatedWheel = useRef(0);
  const lastInternalScrollTime = useRef(0);
  const scrollIntents = useRef(0);
  const lastScrollDir = useRef<'up' | 'down' | null>(null);

  const triggerTransition = useCallback((nextIdx: number) => {
    if (isTransitioning || nextIdx < 0 || nextIdx >= children.length) return;
    
    setDirection(nextIdx > currentStage ? 'next' : 'prev');
    setIsTransitioning(true);
    
    // Reset intent trackers
    scrollIntents.current = 0;
    accumulatedWheel.current = 0;
    
    // Simulate cinematic timing
    setTimeout(() => {
      onStageChange(nextIdx);
      setIsTransitioning(false);
    }, 1200); 
  }, [currentStage, children.length, isTransitioning, onStageChange]);

  useEffect(() => {
    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      if (isTransitioning) return;

      const target = e.target as HTMLElement;
      const scrollable = target.closest('.overflow-y-auto');
      const now = Date.now();
      
      const isScrollingDown = e.deltaY > 0;
      const currentDir = isScrollingDown ? 'down' : 'up';

      if (scrollable) {
        const { scrollTop, scrollHeight, clientHeight } = scrollable;
        
        // Check boundaries with some buffer
        const atBottom = scrollTop + clientHeight >= scrollHeight - 3;
        const atTop = scrollTop <= 3;

        // If we are currently scrolling internally, record the time and stay in section
        if ((isScrollingDown && !atBottom) || (!isScrollingDown && !atTop)) {
          lastInternalScrollTime.current = now;
          accumulatedWheel.current = 0;
          scrollIntents.current = 0;
          return;
        }

        // Delay after reaching boundary to prevent accidental transition
        if (now - lastInternalScrollTime.current < 400) {
          accumulatedWheel.current = 0;
          return;
        }
      }

      // Reset intents if direction changed
      if (lastScrollDir.current !== currentDir) {
        scrollIntents.current = 0;
        accumulatedWheel.current = 0;
      }
      lastScrollDir.current = currentDir;

      accumulatedWheel.current += e.deltaY;

      // Each deliberate delta chunk counts as one intent
      if (Math.abs(accumulatedWheel.current) > 100) {
        scrollIntents.current += 1;
        accumulatedWheel.current = 0; 
        
        // Require 2 deliberate scroll "pulses" beyond the boundary
        if (scrollIntents.current >= 2) {
          if (currentDir === 'down') {
            triggerTransition(currentStage + 1);
          } else {
            triggerTransition(currentStage - 1);
          }
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isTransitioning) return;
      
      const deltaY = touchStartY - e.touches[0].clientY;
      const target = e.target as HTMLElement;
      const scrollable = target.closest('.overflow-y-auto');
      
      if (scrollable) {
        const { scrollTop, scrollHeight, clientHeight } = scrollable;
        const atBottom = scrollTop + clientHeight >= scrollHeight - 5;
        const atTop = scrollTop <= 5;
        
        // Let internal scroll handle it if not at boundaries
        if ((deltaY > 0 && !atBottom) || (deltaY < 0 && !atTop)) {
          return;
        }
      }

      // If at boundary, accumulate touch travel as intent
      if (Math.abs(deltaY) > 70) {
        if (deltaY > 0) triggerTransition(currentStage + 1);
        else triggerTransition(currentStage - 1);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [currentStage, isTransitioning, triggerTransition]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-zinc-950">
      <AnimatePresence mode="wait">
        {!isTransitioning && (
          <motion.div
            key={currentStage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            {children[currentStage]}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isTransitioning && (
          <TransitionOverlay 
            direction={direction}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const TransitionOverlay = ({ direction }: { direction: 'next' | 'prev' }) => {
  return (
    <div className="fixed inset-0 z-50 flex pointer-events-none overflow-hidden">
      <motion.div 
        className="w-1/2 h-full bg-zinc-900"
        initial={{ y: "-100%" }}
        animate={{ y: 0 }}
        exit={{ y: "-100%" }}
        transition={{ duration: 0.8, ease: [0.85, 0, 0.15, 1] }}
      />
      <motion.div 
        className="w-1/2 h-full bg-zinc-900"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.8, ease: [0.85, 0, 0.15, 1] }}
      />
      <motion.div
        className="absolute inset-0 bg-white/10 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
    </div>
  );
};
