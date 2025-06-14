import { motion } from 'framer-motion';
import { useState } from 'react';

const Dice = ({ value, isRolling, onRoll, disabled }) => {
  const [key, setKey] = useState(0);

  const handleRoll = () => {
    if (!disabled && !isRolling) {
      setKey(prev => prev + 1);
      onRoll();
    }
  };

  const getDiceFace = (num) => {
    const dots = {
      1: [[2, 2]],
      2: [[1, 1], [3, 3]],
      3: [[1, 1], [2, 2], [3, 3]],
      4: [[1, 1], [1, 3], [3, 1], [3, 3]],
      5: [[1, 1], [1, 3], [2, 2], [3, 1], [3, 3]],
      6: [[1, 1], [1, 2], [1, 3], [3, 1], [3, 2], [3, 3]]
    };
    
    return dots[num] || dots[1];
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <motion.div
        key={key}
        animate={isRolling ? { 
          rotateX: [0, 90, 180, 270, 360], 
          rotateY: [0, 90, 180, 270, 360] 
        } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`
          w-16 h-16 bg-white border-2 border-gray-300 rounded-lg shadow-lg 
          cursor-pointer flex items-center justify-center relative
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'}
        `}
        onClick={handleRoll}
        whileHover={!disabled && !isRolling ? { scale: 1.1 } : {}}
        whileTap={!disabled && !isRolling ? { scale: 0.95 } : {}}
      >
        <div className="grid grid-cols-3 grid-rows-3 w-12 h-12 gap-1">
          {Array.from({ length: 9 }, (_, i) => {
            const row = Math.floor(i / 3) + 1;
            const col = (i % 3) + 1;
            const shouldShow = value && getDiceFace(value).some(([r, c]) => r === row && c === col);
            
            return (
              <div
                key={i}
                className={`
                  w-2 h-2 rounded-full transition-all duration-200
                  ${shouldShow ? 'bg-gray-800' : 'bg-transparent'}
                `}
              />
            );
          })}
        </div>
      </motion.div>
      
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <button
          onClick={handleRoll}
          disabled={disabled || isRolling}
          className={`
            px-6 py-2 bg-primary text-white rounded-lg font-medium shadow-lg
            transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
            ${disabled || isRolling ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/90'}
          `}
        >
          {isRolling ? 'Rolling...' : 'Roll Dice'}
        </button>
      </motion.div>
    </div>
  );
};

export default Dice;