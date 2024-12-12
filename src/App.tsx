import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainMenu from './pages/MainMenu';
import CharacterCreation from './pages/CharacterCreation';
import Navbar from './components/Navbar';
import { CharacterProvider } from './context/CharacterContext';
import { ExportDataProvider } from './context/ExportDataContext';

const App: React.FC = () => {
  return (
     <ExportDataProvider>
     <CharacterProvider>
       <Router>
         <Navbar />
         <Routes>
           <Route path="/" element={<MainMenu />} />
           <Route path="/CharacterCreation" element={<CharacterCreation />} />
         </Routes>
       </Router>
     </CharacterProvider>
     </ExportDataProvider>
  );
};

export default App;