
export interface BingoCellData {
  id: string;
  text: string;
  isCompleted: boolean;
  isFree: boolean;
}

export interface BingoState {
  cells: BingoCellData[];
  completedLines: number[][];
  bingoCount: number;
  progress: number;
}
