import React, { useState } from 'react';
import { Star, MapPin, Search, Check, ArrowRight } from 'lucide-react';
import { DESTINATIONS } from '../data/travelData';

export default function Destinations({ onSelectDestination }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  const categories = ['All', 'Beaches', 'Romantic', 'Mountains', 'Historic', 'Luxury', 'Adventure'];

  const filteredDestinations = DESTINATIONS.filter((dest) => {
    const matchesCategory = selectedCategory === 'All' || dest.category === selectedCategory;
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          dest.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          dest.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  return (
    <div>
      <div className="page-header">
        <div>
          <p>INCREDIBLE INDIA GETAWAYS</p>
          <h1>Iconic Indian Destinations</h1>
          <span>Explore handpicked locations across India's beaches, hill stations, royal palaces & spiritual ghats</span>
        </div>
      </div>

      <div className="destinations-section">
        {/* Filters & Search */}
        <div className="filter-container">
          <div className="category-chips">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`chip-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div className="search-input-wrapper">
              <Search size={16} />
              <input 
                type="text" 
                placeholder="Search Goa, Kashmir, Kerala..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '13px',
                outline: 'none',
                background: '#fff'
              }}
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Destinations Grid */}
        {filteredDestinations.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff', borderRadius: '12px' }}>
            <h3>No destinations found</h3>
            <p style={{ color: '#64748b', marginTop: '8px' }}>Try adjusting your search query or category filters.</p>
            <button 
              className="primary-button" 
              style={{ marginTop: '20px' }}
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="destinations-grid">
            {filteredDestinations.map((dest) => (
              <div key={dest.id} className="destination-card">
                <div className="destination-image-wrap">
                  <img src={dest.image} alt={dest.name} loading="lazy" />
                  <span className="card-top-badge">{dest.category}</span>
                </div>
                
                <div className="destination-content">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span className="badge-tag">{dest.tagline}</span>
                    <div className="rating-pill">
                      <Star size={12} fill="#f59e0b" color="#f59e0b" />
                      <span>{dest.rating}</span>
                      <span style={{ fontSize: '10px', color: '#94a3b8' }}>({dest.reviewsCount})</span>
                    </div>
                  </div>

                  <h3>{dest.name}</h3>
                  <p>{dest.description}</p>

                  <div style={{ marginBottom: '16px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.5px' }}>
                      Top Highlights:
                    </span>
                    <ul className="perks-list">
                      {dest.highlights.slice(0, 2).map((h, i) => (
                        <li key={i}>
                          <Check size={13} color="#0f766e" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '15px', borderTop: '1px solid #f1f5f9' }}>
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
        )}
      </div>
    </div>
  );
}
