import { motion } from 'framer-motion';
import BoardCell from '@/components/molecules/BoardCell';

const GameBoard = ({ 
  board, 
  players, 
  playerPositions, 
  highlightedCell,
  onCellClick 
}) => {
  // Create 10x10 grid in snake pattern (right-to-left on even rows)
  const createGrid = () => {
    const grid = [];
    for (let row = 9; row >= 0; row--) {
      const currentRow = [];
      
      if (row % 2 === 1) {
        // Odd rows: left to right (1-10, 21-30, etc.)
        for (let col = 0; col < 10; col++) {
          const cellNumber = row * 10 + col + 1;
          currentRow.push(cellNumber);
        }
      } else {
        // Even rows: right to left (11-20, 31-40, etc.)
        for (let col = 9; col >= 0; col--) {
          const cellNumber = row * 10 + col + 1;
          currentRow.push(cellNumber);
        }
      }
      
      grid.push(currentRow);
    }
    return grid;
  };

  const grid = createGrid();

  const getPlayersOnCell = (cellNumber) => {
    return players.filter((player, index) => 
      playerPositions[index] === cellNumber
    );
  };

  const getCellData = (cellNumber) => {
    return board.find(cell => cell.number === cellNumber) || {
      number: cellNumber,
      type: 'normal',
      connectsTo: null
    };
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-6">
      <motion.div
        className="grid grid-cols-10 gap-1 aspect-square max-w-2xl mx-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cellNumber, colIndex) => {
            const cellData = getCellData(cellNumber);
            const playersOnCell = getPlayersOnCell(cellNumber);
            const isHighlighted = highlightedCell === cellNumber;

            return (
              <motion.div
                key={cellNumber}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: (rowIndex * 10 + colIndex) * 0.01,
                  duration: 0.3 
                }}
                className="aspect-square"
              >
                <BoardCell
                  cell={cellData}
                  players={playersOnCell}
                  isHighlighted={isHighlighted}
                  onClick={() => onCellClick && onCellClick(cellNumber)}
                />
              </motion.div>
            );
          })
        )}
      </motion.div>

      {/* Legend */}
      <div className="mt-6 flex justify-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-success/20 rounded border"></div>
          <span>Ladder</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-error/20 rounded border"></div>
          <span>Snake</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-accent/30 rounded border"></div>
          <span>Finish</span>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;