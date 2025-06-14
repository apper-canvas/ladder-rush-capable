import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import GameBoard from '@/components/organisms/GameBoard';
import GameControls from '@/components/organisms/GameControls';
import { gameService, playerService, boardService } from '@/services';

const Game = () => {
  const [gameState, setGameState] = useState({
    currentPlayer: 0,
    playerPositions: [],
    gameStatus: 'waiting',
    turnCount: 0,
    lastDiceRoll: null,
    players: []
  });
  const [board, setBoard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRolling, setIsRolling] = useState(false);
  const [diceValue, setDiceValue] = useState(null);
  const [highlightedCell, setHighlightedCell] = useState(null);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [initialGameState, boardData] = await Promise.all([
          gameService.getGameState(),
          boardService.getAll()
        ]);
        setGameState(initialGameState);
        setBoard(boardData);
      } catch (err) {
        setError(err.message || 'Failed to load game data');
        toast.error('Failed to load game');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // AI turn handler
  useEffect(() => {
    if (gameState.gameStatus === 'playing') {
      const currentPlayer = gameState.players[gameState.currentPlayer];
      if (currentPlayer?.isAI && !isRolling) {
        const aiDelay = setTimeout(async () => {
          await handleRollDice();
        }, 2000);
        return () => clearTimeout(aiDelay);
      }
    }
  }, [gameState.currentPlayer, gameState.gameStatus, isRolling]);

  const handleStartGame = async () => {
    try {
      const players = await playerService.getAll();
      const newGameState = await gameService.startNewGame(players);
      setGameState(newGameState);
      setDiceValue(null);
      setHighlightedCell(null);
      toast.success('Game started! Good luck!');
    } catch (err) {
      toast.error('Failed to start game');
    }
  };

  const handleRollDice = async () => {
    if (isRolling || gameState.gameStatus !== 'playing') return;

    setIsRolling(true);
    try {
      const roll = await gameService.rollDice();
      setDiceValue(roll);
      
      // Move player
      const moveResult = await gameService.movePlayer(gameState.currentPlayer, roll);
      
      // Show movement animation
      setHighlightedCell(moveResult.newPosition);
      
      // Update game state
      setGameState(moveResult.gameState);
      
      // Show snake/ladder messages
      if (moveResult.hadSnakeOrLadder) {
        if (moveResult.snakeOrLadder === 'snake') {
          toast.error(`Oh no! Slid down a snake to position ${moveResult.newPosition}!`);
        } else if (moveResult.snakeOrLadder === 'ladder') {
          toast.success(`Great! Climbed a ladder to position ${moveResult.newPosition}!`);
        }
      }

      // Check for win
      if (moveResult.gameState.gameStatus === 'won') {
        const winner = moveResult.gameState.players[moveResult.gameState.winner];
        toast.success(`🎉 ${winner.name} wins the game! 🎉`);
      }

      // Clear highlight after animation
      setTimeout(() => setHighlightedCell(null), 2000);
      
    } catch (err) {
      toast.error('Failed to roll dice');
    } finally {
      setIsRolling(false);
    }
  };

  const handleNewGame = async () => {
    try {
      await gameService.resetGame();
      const players = await playerService.getAll();
      const newGameState = await gameService.startNewGame(players);
      setGameState(newGameState);
      setDiceValue(null);
      setHighlightedCell(null);
    } catch (err) {
      toast.error('Failed to start new game');
    }
  };

  const handleCellClick = (cellNumber) => {
    // Optional: Show cell information
    const cell = board.find(c => c.number === cellNumber);
    if (cell?.connectsTo) {
      if (cell.type === 'snake') {
        toast.info(`Snake! Goes from ${cell.number} to ${cell.connectsTo}`);
      } else if (cell.type === 'ladder') {
        toast.info(`Ladder! Goes from ${cell.number} to ${cell.connectsTo}`);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-error mb-4">Game Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Game Board */}
          <div className="lg:col-span-2">
            <GameBoard
              board={board}
              players={gameState.players}
              playerPositions={gameState.playerPositions}
              highlightedCell={highlightedCell}
              onCellClick={handleCellClick}
            />
          </div>

          {/* Game Controls */}
          <div className="lg:col-span-1">
            <GameControls
              gameState={gameState}
              onStartGame={handleStartGame}
              onRollDice={handleRollDice}
              onNewGame={handleNewGame}
              isRolling={isRolling}
              diceValue={diceValue}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;