
import React from 'react';
import { BingoCellData } from '../types';

interface BingoCellProps {
  cell: BingoCellData;
  isHighlighted: boolean;
  onToggle: () => void;
}

const BingoCell: React.FC<BingoCellProps> = ({ cell, isHighlighted, onToggle }) => {
  const { text, isCompleted, isFree } = cell;

  // Minecraft-inspired styling adjusted for light theme
  const baseClasses = "relative aspect-square p-1 sm:p-2 flex items-center justify-center text-center text-[10px] sm:text-xs md:text-sm font-bold cursor-pointer transition-all duration-200 border-2 select-none overflow-hidden group";
  
  const stateClasses = isCompleted 
    ? "bg-emerald-500 border-emerald-400 text-white shadow-inner" 
    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300";
  
  const highlightClasses = isHighlighted 
    ? "ring-4 ring-amber-400 ring-inset z-10 scale-[1.02] shadow-2xl" 
    : "shadow-sm";

  const freeClasses = isFree 
    ? "text-amber-600 border-amber-200/50 bg-amber-50" 
    : "";

  return (
    <div 
      className={`${baseClasses} ${stateClasses} ${highlightClasses} ${freeClasses}`}
      onClick={onToggle}
    >
      {/* Texture Overlay (Light grain) */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      
      <span className="relative z-10 leading-tight">
        {text}
      </span>

      {isCompleted && !isFree && (
        <div className="absolute top-1 right-1 sm:top-2 sm:right-2 text-white/80 animate-bounce">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}
      
      {isFree && (
        <div className="absolute -bottom-1 -right-1 opacity-10 transform rotate-12">
          <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default BingoCell;
