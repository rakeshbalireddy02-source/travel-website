import React, { useState } from 'react';
import { Star, Check, Calendar, Users, Shield, Clock } from 'lucide-react';
import { PACKAGES } from '../data/travelData';

export default function Packages({ onSelectPackage }) {
  const [filterDuration, setFilterDuration] = useState('All');

  const filteredPackages = PACKAGES.filter((pkg) => {
    if (filterDuration === 'All') return true;
    if (filterDuration === 'short') return pkg.duration.includes('5 Days') || pkg.duration.includes('6 Days');
    if (filterDuration === 'long') return pkg.duration.includes('7 Days') || pkg.duration.includes('8 Days') || pkg.duration.includes('10 Days');
    return true;
  });

  return (
    <div>
      <div className="page-header">
        <div>
          <p>COMPLETE INDIAN VACATION PACKAGES</p>
          <h1>Curated India Tour Packages</h1>
          <span>All-inclusive bespoke travel itineraries packed with luxury accommodations, heritage houseboats and guided tours</span>
        </div>
      </div>

      <div className="packages-section">
        {/* Filters */}
        <div className="filter-container">
          <div className="category-chips">
            <button 
              className={`chip-btn ${filterDuration === 'All' ? 'active' : ''}`}
              onClick={() => setFilterDuration('All')}
            >
              All Packages ({PACKAGES.length})
            </button>
            <button 
              className={`chip-btn ${filterDuration === 'short' ? 'active' : ''}`}
              onClick={() => setFilterDuration('short')}
            >
              Short Getaways (4-5 Days)
            </button>
            <button 
              className={`chip-btn ${filterDuration === 'long' ? 'active' : ''}`}
              onClick={() => setFilterDuration('long')}
            >
              Grand Journeys (6-7 Days)
            </button>
          </div>

          <div style={{ fontSize: '13px', color: '#64748b' }}>
            Showing {filteredPackages.length} handcrafted Indian vacation packages
          </div>
        </div>

        {/* Packages Grid */}
        <div className="packages-grid">
          {filteredPackages.map((pkg) => (
            <div key={pkg.id} className="package-card">
              <div className="package-image-wrap">
                <img src={pkg.image} alt={pkg.title} loading="lazy" />
                <span className="card-top-badge" style={{ background: '#f59e0b', color: '#fff' }}>
                  {pkg.badge}
                </span>
              </div>

              <div className="package-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: '#0f766e', fontWeight: 600 }}>
                    <Clock size={14} />
                    <span>{pkg.duration}</span>
                  </div>
                  <div className="rating-pill">
                    <Star size={12} fill="#f59e0b" color="#f59e0b" />
                    <span>{pkg.rating}</span>
                  </div>
                </div>

                <h3>{pkg.title}</h3>
                <p>{pkg.overview}</p>

                <div style={{ margin: '14px 0', padding: '12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    What's Included:
                  </div>
                  <ul className="perks-list">
                    {pkg.includes.map((item, idx) => (
                      <li key={idx}>
                        <Check size={14} color="#0f766e" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#64748b', marginBottom: '14px' }}>
                  <span>Group: {pkg.groupSize}</span>
                  <span>{pkg.departure}</span>
                </div>

                <div className="package-price">
                  <div>
                    <strong>₹{pkg.price.toLocaleString('en-IN')}</strong>
                    <span> / person</span>
                  </div>
                  {pkg.originalPrice && (
                    <span style={{ textDecoration: 'line-through', color: '#94a3b8', fontSize: '14px' }}>
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
      </div>
    </div>
  );
}
