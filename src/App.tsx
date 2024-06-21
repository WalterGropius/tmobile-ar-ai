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
  return (
    <AppWrapper>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </AppWrapper>
  );
};
