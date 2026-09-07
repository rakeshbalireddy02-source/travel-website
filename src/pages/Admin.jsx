import React, { useMemo, useState } from 'react';
import {
  BarChart3, Eye, FileText, Home, LayoutGrid, LogOut, MessageSquareText,
  Search, ShieldCheck, X
} from 'lucide-react';

const sidebarItems = [
  { label: 'Dashboard', icon: BarChart3 },
  { label: 'Configuration', icon: LayoutGrid },
  { label: 'Pages', icon: FileText, count: 42 },
  { label: 'Comments', icon: MessageSquareText },
  { label: 'Logout', icon: LogOut }
];

const pageDefinitions = [
  {
    id: 'home',
    name: 'Home',
    path: '/home → default',
    visible: true,
    icon: Home,
    fields: [
      { key: 'heroEyebrow', label: 'Hero eyebrow', type: 'input' },
      { key: 'heroTitle', label: 'Hero title', type: 'input' },
      { key: 'heroDescription', label: 'Hero description', type: 'textarea' }
    ]
  },
  {
    id: 'about',
    name: 'About',
    path: '/about → default',
    visible: true,
    icon: ShieldCheck,
    fields: [
      { key: 'aboutEyebrow', label: 'Eyebrow', type: 'input' },
      { key: 'aboutTitle', label: 'Page title', type: 'input' },
      { key: 'aboutSubtitle', label: 'Subtitle', type: 'textarea' }
    ]
  },
  {
    id: 'contact',
    name: 'Contact',
    path: '/contact → form',
    visible: true,
    icon: MessageSquareText,
    fields: [
      { key: 'contactEyebrow', label: 'Eyebrow', type: 'input' },
      { key: 'contactTitle', label: 'Page title', type: 'input' },
      { key: 'contactSubtitle', label: 'Subtitle', type: 'textarea' }
    ]
  }
];

const pageLegend = [
  { label: 'Visible', tone: 'visible' },
  { label: 'Non-Routable', tone: 'non-routable' },
  { label: 'Non-Visible', tone: 'hidden' },
  { label: 'Modular', tone: 'modular' }
];

