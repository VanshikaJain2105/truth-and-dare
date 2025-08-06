import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from './components/Loader';
import LandingPage from './components/LandingPage';
import GamePage from './components/GamePage';
import { Player } from './types';

type AppState = 'loader' | 'landing' | 'game';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('loader');
  const [players, setPlayers] = useState<Player[]>([]);

  const handleLoaderComplete = () => {
    setAppState('landing');
  };

  const handleStartGame = (gamePlayers: { id: string; name: string }[]) => {
    setPlayers(gamePlayers);
    setAppState('game');
  };

  const handleBackToLanding = () => {
    setAppState('landing');
  };

  return (
    <AnimatePresence mode="wait">
      {appState === 'loader' && (
        <Loader key="loader" onComplete={handleLoaderComplete} />
      )}
      
      {appState === 'landing' && (
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LandingPage onStartGame={handleStartGame} />
        </motion.div>
      )}
      
      {appState === 'game' && (
        <motion.div
          key="game"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <GamePage players={players} onBackToLanding={handleBackToLanding} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default App;
