import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => (
  <nav className='navigation-background'>
    <Link className="top-navigation-button" to="/">Menu Główne</Link>
    <Link className="top-navigation-button" to="/CharacterCreation">Tworzenie Postaci</Link>
  </nav>
);

export default Navbar;
