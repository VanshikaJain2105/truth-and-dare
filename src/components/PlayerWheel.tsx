import React from 'react';
import { motion } from 'framer-motion';
import { PlayerWheelProps } from '../types';

const PlayerWheel: React.FC<PlayerWheelProps> = ({ players, selectedPlayer }) => {
  const getPlayerPosition = (index: number, totalPlayers: number) => {
    const angle = (index * 360) / totalPlayers;
    const radius = 150; // Distance from center
    const x = Math.cos((angle - 90) * Math.PI / 180) * radius;
    const y = Math.sin((angle - 90) * Math.PI / 180) * radius;
    
    return { x, y };
  };

  const getPlayerStyle = (index: number, totalPlayers: number) => {
    const position = getPlayerPosition(index, totalPlayers);
    return {
      transform: `translate(${position.x}px, ${position.y}px)`,
    };
  };

  return (
    <div className="relative w-80 h-80 mx-auto">
      {/* Center circle for bottle placement */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20"></div>
      
      {/* Players positioned around the circle */}
      {players.map((player, index) => {
        const position = getPlayerPosition(index, players.length);
        const isSelected = selectedPlayer?.id === player.id;
        
        return (
          <motion.div
            key={player.id}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={getPlayerStyle(index, players.length)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: isSelected ? 1.2 : 1, 
              opacity: 1,
              y: isSelected ? -5 : 0
            }}
            transition={{ 
              duration: 0.3,
              delay: index * 0.1
            }}
            whileHover={{ scale: 1.1 }}
          >
            <motion.div
              className={`relative w-16 h-16 rounded-full flex items-center justify-center text-white font-semibold text-sm cursor-pointer transition-all duration-300 ${
                isSelected 
                  ? 'bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg shadow-yellow-400/50' 
                  : 'bg-gradient-to-br from-blue-500 to-purple-600 glass'
              }`}
              animate={{
                boxShadow: isSelected 
                  ? '0 0 20px rgba(251, 191, 36, 0.6)' 
                  : '0 4px 15px rgba(0, 0, 0, 0.2)'
              }}
            >
              {/* Player avatar/initial */}
              <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center text-lg font-bold">
                {player.avatar || player.name.charAt(0).toUpperCase()}
              </div>
              
              {/* Player name */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                <span className="text-xs font-medium text-white drop-shadow-lg">
                  {player.name}
                </span>
              </div>
              
              {/* Selection indicator */}
              {isSelected && (
                <motion.div
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="text-white text-xs">🎯</span>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        );
      })}
      
      {/* Connection lines between players (optional) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {players.map((_, index) => {
          const currentPos = getPlayerPosition(index, players.length);
          const nextIndex = (index + 1) % players.length;
          const nextPos = getPlayerPosition(nextIndex, players.length);
          
          return (
            <line
              key={`line-${index}`}
              x1={currentPos.x + 160} // 160 = 80 (half width) + 80 (center offset)
              y1={currentPos.y + 160}
              x2={nextPos.x + 160}
              y2={nextPos.y + 160}
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="1"
            />
          );
        })}
      </svg>
    </div>
  );
};

export default PlayerWheel; 