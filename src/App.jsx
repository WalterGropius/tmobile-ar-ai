import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import ConnectionTypePage from './pages/ConnectionTypePage';
import ConnectionInfoPage from './pages/ConnectionInfoPage';
import Yolo7modem from './pages/Yolo7modem';
import ARViewer from './pages/ARViewer';
import "./style/App.css";

// Import the custom hook
import useHash from './hooks/useHash';
import Fin from './pages/Fin';

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
      return <ARViewer connectionType={connectionType}/>;
    case 5:
      return <Yolo7modem/>;
    case 6:
      return <Fin/>;
    default:
      return <HomePage />;
  }
};


  return <div>{renderPage()}</div>;
};


export default App;
