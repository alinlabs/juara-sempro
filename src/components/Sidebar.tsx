import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  X, Search, ShieldAlert, MessageCircleQuestion, Zap, 
  Target, Lightbulb, MonitorPlay, BookOpen, Timer, Layers, Volume2, VolumeX, Home, GraduationCap
} from 'lucide-react';
import { useAudio } from '../contexts/AudioContext';

const TABS = [
  { id: 'analisis', label: 'Analisis', icon: Search, color: 'text-blue-600', bg: 'bg-blue-100' },
  { id: 'titik-rawan', label: 'Titik Rawan', icon: ShieldAlert, color: 'text-rose-600', bg: 'bg-rose-100' },
  { id: 'pertanyaan', label: 'Pertanyaan', icon: MessageCircleQuestion, color: 'text-indigo-600', bg: 'bg-indigo-100' },
  { id: 'ringkasan', label: 'Ringkasan Cepat', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-100' },
  { id: 'simulasi', label: 'Simulasi Menjebak', icon: Target, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  { id: 'strategi', label: 'Strategi Sidang', icon: Lightbulb, color: 'text-violet-600', bg: 'bg-violet-100' },
  { id: 'presentasi', label: 'Panduan Presentasi', icon: MonitorPlay, color: 'text-indigo-600', bg: 'bg-indigo-100' },
  { id: 'kamus', label: 'Kamus Istilah', icon: BookOpen, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  { id: 'timer', label: 'Timer Presentasi', icon: Timer, color: 'text-rose-600', bg: 'bg-rose-100' },
  { id: 'flashcards', label: 'Kartu Hafalan', icon: Layers, color: 'text-blue-600', bg: 'bg-blue-100' },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  studentId?: string;
  activeTab?: string;
}

export default function Sidebar({ isOpen, onClose, studentId, activeTab }: SidebarProps) {
  const navigate = useNavigate();
  const { isPlaying, toggle } = useAudio();

  // Lock body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] md:hidden"
          />
          
          {/* Sidebar Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-[75%] max-w-[300px] bg-white z-[70] shadow-2xl flex flex-col md:hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/80 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center shadow-md shadow-indigo-200/50">
                  <GraduationCap className="text-white" size={18} />
                </div>
                <div>
                  <h2 className="font-extrabold text-slate-800 text-base leading-tight">Juara Sempro</h2>
                  <p className="text-[9px] font-bold text-indigo-500 uppercase tracking-widest">Menu Navigasi</p>
                </div>
              </div>
              <button 
                onClick={onClose} 
                className="p-2 text-slate-500 hover:bg-slate-200 hover:text-slate-800 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Navigation Links */}
            <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1.5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">
              {studentId && (
                <button
                  onClick={() => handleNavigation(`/${studentId}`)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${!activeTab ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  <div className={`p-2 rounded-lg ${!activeTab ? 'bg-indigo-100' : 'bg-slate-100'}`}>
                    <Home size={18} className={!activeTab ? 'text-indigo-600' : 'text-slate-500'} />
                  </div>
                  <span className="text-sm">Beranda Mahasiswa</span>
                </button>
              )}

              {studentId && (
                <div className="pt-2 pb-1 px-2">
                  <div className="h-px bg-slate-100 w-full mb-2"></div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Fitur Persiapan</span>
                </div>
              )}

              {studentId && TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleNavigation(`/${studentId}/${tab.id}`)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors ${isActive ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
                  >
                    <div className={`p-2 rounded-lg ${isActive ? tab.bg : 'bg-slate-100'}`}>
                      <Icon size={16} className={isActive ? tab.color : 'text-slate-500'} />
                    </div>
                    <span className="text-sm">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Footer (Audio Control) */}
            <div className="p-4 border-t border-slate-100 bg-slate-50">
              <button
                onClick={toggle}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 font-medium hover:bg-slate-50 transition-colors shadow-sm text-sm"
              >
                {isPlaying ? <Volume2 size={18} className="text-indigo-600" /> : <VolumeX size={18} className="text-slate-400" />}
                <span>{isPlaying ? 'Matikan Musik Latar' : 'Putar Musik Latar'}</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
