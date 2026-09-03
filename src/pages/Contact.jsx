import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { FAQS } from '../data/travelData';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <p>WE'RE HERE TO ASSIST YOU</p>
          <h1>Get In Touch</h1>
          <span>Have inquiries about an itinerary or need custom vacation planning? Our specialists are available 24/7</span>
        </div>
      </div>

      <section className="contact-section">
        <div className="contact-container">
          {/* Contact Details */}
          <div className="contact-info">
            <h2>Contact Information</h2>
            <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '25px', lineHeight: '1.6' }}>
              Reach out via any of our channels or submit the inquiry form. We reply within 2 hours.
            </p>

            <div className="contact-item">
              <span>HEADQUARTERS & TRAVEL HUB</span>
              <strong>Level 8, Express Towers, Nariman Point, Mumbai, Maharashtra 400021</strong>
            </div>

            <div className="contact-item">
              <span>24/7 TOLL-FREE TRAVEL CONCIERGE</span>
              <strong>1800 555 8728 / +91 22 6789 1200</strong>
            </div>

            <div className="contact-item">
              <span>DIRECT INQUIRIES & BOOKING SUPPORT</span>
              <strong>support@travelgo.in / concierge@travelgo.in</strong>
            </div>

            <div className="contact-item">
              <span>OFFICE HOURS</span>
              <strong>Monday - Sunday: 24 Hours / 7 Days Live Concierge</strong>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form">
            <h2>Send Us A Message</h2>

            {submitted ? (
              <div style={{
                background: '#f0fdfa',
                border: '1px solid #0f766e',
                color: '#0f766e',
                borderRadius: '10px',
                padding: '24px',
                textAlign: 'center'
              }}>
                <CheckCircle2 size={36} style={{ margin: '0 auto 10px', display: 'block' }} />
                <h3 style={{ fontSize: '18px', marginBottom: '6px' }}>Message Received!</h3>
                <p style={{ fontSize: '14px' }}>
                  Thank you for contacting TravelGo. Our senior travel advisor will review your request and get in touch shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Your Full Name *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Eleanor Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Email Address *</label>
                  <input 
                    type="email" 
                    required
                    placeholder="eleanor@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Subject / Destination of Interest *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Custom 10-Day Italy Itinerary"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Message / Trip Details *</label>
                  <textarea 
                    required
                    placeholder="Tell us about your travel dates, preferred group size, or questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="primary-button" 
                  style={{ width: '100%', padding: '14px', fontSize: '15px' }}
                >
                  <Send size={16} style={{ marginRight: '8px' }} />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section style={{ background: '#ffffff', padding: '80px 8%' }}>
        <div className="section-title">
          <p>FREQUENTLY ASKED QUESTIONS</p>
          <h2>Got Questions? We Have Answers</h2>
          <span>Everything you need to know about booking, payments, and trip policies</span>
        </div>

        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {FAQS.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div 
                key={index} 
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  transition: 'all 0.2s ease'
                }}
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  style={{
                    width: '100%',
                    padding: '18px 24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '15px',
                    fontWeight: 600,
                    color: '#0f172a'
                  }}
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp size={18} color="#0f766e" /> : <ChevronDown size={18} color="#64748b" />}
                </button>
                {isOpen && (
                  <div style={{ padding: '0 24px 20px', color: '#475569', fontSize: '14px', lineHeight: '1.7' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
