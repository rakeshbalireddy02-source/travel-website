import React, { useState, useEffect } from 'react';
import { 
  Compass, MapPin, Calendar, Users, Star, ArrowRight, ShieldCheck, 
  Headphones, Award, Sparkles, Check, Heart, Plane, Search, X, Gift, Copy, Maximize2 
} from 'lucide-react';
import { DESTINATIONS, PACKAGES, TESTIMONIALS } from '../data/travelData';
import AnimatedCounter from '../components/AnimatedCounter';

export default function Home({ onSelectDestination, onSelectPackage, navigateTo }) {
  const [searchLocation, setSearchLocation] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchGuests, setSearchGuests] = useState('2');

  // Promo pop-up state
  const [showPromoPopup, setShowPromoPopup] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Image lightbox state
  const [lightboxImage, setLightboxImage] = useState(null);

  useEffect(() => {
    // Automatically trigger promo popup after 1.2 seconds if not dismissed in session
    const hasSeenPopup = sessionStorage.getItem('travelgo_popup_seen');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setShowPromoPopup(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClosePopup = () => {
    setShowPromoPopup(false);
    sessionStorage.setItem('travelgo_popup_seen', 'true');
  };

  const handleCopyCode = () => {
    navigator.clipboard?.writeText('TRAVELGO250');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 3000);
  };

  const handleClaimOffer = () => {
    handleClosePopup();
    // Select the featured Kashmir package
    const kashmirPkg = PACKAGES.find(p => p.destination.includes('Kashmir')) || PACKAGES[0];
    onSelectPackage(kashmirPkg);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchLocation) {
      // Find matching destination or go to destinations
      const match = DESTINATIONS.find(d => 
        d.name.toLowerCase().includes(searchLocation.toLowerCase()) || 
        d.category.toLowerCase().includes(searchLocation.toLowerCase()) ||
        (d.state && d.state.toLowerCase().includes(searchLocation.toLowerCase()))
      );
      if (match) {
        onSelectDestination(match);
        return;
      }
    }
    navigateTo('destinations');
  };

  return (
    <div>
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <p>DISCOVER INCREDIBLE INDIA</p>
          <h1>Explore India's Majestic Wonders & Heritage</h1>
          <span>
            Curated royal palace retreats, serene backwater cruises, snow-capped Himalayan escapes, and tropical beach getaways across India.
          </span>

          <div className="hero-buttons">
            <button 
              className="primary-button"
              onClick={() => navigateTo('destinations')}
            >
              <Compass size={18} style={{ marginRight: '8px' }} />
              Explore Indian Destinations
            </button>
            <button 
              className="secondary-button"
              onClick={() => navigateTo('packages')}
            >
              View Tour Packages
            </button>
          </div>

          {/* Quick Search Widget */}
          <form className="hero-search-box" onSubmit={handleSearchSubmit}>
            <div className="search-field">
              <label><MapPin size={14} color="#0f766e" /> Destination</label>
              <input 
                type="text" 
                placeholder="Where to? (e.g. Goa, Kashmir, Kerala, Ladakh)" 
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
              />
            </div>

            <div className="search-field">
              <label><Calendar size={14} color="#0f766e" /> Travel Date</label>
              <input 
                type="date" 
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
              />
            </div>

            <div className="search-field">
              <label><Users size={14} color="#0f766e" /> Travelers</label>
              <select value={searchGuests} onChange={(e) => setSearchGuests(e.target.value)}>
                <option value="1">1 Solo Explorer</option>
                <option value="2">2 Travelers (Couple)</option>
                <option value="4">3 - 4 Family / Group</option>
                <option value="6">5+ Large Party</option>
              </select>
            </div>

            <button type="submit" className="search-submit-btn">
              <Search size={16} />
              Find Trips
            </button>
          </form>

          {/* Hero Quick Stats Badge */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '25px', marginTop: '30px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffffff' }}>
              <span style={{ fontSize: '20px', fontWeight: 800, color: '#5eead4' }}>
                <AnimatedCounter target={150} suffix="+" duration={1800} />
              </span>
              <span style={{ fontSize: '13px', opacity: 0.9 }}>Destinations</span>
            </div>
            <div style={{ width: '1px', height: '16px', background: 'rgba(255,255,255,0.3)' }}></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffffff' }}>
              <span style={{ fontSize: '20px', fontWeight: 800, color: '#5eead4' }}>
                <AnimatedCounter target={28000} suffix="+" duration={2200} formatComma={true} />
              </span>
              <span style={{ fontSize: '13px', opacity: 0.9 }}>Happy Travelers</span>
            </div>
            <div style={{ width: '1px', height: '16px', background: 'rgba(255,255,255,0.3)' }}></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffffff' }}>
              <span style={{ fontSize: '20px', fontWeight: 800, color: '#5eead4' }}>
                <AnimatedCounter target={4.9} suffix=" / 5.0" decimals={1} duration={1600} />
              </span>
              <span style={{ fontSize: '13px', opacity: 0.9 }}>Avg Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE TRAVELGO */}
      <section className="section" style={{ background: '#ffffff' }}>
        <div className="section-title">
          <p>OUR COMMITMENT</p>
          <h2>Why Travel With TravelGo</h2>
          <span>Crafting memorable journeys with unmatched peace of mind and world-class care</span>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <Award size={28} />
            </div>
            <h3>Handpicked Luxury</h3>
            <p>Every resort, boutique villa, and excursion is vetted personally for premier comfort & quality.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <ShieldCheck size={28} />
            </div>
            <h3>Best Price Guarantee</h3>
            <p>Direct partnerships with top airlines and 5★ resorts ensure transparent and unbeatable rates.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Headphones size={28} />
            </div>
            <h3>24/7 VIP Concierge</h3>
            <p>Dedicated personal travel specialists assist you round the clock from booking to homecoming.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Sparkles size={28} />
            </div>
            <h3>100% Flexible</h3>
            <p>Stress-free booking with zero cancellation fees up to 14 days prior to departure.</p>
          </div>
        </div>
      </section>

      {/* POPULAR DESTINATIONS */}
      <section className="destinations-section">
        <div className="section-title">
          <p>CURATED EXPERIENCES</p>
          <h2>Trending Destinations</h2>
          <span>Discover the world’s most sought-after paradises and cultural capitals</span>
        </div>

        <div className="destinations-grid">
          {DESTINATIONS.slice(0, 6).map((dest) => (
            <div key={dest.id} className="destination-card">
              <div 
                className="destination-image-wrap" 
                style={{ cursor: 'pointer' }}
                onClick={() => setLightboxImage(dest)}
                title="Click to view full photo"
              >
                <img src={dest.image} alt={dest.name} loading="lazy" />
                <span className="card-top-badge">{dest.category}</span>
                <div style={{
                  position: 'absolute',
                  bottom: '10px',
                  right: '10px',
                  background: 'rgba(0,0,0,0.5)',
                  color: '#fff',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(4px)'
                }}>
                  <Maximize2 size={15} />
                </div>
              </div>
              <div className="destination-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span className="badge-tag">{dest.tagline}</span>
                  <div className="rating-pill">
                    <Star size={12} fill="#f59e0b" color="#f59e0b" />
                    <span>{dest.rating}</span>
                  </div>
                </div>
                <h3>{dest.name}</h3>
                <p>{dest.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #f1f5f9' }}>
                  <div className="destination-price">
                    From ₹{dest.price.toLocaleString('en-IN')} <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 400 }}>/ person</span>
                  </div>
                  <button 
                    className="primary-button" 
                    style={{ padding: '8px 16px', fontSize: '13px' }}
                    onClick={() => onSelectDestination(dest)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <button 
            className="secondary-button" 
            style={{ padding: '12px 28px', fontSize: '15px' }}
            onClick={() => navigateTo('destinations')}
          >
            Explore All Indian Destinations <ArrowRight size={16} style={{ marginLeft: '8px' }} />
          </button>
        </div>
      </section>

      {/* FEATURED PACKAGES */}
      <section className="packages-section">
        <div className="section-title">
          <p>ALL-INCLUSIVE GETAWAYS</p>
          <h2>Featured India Tour Packages</h2>
          <span>Handcrafted comprehensive travel packages with heritage stays, flights/trains & private tours</span>
        </div>

        <div className="packages-grid">
          {PACKAGES.slice(0, 3).map((pkg) => (
            <div key={pkg.id} className="package-card">
              <div 
                className="package-image-wrap" 
                style={{ cursor: 'pointer' }}
                onClick={() => setLightboxImage({ image: pkg.image, name: pkg.title, description: pkg.overview, price: pkg.price })}
                title="Click to view full photo"
              >
                <img src={pkg.image} alt={pkg.title} loading="lazy" />
                <span className="card-top-badge" style={{ background: '#f59e0b', color: '#fff' }}>{pkg.badge}</span>
                <div style={{
                  position: 'absolute',
                  bottom: '10px',
                  right: '10px',
                  background: 'rgba(0,0,0,0.5)',
                  color: '#fff',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Maximize2 size={15} />
                </div>
              </div>
              <div className="package-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '13px', color: '#0f766e', fontWeight: 600 }}>{pkg.duration}</span>
                  <div className="rating-pill">
                    <Star size={12} fill="#f59e0b" color="#f59e0b" />
                    <span>{pkg.rating}</span>
                  </div>
                </div>
                <h3>{pkg.title}</h3>
                <p>{pkg.overview}</p>

                <ul className="perks-list">
                  {pkg.includes.slice(0, 3).map((item, idx) => (
                    <li key={idx}>
                      <Check size={14} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="package-price">
                  <div>
                    <strong>₹{pkg.price.toLocaleString('en-IN')}</strong>
                    <span> / person</span>
                  </div>
                  {pkg.originalPrice && (
                    <span style={{ textDecoration: 'line-through', color: '#94a3b8', fontSize: '13px' }}>
                      ₹{pkg.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>

                <button 
                  className="package-button"
                  onClick={() => onSelectPackage(pkg)}
                >
                  Book This Package
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <button 
            className="secondary-button" 
            style={{ padding: '12px 28px', fontSize: '15px' }}
            onClick={() => navigateTo('packages')}
          >
            View All Tour Packages <ArrowRight size={16} style={{ marginLeft: '8px' }} />
          </button>
        </div>
      </section>

      {/* TRAVEL STATS BANNER */}
      <section style={{ background: '#0f766e', color: '#ffffff', padding: '70px 8%' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', color: '#ffffff', marginBottom: '16px' }}>Our Journey In Numbers</h2>
          <p style={{ color: '#ccfbf1', fontSize: '16px', maxWidth: '600px', margin: '0 auto 40px' }}>
            Trusted by travelers across 28 states and union territories for memorable Indian vacations.
          </p>

          <div className="stats-grid">
            <div className="stat-box" style={{ background: 'rgba(255, 255, 255, 0.12)', borderColor: 'rgba(255, 255, 255, 0.2)' }}>
              <div className="stat-number" style={{ color: '#ffffff' }}>
                <AnimatedCounter target={150} suffix="+" duration={2000} />
              </div>
              <div className="stat-label" style={{ color: '#ccfbf1' }}>Destinations Covered</div>
            </div>
            <div className="stat-box" style={{ background: 'rgba(255, 255, 255, 0.12)', borderColor: 'rgba(255, 255, 255, 0.2)' }}>
              <div className="stat-number" style={{ color: '#ffffff' }}>
                <AnimatedCounter target={28000} suffix="+" duration={2400} formatComma={true} />
              </div>
              <div className="stat-label" style={{ color: '#ccfbf1' }}>Happy Explorers</div>
            </div>
            <div className="stat-box" style={{ background: 'rgba(255, 255, 255, 0.12)', borderColor: 'rgba(255, 255, 255, 0.2)' }}>
              <div className="stat-number" style={{ color: '#ffffff' }}>
                <AnimatedCounter target={99.6} suffix="%" decimals={1} duration={2200} />
              </div>
              <div className="stat-label" style={{ color: '#ccfbf1' }}>Positive Feedback</div>
            </div>
            <div className="stat-box" style={{ background: 'rgba(255, 255, 255, 0.12)', borderColor: 'rgba(255, 255, 255, 0.2)' }}>
              <div className="stat-number" style={{ color: '#ffffff' }}>
                <AnimatedCounter target={12} suffix="+" duration={1800} />
              </div>
              <div className="stat-label" style={{ color: '#ccfbf1' }}>Years of Excellence</div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section" style={{ background: '#f8fafc' }}>
        <div className="section-title">
          <p>VOICES OF TRAVELERS</p>
          <h2>What Our Guests Say</h2>
          <span>Real stories from travelers who explored India with TravelGo</span>
        </div>

        <div className="testimonials-grid">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="testimonial-card">
              <div>
                <div style={{ display: 'flex', gap: '3px', marginBottom: '14px' }}>
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <p style={{ fontStyle: 'italic', color: '#475569', fontSize: '15px', lineHeight: '1.7' }}>
                  "{t.comment}"
                </p>
              </div>

              <div className="testimonial-user">
                <img src={t.avatar} alt={t.name} className="testimonial-avatar" />
                <div>
                  <strong style={{ fontSize: '15px', color: '#0f172a', display: 'block' }}>{t.name}</strong>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>{t.role} • {t.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
          POP-UP PROMO IMAGE MODAL
      ========================================================= */}
      {showPromoPopup && (
        <div className="popup-backdrop" onClick={handleClosePopup}>
          <div className="popup-modal" onClick={(e) => e.stopPropagation()}>
            <div className="popup-image-container">
              <img 
                src="/travel-promo-popup.jpg" 
                alt="TravelGo Escape to Paradise Special Offer" 
                className="popup-image"
              />
              <span className="popup-badge">✨ Limited Time Offer</span>
              <button 
                className="popup-close-btn" 
                onClick={handleClosePopup}
                aria-label="Close Modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="popup-body">
              <h3>Special Festive Offer: Flat ₹2,500 OFF!</h3>
              <p>
                Book your dream houseboat cruise in Kerala, Kashmir snow retreat, or Royal Rajasthan palace tour today. Use coupon code at checkout:
              </p>

              <div className="promo-code-pill" onClick={handleCopyCode} title="Click to copy promo code">
                <span>Code:</span>
                <strong>TRAVELGO2500</strong>
                <span style={{ fontSize: '12px', color: '#0f766e', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {copiedCode ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                  {copiedCode ? 'Copied!' : 'Copy'}
                </span>
              </div>

              <div className="popup-actions">
                <button 
                  className="secondary-button" 
                  onClick={handleClosePopup}
                >
                  Maybe Later
                </button>
                <button 
                  className="primary-button" 
                  onClick={handleClaimOffer}
                >
                  Claim & Book Now <ArrowRight size={16} style={{ marginLeft: '6px' }} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          IMAGE LIGHTBOX PREVIEW MODAL
      ========================================================= */}
      {lightboxImage && (
        <div className="popup-backdrop" onClick={() => setLightboxImage(null)}>
          <div 
            className="popup-modal" 
            style={{ maxWidth: '720px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ position: 'relative', width: '100%', height: '380px', background: '#000' }}>
              <img 
                src={lightboxImage.image} 
                alt={lightboxImage.name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <button 
                className="popup-close-btn" 
                onClick={() => setLightboxImage(null)}
                aria-label="Close Preview"
              >
                <X size={20} />
              </button>
            </div>

            <div className="popup-body" style={{ textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h3 style={{ margin: 0 }}>{lightboxImage.name}</h3>
                {lightboxImage.price && (
                  <strong style={{ color: '#0f766e', fontSize: '20px' }}>
                    From ₹{lightboxImage.price.toLocaleString('en-IN')} <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 400 }}>/ person</span>
                  </strong>
                )}
              </div>
              <p style={{ margin: '10px 0 20px' }}>{lightboxImage.description}</p>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button 
                  className="secondary-button" 
                  onClick={() => setLightboxImage(null)}
                >
                  Close Preview
                </button>
                <button 
                  className="primary-button" 
                  onClick={() => {
                    setLightboxImage(null);
                    onSelectDestination(lightboxImage);
                  }}
                >
                  Book This Experience
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Offer Trigger Button */}
      <button 
        className="floating-offer-btn"
        onClick={() => setShowPromoPopup(true)}
        title="View Exclusive TravelGo Offer"
      >
        <Gift size={18} />
        <span>Special ₹2,500 Offer</span>
      </button>
    </div>
  );
}


