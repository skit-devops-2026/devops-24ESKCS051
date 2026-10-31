import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <nav className="main-nav">
      <NavLink to="/" end>Home</NavLink>
      <NavLink to="/rooms">Rooms</NavLink>
      <NavLink to="/booking">Book a Room</NavLink>
      {user?.role === 'admin' && <NavLink to="/admin">Admin Panel</NavLink>}
      <NavLink to="/faq">FAQ</NavLink>
      <NavLink to="/about">About</NavLink>

      {user ? (
        <button className="nav-logout-btn" onClick={handleLogout}>
          Log out ({user.name})
        </button>
      ) : (
        <NavLink to="/login">Login</NavLink>
      )}
    </nav>
  );
}
