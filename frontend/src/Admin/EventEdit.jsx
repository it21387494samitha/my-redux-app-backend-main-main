import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Alert,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const EditEvent = () => {
  const { eventId } = useParams(); // Get the event ID from the URL
  const [eventData, setEventData] = useState({
    name: '',
    date: '',
    location: '',
    description: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://newslt-mern.azurewebsites.net/events/${eventId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEventData(response.data);
      } catch (error) {
        console.error('Error fetching event data:', error);
        setError('Failed to fetch event data.');
      }
    };

    fetchEventData();
  }, [eventId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`https://newslt-mern.azurewebsites.net/events/${eventId}`, eventData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setSuccess('Event updated successfully!');
        navigate('/QR'); 
      }
    } catch (error) {
      console.error('Error updating event:', error);
      setError('Failed to update event.');
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Edit Event
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Event Name"
              name="name"
              value={eventData.name}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Event Date"
              name="date"
              type="date"
              value={eventData.date}
              onChange={handleChange}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Location"
              name="location"
              value={eventData.location}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              value={eventData.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              required
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
          Update Event
        </Button>
      </form>
    </Box>
  );
};

export default EditEvent;
