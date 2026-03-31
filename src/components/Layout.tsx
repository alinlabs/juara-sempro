import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';

export type TabType = 'analisis' | 'titik-rawan' | 'pertanyaan' | 'ringkasan' | 'simulasi' | 'strategi' | 'presentasi' | 'kamus' | 'timer' | 'flashcards' | null;

export default function Layout() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen font-sans relative overflow-x-hidden">
      {/* Global Decorative Background Elements */}
      <div className="fixed top-[-10%] left-[-10%] w-96 h-96 bg-indigo-300/20 rounded-full blur-3xl mix-blend-multiply animate-blob pointer-events-none"></div>
      <div className="fixed top-[20%] right-[-10%] w-96 h-96 bg-violet-300/20 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-2000 pointer-events-none"></div>
      <div className="fixed bottom-[-10%] left-[20%] w-96 h-96 bg-pink-300/20 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-4000 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {!isHome && (
          <Header />
        )}
        <main className={`flex-1 ${isHome ? "" : "max-w-3xl mx-auto w-full px-4 sm:px-6 pt-24 pb-8"}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
