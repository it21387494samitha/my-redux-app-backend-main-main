import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { ClipLoader } from 'react-spinners';
import {
  FaPhoneAlt, FaEnvelope, FaUserCircle, FaCheckCircle,
  FaTimesCircle, FaBirthdayCake, FaEdit, FaMoon, FaSun
} from 'react-icons/fa';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      axios.get('https://newslt-mern.azurewebsites.net/users/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((response) => setUser(response.data))
        .catch((error) => {
          setError('Failed to load profile.');
          if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            navigate('/login');
          }
        });
    }
  }, [navigate]);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const getGravatarUrl = (email) => {
    const emailHash = CryptoJS.MD5(email.trim().toLowerCase()).toString();
    return `https://www.gravatar.com/avatar/${emailHash}`;
  };

  if (!user) {
    return (
      <div className="loading-container">
        <ClipLoader color="#007bff" />
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className={`profile-container ${darkMode ? 'dark-mode' : ''}`}>
      <div className="profile-card">
        <div className="profile-image">
          <img src={getGravatarUrl(user.email)} alt="Profile" />
        </div>

        <div className="user-details">
          <h3>{user.firstName} {user.lastName}</h3>
          <p><FaEnvelope /> {user.email}</p>
          <p><FaPhoneAlt /> {user.phone}</p>
          <p><FaBirthdayCake /> Age: {user.age}</p>
          {/* <p className={`subscription-status ${user.subscription ? 'active' : 'inactive'}`}>
            {user.subscription ? <FaCheckCircle /> : <FaTimesCircle />}
            {user.subscription ? ' Active Subscription' : ' Inactive Subscription'}
          </p> */}

          {/* Dark Mode Toggle Inside the Card */}
          <button
            className="dark-mode-toggle "
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <FaSun /> : <FaMoon />} {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>

          <button className="edit-profile-button" onClick={() => navigate('/edit-profile')}>
            <FaEdit /> Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
