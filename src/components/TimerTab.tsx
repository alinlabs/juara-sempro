import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Timer, Play, Pause, RotateCcw, Settings } from 'lucide-react';

export default function TimerTab() {
  const [time, setTime] = useState(15 * 60); // 15 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [initialTime, setInitialTime] = useState(15 * 60);
  const [showSettings, setShowSettings] = useState(false);
  const countRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive && !isPaused) {
      countRef.current = setInterval(() => {
        setTime((time) => {
          if (time <= 1) {
            clearInterval(countRef.current as NodeJS.Timeout);
            setIsActive(false);
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    } else {
      clearInterval(countRef.current as NodeJS.Timeout);
    }
    return () => clearInterval(countRef.current as NodeJS.Timeout);
  }, [isActive, isPaused]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    setIsActive(false);
    setIsPaused(false);
    setTime(initialTime);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isWarning = time <= 120 && time > 0; // 2 minutes or less
  const isDanger = time <= 30 && time > 0; // 30 seconds or less
  const isFinished = time === 0;

  const handleTimeChange = (minutes: number) => {
    const newTime = minutes * 60;
    setInitialTime(newTime);
    setTime(newTime);
    setIsActive(false);
    setIsPaused(false);
    setShowSettings(false);
  };

  return (
    <div className="space-y-6 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-slate-800 mb-2 flex items-center justify-center gap-2">
          <Timer className="text-indigo-600" size={28} />
          Timer Presentasi
        </h3>
        <p className="text-slate-500 text-sm">Latihan presentasi mandiri dengan simulasi waktu.</p>
      </div>

      <motion.div
        animate={{
          scale: isWarning ? [1, 1.02, 1] : 1,
          boxShadow: isWarning ? ['0px 0px 0px rgba(239, 68, 68, 0)', '0px 0px 30px rgba(239, 68, 68, 0.5)', '0px 0px 0px rgba(239, 68, 68, 0)'] : '0px 10px 30px rgba(0, 0, 0, 0.05)'
        }}
        transition={{
          duration: isDanger ? 0.5 : 1,
          repeat: isWarning ? Infinity : 0,
          ease: "easeInOut"
        }}
        className={`relative w-64 h-64 sm:w-80 sm:h-80 rounded-full flex flex-col items-center justify-center border-8 transition-colors duration-500 ${
          isFinished ? 'bg-rose-100 border-rose-500' :
          isDanger ? 'bg-rose-50 border-rose-500' :
          isWarning ? 'bg-amber-50 border-amber-500' :
          'bg-white border-indigo-100'
        }`}
      >
        <div className={`text-6xl sm:text-8xl font-mono font-bold tracking-tighter transition-colors duration-500 ${
          isFinished ? 'text-rose-600' :
          isDanger ? 'text-rose-600' :
          isWarning ? 'text-amber-600' :
          'text-slate-800'
        }`}>
          {formatTime(time)}
        </div>
        
        {isWarning && !isFinished && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`absolute bottom-8 font-bold text-sm sm:text-base uppercase tracking-widest ${isDanger ? 'text-rose-600' : 'text-amber-600'}`}
          >
            Waktu Hampir Habis!
          </motion.div>
        )}
        {isFinished && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute bottom-8 font-bold text-rose-600 text-lg uppercase tracking-widest"
          >
            Waktu Habis!
          </motion.div>
        )}
      </motion.div>

      <div className="flex items-center gap-4 mt-8">
        {!isActive || isPaused ? (
          <button
            onClick={handleStart}
            className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
            title="Mulai"
          >
            <Play size={28} className="ml-1" />
          </button>
        ) : (
          <button
            onClick={handlePause}
            className="w-16 h-16 rounded-full bg-amber-500 text-white flex items-center justify-center hover:bg-amber-600 shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
            title="Jeda"
          >
            <Pause size={28} />
          </button>
        )}
        
        <button
          onClick={handleReset}
          className="w-16 h-16 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center hover:bg-slate-300 shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95"
          title="Reset"
        >
          <RotateCcw size={24} />
        </button>

        <div className="relative">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95 ${showSettings ? 'bg-slate-800 text-white shadow-lg' : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 shadow-sm'}`}
            title="Pengaturan Waktu"
          >
            <Settings size={20} />
          </button>

          <AnimatePresence>
            {showSettings && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-full right-0 mb-4 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 w-48 z-10"
              >
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Pilih Waktu</h4>
                <div className="grid grid-cols-2 gap-2">
                  {[5, 10, 15, 20].map((mins) => (
                    <button
                      key={mins}
                      onClick={() => handleTimeChange(mins)}
                      className={`py-2 px-3 rounded-xl text-sm font-bold transition-colors ${initialTime === mins * 60 ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                    >
                      {mins} Menit
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
