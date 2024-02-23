import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ConnectionTypePage from './pages/ConnectionTypePage';
import ConnectionInfoPage from './pages/ConnectionInfoPage';
import Yolo7modem from './pages/Yolo7modem';
import ARViewer from './pages/ARViewer';
import "./style/App.css";

// Import the custom hook
import useHash from './hooks/useHash';

const App = () => {
  const hash = useHash(); // Use the custom hook
  const [currentPage, setCurrentPage] = useState(1);
  const [connectionType, setConnectionType] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(hash.replace('#', ''));
    const page = parseInt(params.get('page'), 10);
    const connection = params.get('connection');

    if (connection) {
      setConnectionType(connection);
    }

    setCurrentPage(page);
  }, [hash]);

const renderPage = () => {
  switch (currentPage) {
    case 1:
      return <HomePage />;
    case 2:
      return <ConnectionTypePage />;
    case 3:
      return <ConnectionInfoPage />;
    case 4:
      // Use a unique key to force re-mount
      return <ARViewer page={currentPage}/>;
    case 5:
      // Use a unique key to force re-mount
      return <Yolo7modem/>;
    default:
      return <HomePage />;
  }
};


  return <div>{renderPage()}</div>;
};


export default App;
