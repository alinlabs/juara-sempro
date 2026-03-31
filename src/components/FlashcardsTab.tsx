import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FlashcardData } from '../data';
import { Layers, ArrowLeft, ArrowRight, Eye } from 'lucide-react';

export default function FlashcardsTab({ data }: { data: FlashcardData[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (!data || data.length === 0) {
    return (
      <div className="py-20 text-center px-6">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Layers className="text-slate-400" size={40} />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">Belum Ada Data</h3>
        <p className="text-slate-500">Kartu hafalan belum tersedia untuk mahasiswa ini.</p>
      </div>
    );
  }

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % data.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + data.length) % data.length);
    }, 150);
  };

  const card = data[currentIndex];

  return (
    <div className="space-y-6 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-slate-800 mb-2 flex items-center justify-center gap-2">
          <Layers className="text-indigo-600" size={28} />
          Kartu Hafalan
        </h3>
        <p className="text-slate-500 text-sm">Hafalkan definisi variabel, teori, atau elevator pitch dengan cepat.</p>
      </div>

      <div className="w-full max-w-md mx-auto perspective-1000">
        <div className="flex justify-between items-center mb-4 px-2">
          <span className="text-sm font-semibold text-slate-500">
            Kartu {currentIndex + 1} / {data.length}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-600">
            {isFlipped ? 'Jawaban' : 'Pertanyaan'}
          </span>
        </div>

        <motion.div
          className="relative w-full h-80 sm:h-96 cursor-pointer preserve-3d"
          onClick={() => setIsFlipped(!isFlipped)}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front of Card */}
          <div 
            className="absolute w-full h-full backface-hidden bg-white rounded-3xl shadow-xl border border-slate-100 p-8 flex flex-col items-center justify-center text-center"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
              <Eye className="text-indigo-500" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 leading-tight">
              {card.front}
            </h2>
            <p className="text-slate-400 text-sm mt-8 uppercase tracking-widest font-bold">Tap untuk melihat jawaban</p>
          </div>

          {/* Back of Card */}
          <div 
            className="absolute w-full h-full backface-hidden bg-indigo-600 rounded-3xl shadow-xl border border-indigo-500 p-8 flex flex-col items-center justify-center text-center text-white"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6">
              <Layers className="text-white" size={32} />
            </div>
            <div className="text-lg sm:text-xl font-medium leading-relaxed overflow-y-auto w-full px-2">
              {card.back}
            </div>
            <p className="text-indigo-200 text-sm mt-8 uppercase tracking-widest font-bold">Tap untuk kembali</p>
          </div>
        </motion.div>

        <div className="flex items-center justify-between mt-8 gap-4">
          <button 
            onClick={handlePrev}
            className="p-4 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-indigo-600 shadow-sm transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          <button 
            onClick={() => setIsFlipped(!isFlipped)}
            className={`flex-1 py-4 px-6 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 ${
              isFlipped ? 'bg-slate-800 text-white hover:bg-slate-700 shadow-md' : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-100'
            }`}
          >
            {isFlipped ? 'Tutup Jawaban' : 'Lihat Jawaban'}
          </button>

          <button 
            onClick={handleNext}
            className="p-4 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-indigo-600 shadow-sm transition-colors"
          >
            <ArrowRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
