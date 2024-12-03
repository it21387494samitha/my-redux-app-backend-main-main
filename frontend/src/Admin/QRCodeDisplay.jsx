import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardActionArea, Typography, Grid, Container, Alert, Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';

const QRCodeDisplay = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://newslt-mern.azurewebsites.net/events/allad', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Get the current date and the end date of the current week (Sunday)
        const today = new Date();
        const startOfWeek = today.setDate(today.getDate() - today.getDay());
        const endOfWeek = today.setDate(today.getDate() + (7 - today.getDay()));

        // Filter events that fall within the current week
        const weeklyEvents = response.data.filter((event) => {
          const eventDate = new Date(event.date);
          return eventDate >= startOfWeek && eventDate <= endOfWeek;
        });

        setEvents(weeklyEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
        setError('Failed to fetch events.');
      }
    };

    fetchEvents();
  }, []);

  const handleEventClick = (eventId) => {
    navigate(``);
  };

  const handleEditClick = (eventId) => {
    navigate(`/admin/edit-event/${eventId}`);
  };

  const handleDeleteClick = async (eventId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://newslt-mern.azurewebsites.net/events/soft/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      setEvents(events.filter(event => event._id !== eventId));
      window.location.reload();
      
    } catch (error) {
      console.error('Error deleting event:', error);
      setError('Failed to delete event.');
    }
  };

  const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const groupedEvents = events.reduce((groups, event) => {
    const day = getDayOfWeek(event.date);
    if (!groups[day]) {
      groups[day] = [];
    }
    groups[day].push(event);
    return groups;
  }, {});

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  const handleDownloadQRCode = (qrCodeUrl, eventName) => {
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `${eventName}-QRCode.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className=" mt-36">
      <Container
        sx={{
          mt: 4,
          background: 'white',
          padding: '20px',
          borderRadius: '12px',
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
          Admin Schedule with QR Codes
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        {events.length === 0 ? (
          <Typography variant="body1" color="textSecondary" className=''>
            No Schedule available
            <div>
              <img
                src="https://img.freepik.com/free-vector/hand-drawn-no-data-concept_52683-127823.jpg"
                alt="No Schedule found"
                className='w-1/3 ml-64 align-middle'
              />
            </div>
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {daysOfWeek.map((day) => (
              <Grid item xs={12} sm={6} md={2.4} key={day}>
                <Typography
                  variant="h5"
                  sx={{
                    mt: 4,
                    mb: 2,
                    fontWeight: 'bold',
                    color: day === today ? 'green' : '#2c3e50',
                    padding: '10px 15px',
                    borderRadius: '8px',
                    display: 'inline-block',
                  }}
                >
                  {day} {day === today && '(Today)'}
                </Typography>

                {groupedEvents[day]?.length > 0 ? (
                  groupedEvents[day].map((event) => (
                    <Card
                      key={event._id}
                      sx={{
                        boxShadow: 6,
                        borderRadius: 2,
                        mb: 2,
                        background: 'linear-gradient(to bottom right, #ffecd2, #fcb69f)',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.05)',
                          boxShadow: '0px 10px 20px rgba(0,0,0,0.15)',
                        },
                      }}
                    >
                      <CardActionArea onClick={() => handleEventClick(event._id)}>
                        <CardContent>
                          <Typography
                            variant="h6"
                            component="h3"
                            gutterBottom
                            sx={{ color: '#3f51b5', fontWeight: 'bold' }}
                          >
                            {event.name}
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            color="textSecondary"
                            sx={{ mb: 1, display: 'flex', alignItems: 'center' }}
                          >
                            <EventIcon sx={{ mr: 1 }} />
                            {new Date(event.date).toLocaleString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            sx={{ mb: 1, display: 'flex', alignItems: 'center' }}
                          >
                            <LocationOnIcon sx={{ mr: 1 }} /> {event.location}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#555' }}>
                            {event.description}
                          </Typography>

                          {/* Display QR Code if it exists */}
                          {event.qrCode && (
                            <Box sx={{ mt: 3 }}>
                              <Typography variant="h6">Event QR Code:</Typography>
                              <img src={event.qrCode} alt="QR Code" style={{ width: '100px', height: '100px' }} />
                              <Button
                                variant="outlined"
                                color="primary"
                                sx={{ mt: 1 }}
                                startIcon={<DownloadIcon />}
                                onClick={() => handleDownloadQRCode(event.qrCode, event.name)}
                              >
                                Download QR
                              </Button>
                            </Box>
                          )}
                        </CardContent>
                      </CardActionArea>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
                        <Button onClick={() => handleEditClick(event._id)} variant="outlined" color="primary" startIcon={<EditIcon />}>
                          Edit
                        </Button>
                        <Button onClick={() => handleDeleteClick(event._id)} variant="outlined" color="error" startIcon={<DeleteIcon />}>
                          Delete
                        </Button>
                      </Box>
                    </Card>
                  ))
                ) : (
                  <Typography variant="body2" color="textSecondary" align="center">
                    No Schedule on {day}
                  </Typography>
                )}
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default QRCodeDisplay;
