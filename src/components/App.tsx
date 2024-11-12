import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainMenu from '../pages/MainMenu';
import CharacterCreation from '../pages/CharacterCreation';
import Navbar from './Navbar';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/second" element={<CharacterCreation />} />
      </Routes>
    </Router>
  );
};

export default App;