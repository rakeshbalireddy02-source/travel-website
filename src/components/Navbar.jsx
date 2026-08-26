import React, { useState } from 'react';
import { Compass, Menu, X, LogIn, LogOut, User, Luggage, MapPin } from 'lucide-react';

export default function Navbar({ currentPage, setCurrentPage, currentUser, onLogout, bookingsCount = 0 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="navbar">
      <div 
        className="nav-logo" 
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
        onClick={() => handleNavClick('home')}
      >
        <Compass size={30} color="#0f766e" />
        <span>Travel<span style={{ color: '#0d9488' }}>Go</span></span>
      </div>

      <nav className={`nav-links ${mobileMenuOpen ? 'mobile-active' : ''}`}>
        <a 
          href="#home" 
          className={currentPage === 'home' ? 'active' : ''} 
          onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
        >
          Home
        </a>
        <a 
          href="#destinations" 
          className={currentPage === 'destinations' ? 'active' : ''} 
          onClick={(e) => { e.preventDefault(); handleNavClick('destinations'); }}
        >
          Destinations
        </a>
        <a 
          href="#packages" 
          className={currentPage === 'packages' ? 'active' : ''} 
          onClick={(e) => { e.preventDefault(); handleNavClick('packages'); }}
        >
          Packages
        </a>
        <a 
          href="#about" 
          className={currentPage === 'about' ? 'active' : ''} 
          onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}
        >
          About Us
        </a>
        <a 
          href="#contact" 
          className={currentPage === 'contact' ? 'active' : ''} 
          onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}
        >
          Contact
        </a>
        <a 
          href="#my-bookings" 
          className={currentPage === 'my-bookings' ? 'active' : ''} 
          onClick={(e) => { e.preventDefault(); handleNavClick('my-bookings'); }}
        >
          My Bookings
          {bookingsCount > 0 && <span className="nav-badge">{bookingsCount}</span>}
        </a>
      </nav>

      <div className="nav-actions">
        {currentUser ? (
          <div className="logout-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: '#334155' }}>
              <User size={16} color="#0f766e" />
              <span>{currentUser.name}</span>
            </div>
            <button className="logout-button" onClick={onLogout} title="Sign Out">
              <span className="logout-icon"><LogOut size={16} /></span>
              <span>Logout</span>
            </button>
          </div>
        ) : (
          <button 
            className="secondary-button" 
            style={{ padding: '8px 16px', fontSize: '13px' }}
            onClick={() => handleNavClick('login')}
          >
            <LogIn size={15} style={{ marginRight: '6px' }} />
            Login
          </button>
        )}

        <button 
          className="nav-button"
          onClick={() => handleNavClick('booking')}
        >
          <Luggage size={16} style={{ marginRight: '6px' }} />
          Book Now
        </button>

        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}
