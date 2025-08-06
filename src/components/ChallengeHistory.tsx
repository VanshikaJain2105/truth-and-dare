import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Challenge {
  id: string;
  playerName: string;
  type: 'truth' | 'dare';
  task: string;
  timestamp: Date;
}

interface ChallengeHistoryProps {
  challenges: Challenge[];
}

const ChallengeHistory: React.FC<ChallengeHistoryProps> = ({ challenges }) => {
  return (
    <div className="w-80 h-screen bg-black bg-opacity-50 backdrop-blur-md border-l border-white border-opacity-20 overflow-y-auto">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-white mb-6 text-center drop-shadow-lg">
          Challenge History
        </h2>
        
        <AnimatePresence>
          {challenges.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-400 py-8"
            >
              <div className="text-6xl mb-4">🎯</div>
              <p className="text-lg">No challenges yet!</p>
              <p className="text-sm mt-2">Spin the bottle to start the game</p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {challenges.map((challenge, index) => (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="backdrop-blur-sm bg-white bg-opacity-10 rounded-xl p-4 border border-white border-opacity-20 shadow-lg"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      challenge.type === 'truth' 
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' 
                        : 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
                    }`}>
                      {challenge.type === 'truth' ? '🤔 Truth' : '🔥 Dare'}
                    </span>
                    <span className="text-xs text-gray-400">
                      {challenge.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  
                  <h3 className="text-white font-semibold mb-2 text-sm">
                    {challenge.playerName}
                  </h3>
                  
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {challenge.task}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ChallengeHistory; 