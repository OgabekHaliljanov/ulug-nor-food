import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useLanguage } from '../lenguage/LanguageContext';

const Navbar = () => {
  const [menuActive, setMenuActive] = useState(false);
  const { language, switchLanguage } = useLanguage();

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/" className="logo-link">{language === 'en' ? 'FastFood' : 'Фастфуд'}</Link>
      </div>
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>
      <div className={`nav-links ${menuActive ? 'active' : ''}`}>
        <Link to="/home" className="nav-link">{language === 'en' ? 'Home' : 'Главная'}</Link>
        <Link to="/menu" className="nav-link">{language === 'en' ? 'Menu' : 'Меню'}</Link>
        <Link to="/checkout" className="nav-link">{language === 'en' ? 'Menu' : 'karzinka'}</Link>
      </div>
      <div className="language-switcher">
        <button onClick={() => switchLanguage('en')}>EN</button>
        <button onClick={() => switchLanguage('ru')}>RU</button>
      </div>
    </div>
  );
};

export default Navbar;
