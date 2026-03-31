import React, { useState } from 'react';
import { GraduationCap, ArrowLeft, Volume2, VolumeX, MonitorPlay, Menu } from 'lucide-react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useAudio } from '../contexts/AudioContext';
import { useStudents } from '../contexts/StudentContext';
import Sidebar from './Sidebar';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { studentId, tabId } = useParams();
  const { isPlaying, toggle } = useAudio();
  const { students } = useStudents();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleBack = () => {
    if (tabId) {
      navigate(`/${studentId}`);
    }
  };

  const handleStartPresentation = () => {
    if (tabId !== 'presentasi') {
      navigate(`/${studentId}/presentasi`, { state: { startFullscreen: true } });
    } else {
      window.dispatchEvent(new CustomEvent('start-presentation'));
    }
  };

  const student = students.find(s => s.id === studentId);
  const headerName = student ? `${student.name} By RezaProject` : 'By RezaProject';

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white/70 backdrop-blur-md border-b border-white/20 z-50 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {tabId && (
              <button 
                onClick={handleBack}
                className="p-2 -ml-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50/80 rounded-full transition-all duration-300 hover:scale-105 active:scale-95" 
                title="Kembali ke Menu"
              >
                <ArrowLeft size={20} />
              </button>
            )}
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200/50">
              <GraduationCap className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-800 tracking-tight">Juara Sempro</h1>
              <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">{headerName}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            {studentId && (
              <button 
                onClick={handleStartPresentation}
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors text-sm font-bold shadow-sm"
              >
                <MonitorPlay size={16} />
                Mulai Presentasi
              </button>
            )}
            
            {/* Desktop Volume Button */}
            <button 
              onClick={toggle}
              className="hidden md:flex p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50/80 rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
              title={isPlaying ? "Matikan Musik" : "Putar Musik"}
            >
              {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>

            {/* Mobile Sidebar Toggle (Replaces Volume on Mobile) */}
            {studentId ? (
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="md:hidden p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50/80 rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
                title="Buka Menu Navigasi"
              >
                <Menu size={24} />
              </button>
            ) : (
              <button 
                onClick={toggle}
                className="md:hidden p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50/80 rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
                title={isPlaying ? "Matikan Musik" : "Putar Musik"}
              >
                {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
              </button>
            )}
          </div>
        </div>
      </header>

      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        studentId={studentId}
        activeTab={tabId}
      />
    </>
  );
}
