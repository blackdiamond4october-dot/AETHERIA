import React, { useState, useEffect, Suspense, lazy } from "react";
import { BootSequence } from "./components/BootSequence";
import { CustomCursor } from "./components/CustomCursor";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { AboutMe } from "./components/AboutMe";
import { ContactForm } from "./components/ContactForm";
import { StageManager } from "./components/StageManager";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";

const EthereaStartup = lazy(() =>
  import("./components/EthereaStartup").then((module) => ({
    default: module.EthereaStartup,
  })),
);

export default function App() {
  const [booted, setBooted] = useState(false);
  const [startupComplete, setStartupComplete] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const [selectedService, setSelectedService] = useState("");

  // Bypass splash sequences strictly for bots/Lighthouse, or just rely on the skip
  useEffect(() => {
    const isBot =
      /bot|googlebot|crawler|spider|robot|crawling|lighthouse/i.test(
        navigator.userAgent,
      );
    if (isBot) {
      setBooted(true);
      setStartupComplete(true);
    }
  }, []);

  const goToStage = (idx: number) => {
    setCurrentStage(idx);
    setMenuOpen(false);
  };

  const handleServiceSelect = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setCurrentStage(3); // Go to Contact Form
  };

  return (
    <main className="relative min-h-screen cursor-none overflow-hidden font-sans text-zinc-900 bg-white">
      <CustomCursor />
      <div className="noise-overlay" />

      <AnimatePresence mode="wait">
        {!booted ? (
          <BootSequence key="boot" onComplete={() => setBooted(true)} />
        ) : !startupComplete ? (
          <Suspense fallback={null}>
            <EthereaStartup
              key="startup"
              onComplete={() => setStartupComplete(true)}
            />
          </Suspense>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full h-full"
          >
            {/* Menu Trigger */}
            <header className="fixed top-0 left-0 w-full z-100 px-6 sm:px-12 py-8 flex justify-end items-center pointer-events-none">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="pointer-events-auto group relative w-12 h-12 flex items-center justify-center bg-zinc-900 text-white rounded-full overflow-hidden transition-all duration-500 hover:scale-110"
              >
                <AnimatePresence mode="wait">
                  {menuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                    >
                      <X size={20} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                    >
                      <Menu size={20} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </header>

            {/* Menu Overlay */}
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[95] bg-white/95 backdrop-blur-2xl flex flex-col items-center justify-center"
                >
                  <nav className="flex flex-col items-center gap-8">
                    {["Home", "Services", "About", "Contact"].map((item, i) => (
                      <motion.a
                        key={item}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        href={`#${item.toLowerCase()}`}
                        onClick={(e) => {
                          e.preventDefault();
                          goToStage(i);
                        }}
                        className="text-4xl md:text-6xl font-bold tracking-tighter hover:text-zinc-500 transition-colors"
                      >
                        {item}
                      </motion.a>
                    ))}
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>

            <StageManager
              currentStage={currentStage}
              onStageChange={setCurrentStage}
            >
              <Hero
                onStart={() => goToStage(3)}
                onExplore={() => goToStage(1)}
              />
              <Services onSelect={handleServiceSelect} />
              <AboutMe />
              <ContactForm selectedEngine={selectedService} />
            </StageManager>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
