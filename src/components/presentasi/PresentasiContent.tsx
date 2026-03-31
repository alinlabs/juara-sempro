import React, { useMemo } from 'react';
import { motion, AnimatePresence, PanInfo } from 'motion/react';
import { SlidePresentasi } from '../../data';

interface PresentasiContentProps {
  slide: SlidePresentasi;
  currentSlide: number;
  isFullscreen: boolean;
  handleDragEnd: (event: any, info: PanInfo) => void;
  zoom: number;
}

interface GroupedPoint {
  label: string | null;
  items: string[];
}

export default function PresentasiContent({ slide, currentSlide, isFullscreen, handleDragEnd, zoom }: PresentasiContentProps) {
  
  // Smart parsing to separate labels (e.g. "Rumusan Masalah:") from content
  const groupedPoints = useMemo(() => {
    const groups: GroupedPoint[] = [];
    let currentGroup: GroupedPoint = { label: null, items: [] };

    slide.points.forEach(point => {
      const trimmed = point.trim();
      // Heuristic for label: ends with ':' OR is very short (< 25 chars) and doesn't end with punctuation
      const isLabel = trimmed.endsWith(':') || 
                     (trimmed.length <= 25 && !trimmed.match(/[.?!]$/));

      if (isLabel) {
        if (currentGroup.label !== null || currentGroup.items.length > 0) {
          groups.push(currentGroup);
        }
        currentGroup = { label: trimmed.replace(/:$/, ''), items: [] };
      } else {
        currentGroup.items.push(trimmed);
      }
    });

    if (currentGroup.label !== null || currentGroup.items.length > 0) {
      groups.push(currentGroup);
    }

    return groups;
  }, [slide.points]);

  return (
    <div className="flex-1 w-full h-full relative z-20 overflow-y-auto overflow-x-hidden pt-32 sm:pt-28 pb-32 px-4 sm:px-12 md:px-24">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)', scale: zoom }}
          exit={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: 'top center' }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
          className="w-full max-w-5xl mx-auto cursor-grab active:cursor-grabbing pb-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h2 className={`font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 mb-8 sm:mb-12 leading-tight tracking-tight ${isFullscreen ? 'text-4xl sm:text-6xl md:text-7xl' : 'text-3xl sm:text-4xl md:text-5xl'}`}>
              {slide.title}
            </h2>
          </motion.div>
          
          <div className="space-y-8 sm:space-y-10">
            {groupedPoints.map((group, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + (i * 0.15), duration: 0.5, type: "spring", stiffness: 100 }}
                className="space-y-3"
              >
                {group.label && (
                  <h4 className="text-indigo-300 font-bold uppercase tracking-widest text-sm md:text-base flex items-center gap-4">
                    <div className="w-8 h-px bg-indigo-400/50"></div>
                    {group.label}
                  </h4>
                )}
                <ul className={`space-y-4 ${group.label ? 'pl-0 md:pl-12' : ''}`}>
                  {group.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-4 sm:gap-5 group">
                      {!group.label && (
                        <div className={`mt-2.5 w-3 h-3 sm:w-4 sm:h-4 rounded-full flex-shrink-0 shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all duration-300 group-hover:scale-150 ${
                          j % 3 === 0 ? 'bg-indigo-400' : j % 3 === 1 ? 'bg-emerald-400' : 'bg-rose-400'
                        }`} />
                      )}
                      <span className={`leading-relaxed text-slate-100 font-medium transition-colors duration-300 group-hover:text-white block ${
                        group.label ? 'border-l-2 border-white/20 pl-4 py-1' : ''
                      } ${isFullscreen ? 'text-xl sm:text-3xl md:text-4xl' : 'text-lg sm:text-xl md:text-2xl'}`}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
