import React from 'react';
import { Link } from 'react-router-dom';
import MusicPlayer from './MusicPlayer';

const Navbar: React.FC = () => (
  <>  
    <nav className='navigation-background'>
      <MusicPlayer/>
      <Link className="top-navigation-button" to="/">Menu Postaci</Link>
      <Link className="top-navigation-button" to="/CharacterCreation">Tworzenie Postaci</Link>
      <Link className="top-navigation-button" to="/Instruction">Instrukcja</Link>
    </nav>
  </>
);

export default Navbar;
