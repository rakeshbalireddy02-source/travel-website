import { useState, useEffect } from 'react';
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
import Admin from './pages/Admin';
import { DESTINATIONS, PACKAGES, TESTIMONIALS, FAQS, INITIAL_BOOKINGS } from './data/travelData';
import { apiService } from './services/api';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const THEMES = {
  ocean: {
    label: 'Ocean',
    primary: '#0f766e',
    secondary: '#14b8a6',
    accent: '#f97316',
    navBg: '#ffffff',
    pageBg: '#f6fbfa',
    cardBg: '#ffffff',
    text: '#1f2937',
    border: '#e2e8f0'
  },
  sunset: {
    label: 'Sunset',
    primary: '#c2410c',
    secondary: '#f59e0b',
    accent: '#f97316',
    navBg: '#fff7ed',
    pageBg: '#fffaf5',
    cardBg: '#ffffff',
    text: '#1f2937',
    border: '#fed7aa'
  },
  forest: {
    label: 'Forest',
    primary: '#166534',
    secondary: '#22c55e',
    accent: '#facc15',
    navBg: '#f0fdf4',
    pageBg: '#f7fff9',
    cardBg: '#ffffff',
    text: '#1f2937',
    border: '#bbf7d0'
  },
  royal: {
    label: 'Royal',
    primary: '#4c1d95',
    secondary: '#8b5cf6',
    accent: '#f59e0b',
    navBg: '#f5f3ff',
    pageBg: '#faf7ff',
    cardBg: '#ffffff',
    text: '#1f2937',
    border: '#ddd6fe'
  }
};

