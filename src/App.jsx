import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ConnectionTypePage from './pages/ConnectionTypePage';
import ConnectionInfoPage from './pages/ConnectionInfoPage';
import "./style/App.css";

// Import the custom hook
import useHash from './hooks/useHash';

const App = () => {
  const hash = useHash(); // Use the custom hook
  const [currentPage, setCurrentPage] = useState(1);
  const [connectionType, setConnectionType] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(hash.replace('#', ''));

    const page = params.get('page');
    const connection = params.get('connection');

    if (page) setCurrentPage(Number(page));
    if (connection) setConnectionType(connection);
  }, [hash]); // Depend on the hash value from our custom hook

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return <HomePage />;
      case 2:
        return <ConnectionTypePage />;
      case 3:
        return <ConnectionInfoPage connectionType={connectionType} />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div>
      <Header />
      {renderPage()}
      <Footer />
    </div>
  );
};

export default App;
