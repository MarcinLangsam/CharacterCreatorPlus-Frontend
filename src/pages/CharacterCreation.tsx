import React, { useState } from 'react';

import Gender from '../components/Gender';
import Portrait from '../components/Portrait';
import Race from '../components/Race';
import Class from '../components/Class';
import CharacterAligment from '../components/CharacterAligment';
import Attributes from '../components/Attributes';
import Skills from '../components/Skills';
import CreationSummary from '../components/CreationSummary';

type Section = 'gender' | 'portrait' | 'race' | 'class' | 'character' | 'stats' | 'skills';


const CharacterCreation: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>('gender');

  const renderContent = () => {
    switch (activeSection) {
      case 'gender':
        return <Gender />;
      case 'portrait':
        return <Portrait />;
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
      <h1 className='font-bold underline'>Tworzenie Postaci</h1>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button className="border border-black m-2 bg-yellow-700 p-2" onClick={() => setActiveSection('gender')}>Płeć</button>
        <button className="border border-black m-2 bg-yellow-700 p-2" onClick={() => setActiveSection('portrait')}>Portret</button>
        <button className="border border-black m-2 bg-yellow-700 p-2" onClick={() => setActiveSection('race')}>Rasa</button>
        <button className="border border-black m-2 bg-yellow-700 p-2" onClick={() => setActiveSection('class')}>Klasa</button>
        <button className="border border-black m-2 bg-yellow-700 p-2" onClick={() => setActiveSection('character')}>Charakter</button>
        <button className="border border-black m-2 bg-yellow-700 p-2" onClick={() => setActiveSection('stats')}>Współczynniki</button>
        <button className="border border-black m-2 bg-yellow-700 p-2" onClick={() => setActiveSection('skills')}>Umiejętności</button>
      </div>

      <div className='flex flex-row'>
        <div className='m-5'>{renderContent()}</div>
        <div className='m-5'><CreationSummary/></div>
      </div>
    </div>
  );
};

export default CharacterCreation;