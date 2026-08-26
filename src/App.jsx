import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import Packages from './pages/Packages';
import Booking from './pages/Booking';
import MyBookings from './pages/MyBookings';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import { INITIAL_BOOKINGS } from './data/travelData';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedItemForBooking, setSelectedItemForBooking] = useState(null);
  
  // Bookings state with local storage fallback
  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem('travelgo_bookings');
      return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  // Current user state
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('travelgo_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.name === 'Alex Johnson' || parsed?.name === 'Rahul Sharma') {
          return { name: 'Rakesh Reddy', email: 'rakesh.reddy@example.com' };
        }
        return parsed;
      }
      return { name: 'Rakesh Reddy', email: 'rakesh.reddy@example.com' };
    } catch {
      return { name: 'Rakesh Reddy', email: 'rakesh.reddy@example.com' };
    }
  });

  // Toast notification
  const [toast, setToast] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('travelgo_bookings', JSON.stringify(bookings));
    } catch (e) {
      console.error(e);
    }
  }, [bookings]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('travelgo_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('travelgo_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectDestination = (dest) => {
    setSelectedItemForBooking(dest);
    setCurrentPage('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPackage = (pkg) => {
    setSelectedItemForBooking(pkg);
    setCurrentPage('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddBooking = (newBooking) => {
    setBookings(prev => [newBooking, ...prev]);
    showToast(`🎉 Reservation confirmed! Booking ID: ${newBooking.id}`, 'success');
  };

  const handleCancelBooking = (bookingId) => {
    setBookings(prev => prev.filter(b => b.id !== bookingId));
    showToast('Booking cancelled successfully. Full refund initiated.', 'info');
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
    showToast(`Welcome back, ${user.name}!`, 'success');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    showToast('Logged out successfully.', 'info');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Navigation Bar */}
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={handleNavigate}
        currentUser={currentUser}
        onLogout={handleLogout}
        bookingsCount={bookings.length}
      />

      {/* Main Page Routing */}
      <main style={{ flex: 1 }}>
        {currentPage === 'home' && (
          <Home 
            onSelectDestination={handleSelectDestination}
            onSelectPackage={handleSelectPackage}
            navigateTo={handleNavigate}
          />
        )}

        {currentPage === 'destinations' && (
          <Destinations 
            onSelectDestination={handleSelectDestination}
          />
        )}

        {currentPage === 'packages' && (
          <Packages 
            onSelectPackage={handleSelectPackage}
          />
        )}

        {currentPage === 'booking' && (
          <Booking 
            initialItem={selectedItemForBooking}
            currentUser={currentUser}
            onAddBooking={handleAddBooking}
            navigateTo={handleNavigate}
          />
        )}

        {currentPage === 'my-bookings' && (
          <MyBookings 
            bookings={bookings}
            onCancelBooking={handleCancelBooking}
            navigateTo={handleNavigate}
          />
        )}

        {currentPage === 'about' && (
          <About 
            navigateTo={handleNavigate}
          />
        )}

        {currentPage === 'contact' && (
          <Contact />
        )}

        {currentPage === 'login' && (
          <Login 
            onLogin={handleLogin}
            navigateTo={handleNavigate}
          />
        )}

        {currentPage === 'register' && (
          <Register 
            onLogin={handleLogin}
            navigateTo={handleNavigate}
          />
        )}
      </main>

      {/* Footer */}
      <Footer setCurrentPage={handleNavigate} />

      {/* Toast Notification */}
      {toast && (
        <div className={`toast-notification toast-${toast.type}`}>
          {toast.type === 'success' && <CheckCircle2 size={20} color="#10b981" />}
          {toast.type === 'error' && <AlertCircle size={20} color="#ef4444" />}
          {toast.type === 'info' && <Info size={20} color="#0f766e" />}
          <span style={{ fontSize: '14px', fontWeight: 500 }}>{toast.message}</span>
          <button 
            onClick={() => setToast(null)}
            style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', marginLeft: 'auto', padding: '2px' }}
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
