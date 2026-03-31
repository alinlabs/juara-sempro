import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, BookOpen, ShieldAlert, Lightbulb, BrainCircuit, 
  MessageCircleQuestion, CheckCircle2, XCircle, Info, ChevronDown, 
  Swords, ShieldCheck, Quote, List, Layers, ArrowRight, ArrowLeft, Eye,
  Search, Zap, Target, AlertCircle, MonitorPlay, Timer
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { TabType } from './Layout';
import { StudentData, QnA, TitikRawan, PengujiSection, AnalisisBab, RingkasanCepat, SimulasiMenjebak, StrategiSidang } from '../data';
import PresentasiTab from './PresentasiTab';
import KamusTab from './KamusTab';
import TimerTab from './TimerTab';
import FlashcardsTab from './FlashcardsTab';

const ViewToggle = ({ viewMode, setViewMode }: { viewMode: 'list' | 'flashcard', setViewMode: (mode: 'list' | 'flashcard') => void }) => (
  <div className="flex bg-slate-200/50 rounded-lg p-1">
    <button 
      onClick={() => setViewMode('list')} 
      className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
      title="Mode List"
    >
      <List size={18} />
    </button>
    <button 
      onClick={() => setViewMode('flashcard')} 
      className={`p-1.5 rounded-md transition-all ${viewMode === 'flashcard' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
      title="Mode Flashcard"
    >
      <Layers size={18} />
    </button>
  </div>
);

interface FlashcardData {
  id: string | number;
  headerBadge?: string;
  headerBadgeBg?: string;
  headerBadgeColor?: string;
  topBadge?: string;
  icon?: any;
  iconColor?: string;
  frontContent: React.ReactNode;
  backHeader?: React.ReactNode;
  backContent: React.ReactNode;
  tips?: string;
}

const GenericFlashcardView = ({ cards }: { cards: FlashcardData[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  if (cards.length === 0) return null;

  const nextCard = () => {
    setShowAnswer(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const prevCard = () => {
    setShowAnswer(false);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const card = cards[currentIndex];
  const Icon = card.icon || MessageCircleQuestion;

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4 px-2">
        <span className="text-sm font-semibold text-slate-500">
          Kartu {currentIndex + 1} / {cards.length}
        </span>
        {card.headerBadge && (
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${card.headerBadgeBg || 'bg-slate-100'} ${card.headerBadgeColor || 'text-slate-600'}`}>
            {card.headerBadge}
          </span>
        )}
      </div>

      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex + (showAnswer ? '-back' : '-front')}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-6 min-h-[380px] flex flex-col"
          >
            {card.topBadge && (
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-600">
                  {card.topBadge}
                </span>
              </div>
            )}
            
            {!showAnswer ? (
              <div className="flex-1 flex flex-col justify-center items-center text-center">
                <Icon className={`${card.iconColor || 'text-indigo-600'} mb-6 opacity-50`} size={56} />
                <div className="text-lg font-bold text-slate-800 leading-relaxed w-full">
                  {card.frontContent}
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100">
                  <Icon className={card.iconColor || 'text-indigo-600'} size={24} />
                  <div className="font-bold text-slate-800 text-sm w-full">{card.backHeader || card.frontContent}</div>
                </div>
                <div className="text-slate-700 text-sm leading-relaxed whitespace-pre-line overflow-y-auto flex-1 pr-2">
                  {card.backContent}
                </div>
                {card.tips && (
                  <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-xl flex gap-3 flex-shrink-0">
                    <Lightbulb className="text-amber-500 flex-shrink-0" size={18} />
                    <p className="text-xs text-amber-800 leading-relaxed italic">
                      {card.tips}
                    </p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between mt-6 gap-4">
        <button 
          onClick={prevCard}
          className="p-4 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-indigo-600 shadow-sm transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        
        <button 
          onClick={() => setShowAnswer(!showAnswer)}
          className={`flex-1 py-4 px-6 rounded-2xl font-bold text-white shadow-md transition-all flex items-center justify-center gap-2 ${
            showAnswer ? 'bg-slate-800 hover:bg-slate-700' : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {showAnswer ? (
            <>Tutup Detail</>
          ) : (
            <><Eye size={20} /> Lihat Detail</>
          )}
        </button>

        <button 
          onClick={nextCard}
          className="p-4 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-indigo-600 shadow-sm transition-colors"
        >
          <ArrowRight size={24} />
        </button>
      </div>
    </div>
  );
};

const AccordionItem: React.FC<{ qna: QnA, index: number }> = ({ qna, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="mb-4 border border-indigo-100/50 rounded-3xl overflow-hidden bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-5 flex items-start justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
      >
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-600 border border-indigo-100">
              {qna.level}
            </span>
          </div>
          <h4 className="font-bold text-slate-800 leading-relaxed text-sm sm:text-base">
            {qna.question}
          </h4>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, type: "spring" }}
          className={`mt-1 flex-shrink-0 p-2 rounded-full ${isOpen ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-50 text-slate-400'}`}
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-5 pt-0 border-t border-indigo-50/50 bg-gradient-to-b from-transparent to-indigo-50/30">
              <div className="flex gap-4 mt-4">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                  <MessageCircleQuestion className="text-indigo-600" size={16} />
                </div>
                <div className="text-slate-700 text-sm leading-relaxed whitespace-pre-line pt-1">
                  {qna.answer}
                </div>
              </div>
              {qna.tips && (
                <div className="mt-5 p-4 bg-amber-50/80 border border-amber-200/50 rounded-2xl flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="text-amber-600" size={16} />
                  </div>
                  <p className="text-sm text-amber-800 leading-relaxed italic pt-1">
                    {qna.tips}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const PengujiBlock = ({ section, icon: Icon, colorClass }: { section: PengujiSection, icon: any, colorClass: string }) => {
  if (!section.qna.length) return null;
  
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-2">
        <div className={`p-2 rounded-xl ${colorClass}`}>
          <Icon size={24} className="text-white" />
        </div>
        <h3 className="text-xl font-bold text-slate-800">{section.title}</h3>
      </div>
      <p className="text-slate-600 text-sm mb-6 ml-1">{section.subtitle}</p>
      
      <div className="space-y-4">
        {section.qna.map((item, idx) => (
          <AccordionItem key={idx} qna={item} index={idx} />
        ))}
      </div>
    </div>
  );
};

const TitikRawanBlock: React.FC<{ item: TitikRawan }> = ({ item }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-6 bg-white/80 backdrop-blur-sm rounded-3xl border border-rose-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="bg-gradient-to-r from-rose-50 to-transparent px-5 py-4 border-b border-rose-100/50 flex items-center gap-3">
        <div className="p-2 bg-rose-100 rounded-full text-rose-600">
          <ShieldAlert size={18} />
        </div>
        <h4 className="font-bold text-rose-900 text-sm sm:text-base">{item.title}</h4>
      </div>
      <div className="p-5 space-y-5">
        <div className="flex gap-4">
          <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center flex-shrink-0 border border-rose-100">
            <Swords className="text-rose-500" size={16} />
          </div>
          <div>
            <span className="text-[10px] font-extrabold text-rose-500 uppercase tracking-widest block mb-1.5">Serangan Dosen</span>
            <p className="text-slate-700 text-sm italic leading-relaxed">{item.attack}</p>
          </div>
        </div>
        <div className="flex gap-4 pt-4 border-t border-slate-100/50">
          <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0 border border-emerald-100">
            <ShieldCheck className="text-emerald-500" size={16} />
          </div>
          <div>
            <span className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-widest block mb-1.5">Tangkisan Cerdas</span>
            <p className="text-slate-800 font-bold text-sm whitespace-pre-line leading-relaxed">{item.defense}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const AnalisisBlock: React.FC<{ item: AnalisisBab }> = ({ item }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-6 bg-white/80 backdrop-blur-sm rounded-3xl border border-blue-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="bg-gradient-to-r from-blue-50 to-transparent px-5 py-4 border-b border-blue-100/50 flex items-center gap-3">
        <div className="p-2 bg-blue-100 rounded-full text-blue-600">
          <Search size={18} />
        </div>
        <h4 className="font-bold text-blue-900 text-sm sm:text-base">{item.bab}</h4>
      </div>
      <div className="p-5 space-y-5">
        <div>
          <span className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-widest block mb-2">Kelebihan</span>
          <p className="text-slate-700 text-sm leading-relaxed">{item.kelebihan}</p>
        </div>
        <div className="pt-4 border-t border-slate-100/50">
          <span className="text-[10px] font-extrabold text-rose-500 uppercase tracking-widest block mb-2">Kelemahan</span>
          <p className="text-slate-700 text-sm leading-relaxed">{item.kelemahan}</p>
        </div>
        <div className="pt-4 border-t border-slate-100/50 bg-amber-50/50 p-4 rounded-2xl border border-amber-100/50">
          <span className="text-[10px] font-extrabold text-amber-600 uppercase tracking-widest block mb-2 flex items-center gap-2">
            <AlertCircle size={14} /> Potensi Kritik
          </span>
          <p className="text-amber-900 text-sm italic leading-relaxed mb-3">{item.potensiKritik}</p>
          
          {item.solusiKritik && (
            <div className="mt-3 pt-3 border-t border-amber-200/50">
              <span className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-widest block mb-1.5 flex items-center gap-1.5">
                <CheckCircle2 size={12} /> Solusi Respon Kritik
              </span>
              <p className="text-slate-800 font-medium text-sm leading-relaxed">{item.solusiKritik}</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const SimulasiBlock: React.FC<{ item: SimulasiMenjebak }> = ({ item }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-5 bg-white/80 backdrop-blur-sm rounded-3xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition-shadow"
    >
      <div className="flex gap-4 mb-4">
        <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center flex-shrink-0 border border-rose-100">
          <ShieldAlert className="text-rose-500" size={16} />
        </div>
        <p className="font-bold text-slate-800 italic leading-relaxed pt-1">"{item.question}"</p>
      </div>
      <div className="flex gap-4 pt-4 border-t border-slate-100/50">
        <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0 border border-indigo-100">
          <MessageCircleQuestion className="text-indigo-600" size={16} />
        </div>
        <p className="text-slate-700 text-sm whitespace-pre-line leading-relaxed pt-1">{item.answer}</p>
      </div>
    </motion.div>
  );
};

export default function StudentContent({ data }: { data: StudentData }) {
  const { studentId, tabId } = useParams();
  const navigate = useNavigate();
  const activeTab = tabId as TabType;
  const [viewMode, setViewMode] = useState<'list' | 'flashcard'>('list');

  if (data.penguji1.qna.length === 0 && data.analisis.length === 0) {
    return (
      <div className="py-20 text-center px-6">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <GraduationCap className="text-slate-400" size={40} />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">Segera Hadir</h3>
        <p className="text-slate-500">Kisi-kisi untuk {data.name} sedang dalam proses penyusunan.</p>
      </div>
    );
  }

  const tabs = [
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
  ] as const;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  // Prepare Flashcard Data
  const pertanyaanCards: FlashcardData[] = [
    ...data.penguji1.qna.map((q, i) => ({ ...q, penguji: data.penguji1.title, icon: BrainCircuit, color: 'text-blue-600', bg: 'bg-blue-100', id: `p1-${i}` })),
    ...data.penguji2.qna.map((q, i) => ({ ...q, penguji: data.penguji2.title, icon: BookOpen, color: 'text-violet-600', bg: 'bg-violet-100', id: `p2-${i}` })),
    ...data.penguji3.qna.map((q, i) => ({ ...q, penguji: data.penguji3.title, icon: GraduationCap, color: 'text-emerald-600', bg: 'bg-emerald-100', id: `p3-${i}` })),
  ].map((q) => ({
    id: q.id,
    headerBadge: q.penguji,
    headerBadgeBg: q.bg,
    headerBadgeColor: q.color,
    topBadge: q.level,
    icon: q.icon,
    iconColor: q.color,
    frontContent: <h3>{q.question}</h3>,
    backHeader: <h3 className="line-clamp-2">{q.question}</h3>,
    backContent: q.answer,
    tips: q.tips
  }));

  const analisisCards: FlashcardData[] = data.analisis.map((item, i) => ({
    id: `analisis-${i}`,
    headerBadge: "Analisis Bab",
    headerBadgeBg: "bg-blue-100",
    headerBadgeColor: "text-blue-600",
    topBadge: item.bab,
    icon: Search,
    iconColor: "text-blue-600",
    frontContent: (
      <div className="space-y-4 text-left">
        <div>
          <span className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-widest block mb-1">Kelebihan</span>
          <p className="text-slate-700 text-sm font-normal">{item.kelebihan}</p>
        </div>
        <div className="pt-3 border-t border-slate-100">
          <span className="text-[10px] font-extrabold text-rose-500 uppercase tracking-widest block mb-1">Kelemahan</span>
          <p className="text-slate-700 text-sm font-normal">{item.kelemahan}</p>
        </div>
      </div>
    ),
    backHeader: <h3>{item.bab}</h3>,
    backContent: (
      <div className="space-y-4 text-left">
        <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-100/50">
          <span className="text-[10px] font-extrabold text-amber-600 uppercase tracking-widest block mb-2 flex items-center gap-2">
            <AlertCircle size={14} /> Potensi Kritik
          </span>
          <p className="text-amber-900 text-sm italic">{item.potensiKritik}</p>
        </div>
        {item.solusiKritik && (
          <div className="pt-2">
            <span className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-widest block mb-1.5 flex items-center gap-1.5">
              <CheckCircle2 size={12} /> Solusi Respon Kritik
            </span>
            <p className="text-slate-800 font-medium text-sm">{item.solusiKritik}</p>
          </div>
        )}
      </div>
    )
  }));

  const titikRawanCards: FlashcardData[] = data.titikRawan.map((item, i) => ({
    id: `rawan-${i}`,
    headerBadge: "Titik Rawan",
    headerBadgeBg: "bg-rose-100",
    headerBadgeColor: "text-rose-600",
    topBadge: item.title,
    icon: ShieldAlert,
    iconColor: "text-rose-600",
    frontContent: (
      <div className="text-left">
        <div className="flex gap-3 items-start">
          <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center flex-shrink-0 border border-rose-100 mt-1">
            <Swords className="text-rose-500" size={14} />
          </div>
          <div>
            <span className="text-[10px] font-extrabold text-rose-500 uppercase tracking-widest block mb-1">Serangan Dosen</span>
            <p className="text-slate-700 text-sm italic font-normal">{item.attack}</p>
          </div>
        </div>
      </div>
    ),
    backHeader: <h3>{item.title}</h3>,
    backContent: (
      <div className="text-left">
        <div className="flex gap-3 items-start">
          <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0 border border-emerald-100 mt-1">
            <ShieldCheck className="text-emerald-500" size={14} />
          </div>
          <div>
            <span className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-widest block mb-1">Tangkisan Cerdas</span>
            <p className="text-slate-800 font-bold text-sm whitespace-pre-line">{item.defense}</p>
          </div>
        </div>
      </div>
    )
  }));

  const simulasiCards: FlashcardData[] = data.simulasi.map((item, i) => ({
    id: `simulasi-${i}`,
    headerBadge: "Simulasi",
    headerBadgeBg: "bg-emerald-100",
    headerBadgeColor: "text-emerald-600",
    icon: Target,
    iconColor: "text-emerald-600",
    frontContent: <h3 className="italic font-normal">"{item.question}"</h3>,
    backHeader: <h3 className="italic line-clamp-2">"{item.question}"</h3>,
    backContent: item.answer
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="pb-24"
    >
      {/* Grid Menu (Mobile Cards) */}
      {!activeTab ? (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Topic Card */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            className="bg-gradient-to-br from-indigo-500 via-violet-600 to-purple-700 rounded-3xl p-6 text-white shadow-xl shadow-indigo-200/50 mb-6 relative overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-indigo-300 opacity-20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3 opacity-90">
                <BookOpen size={18} />
                <span className="text-xs font-bold uppercase tracking-widest">Judul Penelitian</span>
              </div>
              <h2 className="text-lg md:text-xl font-bold leading-relaxed line-clamp-3 text-white/95">
                {data.topic}
              </h2>
            </div>
          </motion.div>

          {/* Mobile Start Presentation Button */}
          <motion.div variants={itemVariants} className="md:hidden mb-8">
            <button 
              onClick={() => navigate(`/${studentId}/presentasi`, { state: { startFullscreen: true } })}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors text-sm font-bold shadow-lg shadow-indigo-200/50"
            >
              <MonitorPlay size={18} />
              Mulai Presentasi
            </button>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  variants={itemVariants}
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  key={tab.id}
                  onClick={() => navigate(`/${studentId}/${tab.id}`)}
                  className="flex flex-col items-center justify-center p-5 bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-slate-100 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/50 transition-all group text-center h-full relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className={`p-4 rounded-2xl mb-4 ${tab.bg} group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 relative z-10 shadow-inner`}>
                    <Icon className={tab.color} size={28} strokeWidth={2.5} />
                  </div>
                  <span className="text-sm font-extrabold text-slate-700 leading-tight relative z-10">
                    {tab.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'analisis' && (
              <motion.div key="analisis" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">Analisis Kritis Per Bab</h3>
                    <p className="text-slate-500 text-sm">Pahami kelebihan, kelemahan, dan potensi kritik dari setiap bab skripsi Anda.</p>
                  </div>
                  <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
                </div>
                {viewMode === 'list' ? (
                  data.analisis.map((item, idx) => (
                    <AnalisisBlock key={idx} item={item} />
                  ))
                ) : (
                  <GenericFlashcardView cards={analisisCards} />
                )}
              </motion.div>
            )}

            {activeTab === 'titik-rawan' && (
              <motion.div key="titik-rawan" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">Titik Rawan & Jebakan</h3>
                    <p className="text-slate-500 text-sm">Pelajari potensi serangan pertanyaan menjebak dari dosen dan cara menangkisnya dengan cerdas.</p>
                  </div>
                  <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
                </div>
                {viewMode === 'list' ? (
                  data.titikRawan.map((item, idx) => (
                    <TitikRawanBlock key={idx} item={item} />
                  ))
                ) : (
                  <GenericFlashcardView cards={titikRawanCards} />
                )}
              </motion.div>
            )}

            {activeTab === 'pertanyaan' && (
              <motion.div key="pertanyaan" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                {/* View Mode Toggle */}
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-slate-800">Daftar Pertanyaan</h3>
                  <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
                </div>

                {viewMode === 'list' ? (
                  <>
                    <PengujiBlock section={data.penguji1} icon={BrainCircuit} colorClass="bg-blue-500" />
                    <PengujiBlock section={data.penguji2} icon={BookOpen} colorClass="bg-violet-500" />
                    <PengujiBlock section={data.penguji3} icon={GraduationCap} colorClass="bg-emerald-500" />
                  </>
                ) : (
                  <GenericFlashcardView cards={pertanyaanCards} />
                )}
              </motion.div>
            )}

            {activeTab === 'ringkasan' && (
              <motion.div key="ringkasan" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 mb-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100/50 rounded-full blur-3xl -mr-10 -mt-10"></div>
                  <h3 className="text-xl font-bold mb-8 flex items-center gap-3 text-slate-800 relative z-10">
                    <div className="p-2 bg-amber-100 rounded-xl text-amber-500">
                      <Zap size={20} />
                    </div>
                    Cheat Sheet (Hafalkan!)
                  </h3>
                  
                  <div className="space-y-5 relative z-10">
                    <div className="flex gap-4">
                      <div className="w-1 bg-indigo-500 rounded-full"></div>
                      <div>
                        <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-1">Judul</span>
                        <p className="text-slate-800 font-bold leading-relaxed">{data.ringkasan.judul}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-1 bg-violet-500 rounded-full"></div>
                      <div>
                        <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-1">Objek</span>
                        <p className="text-slate-700 leading-relaxed">{data.ringkasan.objek}</p>
                      </div>
                    </div>
                    <div className="flex gap-4 pt-4 border-t border-slate-100/50">
                      <div className="w-1 bg-blue-500 rounded-full"></div>
                      <div>
                        <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-widest block mb-1">Definisi X1</span>
                        <p className="text-slate-700 leading-relaxed">{data.ringkasan.definisiX1}</p>
                      </div>
                    </div>
                    <div className="flex gap-4 pt-4 border-t border-slate-100/50">
                      <div className="w-1 bg-emerald-500 rounded-full"></div>
                      <div>
                        <span className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-widest block mb-1">Definisi X2</span>
                        <p className="text-slate-700 leading-relaxed">{data.ringkasan.definisiX2}</p>
                      </div>
                    </div>
                    <div className="flex gap-4 pt-4 border-t border-slate-100/50">
                      <div className="w-1 bg-rose-500 rounded-full"></div>
                      <div>
                        <span className="text-[10px] font-extrabold text-rose-600 uppercase tracking-widest block mb-1">Definisi Y</span>
                        <p className="text-slate-700 leading-relaxed">{data.ringkasan.definisiY}</p>
                      </div>
                    </div>
                    <div className="mt-6 bg-slate-800 p-5 sm:p-6 rounded-2xl shadow-lg relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-500/20 rounded-full blur-xl"></div>
                      <span className="text-[10px] font-extrabold text-indigo-300 uppercase tracking-widest block mb-2">Metode Analisis</span>
                      <p className="text-white font-medium text-sm leading-relaxed relative z-10">{data.ringkasan.metodeAnalisis}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'simulasi' && (
              <motion.div key="simulasi" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">Simulasi Pertanyaan Menjebak</h3>
                    <p className="text-slate-500 text-sm">Latih critical thinking Anda dengan pertanyaan-pertanyaan di luar dugaan.</p>
                  </div>
                  <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
                </div>
                {viewMode === 'list' ? (
                  data.simulasi.map((item, idx) => (
                    <SimulasiBlock key={idx} item={item} />
                  ))
                ) : (
                  <GenericFlashcardView cards={simulasiCards} />
                )}
              </motion.div>
            )}

            {activeTab === 'strategi' && (
              <motion.div key="strategi" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-rose-500/10 rounded-full blur-3xl -ml-10 -mb-10"></div>
                  
                  <h3 className="text-xl font-bold mb-8 flex items-center gap-3 relative z-10">
                    <div className="p-2 bg-amber-500/20 rounded-xl text-amber-400 border border-amber-500/30">
                      <Lightbulb size={20} />
                    </div>
                    Sikap & Komunikasi
                  </h3>
                  
                  <div className="space-y-8 mb-10 relative z-10">
                    {data.strategi.map((strat, idx) => (
                      <div key={idx} className="bg-white/5 rounded-2xl p-5 border border-white/10">
                        <h4 className="font-bold text-amber-400 mb-4 text-sm tracking-wide">{strat.title}</h4>
                        <ul className="space-y-4">
                          {strat.content.map((item, i) => (
                            <li key={i} className="flex gap-4 text-sm text-slate-300 leading-relaxed">
                              <span className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 flex-shrink-0 shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
                              <span className="whitespace-pre-line">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gradient-to-br from-rose-500/20 to-rose-600/10 border border-rose-500/30 p-5 sm:p-6 rounded-2xl relative z-10 backdrop-blur-sm">
                    <h4 className="font-bold text-rose-300 mb-4 uppercase tracking-widest text-xs flex items-center gap-2">
                      <Target size={16} /> Tugas Anda Hari Ini
                    </h4>
                    <ul className="space-y-3">
                      {data.tugas.map((task, idx) => (
                        <li key={idx} className="flex gap-3 text-sm text-rose-100 leading-relaxed bg-rose-950/30 p-3 rounded-xl border border-rose-500/20">
                          <CheckCircle2 className="text-rose-400 flex-shrink-0 mt-0.5" size={18} />
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'presentasi' && (
              <motion.div key="presentasi" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                <PresentasiTab data={data.presentasi || []} />
              </motion.div>
            )}

            {activeTab === 'kamus' && (
              <motion.div key="kamus" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                <KamusTab data={data.kamus || []} />
              </motion.div>
            )}

            {activeTab === 'timer' && (
              <motion.div key="timer" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                <TimerTab />
              </motion.div>
            )}

            {activeTab === 'flashcards' && (
              <motion.div key="flashcards" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                <FlashcardsTab data={data.flashcards || []} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  );
}
