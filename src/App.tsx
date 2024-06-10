import { HashRouter, Routes, Route } from 'react-router-dom';
import { ConnectionInfoPage } from './pages/ConnectionInfoPage';
import { ConnectionTypePage } from './pages/ConnectionTypePage';
import { Documentation } from './pages/Documentation';
import { AppWrapper } from './AppWrapper';
import { Error404 } from './pages/Error404';
import { ArAi } from './pages/ArAi';
import { HomePage } from './pages/HomePage';
import { Fin } from './pages/Fin';
import './style/App.css';

export const App = () => (
  <AppWrapper>
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/connection-type" element={<ConnectionTypePage />} />
        <Route path="/connection-info" element={<ConnectionInfoPage />} />
        <Route path="/ar-viewer" element={<ArAi />} />
        <Route path="/fin" element={<Fin />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </HashRouter>
  </AppWrapper>
);
