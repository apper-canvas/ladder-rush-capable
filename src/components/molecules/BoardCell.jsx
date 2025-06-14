import { motion } from 'framer-motion';
import GamePiece from '@/components/atoms/GamePiece';
import ApperIcon from '@/components/ApperIcon';

const BoardCell = ({ 
  cell, 
  players = [], 
  isHighlighted = false,
  onClick 
}) => {
  const getBackgroundColor = () => {
    if (cell.type === 'ladder') return 'bg-success/20';
    if (cell.type === 'snake') return 'bg-error/20';
    if (cell.type === 'finish') return 'bg-accent/30';
    return (cell.number % 2 === 0) ? 'bg-white' : 'bg-gray-50';
  };

  const getBorderColor = () => {
    if (isHighlighted) return 'border-accent border-2';
    return 'border-gray-200 border';
  };

  const getIcon = () => {
    if (cell.type === 'ladder') return <ApperIcon name="ArrowUp" className="w-4 h-4 text-success" />;
    if (cell.type === 'snake') return <ApperIcon name="ArrowDown" className="w-4 h-4 text-error" />;
    if (cell.type === 'finish') return <ApperIcon name="Trophy" className="w-4 h-4 text-accent" />;
    return null;
  };

  return (
    <motion.div
      className={`
        relative w-full h-full ${getBackgroundColor()} ${getBorderColor()}
        rounded-lg flex flex-col items-center justify-center p-1
        transition-all duration-200 cursor-pointer
      `}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      animate={isHighlighted ? { 
        boxShadow: "0 0 20px rgba(255, 230, 109, 0.8)" 
      } : {}}
    >
      {/* Cell number */}
      <div className="absolute top-1 left-1">
        <span className="text-xs font-bold text-gray-600 font-display">
          {cell.number}
        </span>
      </div>

      {/* Snake or Ladder icon */}
      {getIcon() && (
        <div className="absolute top-1 right-1">
          {getIcon()}
        </div>
      )}

      {/* Connection indicator */}
      {cell.connectsTo && (
        <div className="absolute bottom-1 right-1">
          <span className="text-xs text-gray-500">
            →{cell.connectsTo}
          </span>
        </div>
      )}

      {/* Players on this cell */}
      <div className="flex flex-wrap gap-1 items-center justify-center mt-2">
        {players.map((player, index) => (
          <GamePiece 
            key={player.id}
            player={player}
            position={cell.number}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default BoardCell;