function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    try {
      const savedPage = sessionStorage.getItem('travelgo_current_page');
      return savedPage || 'login';
    } catch {
      return 'login';
    }
  });
  const [selectedItemForBooking, setSelectedItemForBooking] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState('ocean');
  
  // Bookings state with local storage fallback
  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem('travelgo_bookings');
      return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('travelgo_messages');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [testimonials, setTestimonials] = useState(() => {
    try {
      const saved = localStorage.getItem('travelgo_testimonials');
      return saved ? JSON.parse(saved) : TESTIMONIALS;
    } catch {
      return TESTIMONIALS;
    }
  });

  const [faqs, setFaqs] = useState(() => {
    try {
      const saved = localStorage.getItem('travelgo_faqs');
      return saved ? JSON.parse(saved) : FAQS;
    } catch {
      return FAQS;
    }
  });

  const [siteContent, setSiteContent] = useState(() => {
    const defaultContent = {
      heroEyebrow: 'DISCOVER INCREDIBLE INDIA',
      heroTitle: "Explore India's Majestic Wonders & Heritage",
      heroDescription: 'Curated royal palace retreats, serene backwater cruises, snow-capped Himalayan escapes, and tropical beach getaways across India.',
      heroImage: '/travel-bg.jpg',
      aboutEyebrow: 'OUR STORY & PASSION',
      aboutTitle: 'About TravelGo',
      aboutSubtitle: 'Connecting curious wanderers with extraordinary, soul-stirring journeys worldwide',
      aboutImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
      aboutStoryTitle: 'Crafting Unforgettable Travel Memories Since 2014',
      aboutStoryOne: "TravelGo was born from a simple belief: that travel isn't just about visiting new places, but about the profound moments that expand our perspectives and enrich our lives.",
      aboutStoryTwo: 'Over the past decade, we have grown into a premier global travel collective, having curated extraordinary journeys for over 28,000 discerning travelers across 150+ breathtaking destinations.',
      aboutStoryThree: 'From private overwater bungalows in the Maldives and secluded chalets in the Swiss Alps to authentic cultural immersions in Kyoto, our expert concierges design each itinerary with meticulous craftsmanship.',
      contactEyebrow: "WE'RE HERE TO ASSIST YOU",
      contactTitle: 'Contact Us',
      contactSubtitle: 'Have inquiries about an itinerary or need custom vacation planning? Our specialists are available 24/7',
      popupImage: '/travel-promo-popup.jpg',
      popupBadge: '✨ Limited Time Offer',
      popupTitle: 'Special Festive Offer: Flat ₹2,500 OFF!',
      popupDescription: 'Book your dream houseboat cruise in Kerala, Kashmir snow retreat, or Royal Rajasthan palace tour today. Use coupon code at checkout:',
      popupCode: 'TRAVELGO2500'
    };

    try {
      const saved = localStorage.getItem('travelgo_site_content');
      return saved ? { ...defaultContent, ...JSON.parse(saved) } : defaultContent;
    } catch {
      return defaultContent;
    }
  });

  const [customDestinations, setCustomDestinations] = useState(() => {
    try {
      const saved = localStorage.getItem('travelgo_custom_destinations');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [removedDestinationIds, setRemovedDestinationIds] = useState(() => {
    try {
      const saved = localStorage.getItem('travelgo_removed_destinations');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [destinationOverrides, setDestinationOverrides] = useState(() => {
    try {
      const saved = localStorage.getItem('travelgo_destination_overrides');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [customPackages, setCustomPackages] = useState(() => {
    try {
      const saved = localStorage.getItem('travelgo_custom_packages');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [removedPackageIds, setRemovedPackageIds] = useState(() => {
    try {
      const saved = localStorage.getItem('travelgo_removed_packages');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [packageOverrides, setPackageOverrides] = useState(() => {
    try {
      const saved = localStorage.getItem('travelgo_package_overrides');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Current user state
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('travelgo_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.name === 'Alex Johnson' || parsed?.name === 'Rahul Sharma') {
          return { name: 'Rakesh Reddy', email: 'rakesh.reddy@example.com', isAdmin: true };
        }
        return { ...parsed, isAdmin: parsed.isAdmin ?? (parsed.email === 'admin@travelgo.in' || parsed.name === 'Rakesh Reddy') };
      }
      return { name: 'Rakesh Reddy', email: 'rakesh.reddy@example.com', isAdmin: true };
    } catch {
      return { name: 'Rakesh Reddy', email: 'rakesh.reddy@example.com', isAdmin: true };
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
      sessionStorage.setItem('travelgo_current_page', currentPage);
    } catch (e) {
      console.error(e);
    }
  }, [currentPage]);

  useEffect(() => {
    localStorage.setItem('travelgo_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('travelgo_testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem('travelgo_faqs', JSON.stringify(faqs));
  }, [faqs]);

  useEffect(() => {
    localStorage.setItem('travelgo_site_content', JSON.stringify(siteContent));
  }, [siteContent]);

  useEffect(() => {
    try {
      localStorage.setItem('travelgo_custom_destinations', JSON.stringify(customDestinations));
    } catch (e) {
      console.error(e);
    }
  }, [customDestinations]);

  useEffect(() => {
    localStorage.setItem('travelgo_removed_destinations', JSON.stringify(removedDestinationIds));
  }, [removedDestinationIds]);

  useEffect(() => {
    localStorage.setItem('travelgo_destination_overrides', JSON.stringify(destinationOverrides));
  }, [destinationOverrides]);

  useEffect(() => {
    try {
      localStorage.setItem('travelgo_custom_packages', JSON.stringify(customPackages));
    } catch (e) {
      console.error(e);
    }
  }, [customPackages]);

  useEffect(() => {
    localStorage.setItem('travelgo_removed_packages', JSON.stringify(removedPackageIds));
  }, [removedPackageIds]);

  useEffect(() => {
    localStorage.setItem('travelgo_package_overrides', JSON.stringify(packageOverrides));
  }, [packageOverrides]);

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

  // Sync initial data from Django REST API if available
  useEffect(() => {
    async function loadBackendData() {
      try {
        const backendBookings = await apiService.getBookings();
        if (Array.isArray(backendBookings) && backendBookings.length > 0) {
          setBookings(backendBookings.map(b => ({
            ...b,
            id: b.id || b.booking_id,
            bookingId: b.booking_id || b.id,
            userName: b.user_name || b.userName,
            userEmail: b.user_email || b.userEmail,
            userPhone: b.user_phone || b.userPhone,
            travelDate: b.travel_date || b.travelDate,
            returnDate: b.return_date || b.returnDate,
            pricePerPerson: b.price_per_person || b.pricePerPerson,
            totalPrice: b.total_price || b.totalPrice,
            specialRequests: b.special_requests || b.specialRequests,
            bookedOn: b.booked_on || b.bookedOn
          })));
        }
      } catch (e) {
        // Django API offline or using local fallback
      }

      try {
        const backendMessages = await apiService.getMessages();
        if (Array.isArray(backendMessages) && backendMessages.length > 0) {
          setMessages(backendMessages);
        }
      } catch (e) {}
    }
    loadBackendData();
  }, []);

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

  const handleAddBooking = async (newBooking) => {
    setBookings(prev => [newBooking, ...prev]);
    showToast(`🎉 Reservation confirmed! Booking ID: ${newBooking.id}`, 'success');
    
    // Sync with Django REST API
    try {
      await apiService.createBooking({
        booking_id: newBooking.id,
        destination: newBooking.destination,
        package_title: newBooking.packageTitle || newBooking.title || '',
        user_name: newBooking.userName,
        user_email: newBooking.userEmail,
        user_phone: newBooking.userPhone,
        travel_date: newBooking.travelDate,
        return_date: newBooking.returnDate,
        travelers: newBooking.travelers,
        tier: newBooking.tier || '',
        price_per_person: newBooking.pricePerPerson || 0,
        total_price: newBooking.totalPrice || 0,
        status: newBooking.status || 'Confirmed',
        booked_on: newBooking.bookedOn || new Date().toISOString().split('T')[0],
        special_requests: newBooking.specialRequests || ''
      });
    } catch (err) {
      console.warn('Booking saved locally. Django sync offline:', err);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    setBookings(prev => prev.filter(b => b.id !== bookingId));
    showToast('Booking cancelled successfully. Full refund initiated.', 'info');

    try {
      await apiService.deleteBooking(bookingId);
    } catch (err) {
      console.warn('Booking cancelled locally. Django sync offline:', err);
    }
  };

  const handleUpdateBooking = async (bookingId, status) => {
    setBookings(prev => prev.map(booking => booking.id === bookingId ? { ...booking, status } : booking));
    
    try {
      await apiService.updateBooking(bookingId, { status });
    } catch (err) {
      console.warn('Booking status updated locally. Django sync offline:', err);
    }
  };

  const handleAddMessage = async (message) => {
    setMessages(prev => [message, ...prev]);
    try {
      await apiService.sendMessage(message);
    } catch (err) {
      console.warn('Message saved locally. Django sync offline:', err);
    }
  };

  const handleDeleteMessage = (messageId) => {
    setMessages(prev => prev.filter(message => message.id !== messageId));
  };


  const handleAddCustomDestination = (destination) => {
    setCustomDestinations(prev => [destination, ...prev]);
  };

  const handleUpdateCustomDestination = (destinationId, updatedDestination) => {
    setCustomDestinations(prev => prev.map(dest => dest.id === destinationId ? { ...dest, ...updatedDestination } : dest));
  };

  const handleDeleteCustomDestination = (destinationId) => {
    setCustomDestinations(prev => prev.filter(dest => dest.id !== destinationId));
  };

  const handleDeleteDestination = (destinationId) => {
    if (DESTINATIONS.some(destination => destination.id === destinationId)) {
      setRemovedDestinationIds(prev => prev.includes(destinationId) ? prev : [...prev, destinationId]);
      return;
    }

    handleDeleteCustomDestination(destinationId);
  };

  const handleUpdateDestination = (destinationId, updatedDestination) => {
    if (DESTINATIONS.some(destination => destination.id === destinationId)) {
      setDestinationOverrides(prev => ({
        ...prev,
        [destinationId]: { ...prev[destinationId], ...updatedDestination }
      }));
      return;
    }

    handleUpdateCustomDestination(destinationId, updatedDestination);
  };

  const handleRestoreDestination = (destinationId) => {
    setRemovedDestinationIds(prev => prev.filter(id => id !== destinationId));
    showToast('Destination restored to public page!', 'success');
  };

  const managedDestinations = DESTINATIONS.map(destination => ({
    ...destination,
    ...destinationOverrides[destination.id]
  }));

  const handleAddCustomPackage = (pkg) => {
    setCustomPackages(prev => [pkg, ...prev]);
    showToast(`Package "${pkg.title}" added successfully!`, 'success');
  };

  const handleUpdateCustomPackage = (packageId, updatedPackage) => {
    setCustomPackages(prev => prev.map(pkg => pkg.id === packageId ? { ...pkg, ...updatedPackage } : pkg));
    showToast('Package updated successfully!', 'success');
  };

  const handleDeleteCustomPackage = (packageId) => {
    setCustomPackages(prev => prev.filter(pkg => pkg.id !== packageId));
    showToast('Package removed successfully!', 'info');
  };

  const handleDeletePackage = (packageId) => {
    if (PACKAGES.some(pkg => pkg.id === packageId)) {
      setRemovedPackageIds(prev => prev.includes(packageId) ? prev : [...prev, packageId]);
      showToast('Package removed from public page.', 'info');
      return;
    }
    handleDeleteCustomPackage(packageId);
  };

  const handleRestorePackage = (packageId) => {
    setRemovedPackageIds(prev => prev.filter(id => id !== packageId));
    showToast('Package restored to public page!', 'success');
  };

  const handleUpdatePackage = (packageId, updatedPackage) => {
    if (PACKAGES.some(pkg => pkg.id === packageId)) {
      setPackageOverrides(prev => ({
        ...prev,
        [packageId]: { ...prev[packageId], ...updatedPackage }
      }));
      showToast('Package updated successfully!', 'success');
      return;
    }
    handleUpdateCustomPackage(packageId, updatedPackage);
  };

  const managedPackages = PACKAGES.map(pkg => ({
    ...pkg,
    ...packageOverrides[pkg.id]
  }));

  const allAdminPackages = [...managedPackages, ...customPackages];

  const visiblePackages = [
    ...managedPackages.filter(pkg => !removedPackageIds.includes(pkg.id)),
    ...customPackages
  ];

  const visibleDestinations = [
    ...managedDestinations.filter(destination => !removedDestinationIds.includes(destination.id)),
    ...customDestinations
  ];

  const handleLogin = (user) => {
    try {
      sessionStorage.removeItem('travelgo_popup_seen');
    } catch (error) {
      console.error(error);
    }
    setCurrentUser(user);
    showToast(`Welcome back, ${user.name}!`, 'success');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('login');
    showToast('Logged out successfully.', 'info');
  };

  const activeTheme = THEMES[selectedTheme] || THEMES.ocean;
  const appThemeStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    background: activeTheme.pageBg,
    color: activeTheme.text,
    ['--theme-primary']: activeTheme.primary,
    ['--theme-secondary']: activeTheme.secondary,
    ['--theme-accent']: activeTheme.accent,
    ['--theme-nav-bg']: activeTheme.navBg,
    ['--theme-page-bg']: activeTheme.pageBg,
    ['--theme-card-bg']: activeTheme.cardBg,
    ['--theme-text']: activeTheme.text,
    ['--theme-border']: activeTheme.border
  };

  return (
    <div className="travelgo-app" style={appThemeStyle}>
      {/* Navigation Bar */}
      {currentPage !== 'login' && currentPage !== 'admin' && (
        <Navbar 
          currentPage={currentPage} 
          setCurrentPage={handleNavigate}
          currentUser={currentUser}
          onLogout={handleLogout}
          bookingsCount={bookings.length}
        />
      )}

      {/* Main Page Routing */}
      <main style={{ flex: 1 }}>
        {currentPage === 'home' && (
          <Home 
            onSelectDestination={handleSelectDestination}
            onSelectPackage={handleSelectPackage}
            navigateTo={handleNavigate}
            siteContent={siteContent}
            packages={visiblePackages}
            testimonials={testimonials}
          />
        )}

        {currentPage === 'destinations' && (
          <Destinations 
            onSelectDestination={handleSelectDestination}
            customDestinations={visibleDestinations}
          />
        )}

        {currentPage === 'packages' && (
          <Packages 
            onSelectPackage={handleSelectPackage}
            packages={visiblePackages}
          />
        )}

        {currentPage === 'booking' && (
          <Booking 
            initialItem={selectedItemForBooking}
            currentUser={currentUser}
            onAddBooking={handleAddBooking}
            navigateTo={handleNavigate}
            packages={visiblePackages}
            destinations={visibleDestinations}
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
            siteContent={siteContent}
          />
        )}

        {currentPage === 'contact' && (
          <Contact onAddMessage={handleAddMessage} siteContent={siteContent} faqs={faqs} />
        )}

        {currentPage === 'admin' && currentUser?.isAdmin && (
          <Admin
            bookings={bookings}
            messages={messages}
            testimonials={testimonials}
            faqs={faqs}
            onAddTestimonial={(testimonial) => {
              setTestimonials(prev => [testimonial, ...prev]);
            }}
            onUpdateTestimonial={(testimonialId, updatedTestimonial) => {
              setTestimonials(prev => prev.map(testimonial => (
                testimonial.id === testimonialId
                  ? { ...testimonial, ...updatedTestimonial }
                  : testimonial
              )));
            }}
            onDeleteTestimonial={(testimonialId) => {
              setTestimonials(prev => prev.filter(testimonial => testimonial.id !== testimonialId));
            }}
            onAddFaq={(faq) => {
              setFaqs(prev => [faq, ...prev]);
            }}
            onUpdateFaq={(faqId, updatedFaq) => {
              setFaqs(prev => prev.map(faq => faq.id === faqId ? { ...faq, ...updatedFaq } : faq));
            }}
            onDeleteFaq={(faqId) => {
              setFaqs(prev => prev.filter(faq => faq.id !== faqId));
            }}
            onUpdateBooking={handleUpdateBooking}
            onDeleteMessage={handleDeleteMessage}
            onLogout={handleLogout}
            siteContent={siteContent}
            onUpdateContent={setSiteContent}
            blogPosts={customDestinations}
            onAddBlogPost={handleAddCustomDestination}
            onUpdateBlogPost={handleUpdateCustomDestination}
            onDeleteBlogPost={handleDeleteCustomDestination}
            destinations={[...managedDestinations, ...customDestinations]}
            removedDestinationIds={removedDestinationIds}
            onDeleteDestination={handleDeleteDestination}
            onUpdateDestination={handleUpdateDestination}
            onRestoreDestination={handleRestoreDestination}
            packages={allAdminPackages}
            removedPackageIds={removedPackageIds}
            onAddPackage={handleAddCustomPackage}
            onUpdatePackage={handleUpdatePackage}
            onDeletePackage={handleDeletePackage}
            onRestorePackage={handleRestorePackage}
            themes={THEMES}
            currentTheme={selectedTheme}
            onChangeTheme={setSelectedTheme}
          />
        )}

        {currentPage === 'admin' && !currentUser?.isAdmin && (
          <Login onLogin={handleLogin} navigateTo={handleNavigate} />
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
      {currentPage !== 'admin' && <Footer setCurrentPage={handleNavigate} />}

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
