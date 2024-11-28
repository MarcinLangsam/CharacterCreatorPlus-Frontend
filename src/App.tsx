import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainMenu from './pages/MainMenu';
import CharacterCreation from './pages/CharacterCreation';
import HexEdit from './pages/HexEdit'
import Navbar from './components/Navbar';
import { CharacterProvider } from './context/CharacterContext';

const App: React.FC = () => {
  return (
    <CharacterProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/CharacterCreation" element={<CharacterCreation />} />
          <Route path="/HexEdit" element={<HexEdit />} />
        </Routes>
      </Router>
    </CharacterProvider>
  );
};

export default App;