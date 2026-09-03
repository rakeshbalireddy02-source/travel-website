import React, { useState, useEffect } from 'react';
import { DESTINATIONS, PACKAGES } from '../data/travelData';
import { CheckCircle2, Calendar, Users, MapPin, ShieldCheck, CreditCard } from 'lucide-react';

export default function Booking({ initialItem, currentUser, onAddBooking, navigateTo }) {
  const [selectedDestId, setSelectedDestId] = useState('');
  const [selectedPkgId, setSelectedPkgId] = useState('');
  const [fullName, setFullName] = useState(currentUser?.name || 'Rakesh Reddy');
  const [email, setEmail] = useState(currentUser?.email || 'rakesh.reddy@example.com');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [travelDate, setTravelDate] = useState('2026-09-20');
  const [returnDate, setReturnDate] = useState('2026-09-26');
  const [travelers, setTravelers] = useState(2);
  const [accommodationTier, setAccommodationTier] = useState('deluxe');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Set initial item if passed from Destinations or Packages
  useEffect(() => {
    if (initialItem) {
      if (initialItem.title) {
        // It's a package
        setSelectedPkgId(initialItem.id);
        setSelectedDestId('');
      } else if (initialItem.name) {
        // It's a destination
        setSelectedDestId(initialItem.id);
        setSelectedPkgId('');
      }
    } else {
      // Default to first destination
      setSelectedDestId(DESTINATIONS[0].id);
    }
  }, [initialItem]);

  // Determine current active selection
  const currentPkg = PACKAGES.find(p => p.id === selectedPkgId);
  const currentDest = DESTINATIONS.find(d => d.id === selectedDestId);

  const basePricePerPerson = currentPkg ? currentPkg.price : (currentDest ? currentDest.price : 14999);
  const itemName = currentPkg ? currentPkg.title : (currentDest ? currentDest.name : 'Goa');

  const tierUpgrade = accommodationTier === 'luxury' ? 4500 : (accommodationTier === 'deluxe' ? 2000 : 0);
  const tierLabel = accommodationTier === 'luxury' 
    ? 'Luxury 5★ Palace / Houseboat (+ ₹4,500/p)' 
    : (accommodationTier === 'deluxe' ? 'Deluxe 4★ Resort (+ ₹2,000/p)' : 'Standard 3★ Heritage Stay (Included)');

  const subtotal = (basePricePerPerson + tierUpgrade) * travelers;
  const gst = Math.round(subtotal * 0.05); // 5% GST on Indian tour packages
  const total = subtotal + gst;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newBooking = {
        id: `TG-${Math.floor(10000 + Math.random() * 90000)}`,
        destination: currentPkg ? currentPkg.destination : (currentDest ? currentDest.name : itemName),
        packageTitle: itemName,
        userName: fullName,
        userEmail: email,
        userPhone: phone,
        travelDate: travelDate || new Date().toISOString().split('T')[0],
        returnDate: returnDate || new Date(Date.now() + 6 * 86400000).toISOString().split('T')[0],
        travelers: Number(travelers),
        tier: tierLabel,
        pricePerPerson: basePricePerPerson + tierUpgrade,
        totalPrice: total,
        status: 'Confirmed',
        bookedOn: new Date().toISOString().split('T')[0],
        specialRequests: specialRequests || 'No special requests provided.'
      };

      onAddBooking(newBooking);
      setIsSubmitting(false);
      navigateTo('my-bookings');
    }, 600);
  };

  return (
    <div className="booking-page">
      <div className="page-header">
        <div>
          <p>SEAMLESS RESERVATION</p>
          <h1>Book Your Indian Vacation</h1>
          <span>Instant reservation with 100% verified hotels, private chauffeurs, and zero hidden fees</span>
        </div>
      </div>

      <section className="booking-section">
        <div className="booking-container">
          {/* Booking Form */}
          <div className="booking-form">
            <h2>Traveler & Trip Details</h2>

            <form onSubmit={handleSubmit}>
              {/* Trip Selection */}
              <div className="form-group">
                <label>Select Tour Package or Destination</label>
                <select 
                  value={selectedPkgId ? `pkg:${selectedPkgId}` : `dest:${selectedDestId}`}
                  onChange={(e) => {
                    const [type, id] = e.target.value.split(':');
                    if (type === 'pkg') {
                      setSelectedPkgId(id);
                      setSelectedDestId('');
                    } else {
                      setSelectedDestId(id);
                      setSelectedPkgId('');
                    }
                  }}
                >
                  <optgroup label="Featured Tour Packages">
                    {PACKAGES.map(p => (
                      <option key={p.id} value={`pkg:${p.id}`}>{p.title} (₹{p.price.toLocaleString('en-IN')}/p)</option>
                    ))}
                  </optgroup>
                  <optgroup label="Individual Destinations">
                    {DESTINATIONS.map(d => (
                      <option key={d.id} value={`dest:${d.id}`}>{d.name} (₹{d.price.toLocaleString('en-IN')}/p)</option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {/* Personal Details */}
              <div className="form-group">
                <label>Full Name *</label>
                <input 
                  type="text" 
                  required 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input 
                    type="email" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="rahul.sharma@example.com"
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input 
                    type="tel" 
                    required 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              {/* Dates */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div className="form-group">
                  <label>Departure Date *</label>
                  <input 
                    type="date" 
                    required 
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Return Date *</label>
                  <input 
                    type="date" 
                    required 
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                  />
                </div>
              </div>

              {/* Travelers & Accommodation */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div className="form-group">
                  <label>Number of Travelers</label>
                  <div className="days-control">
                    <button 
                      type="button" 
                      onClick={() => setTravelers(Math.max(1, travelers - 1))}
                    >
                      -
                    </button>
                    <input 
                      type="number" 
                      min="1" 
                      max="20" 
                      value={travelers} 
                      readOnly 
                    />
                    <button 
                      type="button" 
                      onClick={() => setTravelers(travelers + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label>Accommodation Tier</label>
                  <select 
                    value={accommodationTier}
                    onChange={(e) => setAccommodationTier(e.target.value)}
                  >
                    <option value="standard">Standard 3★ Heritage Stay (Included)</option>
                    <option value="deluxe">Deluxe 4★ Premium Resort (+₹2,000/p)</option>
                    <option value="luxury">Luxury 5★ Palace / Houseboat (+₹4,500/p)</option>
                  </select>
                </div>
              </div>

              {/* Special Requests */}
              <div className="form-group">
                <label>Special Requests or Notes (Optional)</label>
                <textarea 
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g. Vegetarian/Jain meals, airport pickup, Dal Lake houseboat preference..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="primary-button" 
                style={{ width: '100%', padding: '14px', fontSize: '16px' }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Securing Your Booking...' : 'Confirm & Reserve Now'}
              </button>
            </form>
          </div>

          {/* Booking Summary */}
          <div className="booking-summary">
            <h2>Booking Summary</h2>

            <div className="summary-row">
              <span>Selected Experience</span>
              <strong>{itemName}</strong>
            </div>

            <div className="summary-row">
              <span>Base Price / Person</span>
              <strong>₹{basePricePerPerson.toLocaleString('en-IN')}</strong>
            </div>

            <div className="summary-row">
              <span>Travelers</span>
              <strong>{travelers} {travelers === 1 ? 'Guest' : 'Guests'}</strong>
            </div>

            <div className="summary-row">
              <span>Accommodation Tier</span>
              <strong>{accommodationTier.toUpperCase()} (+₹{tierUpgrade.toLocaleString('en-IN')}/p)</strong>
            </div>

            <div className="summary-row">
              <span>Departure</span>
              <strong>{travelDate || 'Not selected'}</strong>
            </div>

            <div className="summary-row">
              <span>Return</span>
              <strong>{returnDate || 'Not selected'}</strong>
            </div>

            <div className="summary-row">
              <span>Govt. GST & Taxes (5%)</span>
              <strong>₹{gst.toLocaleString('en-IN')}</strong>
            </div>

            <div className="summary-total">
              <div>
                <span>Total Amount Due</span>
                <p style={{ fontSize: '11px', opacity: 0.8 }}>Includes all applicable taxes & insurance</p>
              </div>
              <strong>₹{total.toLocaleString('en-IN')}</strong>
            </div>

            <div style={{ marginTop: '25px', padding: '16px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={18} />
                <span>100% Verified & Guaranteed Reservation</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={18} />
                <span>Free cancellation up to 14 days before trip</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
