import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BottleProps } from '../types';

const Bottle: React.FC<BottleProps> = ({ isSpinning, onSpinComplete, players }) => {
  const [rotation, setRotation] = useState(0);
  const [isPlayingSound, setIsPlayingSound] = useState(false);

  useEffect(() => {
    if (isSpinning) {
      // Play spinning sound
      playSpinningSound();
      
      // Generate random rotation (between 720 and 1440 degrees for multiple spins)
      const randomRotation = Math.random() * 720 + 720;
      setRotation(randomRotation);
      
      // Calculate which player the bottle points to
      setTimeout(() => {
        const selectedIndex = Math.floor(Math.random() * players.length);
        const selectedPlayer = players[selectedIndex];
        onSpinComplete(selectedPlayer);
      }, 2000);
    }
  }, [isSpinning, players, onSpinComplete]);

  const playSpinningSound = () => {
    if (!isPlayingSound) {
      setIsPlayingSound(true);
      // Create audio context for spinning sound
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 2);
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 2);
      
      setTimeout(() => setIsPlayingSound(false), 2000);
    }
  };

  return (
    <div className="relative w-32 h-32 mx-auto z-10">
      <AnimatePresence>
        {isSpinning && (
          <motion.div
            className="absolute inset-0 z-5"
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5, repeat: 4 }}
          />
        )}
      </AnimatePresence>
      
      <motion.div
        className="relative w-full h-full z-10"
        animate={{ rotate: isSpinning ? rotation : 0 }}
        transition={{ 
          duration: isSpinning ? 2 : 0,
          ease: "easeOut"
        }}
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1000px'
        }}
      >
        {/* 3D Bottle Container */}
        <div className="relative w-full h-full transform-gpu">
          {/* Bottle body - 3D effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-400 via-green-500 to-emerald-700 rounded-xl shadow-2xl transform rotate-3">
            {/* Bottle highlight */}
            <div className="absolute top-2 left-2 w-8 h-16 bg-gradient-to-b from-white to-transparent opacity-30 rounded-l-lg"></div>
            
            {/* Bottle neck */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-12 bg-gradient-to-b from-green-300 to-green-400 rounded-t-xl shadow-lg">
              {/* Neck highlight */}
              <div className="absolute top-1 left-1 w-2 h-8 bg-gradient-to-b from-white to-transparent opacity-40 rounded-l-sm"></div>
            </div>
            
            {/* Bottle label */}
            <div className="absolute top-12 left-3 right-3 h-10 bg-gradient-to-r from-white to-gray-100 bg-opacity-30 rounded-lg shadow-inner">
              <div className="absolute inset-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded opacity-20"></div>
            </div>
            
            {/* Bottle cap */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-8 h-3 bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-full shadow-lg">
              <div className="absolute top-0.5 left-1 w-4 h-1 bg-gradient-to-r from-yellow-200 to-yellow-300 rounded-full opacity-60"></div>
            </div>
          </div>
          
          {/* Bottle pointer (the part that points to players) */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-20 bg-gradient-to-b from-red-400 to-red-600 rounded-full origin-bottom shadow-lg">
            {/* Pointer tip */}
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-red-500"></div>
            {/* Pointer highlight */}
            <div className="absolute top-1 left-0.5 w-1 h-16 bg-gradient-to-b from-red-200 to-transparent rounded-full opacity-60"></div>
          </div>
        </div>
      </motion.div>
      
      {/* Enhanced glow effect when spinning */}
      <AnimatePresence>
        {isSpinning && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-xl opacity-30 blur-sm z-5"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: [0, 0.4, 0],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{ duration: 2 }}
          />
        )}
      </AnimatePresence>
      
      {/* Particle effect when spinning */}
      <AnimatePresence>
        {isSpinning && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                style={{
                  left: `${50 + Math.cos(i * Math.PI / 4) * 60}%`,
                  top: `${50 + Math.sin(i * Math.PI / 4) * 60}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Bottle; 