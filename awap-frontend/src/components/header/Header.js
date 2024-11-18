import React, { useState } from 'react';
import './Header.css'

// actual logo of the app needs to be added
// need to add the functionality of putting a profile picture instead of "login" and "signup" once the user has logged in
// links need to be working for the correct pages, will do this in a later push

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">Logo</div>
        <button
          type="button"
          className={`menu-btn ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
        >
          <span className="line line-1"></span>
          <span className="line line-2"></span>
          <span className="line line-3"></span>
        </button>
        <nav className={`menu ${isMenuOpen ? 'open' : ''}`}>
          <li><a href="#">Home</a></li>
          <li><a href="#">Search</a></li>
          <li><a href="#">Showtimes</a></li>
          <li><a href="#">Favourites</a></li>
          <li><a href="#">Groups</a></li>
          <li><a href="#">About Us</a></li>
          <button className="nav-btn">Log In</button>
          <button className="nav-btn">Sign Up</button>
        </nav>
      </div>
    </header>
  );
}
