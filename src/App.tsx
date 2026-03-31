import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import StudentPage from './pages/StudentPage';
import WelcomePopup from './components/WelcomePopup';
import { AudioProvider } from './contexts/AudioContext';
import { StudentProvider } from './contexts/StudentContext';

export default function App() {
  return (
    <StudentProvider>
      <AudioProvider>
        <BrowserRouter>
          <WelcomePopup />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path=":studentId" element={<StudentPage />} />
              <Route path=":studentId/:tabId" element={<StudentPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AudioProvider>
    </StudentProvider>
  );
}

