import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Award, Phone, Mail, FileText, Code2, Cpu } from 'lucide-react';

export const AboutMe = () => {
  const [showFacts, setShowFacts] = React.useState(false);

  const facts = [
    { title: "Architectural Precision", detail: "I treat code like structural engineering — built to last centuries in digital scales." },
    { title: "Bespoke Logic", detail: "Every algorithm is custom-carved to your unique business DNA." },
    { title: "Zero Friction", detail: "My systems aim for 0.0ms perceived latency for elite user flow." },
  ];

  return (
    <div className="relative w-full h-full bg-white text-zinc-900 flex items-center justify-center p-6 overflow-y-auto pt-32 pb-20">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-[-10] overflow-hidden">
        <img 
          src="/Profile_Background.png" 
          alt="High-end architectural foundation showcasing precision engineering and structural integrity for Etherea digital agency"
          className="w-full h-full object-cover opacity-60 grayscale-[10%] scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-linear-to-r from-white via-white/80 to-white/20" />
        <div className="absolute inset-0 bg-linear-to-b from-white via-transparent to-white/90" />
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]" />
      </div>
      
      <div className="max-w-5xl w-full">
        {/* Content */}
        <div className="space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-6 mb-12">
               <div className="h-[1px] w-12 bg-zinc-900" />
               <div className="px-4 py-1 rounded-full bg-zinc-900 text-white text-[10px] uppercase tracking-[0.4em] font-bold">
                 Executive Profile
               </div>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-black">Ready for Deployment</span>
            </div>

            <h3 className="text-2xl font-light text-zinc-400 mb-4 tracking-tight uppercase">Lead Systems Architect</h3>
            
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-10 leading-[0.85] uppercase">
              <div className="overflow-hidden">
                <motion.div 
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-wrap"
                >
                  {"Architecting".split('').map((char, i) => (
                    <motion.span 
                      key={i} 
                      whileHover={{ color: "#06b6d4", scale: 1.1 }}
                      className="inline-block transition-colors duration-300"
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
              <div className="overflow-hidden">
                <motion.div 
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-wrap text-zinc-200 outline-text"
                >
                  {"Complexity".split('').map((char, i) => (
                    <motion.span 
                      key={i} 
                      whileHover={{ color: "#06b6d4", scale: 1.1 }}
                      className="inline-block transition-colors duration-300"
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
              <div className="overflow-hidden">
                <motion.div 
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-wrap italic"
                >
                  {"Into Simplicity.".split('').map((char, i) => (
                    <motion.span 
                      key={i} 
                      whileHover={{ color: "#06b6d4", scale: 1.1 }}
                      className="inline-block transition-colors duration-300"
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </h2>

            <div className="max-w-2xl border-l-2 border-zinc-900 pl-8 ml-2">
              <p className="text-zinc-600 text-xl font-light leading-relaxed">
                With over half a decade in the engineering trenches, I specialize in building resilient full-stack architectures and high-performance systems. My focus is on elite business automation and global-scale digital infrastructure.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="flex items-center gap-2 text-xs uppercase tracking-widest font-black text-zinc-900">
                <Code2 size={14} className="text-cyan-500" />
                Technical Core
              </h4>
              <ul className="space-y-2 text-sm text-zinc-500 font-light">
                {['Real-Time Distributed Systems', 'Custom LLM Integration', 'Fintech & Billing Engines', 'Cloud Native Architecture'].map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + (i * 0.1) }}
                  >
                    • {item}
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="flex items-center gap-2 text-xs uppercase tracking-widest font-black text-zinc-900">
                <Award size={14} className="text-cyan-500" />
                Major Milestones
              </h4>
              <ul className="space-y-2 text-sm text-zinc-500 font-light">
                {['100+ Global Deployments', 'Top-Tier System Reliability', 'Patent-pending UI Paradigms'].map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + (i * 0.1) }}
                  >
                    • {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-zinc-100 flex flex-col gap-8">
            <div className="flex flex-col sm:flex-row gap-8">
              <a href="tel:+923034008573" className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center group-hover:bg-zinc-900 group-hover:border-zinc-900 transition-colors">
                  <Phone size={16} className="text-zinc-400 group-hover:text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-zinc-400">Direct Comms</span>
                  <span className="text-sm font-medium">+92 3034008573</span>
                </div>
              </a>
              <a href="mailto:blackdiamond4october@gmail.com" className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center group-hover:bg-zinc-900 group-hover:border-zinc-900 transition-colors">
                  <Mail size={16} className="text-zinc-400 group-hover:text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-zinc-400">Digital Identity</span>
                  <span className="text-sm font-medium">blackdiamond4october@gmail.com</span>
                </div>
              </a>
            </div>

            <div className="flex flex-col gap-6">
              <button 
                onClick={() => setShowFacts(!showFacts)}
                className="flex items-center gap-6 group w-fit cursor-pointer"
              >
                <div className="px-8 py-4 bg-zinc-900 text-white rounded-full text-xs uppercase tracking-[0.3em] font-black group-hover:bg-cyan-500 transition-colors shadow-xl shadow-zinc-900/10">
                  Connect via WhatsApp
                </div>
                <div className="h-[1px] w-12 bg-zinc-200 group-hover:w-24 transition-all" />
              </button>

              <AnimatePresence>
                {showFacts && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                      {facts.map((fact, i) => (
                        <motion.div 
                          key={i}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100"
                        >
                          <div className="text-[10px] uppercase tracking-widest text-cyan-500 font-black mb-2">{fact.title}</div>
                          <p className="text-xs text-zinc-500 leading-relaxed font-light">{fact.detail}</p>
                        </motion.div>
                      ))}
                    </div>
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="mt-8"
                    >
                      <a 
                        href="https://wa.me/923034008573?text=Hi, I'm interested in working with you. I just read your architectural facts!"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-zinc-900 font-black uppercase text-[10px] tracking-[0.4em] hover:text-cyan-500 transition-colors"
                      >
                         Initialize Chat Protocol →
                      </a>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
