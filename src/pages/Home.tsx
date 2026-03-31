import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Users, ArrowRight, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'motion/react';
import { useAudio } from '../contexts/AudioContext';
import { useStudents } from '../contexts/StudentContext';

export default function Home() {
  const { isPlaying, toggle } = useAudio();
  const { students, loading, error } = useStudents();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Error loading data: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Audio Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <button 
          onClick={toggle}
          className="p-3 bg-white/50 backdrop-blur-md border border-white/20 text-slate-600 hover:text-indigo-600 hover:bg-white/80 rounded-full transition-all duration-300 shadow-sm hover:scale-105 active:scale-95"
          title={isPlaying ? "Matikan Musik" : "Putar Musik"}
        >
          {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </button>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-300/30 rounded-full blur-3xl mix-blend-multiply animate-blob"></div>
      <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-violet-300/30 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-10%] left-[20%] w-96 h-96 bg-pink-300/30 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-4000"></div>

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-indigo-500/30 mb-8 rotate-3 hover:rotate-6 transition-transform">
          <GraduationCap className="text-white" size={40} />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight mb-3 text-center flex items-center gap-3">
          Juara Sempro <Sparkles className="text-amber-400" size={28} />
        </h1>
        <p className="text-sm font-bold text-indigo-500 uppercase tracking-[0.2em] mb-12 text-center bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-100">
          By RezaProject
        </p>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-2xl shadow-slate-200/50 p-8 border border-white relative z-10"
      >
        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-100/80">
          <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600">
            <Users size={22} />
          </div>
          <h2 className="text-xl font-bold text-slate-800">Pilih Mahasiswa</h2>
        </div>
        <div className="space-y-4">
          {students.map((student, index) => (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              key={student.id}
            >
              <Link
                to={`/${student.id}`}
                className="flex items-center justify-between w-full p-5 rounded-2xl border-2 border-slate-100 hover:border-indigo-500 hover:bg-indigo-50/50 transition-all group hover:shadow-lg hover:shadow-indigo-100/50"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-indigo-100 flex items-center justify-center text-slate-500 group-hover:text-indigo-600 font-bold transition-colors">
                    {student.name.charAt(0)}
                  </div>
                  <span className="font-bold text-slate-700 group-hover:text-indigo-700 text-lg">{student.name}</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:bg-indigo-600 group-hover:border-indigo-600 transition-colors shadow-sm">
                  <ArrowRight size={16} className="text-slate-400 group-hover:text-white transition-colors" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
