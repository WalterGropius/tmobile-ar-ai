import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppWrapper } from './AppWrapper';
import { ConnectionTypePage } from './pages/ConnectionTypePage';
import { ConnectionInfoPage } from './pages/ConnectionInfoPage';
import { Documentation } from './pages/Documentation';
import { Error404 } from './pages/Error404';
import { ArAiPage } from './pages/ArAiPage';
import { HomePage } from './pages/HomePage';
import { Fin } from './pages/Fin';
import usePageTracking from './hooks/usePageTracking';
import './style/App.css';

import CookiesDialog from './components/CookiesDialog';
import {
  hasCookiesResponse,
  checkCookiesConsent,
  clearCookiesResponse,
  removeAllCookies,
  clearAllStorage,
} from './utils/cookiesChecker';

const AppRoutes = () => {
  usePageTracking();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/connection-type" element={<ConnectionTypePage />} />
      <Route path="/connection-info" element={<ConnectionInfoPage />} />
      <Route path="/ar-viewer" element={<ArAiPage />} />
      <Route path="/fin" element={<Fin />} />
      <Route path="/documentation" element={<Documentation />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export const App = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const hasAcceptedCookies = hasCookiesResponse();
    if (!hasAcceptedCookies) {
      setShowDialog(true);
      setCookiesAccepted(false);
    } else {
      setCookiesAccepted(true);
    }
  }, []);

  const handleCookiesAccept = () => {
    console.log('Cookies accepted');
    setCookiesAccepted(true);
    setShowDialog(false);
    localStorage.setItem('cookiesResponse', 'accepted');
    setMessage('Cookies and site data accepted. You can use all features of the site.');

    // Load Google Analytics
    if (typeof window.loadGoogleAnalytics === 'function') {
      window.loadGoogleAnalytics();
    }

    // Dispatch custom event for cookie acceptance
    window.dispatchEvent(new Event('cookiesAccepted'));
  };

  const handleCookiesReject = async () => {
    console.log('Cookies rejected');
    setCookiesAccepted(false);
    setShowDialog(false);
    clearCookiesResponse();
    removeAllCookies();
    await clearAllStorage();
    setMessage(
      'Cookies and site data rejected. Some features may be limited. Note that some technical data may still be stored by your browser.'
    );
  };

  return (
    <AppWrapper>
      <HashRouter>
        <AppRoutes />
        {showDialog && <CookiesDialog onAccept={handleCookiesAccept} onReject={handleCookiesReject} />}
        {message && (
          <div
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '10px',
              backgroundColor: '#f0f0f0',
              textAlign: 'center',
            }}
          >
            {message}
          </div>
        )}
      </HashRouter>
    </AppWrapper>
  );
};
