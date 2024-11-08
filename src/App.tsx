import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import WriteMessagePage from './pages/WriteEntry';
import EntryList from './pages/EntryList';
import ReadEntry from './pages/ReadEntry';
import UpdateEntry from './pages/UpdateEntry';
import { EntriesProvider } from './context/EntriesContext';
import Header from './pages/Header'

const App: React.FC = () => {
  return (
    <EntriesProvider>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} /> {/* La page de connexion par défaut */}
          <Route path="/write" element={<WriteMessagePage />} /> {/* La page pour rédiger */}
          <Route path="/entries" element={<EntryList />} /> {/* Page pour lister toutes les entrées */}
          <Route path="/read/:id" element={<ReadEntry />} />
          <Route path="/update/:id" element={<UpdateEntry />} />
        </Routes>
      </Router>
    </EntriesProvider>
  );
};

export default App;
