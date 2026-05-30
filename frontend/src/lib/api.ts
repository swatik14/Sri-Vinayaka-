import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: { 'Content-Type': 'application/json' },
});

// Inject auth token for admin requests
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('admin_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err.response?.status === 401 && typeof window !== 'undefined') {
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        localStorage.removeItem('admin_token');
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(err);
  }
);

// Temple
export const templeApi = {
  getInfo: () => api.get('/temple/info'),
  getTimings: () => api.get('/temple/timings'),
  getDarshan: () => api.get('/temple/darshan'),
  getAnnouncements: () => api.get('/temple/announcements'),
  getLiveDarshan: () => api.get('/temple/live-darshan'),
  updateInfo: (data: unknown) => api.put('/temple/info', data),
  updateLiveDarshan: (data: unknown) => api.put('/temple/live-darshan', data),
};

// Sevas
export const sevaApi = {
  getAll: () => api.get('/sevas'),
  getById: (id: number) => api.get(`/sevas/${id}`),
  book: (data: unknown) => api.post('/sevas/book', data),
  getBooking: (bookingId: string) => api.get(`/sevas/booking/${bookingId}`),
  // Admin
  adminGetBookings: (params?: Record<string, unknown>) => api.get('/sevas/admin/bookings', { params }),
  adminUpdateBooking: (id: number, data: unknown) => api.patch(`/sevas/admin/bookings/${id}`, data),
  adminCreate: (data: unknown) => api.post('/sevas/admin', data),
  adminUpdate: (id: number, data: unknown) => api.put(`/sevas/admin/${id}`, data),
  adminDelete: (id: number) => api.delete(`/sevas/admin/${id}`),
};

// Donations
export const donationApi = {
  getPurposes: () => api.get('/donations/purposes'),
  donate: (data: unknown) => api.post('/donations', data),
  getReceipt: (receiptNumber: string) => api.get(`/donations/receipt/${receiptNumber}`),
  // Admin
  adminGetAll: (params?: Record<string, unknown>) => api.get('/donations/admin', { params }),
  adminUpdate: (id: number, data: unknown) => api.patch(`/donations/admin/${id}`, data),
};

// Festivals
export const festivalApi = {
  getAll: (params?: Record<string, unknown>) => api.get('/festivals', { params }),
  getById: (id: number) => api.get(`/festivals/${id}`),
  // Admin
  adminGetAll: () => api.get('/festivals/admin/all'),
  adminCreate: (data: unknown) => api.post('/festivals/admin', data),
  adminUpdate: (id: number, data: unknown) => api.put(`/festivals/admin/${id}`, data),
  adminDelete: (id: number) => api.delete(`/festivals/admin/${id}`),
};

// Gallery
export const galleryApi = {
  getAll: (params?: Record<string, unknown>) => api.get('/gallery', { params }),
  // Admin
  adminGetAll: () => api.get('/gallery/admin/all'),
  adminCreate: (data: unknown) => api.post('/gallery/admin', data),
  adminUpdate: (id: number, data: unknown) => api.put(`/gallery/admin/${id}`, data),
  adminDelete: (id: number) => api.delete(`/gallery/admin/${id}`),
};

// Admin
export const adminApi = {
  getDashboard: () => api.get('/admin/dashboard'),
  getAnnouncements: () => api.get('/admin/announcements'),
  createAnnouncement: (data: unknown) => api.post('/admin/announcements', data),
  updateAnnouncement: (id: number, data: unknown) => api.put(`/admin/announcements/${id}`, data),
  deleteAnnouncement: (id: number) => api.delete(`/admin/announcements/${id}`),
  getTimings: () => api.get('/admin/timings'),
  updateTiming: (id: number, data: unknown) => api.put(`/admin/timings/${id}`, data),
};

// Auth
export const authApi = {
  login: (username: string, password: string) => api.post('/auth/login', { username, password }),
  me: () => api.get('/auth/me'),
  changePassword: (current_password: string, new_password: string) =>
    api.post('/auth/change-password', { current_password, new_password }),
};
