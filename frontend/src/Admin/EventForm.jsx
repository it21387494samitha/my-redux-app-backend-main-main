import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

const EventForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    location: '',
    description: '',
  });

  const [message, setMessage] = useState('');
  const [eventId, setEventId] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [seatData, setSeatData] = useState({
    rows: '',
    columns: '',
  });
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const [existingEvents, setExistingEvents] = useState([]);


  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isSeatSubmitDisabled, setIsSeatSubmitDisabled] = useState(true);

  // Calculate the current week's Monday and Sunday
  const calculateCurrentWeek = () => {
    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay(); // Get current day (0 - Sunday, 1 - Monday, etc.)

    const diffToMonday = currentDate.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1);
    const startOfWeek = new Date(currentDate.setDate(diffToMonday)); // Monday
    const endOfWeek = new Date(currentDate.setDate(startOfWeek.getDate() + 6)); // Sunday

    const formatDate = (date) => date.toISOString().split('T')[0]; // YYYY-MM-DD format
    setMinDate(formatDate(startOfWeek));
    setMaxDate(formatDate(endOfWeek));
  };

  useEffect(() => {
    calculateCurrentWeek();
  }, []);

  useEffect(() => {
    const isFormValid = formData.name && formData.date && formData.location;
    setIsSubmitDisabled(!isFormValid);
  }, [formData]);

  useEffect(() => {
    const isSeatsValid = seatData.rows && seatData.columns && parseInt(seatData.columns) > 0;
    setIsSeatSubmitDisabled(!isSeatsValid);
  }, [seatData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'date') {
      const selectedDate = new Date(value);
      const selectedDay = selectedDate.getDay(); // Get day of the week (0 - Sunday to 6 - Saturday)
      const correspondingDay = daysOfWeek[selectedDay === 0 ? 6 : selectedDay - 1]; // Adjust Sunday (0) to the end of array
      setFormData({
        ...formData,
        date: value,
        name: correspondingDay, // Set the name field automatically
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSeatChange = (e) => {
    setSeatData({
      ...seatData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    
    const eventExists = existingEvents.some(
      (event) => new Date(event.date).toISOString().split('T')[0] === formData.date
    );
  
    if (eventExists) {
      setMessage('An event already exists for this date. Please choose another date.');
      return; 
    }
  
    try {
      const token = localStorage.getItem('token');

      const response = await axios.post(
        'https://newslt-mern.azurewebsites.net/events/',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          

        },
        console.log(token)
      );
  
      if (response.status === 201) {
        setMessage('Event created successfully!');
        setEventId(response.data._id);
        setModalIsOpen(true);
        setFormData({ name: '', date: '', location: '', description: '' });
      }
    } catch (error) {
      console.error('Error creating event:', error);
      setMessage('Failed to create event.');
    }
  };
  

  const handleSeatSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'https://newslt-mern.azurewebsites.net/api/seats/creat',  // Corrected the URL here
        {
          eventId,
          rows: seatData.rows.split(','), // Split the rows into an array
          columns: parseInt(seatData.columns), // Ensure columns is a number
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 201) {
        setMessage('Seats added successfully!');
        setModalIsOpen(false); // Close the modal after seat submission
      }
    } catch (error) {
      console.error('Error adding seats:', error);
      setMessage('Failed to add seats.');
    }
  };
  


  useEffect(() => {
    const fetchExistingEvents = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://newslt-mern.azurewebsites.net/events', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setExistingEvents(response.data); // Assuming response.data is an array of events
      } catch (error) {
        console.error('Error fetching existing events:', error);
      }
    };
  
    fetchExistingEvents();
    calculateCurrentWeek(); 
  }, []);
  

  return (
    <div className='mt-14 '>
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Create Event
        </Typography>
        {message && <Alert severity="info">{message}</Alert>}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Day of Week</InputLabel>
                <Select
                  label="Day of Week"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                >
                  {daysOfWeek.map((day) => (
                    <MenuItem key={day} value={day}>
                      {day}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Event Date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                inputProps={{
                  min: minDate,
                  max: maxDate,
                }} // Enforce date range restrictions
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                required
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }} disabled={isSubmitDisabled}>
            Create Event
          </Button>
        </form>

        <Dialog open={modalIsOpen} onClose={() => setModalIsOpen(false)}>
          <DialogTitle>Add Seats</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Rows (comma-separated, e.g., A,B,C)"
                  name="rows"
                  value={seatData.rows}
                  onChange={handleSeatChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Columns per row"
                  name="columns"
                  type="number"
                  value={seatData.columns}
                  onChange={handleSeatChange}
                  fullWidth
                  required
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSeatSubmit} variant="contained" color="primary" disabled={isSeatSubmitDisabled}>
              Add Seats
            </Button>
            <Button onClick={() => setModalIsOpen(false)} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
};

export default EventForm;
