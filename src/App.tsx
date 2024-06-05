import { useState, useEffect } from 'react';
import { useHash } from './hooks/useHash';
import { Router } from './Router';
import { Page } from './types/page';
import './style/App.css';

export const App = () => {
  const hash = useHash(); // Use the custom hook
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [connectionType, setConnectionType] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(hash.replace('#', ''));
    const page = params.get('page') || '';
    const connection = params.get('connection');

    if (connection) {
      setConnectionType(connection);
    }

    setCurrentPage(page as Page); // TODO
  }, [hash]);

  return <Router page={currentPage || 'home'} />;
};
