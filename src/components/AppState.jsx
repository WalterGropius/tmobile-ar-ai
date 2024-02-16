// AppState.js
import React, { createContext, useContext, useState } from 'react';

const AppStateContext = createContext();

export const AppStateProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('home');
  const [connectionType, setConnectionType] = useState('');

  return (
    <AppStateContext.Provider value={{ currentPage, setCurrentPage, connectionType, setConnectionType }}>
      {children}
    </AppStateContext.Provider>
  );
};

export default function useAppState() {
  return useContext(AppStateContext);
}
