import React, { useState } from 'react';
import { Compass, UserPlus } from 'lucide-react';

export default function Register({ onLogin, navigateTo }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({
      name: name || 'New Explorer',
      email: email,
      phone: phone
    });
    navigateTo('home');
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '50px', height: '50px', background: '#f0fdfa', borderRadius: '50%', marginBottom: '14px' }}>
            <Compass size={28} color="#0f766e" />
          </div>
          <h2>Join TravelGo</h2>
          <p>Create your free account to unlock exclusive member discounts</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input 
              type="text" 
              required
              placeholder="e.g. Jordan Miller"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              required
              placeholder="jordan@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Phone Number (Optional)</label>
            <input 
              type="tel" 
              placeholder="+1 (555) 123-4567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Create Password</label>
            <input 
              type="password" 
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            className="primary-button" 
            style={{ width: '100%', padding: '12px', fontSize: '15px', marginTop: '10px' }}
          >
            <UserPlus size={16} style={{ marginRight: '8px' }} />
            Create Account
          </button>
        </form>

        <div className="auth-footer">
          Already have an account? 
          <button type="button" onClick={() => navigateTo('login')}>
            Sign In Here
          </button>
        </div>
      </div>
    </div>
  );
}
