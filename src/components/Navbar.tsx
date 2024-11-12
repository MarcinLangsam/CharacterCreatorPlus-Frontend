import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => (
  <nav>
    <Link to="/">MainMenu</Link>
    <Link to="/second">CharacterCreation</Link>
  </nav>
);

export default Navbar;
