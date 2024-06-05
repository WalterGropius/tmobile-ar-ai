import { HashRouter, Routes, Route } from 'react-router-dom';
import { ConnectionInfoPage } from './pages/ConnectionInfoPage';
import { ConnectionTypePage } from './pages/ConnectionTypePage';
import { Yolo7modem } from './pages/Yolo7modem';
import { Error404 } from './pages/Error404';
import { ARViewer } from './pages/ARViewer';
import { HomePage } from './pages/HomePage';
import { Fin } from './pages/Fin';
import './style/App.css';

export const App = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/connectionType" element={<ConnectionTypePage />} />
      <Route path="/connectionInfo" element={<ConnectionInfoPage />} />
      <Route path="/arViewer" element={<ARViewer />} />
      <Route path="/yolo7modem" element={<Yolo7modem />} />
      <Route path="/fin" element={<Fin />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  </HashRouter>
);
