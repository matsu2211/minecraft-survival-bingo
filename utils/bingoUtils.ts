
import { BingoCellData } from '../types';

export const shuffle = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const generateBingoCells = (tasks: string[]): BingoCellData[] => {
  const shuffledTasks = shuffle(tasks).slice(0, 24); // 24 tasks + 1 FREE
  const cells: BingoCellData[] = [];

  for (let i = 0; i < 25; i++) {
    if (i === 12) {
      cells.push({
        id: 'free',
        text: 'FREE',
        isCompleted: true,
        isFree: true,
      });
    } else {
      const taskIndex = i > 12 ? i - 1 : i;
      cells.push({
        id: `cell-${i}`,
        text: shuffledTasks[taskIndex],
        isCompleted: false,
        isFree: false,
      });
    }
  }

  return cells;
};

export const getBingoLines = (cells: BingoCellData[]): number[][] => {
  const lines: number[][] = [];

  // Rows
  for (let i = 0; i < 5; i++) {
    const row = [i * 5, i * 5 + 1, i * 5 + 2, i * 5 + 3, i * 5 + 4];
    if (row.every((idx) => cells[idx].isCompleted)) {
      lines.push(row);
    }
  }

  // Columns
  for (let i = 0; i < 5; i++) {
    const col = [i, i + 5, i + 10, i + 15, i + 20];
    if (col.every((idx) => cells[idx].isCompleted)) {
      lines.push(col);
    }
  }

  // Diagonals
  const diag1 = [0, 6, 12, 18, 24];
  if (diag1.every((idx) => cells[idx].isCompleted)) {
    lines.push(diag1);
  }

  const diag2 = [4, 8, 12, 16, 20];
  if (diag2.every((idx) => cells[idx].isCompleted)) {
    lines.push(diag2);
  }

  return lines;
};
