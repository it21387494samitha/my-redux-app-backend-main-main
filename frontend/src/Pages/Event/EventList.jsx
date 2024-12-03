import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardActionArea, Typography, Grid, Container, Alert, CardMedia } from '@mui/material';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import img1 from '../../Asset/noevent.png';


const EventList = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('token');
const response = await axios.get('https://newslt-mern.azurewebsites.net/events/', {
  headers: {
    Authorization: `Bearer ${token}`,
  },
          
        });

        const today = new Date().toLocaleDateString('en-US');


        const upcomingEvents = response.data.filter((event) => {
          const eventDate = new Date(event.date).toLocaleDateString('en-US');
          return eventDate >= today;
        });

        setEvents(upcomingEvents);
        console.log(token);
      } catch (error) {
        console.error('Error fetching events:', error);
        setError('Failed to fetch events.');
      }
    };

    fetchEvents();
  }, []);

  const handleEventClick = (eventId) => {
    navigate(`/booking/${eventId}`);
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

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',];
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

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
          Upcoming Schedule
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        {events.length === 0 ? (
          <Typography variant="body1" color="textSecondary" className=''>
            No Schedule available
            <div>
              <img
                src="https://img.freepik.com/free-vector/hand-drawn-no-data-concept_52683-127823.jpg"
                alt=" NO Schedule find"
                className='   w-1/3 ml-64 align-middle '
              />
            </div>

          </Typography>
        ) : (
          <Grid container spacing={3}>
            {daysOfWeek.map((day) => (
              <Grid item xs={12} sm={6} md={2.4} key={day}>
                {/* Highlight only the day text if it's today */}
                <Typography
                  variant="h5"
                  sx={{
                    mt: 4,
                    mb: 2,
                    fontWeight: 'bold',
                    color: day === today ? 'green' : '#2c3e50', // White text if today
                    backgroundColor: day === today ? '' : 'transparent',
                    padding: '10px 15px', // Add padding to the text only
                    borderRadius: '8px', // Rounded text background for today
                    display: 'inline-block', // This ensures only the text is highlighted, not the whole box
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
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  ))
                ) : (
                  <div>
                    <CardMedia
                      component="img"
                      image={img1}
                      alt={`No events on ${day}`}
                      sx={{ height: 150, width: '100%', objectFit: 'contain', mb: 2 }}
                    />
                    <Typography variant="body2" color="textSecondary" align="center">
                      No Schedule on {day}
                    </Typography>
                  </div>
                )}
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default EventList;
