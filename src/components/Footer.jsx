import React from 'react';
import { Compass, Mail, Phone, MapPin, Heart, ArrowRight } from 'lucide-react';

export default function Footer({ setCurrentPage }) {
  const handleNav = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto 40px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '35px',
        textAlign: 'left'
      }}>
        <div>
          <div 
            className="footer-logo" 
            style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#5eead4' }}
            onClick={() => handleNav('home')}
          >
            <Compass size={28} />
            <span>TravelGo</span>
          </div>
          <p style={{ marginTop: '12px', fontSize: '14px', lineHeight: '1.7', color: '#94a3b8' }}>
            Curating breathtaking adventures, bespoke vacations, and luxury tours across 150+ breathtaking destinations around the globe.
          </p>
        </div>

        <div>
          <h4 style={{ color: '#ffffff', fontSize: '16px', marginBottom: '16px', fontWeight: 600 }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li><a href="#home" onClick={(e) => { e.preventDefault(); handleNav('home'); }} style={{ color: '#cbd5e1', fontSize: '14px' }}>Home</a></li>
            <li><a href="#destinations" onClick={(e) => { e.preventDefault(); handleNav('destinations'); }} style={{ color: '#cbd5e1', fontSize: '14px' }}>Destinations</a></li>
            <li><a href="#packages" onClick={(e) => { e.preventDefault(); handleNav('packages'); }} style={{ color: '#cbd5e1', fontSize: '14px' }}>Tour Packages</a></li>
            <li><a href="#about" onClick={(e) => { e.preventDefault(); handleNav('about'); }} style={{ color: '#cbd5e1', fontSize: '14px' }}>About TravelGo</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); handleNav('contact'); }} style={{ color: '#cbd5e1', fontSize: '14px' }}>Contact & Support</a></li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: '#ffffff', fontSize: '16px', marginBottom: '16px', fontWeight: 600 }}>Top Destinations in India</h4>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li><a href="#destinations" onClick={(e) => { e.preventDefault(); handleNav('destinations'); }} style={{ color: '#cbd5e1', fontSize: '14px' }}>Goa Coastal Paradise</a></li>
            <li><a href="#destinations" onClick={(e) => { e.preventDefault(); handleNav('destinations'); }} style={{ color: '#cbd5e1', fontSize: '14px' }}>Kerala Backwaters & Munnar</a></li>
            <li><a href="#destinations" onClick={(e) => { e.preventDefault(); handleNav('destinations'); }} style={{ color: '#cbd5e1', fontSize: '14px' }}>Kashmir (Srinagar & Gulmarg)</a></li>
            <li><a href="#destinations" onClick={(e) => { e.preventDefault(); handleNav('destinations'); }} style={{ color: '#cbd5e1', fontSize: '14px' }}>Royal Rajasthan (Jaipur & Udaipur)</a></li>
            <li><a href="#destinations" onClick={(e) => { e.preventDefault(); handleNav('destinations'); }} style={{ color: '#cbd5e1', fontSize: '14px' }}>Leh Ladakh High Passes</a></li>
            <li><a href="#destinations" onClick={(e) => { e.preventDefault(); handleNav('destinations'); }} style={{ color: '#cbd5e1', fontSize: '14px' }}>Andaman & Nicobar Islands</a></li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: '#ffffff', fontSize: '16px', marginBottom: '16px', fontWeight: 600 }}>Newsletter</h4>
          <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '12px' }}>
            Get secret travel discounts & exclusive itineraries straight to your inbox.
          </p>
          <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing to TravelGo deals!'); }} style={{ display: 'flex', gap: '6px' }}>
            <input 
              type="email" 
              placeholder="Your email" 
              required
              style={{
                flex: 1,
                padding: '10px 12px',
                borderRadius: '6px',
                border: '1px solid #334155',
                background: '#1e293b',
                color: '#fff',
                fontSize: '13px',
                outline: 'none'
              }}
            />
            <button 
              type="submit"
              style={{
                background: '#0f766e',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                padding: '0 14px',
                cursor: 'pointer'
              }}
            >
              <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>

      <div style={{ borderTop: '1px solid #1e3a3a', paddingTop: '25px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto', fontSize: '13px', color: '#94a3b8' }}>
        <p>© {new Date().getFullYear()} TravelGo Inc. All rights reserved.</p>
        <p style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          Crafted with <Heart size={14} color="#ef4444" fill="#ef4444" /> for adventurous souls
        </p>
      </div>
    </footer>
  );
}
