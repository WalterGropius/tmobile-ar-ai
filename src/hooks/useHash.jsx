// src/hooks/useHash.jsx
import { useState, useEffect } from 'react';

export default function useHash() {
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return hash;
}
