import React, { useState } from 'react';
import { 
  Calendar, Users, MapPin, CheckCircle, AlertTriangle, 
  Download, Trash2, ArrowRight, ShieldCheck, Mail, Phone 
} from 'lucide-react';

export default function MyBookings({ bookings, onCancelBooking, navigateTo }) {
  const [selectedBookingForCancel, setSelectedBookingForCancel] = useState(null);

  const handleCancel = (bookingId) => {
    onCancelBooking(bookingId);
    setSelectedBookingForCancel(null);
  };

  const handleDownloadReceipt = (booking) => {
    const receiptText = `
========================================
TRAVELGO OFFICIAL BOOKING RECEIPT
========================================
Booking Reference: ${booking.id}
Status: ${booking.status}
Booked On: ${booking.bookedOn || 'Recent'}

TRIP INFORMATION:
Experience: ${booking.packageTitle || booking.destination}
Destination: ${booking.destination}
Departure Date: ${booking.travelDate}
Return Date: ${booking.returnDate}
Number of Guests: ${booking.travelers}
Accommodation: ${booking.tier}

GUEST DETAILS:
Lead Traveler: ${booking.userName}
Email: ${booking.userEmail}
Phone: ${booking.userPhone}
Special Requests: ${booking.specialRequests || 'None'}

PAYMENT SUMMARY:
Total Amount Paid: ₹${booking.totalPrice?.toLocaleString('en-IN')} INR
Payment Method: Verified Instant Online
========================================
Thank you for choosing TravelGo!
Support: support@travelgo.com | +91 1800 555 8728
========================================
    `;

    const blob = new Blob([receiptText.trim()], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `TravelGo-Receipt-${booking.id}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="my-bookings-page">
      <div className="page-header">
        <div>
          <p>YOUR TRAVEL ITINERARIES</p>
          <h1>My Bookings</h1>
          <span>Manage your upcoming reservations, download receipts, or customize itineraries</span>
        </div>
      </div>

      <section className="my-bookings-section">
        {bookings.length === 0 ? (
          <div className="no-booking">
            <div className="no-booking-icon">✈️</div>
            <h2>No Active Bookings Found</h2>
            <p>You haven't booked any vacations yet. Ready to start your next adventure?</p>
            <button 
              className="primary-button"
              onClick={() => navigateTo('destinations')}
            >
              Explore Destinations <ArrowRight size={16} style={{ marginLeft: '8px' }} />
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            {bookings.map((booking) => (
              <div key={booking.id} className="booking-card">
                {/* Header */}
                <div className="booking-card-header">
                  <div>
                    <span className="booking-label">BOOKING REFERENCE: {booking.id}</span>
                    <h2>{booking.packageTitle || booking.destination}</h2>
                    <span style={{ fontSize: '13px', color: '#64748b' }}>
                      Booked on: {booking.bookedOn || 'August 2026'}
                    </span>
                  </div>
                  <div className="booking-status">
                    <CheckCircle size={15} style={{ marginRight: '5px', display: 'inline' }} />
                    {booking.status}
                  </div>
                </div>

                {/* Details */}
                <div className="booking-details">
                  <div className="booking-detail">
                    <span>Destination</span>
                    <strong>{booking.destination}</strong>
                  </div>

                  <div className="booking-detail">
                    <span>Travel Period</span>
                    <strong>{booking.travelDate} to {booking.returnDate}</strong>
                  </div>

                  <div className="booking-detail">
                    <span>Travelers</span>
                    <strong>{booking.travelers} {booking.travelers === 1 ? 'Person' : 'Persons'}</strong>
                  </div>

                  <div className="booking-detail">
                    <span>Accommodation Tier</span>
                    <strong>{booking.tier || 'Deluxe 4★ Resort'}</strong>
                  </div>

                  <div className="booking-detail">
                    <span>Price Per Person</span>
                    <strong>₹{(booking.pricePerPerson || Math.round(booking.totalPrice / (booking.travelers || 1))).toLocaleString('en-IN')}</strong>
                  </div>

                  <div className="booking-detail total-detail">
                    <span style={{ color: '#b45309', fontWeight: 600 }}>Total Paid</span>
                    <strong>₹{booking.totalPrice?.toLocaleString('en-IN')} INR</strong>
                  </div>
                </div>

                {/* Traveler Information */}
                <div className="traveler-info">
                  <h3>Lead Traveler Information</h3>
                  <div className="traveler-grid">
                    <div>
                      <span>Full Name</span>
                      <strong>{booking.userName}</strong>
                    </div>
                    <div>
                      <span>Email Address</span>
                      <strong>{booking.userEmail}</strong>
                    </div>
                    <div>
                      <span>Contact Phone</span>
                      <strong>{booking.userPhone}</strong>
                    </div>
                  </div>

                  {booking.specialRequests && (
                    <div style={{ marginTop: '16px', padding: '12px 16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
                      <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Special Notes:</span>
                      <p style={{ fontSize: '13px', color: '#334155', marginTop: '4px' }}>{booking.specialRequests}</p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="booking-actions">
                  <button 
                    className="secondary-button"
                    onClick={() => handleDownloadReceipt(booking)}
                  >
                    <Download size={15} style={{ marginRight: '6px' }} />
                    Download Receipt
                  </button>

                  <button 
                    className="cancel-button"
                    onClick={() => setSelectedBookingForCancel(booking)}
                  >
                    <Trash2 size={15} style={{ marginRight: '6px', display: 'inline' }} />
                    Cancel Booking
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Cancel Confirmation Modal */}
      {selectedBookingForCancel && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          padding: '20px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            maxWidth: '450px',
            width: '100%',
            padding: '30px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            textAlign: 'center'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: '#fef2f2',
              color: '#dc2626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <AlertTriangle size={28} />
            </div>

            <h3 style={{ fontSize: '20px', marginBottom: '8px', color: '#0f172a' }}>Cancel Booking?</h3>
            <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.6', marginBottom: '24px' }}>
              Are you sure you want to cancel reservation <strong>{selectedBookingForCancel.id}</strong> ({selectedBookingForCancel.packageTitle || selectedBookingForCancel.destination})? 
              A 100% refund of ${selectedBookingForCancel.totalPrice} will be processed immediately.
            </p>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                className="secondary-button" 
                style={{ flex: 1 }}
                onClick={() => setSelectedBookingForCancel(null)}
              >
                Keep Booking
              </button>
              <button 
                className="cancel-button" 
                style={{ flex: 1 }}
                onClick={() => handleCancel(selectedBookingForCancel.id)}
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
