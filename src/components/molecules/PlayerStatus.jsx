import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const PlayerStatus = ({ 
  player, 
  position, 
  isCurrentTurn = false, 
  isWinner = false 
}) => {
  return (
    <motion.div
      className={`
        bg-white rounded-lg p-4 shadow-lg border-2 transition-all duration-200
        ${isCurrentTurn ? 'border-accent shadow-xl' : 'border-gray-200'}
        ${isWinner ? 'bg-success/10 border-success' : ''}
      `}
      animate={isCurrentTurn ? { scale: 1.05 } : { scale: 1 }}
    >
      <div className="flex items-center space-x-3">
        {/* Player avatar */}
        <div 
          className="w-10 h-10 rounded-full border-2 border-white shadow-lg flex items-center justify-center"
          style={{ backgroundColor: player.color }}
        >
          <span className="text-white font-bold">
            {player.name.charAt(0).toUpperCase()}
          </span>
        </div>

        {/* Player info */}
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold text-gray-900">{player.name}</h3>
            {player.isAI && (
              <ApperIcon name="Bot" className="w-4 h-4 text-gray-500" />
            )}
            {isWinner && (
              <ApperIcon name="Crown" className="w-4 h-4 text-success" />
            )}
          </div>
          <p className="text-sm text-gray-600">Position: {position}</p>
        </div>

        {/* Current turn indicator */}
        {isCurrentTurn && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <ApperIcon name="Play" className="w-5 h-5 text-accent" />
          </motion.div>
        )}
      </div>

      {/* Progress bar */}
      <div className="mt-3">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="h-2 rounded-full transition-all duration-500"
            style={{ backgroundColor: player.color }}
            initial={{ width: '0%' }}
            animate={{ width: `${position}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1 text-center">
          {position}/100
        </p>
      </div>
    </motion.div>
  );
};

export default PlayerStatus;