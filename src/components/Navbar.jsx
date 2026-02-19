import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isSearchPage = location.pathname === '/search';

  return (
    <nav className="fixed top-0 z-50 w-full bg-gradient-to-b from-black/80 to-transparent px-4 py-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => navigate('/home')}
          className="cursor-pointer text-2xl font-bold text-netflix-red"
        >
          NETFLIX
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 px-8">
          <div className="mx-auto max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search movies..."
              className="input-field w-full"
            />
          </div>
        </form>

        {/* User Info & Logout */}
        <div className="flex items-center gap-4">
          <span className="hidden text-sm text-gray-300 sm:block">
            {user?.name}
          </span>
          <button
            onClick={handleLogout}
            className="btn-primary text-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};
