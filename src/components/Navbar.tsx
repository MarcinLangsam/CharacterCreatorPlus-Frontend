import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => (
  <nav className='topMenu'>
    <Link className="primaryText" to="/">Menu Główne</Link>
    <Link className="primaryText" to="/CharacterCreation">Tworzenie Postaci</Link>
  </nav>
);

export default Navbar;
