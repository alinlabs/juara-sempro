import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PresentasiFooterProps {
  currentSlide: number;
  totalSlides: number;
  nextSlide: () => void;
  prevSlide: () => void;
  goToSlide: (index: number) => void;
}

export default function PresentasiFooter({
  currentSlide,
  totalSlides,
  nextSlide,
  prevSlide,
  goToSlide
}: PresentasiFooterProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex justify-between items-center z-30 bg-gradient-to-t from-slate-950/90 via-slate-900/50 to-transparent pointer-events-none">
      <button 
        onClick={prevSlide}
        disabled={currentSlide === 0}
        className={`pointer-events-auto flex items-center justify-center w-12 h-12 sm:w-auto sm:h-auto sm:px-6 sm:py-3 rounded-full sm:rounded-xl font-bold tracking-wide transition-all duration-300 ${
          currentSlide === 0 
            ? 'opacity-0 translate-x-[-20px]' 
            : 'text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95'
        }`}
      >
        <ChevronLeft size={24} className="sm:mr-1" />
        <span className="hidden sm:inline">Sebelumnya</span>
      </button>
      
      {/* Progress Indicator */}
      <div className="pointer-events-auto flex items-center gap-2 sm:gap-3 bg-black/20 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/5">
        {Array.from({ length: totalSlides }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`h-2 sm:h-2.5 rounded-full transition-all duration-500 ${
              idx === currentSlide 
                ? 'bg-white w-8 sm:w-12 shadow-[0_0_10px_rgba(255,255,255,0.8)]' 
                : 'bg-white/20 hover:bg-white/40 w-2 sm:w-2.5'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      <button 
        onClick={nextSlide}
        disabled={currentSlide === totalSlides - 1}
        className={`pointer-events-auto flex items-center justify-center w-12 h-12 sm:w-auto sm:h-auto sm:px-6 sm:py-3 rounded-full sm:rounded-xl font-bold tracking-wide transition-all duration-300 ${
          currentSlide === totalSlides - 1 
            ? 'opacity-0 translate-x-[20px]' 
            : 'text-slate-900 bg-white hover:bg-slate-100 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:scale-105 active:scale-95'
        }`}
      >
        <span className="hidden sm:inline">Selanjutnya</span>
        <ChevronRight size={24} className="sm:ml-1" />
      </button>
    </div>
  );
}
