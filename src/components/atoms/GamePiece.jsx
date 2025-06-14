import { motion } from 'framer-motion';

const GamePiece = ({ 
  player, 
  position, 
  isMoving = false, 
  animationType = 'hop' 
}) => {
  const animations = {
    hop: {
      animate: { y: [0, -8, 0], scale: [1, 1.1, 1] },
      transition: { duration: 0.5, ease: "easeOut" }
    },
    'slide-down': {
      animate: { y: [0, 20, 0], scale: [1, 0.9, 1] },
      transition: { duration: 1, ease: "easeInOut" }
    },
    'climb-up': {
      animate: { y: [0, -20, 0], scale: [1, 1.1, 1] },
      transition: { duration: 1, ease: "easeInOut" }
    }
  };

  return (
    <motion.div
      className="relative flex items-center justify-center"
      animate={isMoving ? animations[animationType].animate : {}}
      transition={isMoving ? animations[animationType].transition : {}}
    >
      <motion.div
        className={`
          w-6 h-6 rounded-full border-2 border-white shadow-lg
          flex items-center justify-center text-xs font-bold text-white
        `}
        style={{ backgroundColor: player.color }}
        whileHover={{ scale: 1.2 }}
        layout
      >
        {player.name.charAt(0).toUpperCase()}
      </motion.div>
      
      {/* Glow effect */}
      <div 
        className="absolute inset-0 rounded-full opacity-30 blur-sm"
        style={{ backgroundColor: player.color }}
      />
    </motion.div>
  );
};

export default GamePiece;