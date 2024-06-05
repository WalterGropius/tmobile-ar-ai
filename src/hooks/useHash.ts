import { useState, useEffect } from 'react';

export const useHash = (): string => {
  const [hash, setHash] = useState(window.location.hash);

  const handleHashChange = () => setHash(window.location.hash);

  useEffect(() => {
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return hash;
};
