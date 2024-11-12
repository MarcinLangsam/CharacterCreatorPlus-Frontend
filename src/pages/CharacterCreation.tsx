import React, { useState } from 'react';

import Gender from '../components/Gender';
//import Portrait from './SecondPageComponents/Portrait';
import Race from '../components/Race';
import Class from '../components/Class';
import CharacterAligment from '../components/CharacterAligment';
import Attributes from '../components/Attributes';
import Skills from '../components/Skills';

type Section = 'gender' | 'portrait' | 'race' | 'class' | 'character' | 'stats' | 'skills';


const CharacterCreation: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>('gender');

  const renderContent = () => {
    switch (activeSection) {
      case 'gender':
        return <Gender />;
      //case 'portrait':
        //return <Portrait />;
      case 'race':
        return <Race />;
      case 'class':
        return <Class />;
      case 'character':
        return <CharacterAligment />;
      case 'stats':
        return <Attributes />;
      case 'skills':
        return <Skills />;
      default:
        return null;
    }
  };



  return (
    <div>
      <h1>Tworzenie Postaci</h1>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button onClick={() => setActiveSection('gender')}>Płeć</button>
        <button onClick={() => setActiveSection('portrait')}>Portret</button>
        <button onClick={() => setActiveSection('race')}>Rasa</button>
        <button onClick={() => setActiveSection('class')}>Klasa</button>
        <button onClick={() => setActiveSection('character')}>Charakter</button>
        <button onClick={() => setActiveSection('stats')}>Współczynniki</button>
        <button onClick={() => setActiveSection('skills')}>Umiejętności</button>
      </div>

      <div>
        {renderContent()}
      </div>
    </div>
  );
};

export default CharacterCreation;