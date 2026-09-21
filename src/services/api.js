const API_BASE_URL = 'http://127.0.0.1:8000/api';

/**
 * Helper to execute fetch requests with error handling
 */
async function request(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.warn(`API call failed for ${endpoint}:`, error.message);
    throw error;
  }
}

export const apiService = {
  // Health Check
  async checkHealth() {
    return request('/health/');
  },

  // Destinations
  async getDestinations() {
    return request('/destinations/');
  },

  async createDestination(data) {
    return request('/destinations/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Packages
  async getPackages() {
    return request('/packages/');
  },

  async createPackage(data) {
    return request('/packages/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Bookings
  async getBookings() {
    return request('/bookings/');
  },

  async createBooking(bookingData) {
    return request('/bookings/', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  },

  async updateBooking(id, updateData) {
    return request(`/bookings/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(updateData),
    });
  },

  async deleteBooking(id) {
    return request(`/bookings/${id}/`, {
      method: 'DELETE',
    });
  },

  // Testimonials
  async getTestimonials() {
    return request('/testimonials/');
  },

  async createTestimonial(data) {
    return request('/testimonials/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // FAQs
  async getFaqs() {
    return request('/faqs/');
  },

  // Contact Messages
  async getMessages() {
    return request('/messages/');
  },

  async sendMessage(messageData) {
    return request('/messages/', {
      method: 'POST',
      body: JSON.stringify(messageData),
    });
  },

  // Site Content
  async getSiteContent() {
    return request('/site-content/');
  },

  async updateSiteContent(contentData) {
    return request('/site-content/', {
      method: 'POST',
      body: JSON.stringify(contentData),
    });
  }
};
