import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface Entry {
  id: number;
  content: string;
}

interface EntriesContextProps {
  entries: Entry[];
  addEntry: (entry: Entry) => void;
}

const EntriesContext = createContext<EntriesContextProps | undefined>(undefined);

export const useEntries = () => {
  const context = useContext(EntriesContext);
  if (!context) {
    throw new Error('useEntries must be used within an EntriesProvider');
  }
  return context;
};

export const EntriesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem('entries') || '[]');
    setEntries(storedEntries);
  }, []);

  const addEntry = (entry: Entry) => {
    setEntries((prevEntries) => {
      const updatedEntries = [...prevEntries, entry];
      localStorage.setItem('entries', JSON.stringify(updatedEntries)); 
      return updatedEntries;
    });
  };

  return (
    <EntriesContext.Provider value={{ entries, addEntry }}>
      {children}
    </EntriesContext.Provider>
  );
};