// One shared axios instance for the whole app, so we only configure the
// base URL and the auth header logic in one place.

import axios from 'axios';

const api = axios.create({
  // In dev, "" means requests go to the same origin, which Vite's proxy
  // (see vite.config.js) forwards to the backend.
  baseURL: import.meta.env.VITE_API_URL || '',
});

// Before every request, attach the saved login token if we have one.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('zenithToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
