
import React from 'react';
import { BingoCellData } from '../types';
import BingoCell from './BingoCell';

interface BingoBoardProps {
  cells: BingoCellData[];
  completedLines: number[][];
  onToggleCell: (index: number) => void;
}

const BingoBoard: React.FC<BingoBoardProps> = ({ cells, completedLines, onToggleCell }) => {
  // Check if a specific cell index is part of any completed line
  const isIndexInLine = (index: number) => {
    return completedLines.some(line => line.includes(index));
  };

  return (
    <div className="grid grid-cols-5 gap-1 sm:gap-2 p-1 sm:p-3 bg-slate-200/50 rounded-xl border-4 border-slate-300 shadow-xl w-full max-w-2xl mx-auto">
      {cells.map((cell, index) => (
        <BingoCell
          key={cell.id}
          cell={cell}
          isHighlighted={isIndexInLine(index)}
          onToggle={() => onToggleCell(index)}
        />
      ))}
    </div>
  );
};

export default BingoBoard;
