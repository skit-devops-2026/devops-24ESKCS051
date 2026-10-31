// This Context is how every page knows "who is logged in right now"
// without passing that info down through props manually. It's the
// simplest version of this pattern - just React's built-in Context,
// no extra library.

import { createContext, useContext, useState } from 'react';
import api from '../api/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // On first load, check if we already have a saved user (so refreshing
  // the page doesn't log you out).
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('zenithUser');
    return saved ? JSON.parse(saved) : null;
  });

  function saveSession(data) {
    // data looks like: { _id, name, email, role, token }
    const { token, ...userInfo } = data;
    localStorage.setItem('zenithToken', token);
    localStorage.setItem('zenithUser', JSON.stringify(userInfo));
    setUser(userInfo);
  }

  async function login(email, password) {
    const res = await api.post('/api/auth/login', { email, password });
    saveSession(res.data);
  }

  async function signup(name, email, password, role) {
    const res = await api.post('/api/auth/signup', { name, email, password, role });
    saveSession(res.data);
  }

  function logout() {
    localStorage.removeItem('zenithToken');
    localStorage.removeItem('zenithUser');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// A small helper hook so pages can just do: const { user, logout } = useAuth();
export function useAuth() {
  return useContext(AuthContext);
}
