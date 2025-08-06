import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCallback } from 'react';
import { loadFull } from 'tsparticles';
import Particles from 'react-tsparticles';
import type { Engine } from 'tsparticles-engine';

interface LoaderProps {
  onComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [showLightning, setShowLightning] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    // Lightning appears first
    setTimeout(() => setShowLightning(true), 500);
    
    // Text animation starts
    setTimeout(() => setShowText(true), 1000);
    
    // Particles start
    setTimeout(() => setShowParticles(true), 1200);
    
    // Complete after 4 seconds
    setTimeout(() => {
      onComplete();
    }, 4000);
  }, [onComplete]);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const greenParticles = {
    particles: {
      number: { value: 100, density: { enable: true, value_area: 800 } },
      color: { value: "#00ff00" },
      shape: { type: "circle" },
      opacity: { value: 0.6, random: true },
      size: { value: 2, random: true },
      move: {
        enable: true,
        speed: 1,
        direction: "none" as const,
        random: true,
        straight: false,
        out_mode: "bounce" as const
      },
      line_linked: {
        enable: false
      }
    },
    interactivity: {
      detect_on: "canvas" as const,
      events: {
        onhover: { enable: false },
        onclick: { enable: false },
        resize: true
      }
    },
    retina_detect: true
  };

  const redParticles = {
    particles: {
      number: { value: 100, density: { enable: true, value_area: 800 } },
      color: { value: "#ff0000" },
      shape: { type: "circle" },
      opacity: { value: 0.6, random: true },
      size: { value: 2, random: true },
      move: {
        enable: true,
        speed: 1,
        direction: "none" as const,
        random: true,
        straight: false,
        out_mode: "bounce" as const
      },
      line_linked: {
        enable: false
      }
    },
    interactivity: {
      detect_on: "canvas" as const,
      events: {
        onhover: { enable: false },
        onclick: { enable: false },
        resize: true
      }
    },
    retina_detect: true
  };

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden">
      {/* Lightning Symbol - Center */}
      <AnimatePresence>
        {showLightning && (
          <motion.div
            className="absolute z-30"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1.2, 1],
              opacity: [0, 1, 0.9]
            }}
            transition={{ 
              duration: 0.8,
              times: [0, 0.3, 1]
            }}
          >
            <div className="text-8xl md:text-9xl text-yellow-400 drop-shadow-[0_0_20px_rgba(255,255,0,0.8)] animate-pulse">
              ⚡
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Text Container - Slides from center */}
      <div className="relative z-20 flex items-center justify-center w-full">
        {/* Truth - Slides from center to left of bolt */}
        <AnimatePresence>
          {showText && (
            <motion.div
              className="absolute"
              initial={{ x: 0, opacity: 0, scale: 0.8 }}
              animate={{ 
                x: '-180px', 
                opacity: 1, 
                scale: 1,
                transition: {
                  x: { duration: 1.2, ease: "easeOut" },
                  opacity: { duration: 0.8, ease: "easeOut" },
                  scale: { duration: 1.0, ease: "easeOut" }
                }
              }}
            >
              <h1 className="text-6xl md:text-8xl font-black font-serif text-green-400 drop-shadow-[0_0_10px_rgba(0,255,0,0.8)]">
                Truth
              </h1>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dare - Slides from center to right of bolt */}
        <AnimatePresence>
          {showText && (
            <motion.div
              className="absolute"
              initial={{ x: 0, opacity: 0, scale: 0.8 }}
              animate={{ 
                x: '180px', 
                opacity: 1, 
                scale: 1,
                transition: {
                  x: { duration: 1.2, ease: "easeOut" },
                  opacity: { duration: 0.8, ease: "easeOut" },
                  scale: { duration: 1.0, ease: "easeOut" }
                }
              }}
            >
              <h1 className="text-6xl md:text-8xl font-black text-red-400 drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]" style={{ fontFamily: 'Cinzel, serif', letterSpacing: '0.1em' }}>
                Dare
              </h1>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Full Screen Green Glitter - Left Half */}
      <AnimatePresence>
        {showParticles && (
          <motion.div
            className="absolute left-0 top-0 w-1/2 h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Particles
              id="green-particles"
              init={particlesInit}
              options={greenParticles}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Screen Red Glitter - Right Half */}
      <AnimatePresence>
        {showParticles && (
          <motion.div
            className="absolute right-0 top-0 w-1/2 h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Particles
              id="red-particles"
              init={particlesInit}
              options={redParticles}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Center Glow Effect */}
      <AnimatePresence>
        {showText && (
          <motion.div
            className="absolute z-10"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 0.3, 0],
              scale: [0, 1, 1.5]
            }}
            transition={{ 
              duration: 2,
              delay: 1.5
            }}
          >
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-red-400 rounded-full blur-xl opacity-50"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Loader; 