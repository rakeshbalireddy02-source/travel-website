import React, { useState } from 'react';
import { Compass, LogIn, Mail, Lock, CheckCircle2 } from 'lucide-react';

export default function Login({ onLogin, navigateTo }) {
  const [email, setEmail] = useState('rakesh.reddy@example.com');
  const [password, setPassword] = useState('password123');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({
      name: email.split('@')[0].replace('.', ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase()),
      email: email
    });
    navigateTo('home');
  };

  const handleDemoFill = (type) => {
    if (type === 'rakesh') {
      setEmail('rakesh.reddy@example.com');
      setPassword('secureTravel2026');
    } else {
      setEmail('ananya.iyer@example.com');
      setPassword('wanderlust99');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '50px', height: '50px', background: '#f0fdfa', borderRadius: '50%', marginBottom: '14px' }}>
            <Compass size={28} color="#0f766e" />
          </div>
          <h2>Welcome Back</h2>
          <p>Log in to access your itinerary, tickets, and bookings</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            className="primary-button" 
            style={{ width: '100%', padding: '12px', fontSize: '15px', marginTop: '10px' }}
          >
            <LogIn size={16} style={{ marginRight: '8px' }} />
            Sign In to Account
          </button>
        </form>

        <div className="demo-account-box">
          <p>Quick 1-Click Demo Accounts:</p>
          <div className="demo-btn-group">
            <button type="button" className="demo-btn" onClick={() => handleDemoFill('rakesh')}>
              Rakesh Reddy (VIP)
            </button>
            <button type="button" className="demo-btn" onClick={() => handleDemoFill('ananya')}>
              Ananya Iyer
            </button>
          </div>
        </div>

        <div className="auth-footer">
          Don't have an account yet? 
          <button type="button" onClick={() => navigateTo('register')}>
            Create an Account
          </button>
        </div>
      </div>
    </div>
  );
}
