import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../src/Asset/SLT_logo.png'; 
import { FaSearch, FaBars, FaHome, FaInfoCircle, FaServicestack, FaEnvelope } from 'react-icons/fa'; 

const Header = ({ toggleSidebar, isOpen, isDarkMode, toggleTheme }) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    // Check if user profile picture is stored in localStorage
    const storedProfilePicture = localStorage.getItem('profilePicture');
    if (storedProfilePicture) {
      setProfilePicture(storedProfilePicture);
    }
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/${searchQuery}`);
    }
  };

  const handleProfileClick = () => {
    // Navigate to profile page or show a dropdown menu
    navigate('https://newslt-mern.azurewebsites.net/profile');
  };

  return (
    <>
      <header className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 shadow-lg fixed top-0 w-full z-50 flex items-center justify-between px-8 py-4">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
          <img src={Logo} alt="Logo" className="w-14 h-14 object-contain ml-5" /> 
          <div className="text-3xl font-bold text-white ml-5">
            Online Reservation
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-8 text-lg font-medium text-white">
          <a href="/" className="hover:text-yellow-300 flex items-center space-x-1 transition-colors">
            <FaHome /> <span>Home</span>
          </a>
          <a href="/about" className="hover:text-yellow-300 flex items-center space-x-1 transition-colors">
            <FaInfoCircle /> <span>About</span>
          </a>
          <a href="/services" className="hover:text-yellow-300 flex items-center space-x-1 transition-colors">
            <FaServicestack /> <span>Services</span>
          </a>
          <a href="/contact" className="hover:text-yellow-300 flex items-center space-x-1 transition-colors">
            <FaEnvelope /> <span>Contact</span>
          </a>

          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="absolute top-3 right-3 text-gray-600">
              <FaSearch />
            </button>
          </form>

          <a href="/register" className="bg-yellow-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-yellow-600 transition">
            Sign Up
          </a>

          {/* Conditional rendering of Profile Image or Login Button */}
          {profilePicture ? (
            <img
              src={profilePicture}
              alt="Profile"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={handleProfileClick} // Navigate to profile on click
            />
          ) : (
            <a href="/login" className="bg-pink-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-pink-700 transition">
              Login
            </a>
          )}
        </nav>

        <div className="md:hidden flex items-center space-x-3">
          <button onClick={toggleMobileMenu} className="text-white text-2xl">
            <FaBars />
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="absolute top-16 right-8 bg-white text-gray-800 rounded-lg shadow-lg py-2 w-48 z-50">
            <a href="/" className="block px-4 py-2 hover:bg-gray-100">Home</a>
            <a href="/about" className="block px-4 py-2 hover:bg-gray-100">About</a>
            <a href="/services" className="block px-4 py-2 hover:bg-gray-100">Services</a>
            <a href="/contact" className="block px-4 py-2 hover:bg-gray-100">Contact</a>
            <a href="/login" className="block px-4 py-2 bg-pink-600 text-white rounded-lg text-center hover:bg-pink-700 transition">
              Login
            </a>
            <a href="/register" className="block px-4 py-2 bg-yellow-500 text-white rounded-lg text-center hover:bg-yellow-600 transition mt-2">
              Sign Up
            </a>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
