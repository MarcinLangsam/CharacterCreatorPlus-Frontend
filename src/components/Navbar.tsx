import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => (
  <nav>
    <Link className="m-5" to="/">Menu Główne</Link>
    <Link to="/second">Tworzenie Postaci</Link>
  </nav>
);

export default Navbar;
