import playersData from '../mockData/players.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class PlayerService {
  constructor() {
    this.players = [...playersData];
  }

  async getAll() {
    await delay(200);
    return [...this.players];
  }

  async getById(id) {
    await delay(200);
    const player = this.players.find(p => p.id === id);
    return player ? { ...player } : null;
  }

  async create(playerData) {
    await delay(300);
    const newPlayer = {
      ...playerData,
      id: Date.now(),
      position: 0
    };
    this.players.push(newPlayer);
    return { ...newPlayer };
  }

  async update(id, data) {
    await delay(300);
    const index = this.players.findIndex(p => p.id === id);
    if (index !== -1) {
      this.players[index] = { ...this.players[index], ...data };
      return { ...this.players[index] };
    }
    return null;
  }

  async delete(id) {
    await delay(200);
    const index = this.players.findIndex(p => p.id === id);
    if (index !== -1) {
      const deleted = this.players.splice(index, 1)[0];
      return { ...deleted };
    }
    return null;
  }
}

export default new PlayerService();