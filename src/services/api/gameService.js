import gameStateData from '../mockData/gameState.json';
import { boardService } from '../index.js';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class GameService {
  constructor() {
    this.gameState = { ...gameStateData };
  }

  async getGameState() {
    await delay(200);
    return { ...this.gameState };
  }

  async startNewGame(players) {
    await delay(300);
    this.gameState = {
      currentPlayer: 0,
      playerPositions: players.map(() => 0),
      gameStatus: 'playing',
      turnCount: 0,
      lastDiceRoll: null,
      players: players.map((player, index) => ({
        ...player,
        id: index,
        position: 0
      }))
    };
    return { ...this.gameState };
  }

  async rollDice() {
    await delay(1000); // Animation time
    const roll = Math.floor(Math.random() * 6) + 1;
    this.gameState.lastDiceRoll = roll;
    return roll;
  }

  async movePlayer(playerId, diceRoll) {
    await delay(500);
    const currentPosition = this.gameState.playerPositions[playerId];
    let newPosition = currentPosition + diceRoll;
    
    // Don't go beyond 100
    if (newPosition > 100) {
      newPosition = currentPosition;
    }

    this.gameState.playerPositions[playerId] = newPosition;

    // Check for snakes and ladders
    const boardCell = await boardService.getCellByNumber(newPosition);
    if (boardCell && boardCell.connectsTo !== null) {
      await delay(800); // Animation time for snake/ladder
      this.gameState.playerPositions[playerId] = boardCell.connectsTo;
      newPosition = boardCell.connectsTo;
    }

    // Check win condition
    if (newPosition >= 100) {
      this.gameState.gameStatus = 'won';
      this.gameState.winner = playerId;
    } else {
      // Next player's turn
      this.gameState.currentPlayer = (this.gameState.currentPlayer + 1) % this.gameState.players.length;
      this.gameState.turnCount++;
    }

    return {
      newPosition,
      hadSnakeOrLadder: boardCell && boardCell.connectsTo !== null,
      snakeOrLadder: boardCell ? boardCell.type : null,
      gameState: { ...this.gameState }
    };
  }

  async getAIMove() {
    await delay(1500); // AI thinking time
    return this.rollDice();
  }

  async resetGame() {
    await delay(200);
    this.gameState = { ...gameStateData };
    return { ...this.gameState };
  }
}

export default new GameService();