import React, { useEffect, useState } from 'react';
import { motion, useInView, animate } from 'motion/react';
import { Layout, Globe, Smartphone, CreditCard, Cpu, Layers, Zap, ShieldCheck, Code, Globe2, Clock, MessageSquare } from 'lucide-react';

const stats = [
  { icon: Code, value: 100, suffix: "+", label: "Projects Completed" },
  { icon: Globe2, value: 50, suffix: "+", label: "Global Clients" },
  { icon: Clock, value: 3, suffix: "+", label: "Years Experience" },
  { icon: MessageSquare, value: 24, suffix: "h", label: "Support Available" },
];

const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => setCount(Math.floor(latest)),
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
      {count}{suffix}
    </span>
  );
};

const services = [
  { icon: CreditCard, title: "Billing System", desc: "Complex financial architectures and automated invoicing engines." },
  { icon: Globe, title: "Custom Website", desc: "High-end corporate presences with cinematic digital storytelling." },
  { icon: Layout, title: "Web Apps", desc: "Interactive, scalable cloud platforms built for heavy performance." },
  { icon: Smartphone, title: "Mobile Apps", desc: "Native mobile experiences for global iOS and Android deployment." },
  { icon: Cpu, title: "AI Systems", desc: "Next-gen LLM and neural network implementations for business intelligence." },
  { icon: Layers, title: "SaaS Platforms", desc: "Resilient architectures built for unlimited user scalability." },
  { icon: Zap, title: "Automation", desc: "Fluid workflow systems that eliminate operational friction." },
  { icon: ShieldCheck, title: "Management", desc: "Bespoke business management platforms tailored to your flow." },
  { icon: Code, title: "Desktop Apps", desc: "High-performance native software for macOS and Windows systems." },
  { icon: Globe2, title: "E-Commerce", desc: "Premium digital storefronts with integrated payment ecosystems." },
  { icon: Clock, title: "Legacy Migration", desc: "Transitioning outdated systems into modern cloud-native stacks." },
  { icon: MessageSquare, title: "Consultancy", desc: "Expert architectural guidance for complex software projects." },
];

export const Services = ({ onSelect }: { onSelect?: (title: string) => void }) => {
  return (
    <div className="relative w-full h-full bg-zinc-950 flex flex-col items-center justify-start px-6 py-32 overflow-y-auto">
      {/* Cinematic Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/_Ultra_dark_background,_deep_matte_202605161221.jpeg" 
          alt="Deep matte dark background representing technical expertise and high-end software solutions offered by Etherea" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        {/* Luxury Dark/Glass Overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-linear-to-b from-black via-transparent to-black/90" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="max-w-7xl w-full relative z-10"
      >
        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-12 h-12 bg-white/5 text-white rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 border border-white/10">
                <stat.icon size={20} strokeWidth={1.5} />
              </div>
              <span className="text-4xl md:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-linear-to-r from-white to-zinc-500">
                <Counter value={stat.value} suffix={stat.suffix} />
              </span>
              <div className="mt-2 text-[10px] uppercase tracking-[0.3em] text-white font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mb-20 text-center max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white flex justify-center gap-[2px]">
            {"Services".split('').map((char, i) => (
              <motion.span 
                key={i} 
                whileHover={{ color: "#06b6d4", scale: 1.2 }}
                className="inline-block transition-colors duration-300"
              >
                {char}
              </motion.span>
            ))}
          </h2>
          <p className="text-white font-light italic">Precision engineered solutions for modern brands.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -50, y: 50 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ 
                duration: 1,
                delay: i * 0.05,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="glass-card group p-8 rounded-3xl relative overflow-hidden transition-all duration-500 hover:translate-y-[-8px] border border-white/5 hover:border-cyan-500/30 bg-zinc-900/40 cursor-pointer"
              onClick={() => onSelect?.(item.title)}
            >
              {/* Card Background Image */}
              <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-30 transition-opacity duration-700">
                <img 
                  src="/_Ultra_dark_background,_deep_matte_202605161221.jpeg" 
                  alt={`Decorative background for ${item.title} service`}
                  className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity text-white z-10">
                 <item.icon size={80} strokeWidth={1} />
              </div>
              
              <div className="relative z-20">
                <div className="w-12 h-12 bg-white text-zinc-900 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow">
                  <item.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white flex flex-wrap gap-[1px]">
                  {item.title.split('').map((char, index) => (
                    <motion.span 
                      key={index} 
                      whileHover={{ color: "#06b6d4", scale: 1.1 }}
                      className="inline-block transition-colors duration-300"
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                  ))}
                </h3>
                <p className="text-white text-sm leading-relaxed font-light opacity-80 group-hover:opacity-100 transition-opacity">
                  {item.desc}
                </p>
              </div>
              
              <div className="absolute bottom-0 left-0 w-full h-1 bg-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 shadow-[0_0_15px_rgba(6,182,212,0.5)] z-30" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
