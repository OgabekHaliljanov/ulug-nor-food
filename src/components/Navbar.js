import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Подключаем стили

const Navbar = () => {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/" className="logo-link">FastFood</Link>
      </div>
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>
      <div className={`nav-links ${menuActive ? 'active' : ''}`}>
        <Link to="/home" className="nav-link">Home</Link>
        <Link to="/menu" className="nav-link">Menu</Link>
        <Link to="/checkout" className="nav-link">Checkout</Link>
      </div>
    </div>
  );
};

export default Navbar;
