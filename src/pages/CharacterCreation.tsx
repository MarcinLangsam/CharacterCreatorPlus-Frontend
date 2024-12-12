import React, { useState } from 'react';

import Gender from '../components/Gender';
import Portrait from '../components/Portrait';
import Race from '../components/Race';
import Class from '../components/Class';
import CharacterAlignment from '../components/CharacterAlignment';
import Attributes from '../components/Attributes';
import Skills from '../components/Skills';
import Name from '../components/Name';
import Export from '../components/CharacterExport';
import CreationSummary from '../components/CreationSummary';
import SidePanel from '../components/SIdePanel';
import { useCharacterContext } from '../context/CharacterContext';

type Section = 'gender' | 'portrait' | 'race' | 'class' | 'character' | 'stats' | 'skills' | 'name' | 'export';


const CharacterCreation: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>('gender');
  const {characterData, setCharacterData} = useCharacterContext()


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
        return <CharacterAlignment />;
      case 'stats':
        return <Attributes />;
      case 'skills':
        return <Skills />;
      case 'name':
        return <Name />;
      case 'export':
          return <Export />;
      default:
        return null;
    }
  };



  return (
    <div className='characterCreationBackground'>
      <h1 className='secondaryText'>Tworzenie Postaci</h1>
      <div className="buttonGroup">
        <button className="primaryButton" onClick={() => setActiveSection('gender')}>Płeć</button>
        <button className="primaryButton" onClick={() => setActiveSection('portrait')}>Portret</button>
        <button className="primaryButton" onClick={() => setActiveSection('race')}>Rasa</button>
        <button className="primaryButton" onClick={() => setActiveSection('class')}>Klasa</button>
        <button className="primaryButton" onClick={() => setActiveSection('character')}>Charakter</button>
        <button className="primaryButton" onClick={() => setActiveSection('stats')}>Współczynniki</button>
        <button className="primaryButton" onClick={() => setActiveSection('skills')}>Umiejętności</button>
        <button className="primaryButton" onClick={() => setActiveSection('name')}>Imię</button>
        <button className="primaryButton" onClick={() => setActiveSection('export')}>Eksport Postaci</button>
      </div>

      <div className='flex flex-row'>
        <div className='m-5'>{renderContent()}</div>
        <SidePanel />
      </div>
    </div>
  );
};

export default CharacterCreation;