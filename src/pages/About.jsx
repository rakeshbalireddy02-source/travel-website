import React from 'react';
import { Compass, Globe, Heart, Shield, Award, Users, ArrowRight } from 'lucide-react';
import AnimatedCounter from '../components/AnimatedCounter';

export default function About({ navigateTo }) {
  return (
    <div>
      <div className="page-header">
        <div>
          <p>OUR STORY & PASSION</p>
          <h1>About TravelGo</h1>
          <span>Connecting curious wanderers with extraordinary, soul-stirring journeys worldwide</span>
        </div>
      </div>

      {/* Main Story */}
      <section className="about-section">
        <div className="about-container">
          <div className="about-image">
            <img 
              src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80" 
              alt="Travelers exploring breathtaking landscape" 
            />
          </div>

          <div className="about-content">
            <span style={{ fontSize: '13px', color: '#0f766e', fontWeight: 700, letterSpacing: '1.5px' }}>
              WHO WE ARE
            </span>
            <h2>Crafting Unforgettable Travel Memories Since 2014</h2>
            <p>
              TravelGo was born from a simple belief: that travel isn't just about visiting new places, but about the profound moments that expand our perspectives and enrich our lives.
            </p>
            <p>
              Over the past decade, we have grown into a premier global travel collective, having curated extraordinary journeys for over 28,000 discerning travelers across 150+ breathtaking destinations.
            </p>
            <p>
              From private overwater bungalows in the Maldives and secluded chalets in the Swiss Alps to authentic cultural immersions in Kyoto, our expert concierges design each itinerary with meticulous craftsmanship.
            </p>

            <button 
              className="primary-button" 
              style={{ marginTop: '20px' }}
              onClick={() => navigateTo('destinations')}
            >
              Explore Our Destinations <ArrowRight size={16} style={{ marginLeft: '8px' }} />
            </button>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section style={{ background: '#f8fafc', padding: '80px 8%' }}>
        <div className="section-title">
          <p>OUR PRINCIPLES</p>
          <h2>The Values That Guide Us</h2>
          <span>How we ensure every single journey exceeds your highest expectations</span>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <Globe size={28} />
            </div>
            <h3>Authentic Discovery</h3>
            <p>We go beyond tourist hubs to connect you with indigenous traditions, local artisans, and genuine cultures.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Shield size={28} />
            </div>
            <h3>Safety & Trust</h3>
            <p>Comprehensive travel insurance, vetted local guides, and 24/7 dedicated support at every step.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Heart size={28} />
            </div>
            <h3>Sustainable Travel</h3>
            <p>We partner with eco-conscious lodges, support wildlife conservation, and minimize ecological footprints.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Award size={28} />
            </div>
            <h3>Bespoke Excellence</h3>
            <p>Every schedule is customized with flexibility to accommodate your specific pace, taste, and lifestyle.</p>
          </div>
        </div>
      </section>

      {/* About Stats Section */}
      <section style={{ background: '#0f766e', color: '#ffffff', padding: '60px 8%' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '30px', color: '#ffffff', marginBottom: '30px' }}>TravelGo At A Glance</h2>
          <div className="stats-grid">
            <div className="stat-box" style={{ background: 'rgba(255, 255, 255, 0.12)', borderColor: 'rgba(255, 255, 255, 0.2)' }}>
              <div className="stat-number" style={{ color: '#ffffff' }}>
                <AnimatedCounter target={150} suffix="+" duration={1800} />
              </div>
              <div className="stat-label" style={{ color: '#ccfbf1' }}>Global Destinations</div>
            </div>
            <div className="stat-box" style={{ background: 'rgba(255, 255, 255, 0.12)', borderColor: 'rgba(255, 255, 255, 0.2)' }}>
              <div className="stat-number" style={{ color: '#ffffff' }}>
                <AnimatedCounter target={28000} suffix="+" duration={2200} formatComma={true} />
              </div>
              <div className="stat-label" style={{ color: '#ccfbf1' }}>Happy Explorers</div>
            </div>
            <div className="stat-box" style={{ background: 'rgba(255, 255, 255, 0.12)', borderColor: 'rgba(255, 255, 255, 0.2)' }}>
              <div className="stat-number" style={{ color: '#ffffff' }}>
                <AnimatedCounter target={99.6} suffix="%" decimals={1} duration={2000} />
              </div>
              <div className="stat-label" style={{ color: '#ccfbf1' }}>Satisfaction Rating</div>
            </div>
            <div className="stat-box" style={{ background: 'rgba(255, 255, 255, 0.12)', borderColor: 'rgba(255, 255, 255, 0.2)' }}>
              <div className="stat-number" style={{ color: '#ffffff' }}>
                <AnimatedCounter target={12} suffix="+" duration={1600} />
              </div>
              <div className="stat-label" style={{ color: '#ccfbf1' }}>Years of Experience</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

