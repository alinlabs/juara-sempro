import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Timer, Play, Pause, RotateCcw, Settings, X } from 'lucide-react';

export default function PresentasiTimer() {
  const [time, setTime] = useState(15 * 60);
  const [initialTime, setInitialTime] = useState(15 * 60);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [showTimerSettings, setShowTimerSettings] = useState(false);
  const [customMinutes, setCustomMinutes] = useState('15');
  const countRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isTimerActive && !isTimerPaused) {
      countRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(countRef.current as NodeJS.Timeout);
            setIsTimerActive(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(countRef.current as NodeJS.Timeout);
    }
    return () => clearInterval(countRef.current as NodeJS.Timeout);
  }, [isTimerActive, isTimerPaused]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleTimeChange = (minutes: number) => {
    const newTime = minutes * 60;
    setInitialTime(newTime);
    setTime(newTime);
    setIsTimerActive(false);
    setIsTimerPaused(false);
    setShowTimerSettings(false);
    setCustomMinutes(minutes.toString());
  };

  const handleCustomTimeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mins = parseInt(customMinutes);
    if (!isNaN(mins) && mins > 0) {
      handleTimeChange(mins);
    }
  };

  const isWarning = time <= 120 && time > 0;
  const isDanger = time <= 30 && time > 0;
  const isFinished = time === 0;

  return (
    <div className="relative">
      <div className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 rounded-full backdrop-blur-md border shadow-lg transition-colors duration-300 whitespace-nowrap flex-shrink-0 ${
        isFinished ? 'bg-rose-500/20 border-rose-500/50 text-rose-200' :
        isDanger ? 'bg-rose-500/20 border-rose-500/50 text-rose-200 animate-pulse' :
        isWarning ? 'bg-amber-500/20 border-amber-500/50 text-amber-200' :
        'bg-white/10 border-white/20 text-white/90'
      }`}>
        <Timer size={14} className={isDanger ? 'text-rose-400' : isWarning ? 'text-amber-400' : 'text-indigo-300'} />
        <span className="font-mono font-bold text-xs sm:text-sm tracking-wider w-[40px] sm:w-[45px] text-center">{formatTime(time)}</span>
        
        <div className="flex items-center gap-0.5 sm:gap-1 ml-1 sm:ml-2 pl-1 sm:pl-2 border-l border-white/20">
          {!isTimerActive || isTimerPaused ? (
            <button onClick={() => { setIsTimerActive(true); setIsTimerPaused(false); }} className="p-1 sm:p-1.5 hover:bg-white/20 rounded-md transition-colors" title="Mulai">
              <Play size={14} />
            </button>
          ) : (
            <button onClick={() => setIsTimerPaused(true)} className="p-1 sm:p-1.5 hover:bg-white/20 rounded-md transition-colors" title="Jeda">
              <Pause size={14} />
            </button>
          )}
          <button onClick={() => { setIsTimerActive(false); setIsTimerPaused(false); setTime(initialTime); }} className="p-1 sm:p-1.5 hover:bg-white/20 rounded-md transition-colors" title="Reset">
            <RotateCcw size={14} />
          </button>
          <button onClick={() => setShowTimerSettings(!showTimerSettings)} className={`p-1 sm:p-1.5 rounded-md transition-colors ${showTimerSettings ? 'bg-white/30' : 'hover:bg-white/20'}`} title="Pengaturan">
            <Settings size={14} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showTimerSettings && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 mt-2 bg-slate-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-4 w-64 z-50 pointer-events-auto"
          >
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest">Set Waktu (Menit)</h4>
              <button onClick={() => setShowTimerSettings(false)} className="text-slate-400 hover:text-white"><X size={14} /></button>
            </div>
            
            <form onSubmit={handleCustomTimeSubmit} className="flex gap-2 mb-3">
              <input 
                type="number" 
                min="1"
                value={customMinutes}
                onChange={(e) => setCustomMinutes(e.target.value)}
                className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-indigo-500"
                placeholder="Menit"
              />
              <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg text-sm font-bold transition-colors">
                Set
              </button>
            </form>

            <div className="grid grid-cols-3 gap-2">
              {[10, 15, 20].map((mins) => (
                <button
                  key={mins}
                  onClick={() => handleTimeChange(mins)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-colors ${initialTime === mins * 60 ? 'bg-indigo-500/30 text-indigo-300 border border-indigo-500/50' : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700 border border-transparent'}`}
                >
                  {mins}m
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
