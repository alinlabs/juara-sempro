import React from 'react';
import { Maximize2, Minimize2, X, ZoomIn, ZoomOut } from 'lucide-react';
import PresentasiTimer from './PresentasiTimer';

interface PresentasiHeaderProps {
  currentSlide: number;
  totalSlides: number;
  isFullscreen: boolean;
  toggleFullscreen: () => void;
  exitFullscreen: () => void;
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomReset: () => void;
}

export default function PresentasiHeader({ 
  currentSlide, 
  totalSlides, 
  isFullscreen, 
  toggleFullscreen, 
  exitFullscreen,
  zoom,
  onZoomIn,
  onZoomOut,
  onZoomReset
}: PresentasiHeaderProps) {
  return (
    <div className="absolute top-0 left-0 right-0 p-3 sm:p-6 z-40 pointer-events-none bg-gradient-to-b from-slate-950/90 via-slate-900/50 to-transparent">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        {/* Top Row on Mobile / Left on Desktop */}
        <div className="flex items-center justify-between w-full sm:w-auto gap-2 pointer-events-auto">
          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 bg-white/10 backdrop-blur-md text-white/90 text-xs sm:text-sm font-bold rounded-full uppercase tracking-widest border border-white/20 shadow-lg whitespace-nowrap flex-shrink-0">
              {currentSlide + 1} / {totalSlides}
            </div>
            
            {/* Zoom Controls */}
            <div className="flex items-center bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg overflow-hidden flex-shrink-0">
              <button onClick={onZoomOut} className="p-1.5 sm:p-2 hover:bg-white/20 text-white transition-colors" title="Zoom Out"><ZoomOut size={14} /></button>
              <button onClick={onZoomReset} className="text-white/90 text-[10px] sm:text-xs font-bold px-1 sm:px-2 hover:text-white transition-colors" title="Reset Zoom">{Math.round(zoom * 100)}%</button>
              <button onClick={onZoomIn} className="p-1.5 sm:p-2 hover:bg-white/20 text-white transition-colors" title="Zoom In"><ZoomIn size={14} /></button>
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="flex sm:hidden items-center gap-2 flex-shrink-0">
            <button onClick={toggleFullscreen} className="p-2 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-white/20 transition-all border border-white/20 shadow-lg">
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
            {isFullscreen && (
              <button onClick={exitFullscreen} className="p-2 bg-rose-500/80 backdrop-blur-md text-white rounded-full hover:bg-rose-500 transition-all border border-rose-500/50 shadow-lg">
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Center: Timer */}
        <div className="pointer-events-auto w-full sm:w-auto flex justify-center">
          <PresentasiTimer />
        </div>

        {/* Desktop Actions */}
        <div className="hidden sm:flex items-center gap-2 pointer-events-auto flex-shrink-0">
          <button 
            onClick={toggleFullscreen}
            className="p-2.5 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-white/20 transition-all border border-white/20 shadow-lg hover:scale-105 active:scale-95"
            title={isFullscreen ? "Keluar Layar Penuh" : "Layar Penuh"}
          >
            {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
          {isFullscreen && (
            <button 
              onClick={exitFullscreen}
              className="p-2.5 bg-rose-500/80 backdrop-blur-md text-white rounded-full hover:bg-rose-500 transition-all border border-rose-500/50 shadow-lg hover:scale-105 active:scale-95"
              title="Tutup"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
