import React, { useState, useEffect, useCallback, useRef } from 'react';
import { PanInfo } from 'motion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SlidePresentasi } from '../data';
import { MonitorPlay } from 'lucide-react';

import PresentasiHeader from './presentasi/PresentasiHeader';
import PresentasiContent from './presentasi/PresentasiContent';
import PresentasiFooter from './presentasi/PresentasiFooter';

export default function PresentasiTab({ data }: { data: SlidePresentasi[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(1);
  
  const location = useLocation();
  const navigate = useNavigate();
  const wheelTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleZoomIn = useCallback(() => setZoom(prev => Math.min(prev + 0.2, 2.5)), []);
  const handleZoomOut = useCallback(() => setZoom(prev => Math.max(prev - 0.2, 0.5)), []);
  const handleZoomReset = useCallback(() => setZoom(1), []);

  const nextSlide = useCallback(() => {
    if (currentSlide < data.length - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  }, [currentSlide, data]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  }, [currentSlide]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {
        console.log("Native fullscreen not supported or blocked, using CSS fallback.");
      });
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    }
  }, [isFullscreen]);

  const exitFullscreen = useCallback(() => {
    setIsFullscreen(false);
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  // Handle start-presentation event and location state
  useEffect(() => {
    const handleStartPresentation = () => {
      if (!isFullscreen) {
        toggleFullscreen();
      }
    };

    window.addEventListener('start-presentation', handleStartPresentation);
    
    if (location.state?.startFullscreen) {
      handleStartPresentation();
      // Clear state so it doesn't re-trigger
      navigate(location.pathname, { replace: true, state: {} });
    }

    return () => window.removeEventListener('start-presentation', handleStartPresentation);
  }, [location, navigate, isFullscreen, toggleFullscreen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      }
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
      if (e.key === '=' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        handleZoomIn();
      }
      if (e.key === '-' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        handleZoomOut();
      }
      if (e.key === '0' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        handleZoomReset();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, isFullscreen, handleZoomIn, handleZoomOut, handleZoomReset]);

  // Swipe / Drag handler (for touch screens)
  const handleDragEnd = (event: any, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      nextSlide();
    } else if (info.offset.x > swipeThreshold) {
      prevSlide();
    }
  };

  // Touchpad swipe handler (for desktop)
  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (wheelTimeout.current) return;

    const swipeThreshold = 30; 
    
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      if (e.deltaX > swipeThreshold) {
        nextSlide();
        wheelTimeout.current = setTimeout(() => { wheelTimeout.current = null; }, 500);
      } else if (e.deltaX < -swipeThreshold) {
        prevSlide();
        wheelTimeout.current = setTimeout(() => { wheelTimeout.current = null; }, 500);
      }
    }
  }, [nextSlide, prevSlide]);

  if (!data || data.length === 0) {
    return (
      <div className="py-20 text-center px-6">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <MonitorPlay className="text-slate-400" size={40} />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">Belum Ada Data</h3>
        <p className="text-slate-500">Panduan presentasi belum tersedia untuk mahasiswa ini.</p>
      </div>
    );
  }

  const slide = data[currentSlide];

  // Dynamic background colors based on slide index
  const bgColors = [
    'from-slate-900 via-indigo-950 to-slate-900',
    'from-slate-900 via-violet-950 to-slate-900',
    'from-slate-900 via-emerald-950 to-slate-900',
    'from-slate-900 via-rose-950 to-slate-900',
    'from-slate-900 via-blue-950 to-slate-900',
  ];
  const currentBg = bgColors[currentSlide % bgColors.length];

  return (
    <div className="space-y-4">
      {!isFullscreen && (
        <div className="flex justify-between items-center mb-2">
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">Mode Presentasi</h3>
            <p className="text-slate-500 text-sm">Geser (swipe) layar atau gunakan panah untuk navigasi.</p>
          </div>
        </div>
      )}

      <div 
        onWheel={handleWheel}
        className={`bg-gradient-to-br ${currentBg} text-white flex flex-col transition-all duration-700 ease-in-out ${
          isFullscreen 
            ? 'fixed inset-0 z-[100] w-full h-full rounded-none' 
            : 'relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] sm:aspect-video w-full max-h-[75vh] border border-white/10'
        }`}
      >
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-indigo-500 opacity-10 rounded-full blur-3xl pointer-events-none"></div>

        <PresentasiHeader 
          currentSlide={currentSlide}
          totalSlides={data.length}
          isFullscreen={isFullscreen}
          toggleFullscreen={toggleFullscreen}
          exitFullscreen={exitFullscreen}
          zoom={zoom}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onZoomReset={handleZoomReset}
        />

        <PresentasiContent 
          slide={slide}
          currentSlide={currentSlide}
          isFullscreen={isFullscreen}
          handleDragEnd={handleDragEnd}
          zoom={zoom}
        />

        <PresentasiFooter 
          currentSlide={currentSlide}
          totalSlides={data.length}
          nextSlide={nextSlide}
          prevSlide={prevSlide}
          goToSlide={goToSlide}
        />
      </div>
    </div>
  );
}
