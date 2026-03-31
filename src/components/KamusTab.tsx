import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { KamusIstilah } from '../data';
import { BookOpen, Search, ChevronDown } from 'lucide-react';

export default function KamusTab({ data }: { data: KamusIstilah[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!data || data.length === 0) {
    return (
      <div className="py-20 text-center px-6">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <BookOpen className="text-slate-400" size={40} />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">Belum Ada Data</h3>
        <p className="text-slate-500">Kamus istilah belum tersedia untuk mahasiswa ini.</p>
      </div>
    );
  }

  const filteredData = data.filter(item => 
    item.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-800 mb-2">Kamus Istilah (Glossary)</h3>
        <p className="text-slate-500 text-sm">Daftar istilah ilmiah umum, penting, atau spesifik yang ada di skripsi Anda.</p>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all"
          placeholder="Cari istilah atau definisi..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full text-left p-5 flex items-center justify-between focus:outline-none"
                >
                  <h4 className="font-bold text-slate-800 text-base">{item.term}</h4>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`ml-4 flex-shrink-0 p-1.5 rounded-full ${openIndex === index ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-400'}`}
                  >
                    <ChevronDown size={18} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 pt-0 border-t border-slate-100 bg-slate-50/50">
                        <p className="text-slate-700 text-sm leading-relaxed mt-4">
                          {item.definition}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-10 text-slate-500"
            >
              Tidak ada istilah yang cocok dengan pencarian "{searchTerm}".
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
