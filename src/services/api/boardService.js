import boardData from '../mockData/board.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class BoardService {
  constructor() {
    this.board = [...boardData];
  }

  async getAll() {
    await delay(200);
    return [...this.board];
  }

  async getCellByNumber(number) {
    await delay(100);
    const cell = this.board.find(c => c.number === number);
    return cell ? { ...cell } : null;
  }

  async getSnakesAndLadders() {
    await delay(200);
    return this.board.filter(cell => cell.connectsTo !== null);
  }
}

export default new BoardService();