import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you use axios for HTTP requests
// import './Settings.css'; // Add some styles for the form

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    preferredSeats: 'Any',
    language: 'en',
    privacy: true,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user settings from the server on component load
    const fetchSettings = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/settings', {
          headers: {
            Authorization: `Bearer ${token}` // Assuming JWT is stored in localStorage
          }
        });
        setSettings(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch settings');
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('/api/settings', settings, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      alert('Settings saved successfully');
    } catch (error) {
      setError('Failed to save settings');
    }
  };

  const handleReset = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('/api/settings/reset', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      alert('Settings reset to default');
      // Refetch updated settings
      const response = await axios.get('http://localhost:5000/api/settings', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSettings(response.data);
    } catch (error) {
      setError('Failed to reset settings');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <form>
        {/* Notifications */}
        <div className="form-group">
          <label>
            Notifications:
            <input
              type="checkbox"
              name="notifications"
              checked={settings.notifications}
              onChange={handleChange}
            />
          </label>
        </div>

        {/* Preferred Seats */}
        <div className="form-group">
          <label>
            Preferred Seats:
            <select
              name="preferredSeats"
              value={settings.preferredSeats}
              onChange={handleChange}
            >
              <option value="Any">Any</option>
              <option value="Front">Front</option>
              <option value="Middle">Middle</option>
              <option value="Back">Back</option>
            </select>
          </label>
        </div>

        {/* Language */}
        <div className="form-group">
          <label>
            Language:
            <select
              name="language"
              value={settings.language}
              onChange={handleChange}
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              {/* Add other language options as needed */}
            </select>
          </label>
        </div>

        {/* Privacy */}
        <div className="form-group">
          <label>
            Privacy:
            <input
              type="checkbox"
              name="privacy"
              checked={settings.privacy}
              onChange={handleChange}
            />
          </label>
        </div>

        {/* Save Button */}
        <button type="button" onClick={handleSave}>
          Save Changes
        </button>

        {/* Reset Button */}
        <button type="button" onClick={handleReset}>
          Reset to Default
        </button>
      </form>
    </div>
  );
};

export default Settings;
