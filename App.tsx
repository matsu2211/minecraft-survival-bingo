
import React, { useState, useEffect, useCallback } from 'react';
import { BingoState, BingoCellData } from './types';
import { BINGO_TASKS, STORAGE_KEY } from './constants';
import { generateBingoCells, getBingoLines } from './utils/bingoUtils';
import BingoBoard from './components/BingoBoard';

const App: React.FC = () => {
  const [state, setState] = useState<BingoState | null>(null);

  // Initialize or load from storage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed: BingoState = JSON.parse(saved);
        setState(parsed);
      } catch (e) {
        console.error("Failed to parse saved state", e);
        handleReset();
      }
    } else {
      handleReset();
    }
  }, []);

  // Save to storage whenever state changes
  useEffect(() => {
    if (state) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state]);

  const handleReset = useCallback(() => {
    const cells = generateBingoCells(BINGO_TASKS);
    const lines = getBingoLines(cells);
    setState({
      cells,
      completedLines: lines,
      bingoCount: lines.length,
      progress: Math.floor((cells.filter(c => c.isCompleted).length / 25) * 100)
    });
  }, []);

  const handleToggleCell = useCallback((index: number) => {
    setState(prev => {
      if (!prev) return null;
      
      const newCells = [...prev.cells];
      const cell = newCells[index];
      
      // Free cells are always completed
      if (cell.isFree) return prev;

      newCells[index] = { ...cell, isCompleted: !cell.isCompleted };
      
      const lines = getBingoLines(newCells);
      const completedCount = newCells.filter(c => c.isCompleted).length;

      return {
        ...prev,
        cells: newCells,
        completedLines: lines,
        bingoCount: lines.length,
        progress: Math.floor((completedCount / 25) * 100)
      };
    });
  }, []);

  if (!state) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-slate-400 text-xl animate-pulse">Loading Bingo Board...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4 sm:p-8 flex flex-col items-center">
      {/* Header */}
      <header className="w-full max-w-2xl mb-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-black text-emerald-600 tracking-tight mb-2 drop-shadow-sm">
          <span className="text-slate-800 uppercase">Survival Bingo</span>
        </h1>
        <p className="text-slate-500 text-sm sm:text-base font-medium">
          マインクラフトサバイバルビンゴ
        </p>
      </header>

      {/* Stats Section */}
      <div className="w-full max-w-2xl grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl border-b-4 border-emerald-500 shadow-sm text-center">
          <div className="text-slate-400 text-xs uppercase font-bold mb-1">達成数</div>
          <div className="text-2xl font-black text-emerald-600">{state.cells.filter(c => c.isCompleted).length} / 25</div>
        </div>
        <div className="bg-white p-4 rounded-xl border-b-4 border-amber-400 shadow-sm text-center">
          <div className="text-slate-400 text-xs uppercase font-bold mb-1">ビンゴ数</div>
          <div className="text-2xl font-black text-amber-600">{state.bingoCount}</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-2xl bg-slate-200 h-2 rounded-full mb-6 overflow-hidden">
        <div 
          className="bg-emerald-500 h-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(16,185,129,0.2)]"
          style={{ width: `${state.progress}%` }}
        />
      </div>

      {/* Board */}
      <BingoBoard 
        cells={state.cells} 
        completedLines={state.completedLines} 
        onToggleCell={handleToggleCell} 
      />

      {/* Controls */}
      <div className="w-full max-w-2xl mt-8 flex flex-col items-center gap-4">
        <button
          onClick={handleReset}
          className="w-full sm:w-auto px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg border-b-4 border-emerald-800 active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center gap-2 group"
        >
          <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          カードを再生成
        </button>
        <p className="text-slate-400 text-[10px] text-center max-w-md">
          タップしてお題をクリア！ 5つ並べてビンゴを目指そう。<br/>
          中央はFREE枠です。状態は自動的に保存されます。
        </p>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-slate-400 text-[10px] tracking-widest uppercase">
        Minecraft Survival Bingo &bull; v1.0.0
      </footer>
    </div>
  );
};

export default App;
