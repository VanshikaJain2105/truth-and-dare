import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TaskModalProps } from '../types';

const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  selectedPlayer,
  modalType,
  task,
  onTaskChange,
  onSubmit,
  onThemeChange
}) => {
  const [localTask, setLocalTask] = useState(task);
  const [localModalType, setLocalModalType] = useState<'truth' | 'dare' | null>(modalType);

  const handleSubmit = () => {
    onTaskChange(localTask);
    onSubmit();
  };

  const handleClose = () => {
    setLocalTask('');
    setLocalModalType(null);
    onClose();
  };

  const handleTypeSelect = (type: 'truth' | 'dare') => {
    setLocalModalType(type);
    onThemeChange(type);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />
          
          {/* Modal */}
          <motion.div
            className="relative w-full max-w-md glass rounded-2xl p-6 shadow-2xl"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Header */}
            <div className="text-center mb-6">
              <motion.h2
                className="text-2xl font-bold text-white mb-2"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {selectedPlayer?.name} was selected!
              </motion.h2>
              
              <motion.div
                className="text-lg text-gray-200"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Choose their fate:
              </motion.div>
            </div>
            
            {/* Truth or Dare buttons */}
            <motion.div
              className="flex gap-4 mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <button
                onClick={() => handleTypeSelect('truth')}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                  localModalType === 'truth'
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50'
                    : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
                }`}
              >
                <span className="text-lg">🤔</span>
                <span className="ml-2">Truth</span>
              </button>
              
              <button
                onClick={() => handleTypeSelect('dare')}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                  localModalType === 'dare'
                    ? 'bg-red-500 text-white shadow-lg shadow-red-500/50'
                    : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
                }`}
              >
                <span className="text-lg">🔥</span>
                <span className="ml-2">Dare</span>
              </button>
            </motion.div>
            
            {/* Task input */}
            <motion.div
              className="mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-white font-medium mb-2">
                {localModalType === 'truth' ? 'Ask a question:' : 'Give them a challenge:'}
              </label>
              <textarea
                value={localTask}
                onChange={(e) => setLocalTask(e.target.value)}
                placeholder={localModalType === 'truth' 
                  ? "What's your deepest secret?" 
                  : "Do 10 push-ups!"
                }
                className="w-full p-3 rounded-lg bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={3}
              />
            </motion.div>
            
            {/* Submit button */}
            <motion.button
              onClick={handleSubmit}
              disabled={!localTask.trim() || !localModalType}
              className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                localTask.trim() && localModalType
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl'
                  : 'bg-gray-500 text-gray-300 cursor-not-allowed'
              }`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={localTask.trim() && localModalType ? { scale: 1.02 } : {}}
              whileTap={localTask.trim() && localModalType ? { scale: 0.98 } : {}}
            >
              Submit Challenge
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TaskModal; 