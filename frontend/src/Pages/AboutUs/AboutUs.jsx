import React from 'react';
import { Box, Container, Typography, Button, Grid, Paper } from '@mui/material';

const AboutUs = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#e0f7fa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 3,
            backgroundColor: '#ffffff',
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: '#2c3e50' }}>
            About Us
          </Typography>
          <Typography variant="body1" sx={{ color: '#555', mb: 3 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ backgroundColor: '#3f51b5', color: '#fff', mb: 4 }}
          >
            Learn More
          </Button>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Box
                sx={{
                  height: 120,
                  background: 'url(https://img.freepik.com/premium-photo/stylish-man-flat-vector-profile-picture-ai-generated_606187-310.jpg) center/cover',
                  borderRadius: '50%',
                  marginBottom: 2,
                }}
              ></Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
             Member 1
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Role
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box
                sx={{
                  height: 120,
                  background: 'url(https://img.freepik.com/premium-photo/stylish-man-flat-vector-profile-picture-ai-generated_606187-310.jpg) center/cover',
                  borderRadius: '50%',
                  marginBottom: 2,
                }}
              ></Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Member 2
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Role
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box
                sx={{
                  height: 120,
                  background: 'url(https://img.freepik.com/premium-photo/stylish-man-flat-vector-profile-picture-ai-generated_606187-310.jpg) center/cover',
                  borderRadius: '50%',
                  marginBottom: 2,
                }}
              ></Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Member 3
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Role
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box
                sx={{
                  height: 120,
                  background: 'url(https://img.freepik.com/premium-photo/stylish-man-flat-vector-profile-picture-ai-generated_606187-310.jpg) center/cover',
                  borderRadius: '50%',
                  marginBottom: 2,
                }}
              ></Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
               Member 4
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Role
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default AboutUs;
