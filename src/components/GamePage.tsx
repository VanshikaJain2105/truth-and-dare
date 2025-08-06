import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Bottle from './Bottle';
import TaskModal from './TaskModal';
import ChallengeHistory from './ChallengeHistory';
import { Player, Challenge } from '../types';

interface GamePageProps {
  players: Player[];
  onBackToLanding: () => void;
}

const GamePage: React.FC<GamePageProps> = ({ players, onBackToLanding }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'truth' | 'dare' | null>(null);
  const [task, setTask] = useState('');
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [theme, setTheme] = useState<'default' | 'truth' | 'dare'>('default');

  const handleSpinBottle = () => {
    if (players.length < 2) {
      alert('You need at least 2 players to play!');
      return;
    }
    
    setIsSpinning(true);
    setCurrentPlayer(null);
    setShowModal(false);
    setModalType(null);
    setTask('');
  };

  const handleSpinComplete = (selectedPlayer: Player) => {
    setIsSpinning(false);
    setCurrentPlayer(selectedPlayer);
    setShowModal(true);
    setModalType(null);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setModalType(null);
    setTask('');
    setTheme('default');
  };

  const handleTaskChange = (task: string) => {
    setTask(task);
  };

  const handleModalSubmit = () => {
    if (currentPlayer && task && modalType) {
      const newChallenge: Challenge = {
        id: Date.now().toString(),
        playerName: currentPlayer.name,
        type: modalType,
        task: task,
        timestamp: new Date(),
      };
      setChallenges(prev => [newChallenge, ...prev]);
    }
    
    setShowModal(false);
  };

  const handleThemeChange = (type: 'truth' | 'dare') => {
    setTheme(type);
  };

  // Calculate positions for players in a circle
  const getPlayerPosition = (index: number, totalPlayers: number) => {
    const angle = (index * 360) / totalPlayers - 90; // Start from top
    const radius = 280; // Increased distance from center
    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = Math.sin((angle * Math.PI) / 180) * radius;
    return { x, y };
  };

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-500 ${
      theme === 'truth' 
        ? 'bg-gradient-to-br from-green-900 via-green-800 to-green-900' 
        : theme === 'dare'
        ? 'bg-gradient-to-br from-red-900 via-red-800 to-red-900'
        : 'bg-gradient-to-br from-black via-gray-900 to-black'
    }`}>
      {/* Background particles */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-1 h-1 bg-red-400 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-1 h-1 bg-yellow-400 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-10 right-1/3 w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-1500"></div>
      </div>

      <div className="flex h-screen">
        {/* Main Game Area */}
        <div className="flex-1 relative">
          {/* Back Button */}
          <motion.button
            onClick={onBackToLanding}
            className="absolute top-4 left-4 z-30 px-4 py-2 rounded-lg backdrop-blur-sm bg-white bg-opacity-10 border border-white border-opacity-20 text-white hover:bg-opacity-20 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ← Back
          </motion.button>

          {/* Game Title */}
          <motion.h1
            className="absolute top-4 left-1/2 transform -translate-x-1/2 text-3xl font-bold text-white z-20"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Truth & Dare
          </motion.h1>

          {/* Players in Circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            {players.map((player, index) => {
              const position = getPlayerPosition(index, players.length);
              return (
                <motion.div
                  key={player.id}
                  className="absolute z-20"
                  style={{
                    transform: `translate(${position.x}px, ${position.y}px)`,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`backdrop-blur-sm bg-white bg-opacity-10 rounded-xl p-2 border border-white border-opacity-20 shadow-lg text-center min-w-[100px] max-w-[120px] ${
                    currentPlayer?.id === player.id ? 'ring-2 ring-yellow-400 ring-opacity-50' : ''
                  }`}>
                    <div className="text-white font-semibold text-xs">{player.name}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottle in Center */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <Bottle
              isSpinning={isSpinning}
              onSpinComplete={handleSpinComplete}
              players={players}
            />
          </div>

          {/* Spin Button */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <motion.button
              onClick={handleSpinBottle}
              disabled={isSpinning || players.length < 2}
              className={`px-12 py-6 rounded-full text-2xl font-bold text-white transition-all duration-300 backdrop-blur-sm border-2 ${
                isSpinning || players.length < 2
                  ? 'bg-gray-500 border-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 border-transparent hover:from-green-600 hover:via-yellow-600 hover:to-red-600 shadow-2xl hover:shadow-green-500/25'
              }`}
              whileHover={!isSpinning && players.length >= 2 ? { 
                scale: 1.05,
                boxShadow: "0 0 30px rgba(0, 255, 0, 0.3)"
              } : {}}
              whileTap={!isSpinning && players.length >= 2 ? { scale: 0.95 } : {}}
            >
              {isSpinning ? 'Spinning...' : 'Spin the Bottle!'}
            </motion.button>
          </div>

          {/* Current Task Display */}
          <AnimatePresence>
            {currentPlayer && task && !showModal && (
              <motion.div
                className="absolute top-20 left-1/2 transform -translate-x-1/2 backdrop-blur-sm bg-white bg-opacity-10 rounded-2xl p-6 border border-white border-opacity-20 shadow-2xl text-center"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
              >
                <h3 className="text-2xl font-bold text-white mb-2">
                  {currentPlayer.name}'s Challenge
                </h3>
                <div className="text-lg text-gray-200 mb-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mr-2 ${
                    modalType === 'truth' 
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' 
                      : 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
                  }`}>
                    {modalType === 'truth' ? '🤔 Truth' : '🔥 Dare'}
                  </span>
                </div>
                <p className="text-xl text-white font-medium">
                  {task}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Task Modal */}
          <TaskModal
            isOpen={showModal}
            onClose={handleModalClose}
            selectedPlayer={currentPlayer}
            modalType={modalType}
            task={task}
            onTaskChange={handleTaskChange}
            onSubmit={handleModalSubmit}
            onThemeChange={handleThemeChange}
          />
        </div>

        {/* Challenge History Sidebar */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <ChallengeHistory challenges={challenges} />
        </motion.div>
      </div>
    </div>
  );
};

export default GamePage; 