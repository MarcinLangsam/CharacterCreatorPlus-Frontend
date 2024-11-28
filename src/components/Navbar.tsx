import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => (
  <nav>
    <Link className="m-5" to="/">Menu Główne</Link>
    <Link className="m-5" to="/CharacterCreation">Tworzenie Postaci</Link>
    <Link className="m-5" to="/HexEdit">Hex Edit</Link>
  </nav>
);

export default Navbar;
