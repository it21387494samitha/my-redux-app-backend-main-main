import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faList, faHistory, faHeart, faCog, faSignOutAlt, faBars } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Check if user is logged in
  const navigate = useNavigate();

  useEffect(() => {
    
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    localStorage.removeItem('profilePicture')
    setIsLoggedIn(false);
    navigate('https://newslt-mern.azurewebsites.net/login'); // Redirect to login page
  };

  return (
    <>
      {/* Sidebar Container */}
      <div className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
        <div className="sidebar-header">
          <h3>{isOpen ? 'Seat Reservation' : 'SR'}</h3> {/* Short name when collapsed */}
          {isOpen && <button className="close-btn" onClick={toggleSidebar}>×</button>}
        </div>
        
        {isLoggedIn ? (
          <ul className="sidebar-menu">
            {/* User Profile */}
            <li>
              <Link to="/profile">
                <FontAwesomeIcon icon={faUser} />
                {isOpen && <span>Profile</span>}
              </Link>
            </li>

            {/* Event List */}
            <li>
              <Link to="/list">
                <FontAwesomeIcon icon={faList} />
                {isOpen && <span>Event List</span>}
              </Link>
            </li>

            {/* History */}
            <li>
              <Link to="/history">
                <FontAwesomeIcon icon={faHistory} />
                {isOpen && <span>History</span>}
              </Link>
            </li>

            {/* Favourites */}
            <li>
              <Link to="/favourites">
                <FontAwesomeIcon icon={faHeart} />
                {isOpen && <span>Favourites</span>}
              </Link>
            </li>

            {/* Settings */}
            <li>
              <Link to="/settings">
                <FontAwesomeIcon icon={faCog} />
                {isOpen && <span>Settings</span>}
              </Link>
            </li>

            {/* Logout */}
            <li>
              <button onClick={handleLogout} className="logout-btn">
                <FontAwesomeIcon icon={faSignOutAlt} />
                {isOpen && <span>Logout</span>}
              </button>
            </li>
          </ul>
        ) : (
          <ul className="sidebar-menu">
            <li>
              <Link to="/login">
                <FontAwesomeIcon icon={faUser} />
                {isOpen && <span>Login</span>}
              </Link>
            </li>
          </ul>
        )}
      </div>

      {/* Background Blur when sidebar is open */}
      {isOpen && <div className="blur-background" onClick={toggleSidebar}></div>}

      {/* Sidebar Toggle Button (only visible when sidebar is collapsed) */}
      {!isOpen && (
        <button className="toggle-btn" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </button>
      )}
    </>
  );
};

export default Sidebar;