export default function Admin({
  onLogout,
  siteContent,
  onUpdateContent,
  blogPosts = [],
  onAddBlogPost,
  onUpdateBlogPost,
  onDeleteBlogPost,
  bookings = [],
  messages = [],
  onDeleteMessage,
  themes = {},
  currentTheme = 'ocean',
  onChangeTheme
}) {
  const [pages, setPages] = useState(pageDefinitions);
  const [activeSection, setActiveSection] = useState('Pages');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedPages, setExpandedPages] = useState(() => new Set(pageDefinitions.map(page => page.id)));
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState({ name: '', path: '', visible: true, values: {} });
  const [blogForm, setBlogForm] = useState({
    title: '',
    category: 'Beaches',
    description: '',
    price: '14999',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80',
    featured: true,
    tagline: ''
  });
  const [editingBlogId, setEditingBlogId] = useState(null);

  const filteredPages = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return pages;
    return pages.filter(page => page.name.toLowerCase().includes(query) || page.path.toLowerCase().includes(query));
  }, [pages, searchTerm]);

  const dashboardStats = useMemo(() => [
    { label: 'Visible pages', value: pages.filter(page => page.visible).length },
    { label: 'Bookings', value: bookings.length },
    { label: 'Messages', value: messages.length },
    { label: 'Custom destinations', value: blogPosts.length }
  ], [pages, bookings.length, messages.length, blogPosts.length]);

  const openEditor = (page) => {
    const values = {};
    page.fields.forEach(field => {
      values[field.key] = siteContent?.[field.key] ?? '';
    });

    setEditingId(page.id);
    setExpandedPages(current => new Set(current).add(page.id));
    setDraft({ name: page.name, path: page.path, visible: page.visible, values });
  };

  const savePage = () => {
    if (!editingId) return;

    const page = pages.find(item => item.id === editingId);
    if (!page) return;

    const updatedValues = {};
    page.fields.forEach(field => {
      updatedValues[field.key] = draft.values[field.key] ?? '';
    });

    onUpdateContent?.(current => ({ ...current, ...updatedValues }));

    setPages(current => current.map(item => item.id === editingId ? {
      ...item,
      name: draft.name.trim() || item.name,
      path: draft.path.trim() || item.path,
      visible: draft.visible
    } : item));

    setEditingId(null);
    setDraft({ name: '', path: '', visible: true, values: {} });
  };

  const toggleVisible = (pageId) => {
    setPages(current => current.map(page => page.id === pageId ? { ...page, visible: !page.visible } : page));
  };

  const deletePage = (pageId) => {
    setPages(current => current.filter(page => page.id !== pageId));
    setExpandedPages(current => {
      const next = new Set(current);
      next.delete(pageId);
      return next;
    });
    if (editingId === pageId) {
      setEditingId(null);
      setDraft({ name: '', path: '', visible: true, values: {} });
    }
  };

  const resetBlogForm = () => {
    setBlogForm({
      title: '',
      category: 'Beaches',
      description: '',
      price: '14999',
      image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80',
      featured: true,
      tagline: ''
    });
    setEditingBlogId(null);
  };

  const saveBlogPost = () => {
    if (!blogForm.title.trim() || !blogForm.description.trim()) {
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
      duration: '4 Days / 3 Nights',
      image: blogForm.image.trim() || 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80',
      description: blogForm.description.trim(),
      featured: blogForm.featured,
      highlights: [
        'Custom itinerary crafted for your travel style',
        'Handpicked stays and experiences',
        'Local guides and seamless support'
      ]
    };

    if (editingBlogId) {
      onUpdateBlogPost?.(editingBlogId, destination);
    } else {
      onAddBlogPost?.(destination);
    }

    resetBlogForm();
  };

  const editBlogPost = (post) => {
    setEditingBlogId(post.id);
    setBlogForm({
      title: post.name,
      category: post.category,
      description: post.description,
      price: String(post.price),
      image: post.image,
      featured: post.featured,
      tagline: post.tagline
    });
  };

  const deleteBlogPost = (postId) => {
    onDeleteBlogPost?.(postId);
    if (editingBlogId === postId) resetBlogForm();
  };

  const handleSidebarClick = (label) => {
    if (label === 'Logout') {
      onLogout?.();
      return;
    }

    setActiveSection(label);
  };

  const renderSection = () => {
    if (activeSection === 'Dashboard') {
      return (
        <div className="admin-cms-dashboard">
          <div className="admin-cms-toolbar" style={{ marginBottom: '1rem' }}>
            <h3 style={{ margin: 0 }}>Dashboard overview</h3>
          </div>
          <div className="admin-cms-dashboard-grid">
            {dashboardStats.map(stat => (
              <div key={stat.label} className="admin-cms-stat-card">
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
              </div>
            ))}
          </div>
          <div className="admin-cms-banner">
            <span className="admin-cms-banner-icon">!</span>
            Site content is live and changes are saved automatically in the browser.
          </div>
        </div>
      );
    }

    if (activeSection === 'Configuration') {
      return (
        <div className="admin-cms-dashboard">
          <div className="admin-cms-toolbar" style={{ marginBottom: '1rem' }}>
            <h3 style={{ margin: 0 }}>Configuration</h3>
          </div>
          <div className="admin-cms-dashboard-grid">
            {Object.entries(siteContent || {}).slice(0, 6).map(([key, value]) => (
              <div key={key} className="admin-cms-stat-card compact">
                <span>{key}</span>
                <strong>{String(value).slice(0, 28)}{String(value).length > 28 ? '…' : ''}</strong>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (activeSection === 'Comments') {
      return (
        <div className="admin-cms-dashboard">
          <div className="admin-cms-toolbar" style={{ marginBottom: '1rem' }}>
            <h3 style={{ margin: 0 }}>Comments</h3>
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
                    <button type="button" className="admin-cms-action-btn danger" onClick={() => onDeleteMessage?.(message.id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <>
        <div className="admin-cms-toolbar">
          <div className="admin-cms-search-box">
            <input
              type="text"
              placeholder="Search Pages"
              aria-label="Search pages"
              value={searchTerm}
              onChange={event => setSearchTerm(event.target.value)}
            />
            <Search size={18} />
          </div>
        </div>

        <div className="admin-cms-list">
          {filteredPages.map(page => {
            const Icon = page.icon;
            const expanded = expandedPages.has(page.id);

            return (
              <div className="admin-cms-row-wrap" key={page.id}>
                <div className="admin-cms-row">
                  <div className="admin-cms-row-main">
                    <button
                      type="button"
                      className={page.visible ? 'admin-cms-status visible' : 'admin-cms-status hidden'}
                      aria-label={page.visible ? 'Visible page' : 'Hidden page'}
                      onClick={() => toggleVisible(page.id)}
                      title={page.visible ? 'Hide page' : 'Show page'}
                    />
                    <div className="admin-cms-page-icon">
                      <Icon size={15} />
                    </div>
                    <div className="admin-cms-page-name">
                      <span>{page.name}</span>
                      <small>{page.path}</small>
                    </div>
                  </div>

                  <div className="admin-cms-row-actions">
                    <button
                      type="button"
                      className="admin-cms-icon-btn"
                      aria-label={`Edit ${page.name}`}
                      title={`Edit ${page.name}`}
                      onClick={() => openEditor(page)}
                    >
                      <Eye size={17} />
                    </button>
                    <button
                      type="button"
                      className="admin-cms-icon-btn danger"
                      aria-label={`Delete ${page.name}`}
                      title={`Delete ${page.name}`}
                      onClick={() => deletePage(page.id)}
                    >
                      <X size={17} />
                    </button>
                  </div>
                </div>

                {expanded && editingId === page.id && (
                  <div className="admin-cms-editor">
                    {page.fields.map(field => (
                      <label key={field.key} className={field.type === 'textarea' ? 'admin-cms-textarea' : ''}>
                        <span>{field.label}</span>
                        {field.type === 'textarea' ? (
                          <textarea
                            value={draft.values[field.key] ?? ''}
                            onChange={event => setDraft(current => ({
                              ...current,
                              values: { ...current.values, [field.key]: event.target.value }
                            }))}
                            aria-label={`${field.label} for ${page.name}`}
                            rows={4}
                          />
                        ) : (
                          <input
                            value={draft.values[field.key] ?? ''}
                            onChange={event => setDraft(current => ({
                              ...current,
                              values: { ...current.values, [field.key]: event.target.value }
                            }))}
                            aria-label={`${field.label} for ${page.name}`}
                          />
                        )}
                      </label>
                    ))}

                    <label className="admin-cms-toggle-row">
                      <input
                        type="checkbox"
                        checked={draft.visible}
                        onChange={event => setDraft(current => ({ ...current, visible: event.target.checked }))}
                      />
                      <span>Visible</span>
                    </label>

                    <div className="admin-cms-editor-actions">
                      <button type="button" className="admin-cms-action-btn" onClick={() => setEditingId(null)}>
                        Cancel
                      </button>
                      <button type="button" className="admin-cms-action-btn primary" onClick={savePage}>
                        Save page
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <section className="admin-cms-blog-panel">
          <div className="admin-cms-blog-header">
            <h3>Blog / Destination manager</h3>
            <span>Add a destination from a blog-like entry and it will appear on the public destinations list.</span>
          </div>

          <div className="admin-cms-blog-form">
            <label>
              <span>Destination title</span>
              <input
                value={blogForm.title}
                onChange={event => setBlogForm(current => ({ ...current, title: event.target.value }))}
                placeholder="e.g. Bali Coast Escape"
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
                placeholder="Short destination tagline"
              />
            </label>

            <label>
              <span>Price</span>
              <input
                type="number"
                value={blogForm.price}
                onChange={event => setBlogForm(current => ({ ...current, price: event.target.value }))}
              />
            </label>

            <label>
              <span>Image URL</span>
              <input
                value={blogForm.image}
                onChange={event => setBlogForm(current => ({ ...current, image: event.target.value }))}
                placeholder="https://..."
              />
            </label>

            <label className="admin-cms-full-width">
              <span>Description</span>
              <textarea
                value={blogForm.description}
                onChange={event => setBlogForm(current => ({ ...current, description: event.target.value }))}
                rows={4}
                placeholder="Describe the destination and what makes it special"
              />
            </label>

            <label className="admin-cms-toggle-row admin-cms-full-width">
              <input
                type="checkbox"
                checked={blogForm.featured}
                onChange={event => setBlogForm(current => ({ ...current, featured: event.target.checked }))}
              />
              <span>Featured destination</span>
            </label>

            <div className="admin-cms-blog-actions admin-cms-full-width">
              <button type="button" className="admin-cms-action-btn" onClick={resetBlogForm}>Clear</button>
              <button type="button" className="admin-cms-action-btn primary" onClick={saveBlogPost}>
                {editingBlogId ? 'Update destination' : 'Add destination'}
              </button>
            </div>
          </div>

          <div className="admin-cms-blog-list">
            {blogPosts.length === 0 ? (
              <p>No custom destinations have been added yet.</p>
            ) : (
              blogPosts.map(post => (
                <div key={post.id} className="admin-cms-blog-item">
                  <div>
                    <strong>{post.name}</strong>
                    <span>{post.category}</span>
                    <small>₹{Number(post.price).toLocaleString('en-IN')} / person</small>
                  </div>
                  <div className="admin-cms-blog-item-actions">
                    <button type="button" className="admin-cms-action-btn" onClick={() => editBlogPost(post)}>Edit</button>
                    <button type="button" className="admin-cms-action-btn danger" onClick={() => deleteBlogPost(post.id)}>Delete</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <div className="admin-cms-legend" aria-label="Page legend">
          <span>Page Legend:</span>
          {pageLegend.map(({ label, tone }) => (
            <span key={label} className="admin-cms-legend-item">
              <i className={`admin-cms-legend-dot ${tone}`} aria-hidden="true" />
              {label}
            </span>
          ))}
        </div>

        <div className="admin-cms-banner">
          <span className="admin-cms-banner-icon">!</span>
          Found an issue? Please report it on GitHub.
        </div>
      </>
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
              {count ? <em>{count}</em> : null}
            </button>
          ))}
        </nav>
      </aside>

      <main className="admin-cms-main">
        {renderSection()}
      </main>
    </div>
  );
}
