import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import Button from '@/components/atoms/Button';
import Dice from '@/components/atoms/Dice';
import PlayerStatus from '@/components/molecules/PlayerStatus';
import ApperIcon from '@/components/ApperIcon';

const GameControls = ({ 
  gameState, 
  onStartGame, 
  onRollDice, 
  onNewGame,
  isRolling,
  diceValue 
}) => {
  const [showNewGameConfirm, setShowNewGameConfirm] = useState(false);

  const handleNewGame = () => {
    if (gameState.gameStatus === 'playing') {
      setShowNewGameConfirm(true);
    } else {
      onNewGame();
    }
  };

  const confirmNewGame = () => {
    onNewGame();
    setShowNewGameConfirm(false);
    toast.success('New game started!');
  };

  const getCurrentPlayer = () => {
    if (!gameState.players || gameState.players.length === 0) return null;
    return gameState.players[gameState.currentPlayer];
  };

  const getWinner = () => {
    if (gameState.gameStatus !== 'won' || !gameState.players) return null;
    return gameState.players[gameState.winner];
  };

  const canRollDice = () => {
    const currentPlayer = getCurrentPlayer();
    return gameState.gameStatus === 'playing' && 
           currentPlayer && 
           !currentPlayer.isAI && 
           !isRolling;
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 space-y-6">
      {/* Game Title */}
      <div className="text-center">
        <h1 className="text-3xl font-display text-primary mb-2">Ladder Rush</h1>
        <p className="text-gray-600">Race to reach square 100!</p>
      </div>

      {/* Game Status */}
      {gameState.gameStatus === 'waiting' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <ApperIcon name="Play" className="w-16 h-16 text-accent mx-auto" />
          <h2 className="text-xl font-semibold text-gray-900">Ready to Play?</h2>
          <p className="text-gray-600">Start a new game to begin your adventure!</p>
          <Button onClick={onStartGame} size="large">
            Start Game
          </Button>
        </motion.div>
      )}

      {/* Playing State */}
      {gameState.gameStatus === 'playing' && (
        <div className="space-y-6">
          {/* Current Turn */}
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              {getCurrentPlayer()?.name}'s Turn
            </h2>
            {getCurrentPlayer()?.isAI ? (
              <p className="text-gray-600">AI is thinking...</p>
            ) : (
              <p className="text-gray-600">Roll the dice to move!</p>
            )}
          </div>

          {/* Dice */}
          <div className="flex justify-center">
            <Dice
              value={diceValue}
              isRolling={isRolling}
              onRoll={onRollDice}
              disabled={!canRollDice()}
            />
          </div>

          {/* Last Roll */}
          {gameState.lastDiceRoll && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <p className="text-sm text-gray-600">Last roll:</p>
              <p className="text-2xl font-bold text-primary">
                {gameState.lastDiceRoll}
              </p>
            </motion.div>
          )}

          {/* Turn Count */}
          <div className="text-center text-sm text-gray-500">
            Turn {gameState.turnCount + 1}
          </div>
        </div>
      )}

      {/* Win State */}
      {gameState.gameStatus === 'won' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-4"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <ApperIcon name="Trophy" className="w-16 h-16 text-accent mx-auto" />
          </motion.div>
          <h2 className="text-2xl font-bold text-success">
            🎉 {getWinner()?.name} Wins! 🎉
          </h2>
          <p className="text-gray-600">
            Completed in {gameState.turnCount} turns
          </p>
          
          {/* Confetti animation */}
          <div className="relative overflow-hidden h-20">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-accent rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '100%'
                }}
                animate={{
                  y: [-100, -200],
                  rotate: [0, 360],
                  opacity: [1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Player Status */}
      {gameState.players && gameState.players.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">Players</h3>
          {gameState.players.map((player, index) => (
            <PlayerStatus
              key={player.id}
              player={player}
              position={gameState.playerPositions[index]}
              isCurrentTurn={gameState.currentPlayer === index && gameState.gameStatus === 'playing'}
              isWinner={gameState.gameStatus === 'won' && gameState.winner === index}
            />
          ))}
        </div>
      )}

      {/* Game Actions */}
      <div className="flex justify-center space-x-3">
        <Button 
          onClick={handleNewGame}
          variant="outline"
        >
          New Game
        </Button>
      </div>

      {/* New Game Confirmation Modal */}
      <AnimatePresence>
        {showNewGameConfirm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setShowNewGameConfirm(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Start New Game?
                </h3>
                <p className="text-gray-600 mb-4">
                  This will end the current game. Are you sure?
                </p>
                <div className="flex justify-end space-x-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowNewGameConfirm(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={confirmNewGame}>
                    Start New Game
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GameControls;