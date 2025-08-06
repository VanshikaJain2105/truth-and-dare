import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LandingPageProps {
  onStartGame: (players: { id: string; name: string }[]) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartGame }) => {
  const [playerCount, setPlayerCount] = useState<number>(0);
  const [players, setPlayers] = useState<{ id: string; name: string }[]>([]);
  const [showPlayerInputs, setShowPlayerInputs] = useState(false);

  const handlePlayerCountSubmit = () => {
    if (playerCount >= 2 && playerCount <= 12) {
      const newPlayers = Array.from({ length: playerCount }, (_, index) => ({
        id: (index + 1).toString(),
        name: ''
      }));
      setPlayers(newPlayers);
      setShowPlayerInputs(true);
    }
  };

  const handlePlayerNameChange = (index: number, name: string) => {
    const updatedPlayers = [...players];
    updatedPlayers[index].name = name;
    setPlayers(updatedPlayers);
  };

  const handleStartGame = () => {
    const validPlayers = players.filter(player => player.name.trim() !== '');
    if (validPlayers.length >= 2) {
      onStartGame(validPlayers);
    }
  };

  const canStartGame = players.length >= 2 && players.every(player => player.name.trim() !== '');

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
      {/* Background particles */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-1 h-1 bg-red-400 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-1 h-1 bg-yellow-400 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-10 right-1/3 w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-1500"></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        <AnimatePresence mode="wait">
          {!showPlayerInputs ? (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="text-center"
            >
              {/* Welcome Message */}
              <motion.h1
                className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 mb-8 drop-shadow-[0_0_20px_rgba(0,255,0,0.5)]"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                Welcome to the Game of Truth and Dare
              </motion.h1>
              

              {/* Player Count Input */}
              <motion.div
                className="backdrop-blur-sm bg-white bg-opacity-10 rounded-2xl p-8 border border-white border-opacity-20 shadow-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-white mb-6">
                  How many players?
                </h2>
                
                <div className="flex items-center justify-center gap-4 mb-6">
                  <input
                    type="number"
                    min="2"
                    max="12"
                    value={playerCount || ''}
                    onChange={(e) => setPlayerCount(parseInt(e.target.value) || 0)}
                    className="w-24 h-16 text-center text-3xl font-bold bg-white bg-opacity-20 border-2 border-white border-opacity-30 rounded-xl text-white focus:outline-none focus:border-green-400 transition-colors"
                    placeholder="2-12"
                  />
                  <span className="text-white text-lg">players</span>
                </div>

                <motion.button
                  onClick={handlePlayerCountSubmit}
                  disabled={playerCount < 2 || playerCount > 12}
                  className={`px-8 py-4 rounded-full text-xl font-bold text-white transition-all duration-300 backdrop-blur-sm border-2 ${
                    playerCount >= 2 && playerCount <= 12
                      ? 'bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 border-transparent hover:from-green-600 hover:via-yellow-600 hover:to-red-600 shadow-2xl hover:shadow-green-500/25'
                      : 'bg-gray-500 border-gray-400 cursor-not-allowed'
                  }`}
                  whileHover={playerCount >= 2 && playerCount <= 12 ? { scale: 1.05 } : {}}
                  whileTap={playerCount >= 2 && playerCount <= 12 ? { scale: 0.95 } : {}}
                >
                  Continue
                </motion.button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="player-inputs"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="text-center"
            >
              {/* Player Names Input */}
              <motion.h2
                className="text-4xl font-bold text-white mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Enter Player Names
              </motion.h2>

              <div className="backdrop-blur-sm bg-white bg-opacity-10 rounded-2xl p-8 border border-white border-opacity-20 shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {players.map((player, index) => (
                    <motion.div
                      key={player.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative"
                    >
                      <label className="block text-white font-medium mb-2 text-left">
                        Player {index + 1}
                      </label>
                      <input
                        type="text"
                        value={player.name}
                        onChange={(e) => handlePlayerNameChange(index, e.target.value)}
                        placeholder={`Player ${index + 1} name`}
                        className="w-full p-3 rounded-xl bg-white bg-opacity-20 border-2 border-white border-opacity-30 text-white placeholder-gray-300 focus:outline-none focus:border-green-400 transition-colors"
                      />
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  onClick={handleStartGame}
                  disabled={!canStartGame}
                  className={`px-12 py-6 rounded-full text-2xl font-bold text-white transition-all duration-300 backdrop-blur-sm border-2 ${
                    canStartGame
                      ? 'bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 border-transparent hover:from-green-600 hover:via-yellow-600 hover:to-red-600 shadow-2xl hover:shadow-green-500/25'
                      : 'bg-gray-500 border-gray-400 cursor-not-allowed'
                  }`}
                  whileHover={canStartGame ? { 
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(0, 255, 0, 0.3)"
                  } : {}}
                  whileTap={canStartGame ? { scale: 0.95 } : {}}
                >
                  Let the Fun Begin! 
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LandingPage; 