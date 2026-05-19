import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LuxuryButton } from './LuxuryButton';
import { Send, Terminal, Shield } from 'lucide-react';

export const ContactForm = ({ selectedEngine = '' }: { selectedEngine?: string }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    countryCode: '+92',
    projectEngine: selectedEngine || 'Full Stack Application',
    title: '',
    scope: '',
    currency: 'USD',
    budget: '30',
    customBudget: ''
  });

  // Update engine if prop changes
  React.useEffect(() => {
    if (selectedEngine) {
      setFormData(prev => ({ ...prev, projectEngine: selectedEngine }));
    }
  }, [selectedEngine]);

  const handleSend = () => {
    const finalPhone = formData.phone ? `${formData.countryCode} ${formData.phone}` : 'Not provided';
    const budgetDisplay = formData.budget === 'custom' 
      ? (formData.customBudget ? `${formData.currency} ${formData.customBudget}` : 'Flexible') 
      : `${formData.currency} ${formData.budget}`;
    
    const message = `*Order Form Submission*%0A%0A*Identity:* ${formData.name || 'Anonymous client'}%0A*Email:* ${formData.email || 'Not provided'}%0A*WhatsApp:* ${finalPhone}%0A*Project Vision:* ${formData.title || 'Dynamic Architecture'}%0A*Engine:* ${formData.projectEngine}%0A*Budget:* ${budgetDisplay}%0A%0A*Scope:* ${formData.scope || 'To be discussed'}`;
    
    const whatsappUrl = `https://wa.me/923034008573?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="relative w-full h-full bg-zinc-950 text-zinc-900 flex items-center justify-center p-6 overflow-y-auto pt-32 pb-20">
      {/* Cinematic Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img 
          src="/pexels-k3ithvision-9619530.jpg" 
          alt="Dark architectural background symbolizing secure and premium digital infrastructure for Etherea development projects"
          className="w-full h-full object-cover opacity-40 grayscale-[20%] scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-linear-to-b from-zinc-950 via-transparent to-zinc-950" />
        <div className="absolute inset-0 bg-zinc-950/40 backdrop-blur-sm" />
        
        {/* Scientific Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

    <div className="max-w-4xl w-full relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
           className="mb-16 text-center"
        >
          <h2 className="text-5xl md:text-8xl font-black italic tracking-tighter mb-4 uppercase text-white leading-none">
            Fill your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">order</span>
          </h2>
          
          <h3 className="text-4xl md:text-7xl font-black italic tracking-tighter mb-8 uppercase text-white leading-none">
            SECURE YOUR <span className="text-cyan-500 drop-shadow-[0_0_10px_rgba(6,182,212,0.2)]">PROJECT</span> SLOT
          </h3>
          
          <p className="text-zinc-400 font-mono tracking-widest text-[9px] uppercase mt-4">
            Limited availability — Dedicated support guaranteed.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center mb-10"
        >
          <div className="w-14 h-14 rounded-full border border-zinc-100 flex items-center justify-center mb-6 relative bg-white shadow-xl">
             <div className="w-3 h-3 rounded-full bg-zinc-900" />
             <div className="absolute inset-0 rounded-full border border-cyan-100 animate-ping opacity-20" />
          </div>
          <h3 className="text-[11px] font-mono font-black text-white uppercase tracking-[0.8em] ml-2 mb-2">
            Master Order Protocol
          </h3>
          <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest italic mb-6">
            "Complete this architecture to initialize development"
          </p>
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-white">
              Order <span className="text-cyan-500">Form</span>
            </h2>
            <div className="w-20 h-1 bg-cyan-500 rounded-full" />
          </div>
        </motion.div>

        <motion.form 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="space-y-12 bg-white/90 backdrop-blur-xl p-5 sm:p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border border-white/20 shadow-2xl"
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
            {/* Identity / Name */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-3"
            >
              <label className="text-[10px] font-mono text-zinc-800 uppercase tracking-[0.2em] flex items-center gap-2 font-bold">
                <Terminal size={10} className="text-cyan-500" />
                Identity / Name
              </label>
              <input 
                type="text" 
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl px-6 py-5 focus:outline-none focus:border-cyan-400/50 focus:ring-4 focus:ring-cyan-400/5 transition-all text-zinc-900 placeholder:text-zinc-300 shadow-sm" 
              />
            </motion.div>

            {/* Email Channel */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-3"
            >
              <label className="text-[10px] font-mono text-zinc-800 uppercase tracking-[0.2em] flex items-center gap-2 font-bold">
                <Terminal size={10} className="text-cyan-500" />
                Email Channel
              </label>
              <input 
                type="email" 
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl px-6 py-5 focus:outline-none focus:border-cyan-400/50 focus:ring-4 focus:ring-cyan-400/5 transition-all text-zinc-900 placeholder:text-zinc-300 shadow-sm" 
              />
            </motion.div>

            {/* Whatsapp / Direct with Country Identity */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-3"
            >
              <label className="text-[10px] font-mono text-zinc-800 uppercase tracking-[0.2em] flex items-center gap-2 font-bold">
                <Terminal size={10} className="text-cyan-500" />
                WhatsApp Identity / Number
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative w-full sm:w-auto">
                  <select 
                    value={formData.countryCode}
                    onChange={(e) => setFormData({...formData, countryCode: e.target.value})}
                    className="bg-zinc-50 border border-zinc-100 rounded-2xl px-4 py-5 focus:outline-none focus:border-cyan-400/50 text-zinc-900 text-xs font-mono appearance-none w-full sm:min-w-[140px] shadow-sm cursor-pointer"
                  >
                    <option value="+92">🇵🇰 PK (+92)</option>
                    <option value="+1">🇺🇸 US (+1)</option>
                    <option value="+44">🇬🇧 UK (+44)</option>
                    <option value="+971">🇦🇪 UAE (+971)</option>
                    <option value="+91">🇮🇳 IN (+91)</option>
                    <option value="+61">🇦🇺 AU (+61)</option>
                    <option value="+49">🇩🇪 DE (+49)</option>
                    <option value="+81">🇯🇵 JP (+81)</option>
                    <option value="+86">🇨🇳 CN (+86)</option>
                    <option value="+1">🇨🇦 CA (+1)</option>
                    <option value="+966">🇸🇦 SA (+966)</option>
                    <option value="+33">🇫🇷 FR (+33)</option>
                    <option value="+39">🇮🇹 IT (+39)</option>
                    <option value="+7">🇷🇺 RU (+7)</option>
                    <option value="+55">🇧🇷 BR (+55)</option>
                    <option value="+27">🇿🇦 ZA (+27)</option>
                    <option value="+65">🇸🇬 SG (+65)</option>
                    <option value="+82">🇰🇷 KR (+82)</option>
                    <option value="+34">🇪🇸 ES (+34)</option>
                    <option value="+90">🇹🇷 TR (+90)</option>
                    <option value="+60">🇲🇾 MY (+60)</option>
                    <option value="+62">🇮🇩 ID (+62)</option>
                    <option value="+66">🇹🇭 TH (+66)</option>
                    <option value="+84">🇻🇳 VN (+84)</option>
                    <option value="+31">🇳🇱 NL (+31)</option>
                    <option value="+41">🇨🇭 CH (+41)</option>
                    <option value="+46">🇸🇪 SE (+46)</option>
                    <option value="+47">🇳🇴 NO (+47)</option>
                    <option value="+45">🇩🇰 DK (+45)</option>
                    <option value="+64">🇳🇿 NZ (+64)</option>
                    <option value="+353">🇮🇪 IE (+353)</option>
                    <option value="+43">🇦🇹 AT (+43)</option>
                    <option value="+32">🇧🇪 BE (+32)</option>
                    <option value="+351">🇵🇹 PT (+351)</option>
                    <option value="+30">🇬🇷 GR (+30)</option>
                    <option value="+420">🇨🇿 CZ (+420)</option>
                    <option value="+48">🇵🇱 PL (+48)</option>
                    <option value="+36">🇭🇺 HU (+36)</option>
                    <option value="+40">🇷🇴 RO (+40)</option>
                    <option value="+972">🇮🇱 IL (+972)</option>
                    <option value="+20">🇪🇬 EG (+20)</option>
                    <option value="+234">🇳🇬 NG (+234)</option>
                    <option value="+254">🇰🇪 KE (+254)</option>
                    <option value="+212">🇲🇦 MA (+212)</option>
                    <option value="+52">🇲🇽 MX (+52)</option>
                    <option value="+54">🇦🇷 AR (+54)</option>
                    <option value="+56">🇨🇱 CL (+56)</option>
                    <option value="+57">🇨🇴 CO (+57)</option>
                    <option value="+51">🇵🇪 PE (+51)</option>
                  </select>
                </div>
                <input 
                  type="text" 
                  placeholder="303 400 8573"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="flex-1 bg-zinc-50 border border-zinc-100 rounded-2xl px-6 py-5 focus:outline-none focus:border-cyan-400/50 focus:ring-4 focus:ring-cyan-400/5 transition-all text-zinc-900 placeholder:text-zinc-300 shadow-sm w-full" 
                />
              </div>
            </motion.div>

            {/* Project Engine */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="space-y-3"
            >
              <label className="text-[10px] font-mono text-zinc-800 uppercase tracking-[0.2em] flex items-center gap-2 font-bold">
                <Terminal size={10} className="text-cyan-500" />
                Project Engine
              </label>
              <select 
                value={formData.projectEngine}
                onChange={(e) => setFormData({...formData, projectEngine: e.target.value})}
                className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl px-6 py-5 focus:outline-none focus:border-cyan-400/50 transition-all text-zinc-900 appearance-none shadow-sm cursor-pointer"
              >
                 <option>Billing System</option>
                 <option>Custom Website</option>
                 <option>Web Apps</option>
                 <option>Mobile Apps</option>
                 <option>AI Systems</option>
                 <option>SaaS Platforms</option>
                 <option>Automation</option>
                 <option>Management</option>
                 <option>Desktop Apps</option>
                 <option>E-Commerce</option>
                 <option>Legacy Migration</option>
                 <option>Consultancy</option>
                 <option>Full Stack Application</option>
              </select>
            </motion.div>
          </div>

          {/* Vision / Project Title */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="space-y-3"
          >
            <label className="text-[10px] font-mono text-zinc-800 uppercase tracking-[0.2em] flex items-center gap-2 font-bold">
              <Terminal size={10} className="text-cyan-500" />
              Vision / Project Title
            </label>
            <input 
              type="text" 
              placeholder="e.g. My Awesome Startup Site"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl px-6 py-5 focus:outline-none focus:border-cyan-400/50 focus:ring-4 focus:ring-cyan-400/5 transition-all text-zinc-900 placeholder:text-zinc-300 shadow-sm" 
            />
          </motion.div>

          {/* Development Scope */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="space-y-3"
          >
            <label className="text-[10px] font-mono text-zinc-800 uppercase tracking-[0.2em] flex items-center gap-2 font-bold">
              <Terminal size={10} className="text-cyan-500" />
              Development Scope
            </label>
            <textarea 
              rows={4}
              placeholder="Describe your requirements, features, and target audience..."
              value={formData.scope}
              onChange={(e) => setFormData({...formData, scope: e.target.value})}
              className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl px-6 py-5 focus:outline-none focus:border-cyan-400/50 focus:ring-4 focus:ring-cyan-400/5 transition-all text-zinc-900 placeholder:text-zinc-300 resize-none shadow-sm" 
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Target Launch */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="space-y-3"
            >
              <label className="text-[10px] font-mono text-zinc-800 uppercase tracking-[0.2em] flex items-center gap-2 font-bold">
                <Terminal size={10} className="text-cyan-500" />
                Target Launch
              </label>
              <input 
                type="date"
                className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl px-6 py-5 focus:outline-none focus:border-cyan-400/50 transition-all text-zinc-900 shadow-sm" 
              />
            </motion.div>

            {/* Budget Reservoir / Currency Selection */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 }}
              className="space-y-3"
            >
              <label className="text-[10px] font-mono text-zinc-800 uppercase tracking-[0.2em] flex items-center gap-2 font-bold">
                <Terminal size={10} className="text-cyan-500" />
                Budget Reservoir / Currency
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative w-full sm:w-auto">
                  <select 
                    value={formData.currency}
                    onChange={(e) => setFormData({...formData, currency: e.target.value})}
                    className="bg-zinc-50 border border-zinc-100 rounded-2xl px-4 py-5 focus:outline-none focus:border-cyan-400/50 text-zinc-900 text-xs font-mono appearance-none w-full sm:w-auto sm:min-w-[120px] shadow-sm cursor-pointer"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="PKR">PKR (Rs)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="AED">AED (د.إ)</option>
                    <option value="SAR">SAR (ر.س)</option>
                    <option value="CAD">CAD ($)</option>
                    <option value="AUD">AUD ($)</option>
                    <option value="INR">INR (₹)</option>
                  </select>
                </div>
                <select 
                  value={formData.budget === 'custom' ? 'custom' : formData.budget}
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                  className="flex-1 bg-zinc-50 border border-zinc-100 rounded-2xl px-6 py-5 focus:outline-none focus:border-cyan-400/50 transition-all text-zinc-900 appearance-none shadow-sm cursor-pointer w-full"
                >
                   <option value="30">{formData.currency} 30 - 100</option>
                   <option value="100">{formData.currency} 100 - 300</option>
                   <option value="300">{formData.currency} 300 - 600</option>
                   <option value="600">{formData.currency} 600 - 1,200</option>
                   <option value="1200">{formData.currency} 1,200 - 3,000</option>
                   <option value="3000">{formData.currency} 3,000 - 7,000</option>
                   <option value="7000">{formData.currency} 7,000 - 15,000</option>
                   <option value="15000">{formData.currency} 15,000+</option>
                   <option value="custom">Establish Manual Figure / Write Budget</option>
                </select>
              </div>
              {formData.budget === 'custom' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="pt-2"
                >
                  <input 
                    type="text"
                    placeholder="Enter custom budget amount..."
                    value={formData.customBudget}
                    onChange={(e) => setFormData({...formData, customBudget: e.target.value})}
                    className="w-full bg-zinc-50 border border-cyan-400/30 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-400/50 text-zinc-900 text-sm italic shadow-inner"
                  />
                </motion.div>
              )}
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="pt-12 flex flex-col items-center"
          >
             <LuxuryButton 
               type="submit"
               className="w-full md:w-auto md:px-20 bg-zinc-900 text-white hover:bg-zinc-800 h-16 sm:h-20 text-lg sm:text-xl group relative overflow-hidden"
             >
                <div className="absolute inset-0 bg-cyan-400/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="flex items-center gap-4 relative z-10">
                   Send Message
                   <Send size={20} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
                </span>
             </LuxuryButton>
             <p className="mt-8 text-[9px] uppercase tracking-[0.6em] text-zinc-400 font-mono flex items-center gap-3">
                <span className="w-8 h-px bg-zinc-200" />
                Secure P2P Encrypted Protocol
                <span className="w-8 h-px bg-zinc-200" />
             </p>
          </motion.div>
        </motion.form>
      </div>
    </div>
  );
};
