import { useMemo, useRef, useState } from 'react';
import {
  BarChart3, Home, LayoutGrid, LogOut, MessageSquareText,
  Search, X, Luggage, Edit, Trash2, RotateCcw, MapPin, Check
} from 'lucide-react';

export default function Admin({
  onLogout,
  siteContent,
  onUpdateContent,
  blogPosts = [],
  onAddBlogPost,
  onUpdateBlogPost,
  onDeleteBlogPost,
  destinations = [],
  removedDestinationIds = [],
  onDeleteDestination,
  onUpdateDestination,
  onRestoreDestination,
  packages = [],
  removedPackageIds = [],
  onAddPackage,
  onUpdatePackage,
  onDeletePackage,
  onRestorePackage,
  bookings = [],
  messages = [],
  onDeleteMessage
}) {
  const [activeSection, setActiveSection] = useState('Destinations');

  // Destinations management states
  const [destinationSearchTerm, setDestinationSearchTerm] = useState('');
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [destinationToRemove, setDestinationToRemove] = useState(null);
  const destinationFormRef = useRef(null);

  const initialDestinationForm = {
    title: '',
    category: 'Beaches',
    description: '',
    price: '14999',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80',
    featured: true,
    tagline: ''
  };
  const [blogForm, setBlogForm] = useState(initialDestinationForm);

  // Packages management states
  const initialPackageForm = {
    title: '',
    destination: '',
    duration: '6 Days / 5 Nights',
    price: '24999',
    originalPrice: '29999',
    rating: '4.95',
    badge: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
    overview: '',
    includes: '4★ & 5★ Heritage Palace & Haveli Stays\nDaily Royal Buffet Breakfast & 2 Dinners\nPrivate AC Chauffeur for All Intercity Transfers\nLake Pichola Sunset Boat Cruise in Udaipur\nSkip-the-Line Guided Entry to Amber Fort & City Palace',
    groupSize: '2 - 8 Persons',
    departure: 'Daily Departures'
  };

  const [packageForm, setPackageForm] = useState(initialPackageForm);
  const [editingPackageId, setEditingPackageId] = useState(null);
  const [packageSearchTerm, setPackageSearchTerm] = useState('');
  const [packageToRemove, setPackageToRemove] = useState(null);
  const packageFormRef = useRef(null);

  // Home Hero Section draft states
  const [heroDraft, setHeroDraft] = useState({
    heroEyebrow: siteContent?.heroEyebrow || 'DISCOVER INCREDIBLE INDIA',
    heroTitle: siteContent?.heroTitle || "Explore India's Majestic Wonders & Heritage",
    heroDescription: siteContent?.heroDescription || 'Curated royal palace retreats, serene backwater cruises, snow-capped Himalayan escapes, and tropical beach getaways across India.'
  });
  const [heroFeedback, setHeroFeedback] = useState(false);

  // Contact Section draft states
  const [contactDraft, setContactDraft] = useState({
    contactEyebrow: siteContent?.contactEyebrow || "WE'RE HERE TO ASSIST YOU",
    contactTitle: siteContent?.contactTitle || 'Get In Touch',
    contactSubtitle: siteContent?.contactSubtitle || 'Have inquiries about an itinerary or need custom vacation planning? Our specialists are available 24/7'
  });
  const [contactFeedback, setContactFeedback] = useState(false);

  const activeDestinationsCount = Math.max(0, destinations.length - removedDestinationIds.length);
  const activePackagesCount = Math.max(0, packages.length - removedPackageIds.length);

  // Sidebar items with Destinations and separate buttons for Home Hero and Contact Section
  const sidebarItems = useMemo(() => [
    { label: 'Dashboard', icon: BarChart3 },
    { label: 'Destinations', icon: MapPin, count: activeDestinationsCount },
    { label: 'Packages', icon: Luggage, count: activePackagesCount },
    { label: 'Home Hero', icon: Home },
    { label: 'Contact Section', icon: MessageSquareText },
    { label: 'Comments', icon: MessageSquareText, count: messages.length },
    { label: 'Configuration', icon: LayoutGrid },
    { label: 'Logout', icon: LogOut }
  ], [activeDestinationsCount, activePackagesCount, messages.length]);

  const dashboardStats = useMemo(() => [
    { label: 'Destinations', value: activeDestinationsCount, section: 'Destinations' },
    { label: 'Tour Packages', value: activePackagesCount, section: 'Packages' },
    { label: 'Bookings', value: bookings.length },
    { label: 'Messages', value: messages.length, section: 'Comments' }
  ], [activeDestinationsCount, activePackagesCount, bookings.length, messages.length]);

  const filteredDestinations = useMemo(() => {
    const query = destinationSearchTerm.trim().toLowerCase();
    if (!query) return destinations;
    return destinations.filter(d => 
      (d.name || '').toLowerCase().includes(query) || 
      (d.state || '').toLowerCase().includes(query) ||
      (d.category || '').toLowerCase().includes(query)
    );
  }, [destinations, destinationSearchTerm]);

  const filteredAdminPackages = useMemo(() => {
    const query = packageSearchTerm.trim().toLowerCase();
    if (!query) return packages;
    return packages.filter(pkg => 
      (pkg.title || '').toLowerCase().includes(query) || 
      (pkg.destination || '').toLowerCase().includes(query) ||
      (pkg.badge || '').toLowerCase().includes(query)
    );
  }, [packages, packageSearchTerm]);

  // Destination handlers
  const resetBlogForm = () => {
    setBlogForm(initialDestinationForm);
    setEditingBlogId(null);
  };

  const saveBlogPost = () => {
    if (!blogForm.title.trim() || !blogForm.description.trim()) {
      alert('Please fill out destination name and description.');
      return;
    }

    const destination = {
      id: editingBlogId || `custom-dest-${Date.now()}`,
      name: blogForm.title.trim(),
      state: blogForm.category,
      tagline: blogForm.tagline.trim() || blogForm.category,
      category: blogForm.category,
      price: Number(blogForm.price) || 14999,
      rating: 4.9,
      reviewsCount: 0,
      duration: '5 Days / 4 Nights',
      image: blogForm.image.trim() || 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80',
      description: blogForm.description.trim(),
      featured: blogForm.featured,
      highlights: [
        'Curated itinerary crafted for unforgettable experiences',
        'Handpicked stays with verified hospitality',
        'Local verified guides and round-the-clock support'
      ]
    };

    if (editingBlogId) {
      if (onUpdateDestination) {
        onUpdateDestination(editingBlogId, destination);
      } else {
        onUpdateBlogPost?.(editingBlogId, destination);
      }
    } else {
      onAddBlogPost?.(destination);
    }

    resetBlogForm();
  };

  const editBlogPost = (post) => {
    setEditingBlogId(post.id);
    setBlogForm({
      title: post.name || '',
      category: post.category || 'Beaches',
      description: post.description || '',
      price: String(post.price ?? 14999),
      image: post.image || '',
      featured: post.featured ?? true,
      tagline: post.tagline || ''
    });
    requestAnimationFrame(() => {
      destinationFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  };

  const deleteBlogPost = (postId) => {
    onDeleteBlogPost?.(postId);
    if (editingBlogId === postId) resetBlogForm();
  };

  const deleteDestination = (destination) => {
    setDestinationToRemove(destination);
  };

  const confirmRemoveDestination = () => {
    if (destinationToRemove) {
      onDeleteDestination?.(destinationToRemove.id);
      if (editingBlogId === destinationToRemove.id) resetBlogForm();
    }
    setDestinationToRemove(null);
  };

  // Package handlers
  const resetPackageForm = () => {
    setPackageForm(initialPackageForm);
    setEditingPackageId(null);
  };

  const editPackage = (pkg) => {
    setEditingPackageId(pkg.id);
    setPackageForm({
      title: pkg.title || '',
      destination: pkg.destination || '',
      duration: pkg.duration || '6 Days / 5 Nights',
      price: String(pkg.price ?? 24999),
      originalPrice: pkg.originalPrice ? String(pkg.originalPrice) : '',
      rating: String(pkg.rating ?? 4.95),
      badge: pkg.badge || 'Best Seller',
      image: pkg.image || 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
      overview: pkg.overview || '',
      includes: Array.isArray(pkg.includes) ? pkg.includes.join('\n') : (pkg.includes || ''),
      groupSize: pkg.groupSize || '2 - 8 Persons',
      departure: pkg.departure || 'Daily Departures'
    });
    requestAnimationFrame(() => {
      packageFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  };

  const savePackage = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!packageForm.title.trim() || !packageForm.destination.trim()) {
      alert('Please fill in both Package Title and Destination.');
      return;
    }

    const includesArray = packageForm.includes
      ? packageForm.includes.split('\n').map(s => s.trim()).filter(Boolean)
      : ['Handpicked luxury stays', 'Complimentary meals', 'Private transfers'];

    const packageData = {
      id: editingPackageId || `custom-pkg-${Date.now()}`,
      title: packageForm.title.trim(),
      destination: packageForm.destination.trim(),
      duration: packageForm.duration.trim() || '6 Days / 5 Nights',
      price: Number(packageForm.price) || 19999,
      originalPrice: packageForm.originalPrice ? Number(packageForm.originalPrice) : undefined,
      rating: Number(packageForm.rating) || 4.95,
      badge: packageForm.badge.trim() || 'Featured',
      image: packageForm.image.trim() || 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
      overview: packageForm.overview.trim(),
      includes: includesArray,
      groupSize: packageForm.groupSize.trim() || '2 - 8 Persons',
      departure: packageForm.departure.trim() || 'Daily Departures'
    };

    if (editingPackageId) {
      onUpdatePackage?.(editingPackageId, packageData);
    } else {
      onAddPackage?.(packageData);
    }

    resetPackageForm();
  };

  const deletePackage = (pkg) => {
    setPackageToRemove(pkg);
  };

  const confirmRemovePackage = () => {
    if (packageToRemove) {
      onDeletePackage?.(packageToRemove.id);
      if (editingPackageId === packageToRemove.id) {
        resetPackageForm();
      }
      setPackageToRemove(null);
    }
  };

  // Home Hero handler
  const handleSaveHero = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    onUpdateContent?.(current => ({
      ...current,
      heroEyebrow: heroDraft.heroEyebrow,
      heroTitle: heroDraft.heroTitle,
      heroDescription: heroDraft.heroDescription
    }));
    setHeroFeedback(true);
    setTimeout(() => setHeroFeedback(false), 3000);
  };

  // Contact Section handler
  const handleSaveContact = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    onUpdateContent?.(current => ({
      ...current,
      contactEyebrow: contactDraft.contactEyebrow,
      contactTitle: contactDraft.contactTitle,
      contactSubtitle: contactDraft.contactSubtitle
    }));
    setContactFeedback(true);
    setTimeout(() => setContactFeedback(false), 3000);
  };

  const handleSidebarClick = (label) => {
    if (label === 'Logout') {
      onLogout?.();
      return;
    }
    setActiveSection(label);
  };

  // Quick switch navigation buttons rendered at top
  const renderQuickNav = () => (
    <div className="admin-quick-nav" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '1.25rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
      <button 
        type="button" 
        className={`admin-cms-action-btn ${activeSection === 'Destinations' ? 'primary' : ''}`}
        onClick={() => setActiveSection('Destinations')}
      >
        <MapPin size={14} /> Destinations ({activeDestinationsCount})
      </button>
      <button 
        type="button" 
        className={`admin-cms-action-btn ${activeSection === 'Packages' ? 'primary' : ''}`}
        onClick={() => setActiveSection('Packages')}
      >
        <Luggage size={14} /> Packages ({activePackagesCount})
      </button>
      <button 
        type="button" 
        className={`admin-cms-action-btn ${activeSection === 'Home Hero' ? 'primary' : ''}`}
        onClick={() => setActiveSection('Home Hero')}
      >
        <Home size={14} /> Home Hero Section
      </button>
      <button 
        type="button" 
        className={`admin-cms-action-btn ${activeSection === 'Contact Section' ? 'primary' : ''}`}
        onClick={() => setActiveSection('Contact Section')}
      >
        <MessageSquareText size={14} /> Contact Section
      </button>
    </div>
  );

  const renderSection = () => {
    if (activeSection === 'Dashboard') {
      return (
        <div className="admin-cms-dashboard">
          {renderQuickNav()}
          <div className="admin-cms-toolbar" style={{ marginBottom: '1rem' }}>
            <h3 style={{ margin: 0, fontSize: '24px' }}>Dashboard Overview</h3>
          </div>
          <div className="admin-cms-dashboard-grid">
            {dashboardStats.map(stat => (
              <div 
                key={stat.label} 
                className="admin-cms-stat-card"
                style={{ cursor: stat.section ? 'pointer' : 'default' }}
                onClick={() => stat.section && setActiveSection(stat.section)}
                title={stat.section ? `Go to ${stat.section}` : undefined}
              >
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
              </div>
            ))}
          </div>
          <div className="admin-cms-banner" style={{ marginTop: '1.5rem' }}>
            <span className="admin-cms-banner-icon">!</span>
            Site content is live. Changes made here persist in real time across the website.
          </div>
        </div>
      );
    }

    if (activeSection === 'Configuration') {
      return (
        <div className="admin-cms-dashboard">
          {renderQuickNav()}
          <div className="admin-cms-toolbar" style={{ marginBottom: '1rem' }}>
            <h3 style={{ margin: 0 }}>Configuration Overview</h3>
          </div>
          <div className="admin-cms-dashboard-grid">
            {Object.entries(siteContent || {}).slice(0, 8).map(([key, value]) => (
              <div key={key} className="admin-cms-stat-card compact">
                <span>{key}</span>
                <strong>{String(value).slice(0, 32)}{String(value).length > 32 ? '…' : ''}</strong>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (activeSection === 'Comments') {
      return (
        <div className="admin-cms-dashboard">
          {renderQuickNav()}
          <div className="admin-cms-toolbar" style={{ marginBottom: '1rem' }}>
            <h3 style={{ margin: 0 }}>Visitor Messages</h3>
          </div>
          {messages.length === 0 ? (
            <div className="admin-cms-banner">No visitor messages yet.</div>
          ) : (
            <div className="admin-cms-blog-list">
              {messages.map(message => (
                <div key={message.id} className="admin-cms-blog-item">
                  <div>
                    <strong>{message.name || 'Visitor'}</strong>
                    <span>{message.email || 'No email'}</span>
                    <small>{message.message || 'No message content'}</small>
                  </div>
                  <div className="admin-cms-blog-item-actions">
                    <button type="button" className="admin-cms-action-btn danger" onClick={() => onDeleteMessage?.(message.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    // HOME HERO SECTION EDITOR
    if (activeSection === 'Home Hero') {
      return (
        <div className="admin-cms-dashboard">
          {renderQuickNav()}
          <div className="admin-cms-toolbar" style={{ marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ margin: '0 0 4px', fontSize: '24px' }}>Home Hero Section</h3>
              <span style={{ color: '#64748b', fontSize: '13px' }}>
                Customize the eyebrow tag, headline title, and description displayed on the homepage hero banner.
              </span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1.2fr) minmax(280px, 1fr)', gap: '20px' }}>
            {/* Form */}
            <div className="admin-cms-blog-panel" style={{ marginTop: 0 }}>
              <div className="admin-cms-blog-header">
                <h3>Edit Hero Content</h3>
                <span>Update the text below and click "Save Hero Section".</span>
              </div>

              <form onSubmit={handleSaveHero} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', fontWeight: 700, color: '#334155' }}>
                  <span>Hero Eyebrow Tag</span>
                  <input
                    value={heroDraft.heroEyebrow}
                    onChange={e => setHeroDraft(c => ({ ...c, heroEyebrow: e.target.value }))}
                    placeholder="e.g. DISCOVER INCREDIBLE INDIA"
                    style={{ border: '1px solid #dfe7ef', borderRadius: '6px', padding: '10px', fontSize: '14px' }}
                  />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', fontWeight: 700, color: '#334155' }}>
                  <span>Hero Main Title</span>
                  <input
                    value={heroDraft.heroTitle}
                    onChange={e => setHeroDraft(c => ({ ...c, heroTitle: e.target.value }))}
                    placeholder="e.g. Explore India's Majestic Wonders & Heritage"
                    style={{ border: '1px solid #dfe7ef', borderRadius: '6px', padding: '10px', fontSize: '14px' }}
                  />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', fontWeight: 700, color: '#334155' }}>
                  <span>Hero Description</span>
                  <textarea
                    rows={4}
                    value={heroDraft.heroDescription}
                    onChange={e => setHeroDraft(c => ({ ...c, heroDescription: e.target.value }))}
                    placeholder="Describe your travel service and offerings..."
                    style={{ border: '1px solid #dfe7ef', borderRadius: '6px', padding: '10px', fontSize: '14px', resize: 'vertical' }}
                  />
                </label>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                  <button
                    type="button"
                    className="admin-cms-action-btn"
                    onClick={() => setHeroDraft({
                      heroEyebrow: 'DISCOVER INCREDIBLE INDIA',
                      heroTitle: "Explore India's Majestic Wonders & Heritage",
                      heroDescription: 'Curated royal palace retreats, serene backwater cruises, snow-capped Himalayan escapes, and tropical beach getaways across India.'
                    })}
                  >
                    Reset Defaults
                  </button>
                  <button type="submit" className="admin-cms-action-btn primary">
                    {heroFeedback ? <Check size={14} /> : null}
                    <span>{heroFeedback ? 'Saved!' : 'Save Hero Section'}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Live Visual Preview */}
            <div>
              <h4 style={{ margin: '0 0 10px', fontSize: '14px', color: '#64748b' }}>Live Homepage Preview</h4>
              <div style={{
                background: 'linear-gradient(135deg, #0f766e 0%, #115e59 100%)',
                color: '#ffffff',
                borderRadius: '14px',
                padding: '28px 24px',
                boxShadow: '0 12px 30px rgba(15, 118, 110, 0.25)',
                border: '1px solid rgba(255, 255, 255, 0.15)'
              }}>
                <div style={{
                  display: 'inline-block',
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
                  padding: '4px 12px',
                  borderRadius: '999px',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  marginBottom: '12px'
                }}>
                  {heroDraft.heroEyebrow || 'DISCOVER INCREDIBLE INDIA'}
                </div>
                <h2 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 12px', lineHeight: 1.3 }}>
                  {heroDraft.heroTitle || "Explore India's Majestic Wonders"}
                </h2>
                <p style={{ fontSize: '14px', lineHeight: 1.6, opacity: 0.9, margin: '0 0 20px' }}>
                  {heroDraft.heroDescription || 'Curated royal palace retreats, serene cruises, and tropical beach getaways across India.'}
                </p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ background: '#f59e0b', color: '#fff', padding: '6px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: 700 }}>
                    Book a Journey
                  </span>
                  <span style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', padding: '6px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: 600 }}>
                    Explore Tours
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // CONTACT SECTION EDITOR
    if (activeSection === 'Contact Section') {
      return (
        <div className="admin-cms-dashboard">
          {renderQuickNav()}
          <div className="admin-cms-toolbar" style={{ marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ margin: '0 0 4px', fontSize: '24px' }}>Contact Page Section</h3>
              <span style={{ color: '#64748b', fontSize: '13px' }}>
                Customize the eyebrow tag, heading title, and helper subtitle shown on the Contact page.
              </span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1.2fr) minmax(280px, 1fr)', gap: '20px' }}>
            {/* Form */}
            <div className="admin-cms-blog-panel" style={{ marginTop: 0 }}>
              <div className="admin-cms-blog-header">
                <h3>Edit Contact Content</h3>
                <span>Update the text below and click "Save Contact Section".</span>
              </div>

              <form onSubmit={handleSaveContact} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', fontWeight: 700, color: '#334155' }}>
                  <span>Contact Eyebrow Tag</span>
                  <input
                    value={contactDraft.contactEyebrow}
                    onChange={e => setContactDraft(c => ({ ...c, contactEyebrow: e.target.value }))}
                    placeholder="e.g. WE'RE HERE TO ASSIST YOU"
                    style={{ border: '1px solid #dfe7ef', borderRadius: '6px', padding: '10px', fontSize: '14px' }}
                  />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', fontWeight: 700, color: '#334155' }}>
                  <span>Contact Page Title</span>
                  <input
                    value={contactDraft.contactTitle}
                    onChange={e => setContactDraft(c => ({ ...c, contactTitle: e.target.value }))}
                    placeholder="e.g. Get In Touch"
                    style={{ border: '1px solid #dfe7ef', borderRadius: '6px', padding: '10px', fontSize: '14px' }}
                  />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', fontWeight: 700, color: '#334155' }}>
                  <span>Contact Subtitle</span>
                  <textarea
                    rows={4}
                    value={contactDraft.contactSubtitle}
                    onChange={e => setContactDraft(c => ({ ...c, contactSubtitle: e.target.value }))}
                    placeholder="Inquiries about an itinerary or custom trip planning..."
                    style={{ border: '1px solid #dfe7ef', borderRadius: '6px', padding: '10px', fontSize: '14px', resize: 'vertical' }}
                  />
                </label>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                  <button
                    type="button"
                    className="admin-cms-action-btn"
                    onClick={() => setContactDraft({
                      contactEyebrow: "WE'RE HERE TO ASSIST YOU",
                      contactTitle: 'Get In Touch',
                      contactSubtitle: 'Have inquiries about an itinerary or need custom vacation planning? Our specialists are available 24/7'
                    })}
                  >
                    Reset Defaults
                  </button>
                  <button type="submit" className="admin-cms-action-btn primary">
                    {contactFeedback ? <Check size={14} /> : null}
                    <span>{contactFeedback ? 'Saved!' : 'Save Contact Section'}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Live Visual Preview */}
            <div>
              <h4 style={{ margin: '0 0 10px', fontSize: '14px', color: '#64748b' }}>Live Contact Header Preview</h4>
              <div style={{
                background: '#ffffff',
                color: '#1e293b',
                borderRadius: '14px',
                padding: '28px 24px',
                boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)',
                border: '1px solid #e2e8f0',
                textAlign: 'center'
              }}>
                <div style={{
                  display: 'inline-block',
                  background: '#f0fdfa',
                  color: '#0f766e',
                  border: '1px solid #99f6e4',
                  padding: '4px 12px',
                  borderRadius: '999px',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  marginBottom: '10px'
                }}>
                  {contactDraft.contactEyebrow || "WE'RE HERE TO ASSIST YOU"}
                </div>
                <h2 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 10px', color: '#0f172a' }}>
                  {contactDraft.contactTitle || 'Get In Touch'}
                </h2>
                <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#64748b', margin: 0 }}>
                  {contactDraft.contactSubtitle || 'Have inquiries about an itinerary or need custom vacation planning? Our specialists are available 24/7'}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // TOUR PACKAGES MANAGER
    if (activeSection === 'Packages') {
      return (
        <div className="admin-cms-dashboard">
          {renderQuickNav()}
          <div className="admin-cms-toolbar" style={{ marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ margin: '0 0 4px', fontSize: '24px' }}>Tour Packages Manager</h3>
              <span style={{ color: '#64748b', fontSize: '13px' }}>
                Edit, customize prices, or remove tour packages shown across the website.
              </span>
            </div>
            <div className="admin-cms-search-box">
              <input
                type="text"
                placeholder="Search tour packages..."
                aria-label="Search tour packages"
                value={packageSearchTerm}
                onChange={e => setPackageSearchTerm(e.target.value)}
              />
              <Search size={18} />
            </div>
          </div>

          <div className="admin-cms-dashboard-grid" style={{ marginBottom: '1.5rem' }}>
            <div className="admin-cms-stat-card compact">
              <span>Total Packages</span>
              <strong>{packages.length}</strong>
            </div>
            <div className="admin-cms-stat-card compact">
              <span>Visible on Site</span>
              <strong style={{ color: '#0f766e' }}>{activePackagesCount}</strong>
            </div>
            <div className="admin-cms-stat-card compact">
              <span>Removed / Hidden</span>
              <strong style={{ color: '#c2410c' }}>{removedPackageIds.length}</strong>
            </div>
          </div>

          <section className="admin-cms-blog-panel" ref={packageFormRef}>
            <div className="admin-cms-blog-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <h3>{editingPackageId ? 'Edit Tour Package' : 'Add New Tour Package'}</h3>
                <span>
                  {editingPackageId 
                    ? 'Modify package details below and click "Save package changes"' 
                    : 'Create a new curated tour package for the catalog.'}
                </span>
              </div>
              {editingPackageId && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ background: '#fef3c7', color: '#92400e', padding: '4px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: 600 }}>
                    Editing: {packageForm.title || editingPackageId}
                  </span>
                  <button type="button" className="admin-cms-action-btn" onClick={resetPackageForm}>
                    Cancel Edit
                  </button>
                </div>
              )}
            </div>

            <form onSubmit={savePackage} className="admin-cms-blog-form">
              <label>
                <span>Package Title *</span>
                <input
                  value={packageForm.title}
                  onChange={e => setPackageForm(current => ({ ...current, title: e.target.value }))}
                  placeholder="e.g. 6-Day Royal Rajasthan Heritage Tour"
                  required
                />
              </label>

              <label>
                <span>Destination(s) *</span>
                <input
                  value={packageForm.destination}
                  onChange={e => setPackageForm(current => ({ ...current, destination: e.target.value }))}
                  placeholder="e.g. Jaipur, Jodhpur & Udaipur"
                  required
                />
              </label>

              <label>
                <span>Duration</span>
                <input
                  value={packageForm.duration}
                  onChange={e => setPackageForm(current => ({ ...current, duration: e.target.value }))}
                  placeholder="e.g. 6 Days / 5 Nights"
                />
              </label>

              <label>
                <span>Featured Badge</span>
                <select
                  value={packageForm.badge}
                  onChange={e => setPackageForm(current => ({ ...current, badge: e.target.value }))}
                >
                  <option>Best Seller</option>
                  <option>Most Popular</option>
                  <option>Romantic VIP</option>
                  <option>Adventure</option>
                  <option>Hot Deal</option>
                  <option>Island VIP</option>
                  <option>Heritage Special</option>
                  <option>Luxury Retreat</option>
                </select>
              </label>

              <label>
                <span>Current Price (₹ / person) *</span>
                <input
                  type="number"
                  value={packageForm.price}
                  onChange={e => setPackageForm(current => ({ ...current, price: e.target.value }))}
                  placeholder="24999"
                  required
                />
              </label>

              <label>
                <span>Original Price (₹ - strikethrough discount)</span>
                <input
                  type="number"
                  value={packageForm.originalPrice}
                  onChange={e => setPackageForm(current => ({ ...current, originalPrice: e.target.value }))}
                  placeholder="29999"
                />
              </label>

              <label>
                <span>Rating (1.0 - 5.0)</span>
                <input
                  type="number"
                  step="0.01"
                  min="1"
                  max="5"
                  value={packageForm.rating}
                  onChange={e => setPackageForm(current => ({ ...current, rating: e.target.value }))}
                  placeholder="4.95"
                />
              </label>

              <label>
                <span>Group Size</span>
                <input
                  value={packageForm.groupSize}
                  onChange={e => setPackageForm(current => ({ ...current, groupSize: e.target.value }))}
                  placeholder="e.g. 2 - 8 Persons"
                />
              </label>

              <label>
                <span>Departure Schedule</span>
                <input
                  value={packageForm.departure}
                  onChange={e => setPackageForm(current => ({ ...current, departure: e.target.value }))}
                  placeholder="e.g. Every Monday & Thursday or Daily Departures"
                />
              </label>

              <label>
                <span>Cover Image URL</span>
                <input
                  value={packageForm.image}
                  onChange={e => setPackageForm(current => ({ ...current, image: e.target.value }))}
                  placeholder="https://images.unsplash.com/..."
                />
              </label>

              <label className="admin-cms-full-width">
                <span>Overview & Description</span>
                <textarea
                  rows={3}
                  value={packageForm.overview}
                  onChange={e => setPackageForm(current => ({ ...current, overview: e.target.value }))}
                  placeholder="Detailed summary of this tour package experience..."
                />
              </label>

              <label className="admin-cms-full-width">
                <span>What's Included (1 perk per line)</span>
                <textarea
                  rows={4}
                  value={packageForm.includes}
                  onChange={e => setPackageForm(current => ({ ...current, includes: e.target.value }))}
                  placeholder="4★ & 5★ Heritage Palace & Haveli Stays&#10;Daily Royal Buffet Breakfast & Dinners&#10;Private AC Chauffeur for All Transfers"
                />
              </label>

              <div className="admin-cms-blog-actions admin-cms-full-width">
                <button type="button" className="admin-cms-action-btn" onClick={resetPackageForm}>
                  {editingPackageId ? 'Cancel' : 'Clear'}
                </button>
                <button type="submit" className="admin-cms-action-btn primary">
                  {editingPackageId ? 'Save package changes' : 'Add package'}
                </button>
              </div>
            </form>
          </section>

          <section className="admin-cms-blog-panel" style={{ marginTop: '1.5rem' }}>
            <div className="admin-cms-blog-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <h4 style={{ margin: '0 0 4px', fontSize: '18px' }}>Tour Packages on Your Website ({filteredAdminPackages.length})</h4>
                <span>Use <strong>Edit</strong> to modify pricing, itinerary, and perks, or <strong>Remove</strong> to un-publish from the public catalog.</span>
              </div>
            </div>

            <div className="admin-cms-blog-list">
              {filteredAdminPackages.length === 0 ? (
                <p style={{ padding: '1rem', textAlign: 'center' }}>No tour packages match your search query.</p>
              ) : (
                filteredAdminPackages.map(pkg => {
                  const isRemoved = removedPackageIds.includes(pkg.id);
                  return (
                    <div 
                      key={pkg.id} 
                      className="admin-cms-blog-item" 
                      style={{ 
                        opacity: isRemoved ? 0.75 : 1,
                        borderLeft: isRemoved ? '4px solid #f97316' : '4px solid #14b8a6',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ display: 'flex', gap: '14px', alignItems: 'center', minWidth: 0, flex: 1 }}>
                        {pkg.image && (
                          <img 
                            src={pkg.image} 
                            alt={pkg.title} 
                            style={{ width: '84px', height: '64px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0, border: '1px solid #e2e8f0' }}
                          />
                        )}
                        <div style={{ minWidth: 0, flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
                            <strong style={{ fontSize: '15px', margin: 0, color: '#0f172a' }}>{pkg.title}</strong>
                            {pkg.badge && (
                              <span style={{ 
                                background: '#fef3c7', 
                                color: '#d97706', 
                                fontSize: '11px', 
                                fontWeight: 700, 
                                padding: '2px 8px', 
                                borderRadius: '6px' 
                              }}>
                                {pkg.badge}
                              </span>
                            )}
                            <span style={{
                              background: isRemoved ? '#ffedd5' : '#ecfdf5',
                              color: isRemoved ? '#c2410c' : '#047857',
                              fontSize: '11px',
                              fontWeight: 600,
                              padding: '2px 8px',
                              borderRadius: '6px'
                            }}>
                              {isRemoved ? 'Removed from public site' : 'Visible on public site'}
                            </span>
                          </div>
                          <span style={{ color: '#475569', fontSize: '13px' }}>
                            📍 {pkg.destination} • ⏱ {pkg.duration} • 👥 {pkg.groupSize || '2 - 8'}
                          </span>
                          <small style={{ marginTop: '3px', fontWeight: 600, color: '#0f766e', fontSize: '13px' }}>
                            ₹{Number(pkg.price).toLocaleString('en-IN')} / person
                            {pkg.originalPrice && (
                              <span style={{ textDecoration: 'line-through', color: '#94a3b8', marginLeft: '6px', fontSize: '12px' }}>
                                ₹{Number(pkg.originalPrice).toLocaleString('en-IN')}
                              </span>
                            )}
                            {' '}• Rating: ⭐ {pkg.rating || '4.9'}
                          </small>
                        </div>
                      </div>

                      <div className="admin-cms-blog-item-actions" style={{ flexShrink: 0 }}>
                        <button
                          type="button"
                          className="admin-cms-action-btn"
                          onClick={() => editPackage(pkg)}
                          title={`Edit ${pkg.title}`}
                        >
                          <Edit size={14} />
                          <span>Edit</span>
                        </button>

                        {isRemoved ? (
                          <button
                            type="button"
                            className="admin-cms-action-btn"
                            onClick={() => onRestorePackage?.(pkg.id)}
                            style={{ borderColor: '#10b981', color: '#0f766e', background: '#ecfdf5' }}
                            title={`Restore ${pkg.title}`}
                          >
                            <RotateCcw size={14} />
                            <span>Restore</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="admin-cms-action-btn danger"
                            onClick={() => deletePackage(pkg)}
                            title={`Remove ${pkg.title}`}
                          >
                            <Trash2 size={14} />
                            <span>Remove</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </section>
        </div>
      );
    }

    // DESTINATIONS MANAGER (Default & Primary View)
    return (
      <div className="admin-cms-dashboard">
        {renderQuickNav()}
        <div className="admin-cms-toolbar" style={{ marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ margin: '0 0 4px', fontSize: '24px' }}>Destinations Manager</h3>
            <span style={{ color: '#64748b', fontSize: '13px' }}>
              Add, edit pricing, or remove travel destinations shown on your public travel page.
            </span>
          </div>
          <div className="admin-cms-search-box">
            <input
              type="text"
              placeholder="Search destinations..."
              aria-label="Search destinations"
              value={destinationSearchTerm}
              onChange={event => setDestinationSearchTerm(event.target.value)}
            />
            <Search size={18} />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="admin-cms-dashboard-grid" style={{ marginBottom: '1.5rem' }}>
          <div className="admin-cms-stat-card compact">
            <span>Total Destinations</span>
            <strong>{destinations.length}</strong>
          </div>
          <div className="admin-cms-stat-card compact">
            <span>Visible on Site</span>
            <strong style={{ color: '#0f766e' }}>{activeDestinationsCount}</strong>
          </div>
          <div className="admin-cms-stat-card compact">
            <span>Removed / Hidden</span>
            <strong style={{ color: '#c2410c' }}>{removedDestinationIds.length}</strong>
          </div>
        </div>

        {/* Add / Edit Destination Form */}
        <section className="admin-cms-blog-panel" ref={destinationFormRef}>
          <div className="admin-cms-blog-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <h3>{editingBlogId ? 'Edit Destination' : 'Add New Destination'}</h3>
              <span>
                {editingBlogId 
                  ? 'Update destination details below and click "Save destination"' 
                  : 'Add a new location to your destinations catalog.'}
              </span>
            </div>
            {editingBlogId && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ background: '#fef3c7', color: '#92400e', padding: '4px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: 600 }}>
                  Editing: {blogForm.title || editingBlogId}
                </span>
                <button type="button" className="admin-cms-action-btn" onClick={resetBlogForm}>
                  Cancel Edit
                </button>
              </div>
            )}
          </div>

          <div className="admin-cms-blog-form">
            <label>
              <span>Destination Name *</span>
              <input
                value={blogForm.title}
                onChange={event => setBlogForm(current => ({ ...current, title: event.target.value }))}
                placeholder="e.g. Goa Beach Escape"
                required
              />
            </label>

            <label>
              <span>Category</span>
              <select
                value={blogForm.category}
                onChange={event => setBlogForm(current => ({ ...current, category: event.target.value }))}
              >
                <option>Beaches</option>
                <option>Romantic</option>
                <option>Mountains</option>
                <option>Historic</option>
                <option>Adventure</option>
                <option>Luxury</option>
              </select>
            </label>

            <label>
              <span>Tagline</span>
              <input
                value={blogForm.tagline}
                onChange={event => setBlogForm(current => ({ ...current, tagline: event.target.value }))}
                placeholder="e.g. Sun, Sand & Coastal Luxury"
              />
            </label>

            <label>
              <span>Price (₹ / person) *</span>
              <input
                type="number"
                value={blogForm.price}
                onChange={event => setBlogForm(current => ({ ...current, price: event.target.value }))}
                placeholder="14999"
                required
              />
            </label>

            <label>
              <span>Image URL</span>
              <input
                value={blogForm.image}
                onChange={event => setBlogForm(current => ({ ...current, image: event.target.value }))}
                placeholder="https://images.unsplash.com/..."
              />
            </label>

            <label className="admin-cms-full-width">
              <span>Description</span>
              <textarea
                value={blogForm.description}
                onChange={event => setBlogForm(current => ({ ...current, description: event.target.value }))}
                rows={4}
                placeholder="Describe the destination and what makes it special..."
              />
            </label>

            <label className="admin-cms-toggle-row admin-cms-full-width">
              <input
                type="checkbox"
                checked={blogForm.featured}
                onChange={event => setBlogForm(current => ({ ...current, featured: event.target.checked }))}
              />
              <span>Featured destination on homepage</span>
            </label>

            <div className="admin-cms-blog-actions admin-cms-full-width">
              <button type="button" className="admin-cms-action-btn" onClick={resetBlogForm}>
                {editingBlogId ? 'Cancel' : 'Clear'}
              </button>
              <button type="button" className="admin-cms-action-btn primary" onClick={saveBlogPost}>
                {editingBlogId ? 'Save destination' : 'Add destination'}
              </button>
            </div>
          </div>
        </section>

        {/* Custom Blog/Destinations added */}
        {blogPosts.length > 0 && (
          <div className="admin-cms-blog-list" style={{ marginTop: '1.5rem' }}>
            <h4 style={{ margin: '0 0 0.75rem', fontSize: '16px' }}>Custom Destinations Added</h4>
            {blogPosts.map(post => (
              <div key={post.id} className="admin-cms-blog-item">
                <div>
                  <strong>{post.name}</strong>
                  <span>{post.category}</span>
                  <small>₹{Number(post.price).toLocaleString('en-IN')} / person</small>
                </div>
                <div className="admin-cms-blog-item-actions">
                  <button type="button" className="admin-cms-action-btn" onClick={() => editBlogPost(post)}>
                    <Edit size={14} />
                    <span>Edit</span>
                  </button>
                  <button type="button" className="admin-cms-action-btn danger" onClick={() => deleteBlogPost(post.id)}>
                    <Trash2 size={14} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* All Destinations on Public Page */}
        <section className="admin-cms-blog-panel" style={{ marginTop: '1.5rem' }}>
          <div className="admin-cms-blog-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
            <div>
              <h4 style={{ margin: '0 0 4px', fontSize: '18px' }}>Destinations Catalog ({filteredDestinations.length})</h4>
              <span>Use <strong>Edit</strong> to modify pricing and details, or <strong>Remove</strong> to un-publish from the public catalog.</span>
            </div>
          </div>

          <div className="admin-cms-blog-list">
            {filteredDestinations.length === 0 ? (
              <p style={{ padding: '1rem', textAlign: 'center' }}>No destinations match your search query.</p>
            ) : (
              filteredDestinations.map(destination => {
                const isRemoved = removedDestinationIds.includes(destination.id);
                return (
                  <div 
                    key={destination.id} 
                    className="admin-cms-blog-item"
                    style={{
                      opacity: isRemoved ? 0.75 : 1,
                      borderLeft: isRemoved ? '4px solid #f97316' : '4px solid #14b8a6',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', gap: '14px', alignItems: 'center', minWidth: 0, flex: 1 }}>
                      {destination.image && (
                        <img 
                          src={destination.image} 
                          alt={destination.name} 
                          style={{ width: '84px', height: '64px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0, border: '1px solid #e2e8f0' }}
                        />
                      )}
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
                          <strong style={{ fontSize: '15px', margin: 0, color: '#0f172a' }}>{destination.name}</strong>
                          <span style={{ 
                            background: '#f1f5f9', 
                            color: '#475569', 
                            fontSize: '11px', 
                            fontWeight: 700, 
                            padding: '2px 8px', 
                            borderRadius: '6px' 
                          }}>
                            {destination.category || 'Travel'}
                          </span>
                          <span style={{
                            background: isRemoved ? '#ffedd5' : '#ecfdf5',
                            color: isRemoved ? '#c2410c' : '#047857',
                            fontSize: '11px',
                            fontWeight: 600,
                            padding: '2px 8px',
                            borderRadius: '6px'
                          }}>
                            {isRemoved ? 'Removed from public site' : 'Visible on public site'}
                          </span>
                        </div>
                        <span style={{ color: '#64748b', fontSize: '13px' }}>
                          📍 {destination.state || destination.tagline || destination.category} • ⏱ {destination.duration || '5 Days / 4 Nights'}
                        </span>
                        <small style={{ marginTop: '3px', fontWeight: 600, color: '#0f766e', fontSize: '13px' }}>
                          ₹{Number(destination.price).toLocaleString('en-IN')} / person
                          {destination.rating && ` • ⭐ ${destination.rating}`}
                        </small>
                      </div>
                    </div>

                    <div className="admin-cms-blog-item-actions" style={{ flexShrink: 0 }}>
                      <button 
                        type="button" 
                        className="admin-cms-action-btn" 
                        onClick={() => editBlogPost(destination)}
                        title={`Edit ${destination.name}`}
                      >
                        <Edit size={14} />
                        <span>Edit</span>
                      </button>

                      {isRemoved ? (
                        <button
                          type="button"
                          className="admin-cms-action-btn"
                          onClick={() => onRestoreDestination?.(destination.id)}
                          style={{ borderColor: '#10b981', color: '#0f766e', background: '#ecfdf5' }}
                          title={`Restore ${destination.name}`}
                        >
                          <RotateCcw size={14} />
                          <span>Restore</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="admin-cms-action-btn danger"
                          onClick={() => deleteDestination(destination)}
                          title={`Remove ${destination.name}`}
                        >
                          <Trash2 size={14} />
                          <span>Remove</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </div>
    );
  };

  return (
    <div className="admin-cms-shell">
      <aside className="admin-cms-sidebar">
        <div className="admin-cms-profile">
          <div className="admin-cms-avatar">RP</div>
          <div className="admin-cms-profile-meta">
            <h3>Rakesh Reddy</h3>
            <span>Administrator</span>
          </div>
        </div>

        <nav className="admin-cms-nav" aria-label="Admin navigation">
          {sidebarItems.map(({ label, icon: Icon, count }) => (
            <button
              type="button"
              key={label}
              className={activeSection === label ? 'admin-cms-nav-item active' : 'admin-cms-nav-item'}
              onClick={() => handleSidebarClick(label)}
            >
              <Icon size={16} />
              <span>{label}</span>
              {count !== undefined && count !== null ? <em>{count}</em> : null}
            </button>
          ))}
        </nav>
      </aside>

      <main className="admin-cms-main">
        {renderSection()}
      </main>

      {/* Destination Removal Confirmation Modal */}
      {destinationToRemove && (
        <div className="admin-destination-modal-backdrop" onClick={() => setDestinationToRemove(null)}>
          <div
            className="admin-destination-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="remove-destination-title"
            onClick={event => event.stopPropagation()}
          >
            <button
              type="button"
              className="admin-destination-modal-close"
              aria-label="Close confirmation"
              onClick={() => setDestinationToRemove(null)}
            >
              <X size={18} />
            </button>
            <div className="admin-destination-modal-icon">!</div>
            <h3 id="remove-destination-title">Remove destination?</h3>
            <p>
              <strong>{destinationToRemove.name}</strong> will no longer appear on the public destinations page.
            </p>
            <div className="admin-destination-modal-actions">
              <button type="button" className="admin-cms-action-btn" onClick={() => setDestinationToRemove(null)}>
                Keep destination
              </button>
              <button type="button" className="admin-cms-action-btn danger" onClick={confirmRemoveDestination}>
                Remove destination
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tour Package Removal Confirmation Modal */}
      {packageToRemove && (
        <div className="admin-destination-modal-backdrop" onClick={() => setPackageToRemove(null)}>
          <div
            className="admin-destination-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="remove-package-title"
            onClick={event => event.stopPropagation()}
          >
            <button
              type="button"
              className="admin-destination-modal-close"
              aria-label="Close confirmation"
              onClick={() => setPackageToRemove(null)}
            >
              <X size={18} />
            </button>
            <div className="admin-destination-modal-icon">!</div>
            <h3 id="remove-package-title">Remove tour package?</h3>
            <p>
              <strong>{packageToRemove.title}</strong> will no longer appear on the public tour packages page or booking form.
            </p>
            <div className="admin-destination-modal-actions">
              <button type="button" className="admin-cms-action-btn" onClick={() => setPackageToRemove(null)}>
                Keep package
              </button>
              <button type="button" className="admin-cms-action-btn danger" onClick={confirmRemovePackage}>
                Remove package
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
