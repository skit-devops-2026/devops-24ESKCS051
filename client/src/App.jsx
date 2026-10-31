import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Rooms from './pages/Rooms';
import Booking from './pages/Booking';
import Admin from './pages/Admin';
import Faq from './pages/Faq';
import About from './pages/About';

// This component wires every page to a URL. Think of it as the "map"
// of the site: each <Route> says "when the URL matches this path,
// show this page component".
export default function App() {
  return (
    <>
      <header className="site-header">
        <h1>Zenith - Campus Room Booking</h1>
        <Navbar />
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/about" element={<About />} />

        {/* These two need you to be logged in (and, for Admin, to be an admin) */}
        <Route
          path="/booking"
          element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>

      <footer className="site-footer">
        <p>&copy; 2026 Zenith - Campus Room Booking System</p>
      </footer>
    </>
  );
}
