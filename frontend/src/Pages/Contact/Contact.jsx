// import React, { useState } from 'react';
// import { TextField, Button, Box, Typography, Paper } from '@mui/material';
// import SendIcon from '@mui/icons-material/Send';
// import emailjs from 'emailjs-com';

// const Contact = () => {
//   const [formData, setFormData] = useState({ name: '', email: '', message: '' });
//   const [responseMessage, setResponseMessage] = useState('');

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     emailjs.send(
//       'service_6l73x9i',     // Replace with your EmailJS Service ID
//       'template_82tscs1',    // Replace with your EmailJS Template ID
//       formData,
//       'NLykzYcxqvNUtglpY'         // Replace with your EmailJS User ID
//     ).then(
//       (result) => {
//         setResponseMessage('Your message was sent successfully!');
//         setFormData({ name: '', email: '', message: '' }); // Clear form fields
//       },
//       (error) => {
//         setResponseMessage('There was an error sending your message. Please try again.');
//         console.error('EmailJS error:', error);
//       }
//     );
//   };

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         minHeight: '100vh',
//         backgroundColor: '#e0f7fa',
//       }}
//     >
//       <Paper
//         sx={{
//           display: 'flex',
//           flexDirection: 'row',
//           alignItems: 'center',
//           padding: '30px',
//           backgroundColor: '#ffffff',
//           borderRadius: '12px',
//           boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
//           maxWidth: '800px',
//         }}
//       >
//         <Box sx={{ flex: 1, paddingRight: '20px' }}>
//           <Typography
//             sx={{
//               fontSize: '24px',
//               fontWeight: 'bold',
//               marginBottom: '20px',
//               color: '#2c3e50',
//             }}
//           >
//             Contact Us
//           </Typography>
//           <TextField
//             label="Name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             fullWidth
//             variant="outlined"
//             sx={{ marginBottom: '15px' }}
//           />
//           <TextField
//             label="Email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             fullWidth
//             variant="outlined"
//             sx={{ marginBottom: '15px' }}
//           />
//           <TextField
//             label="Message"
//             name="message"
//             value={formData.message}
//             onChange={handleChange}
//             fullWidth
//             variant="outlined"
//             multiline
//             rows={4}
//             sx={{ marginBottom: '15px' }}
//           />
//           <Button
//             variant="contained"
//             endIcon={<SendIcon />}
//             onClick={handleSubmit}
//             sx={{
//               marginTop: '10px',
//               backgroundColor: '#00bcd4',
//               color: '#ffffff',
//               '&:hover': {
//                 backgroundColor: '#008ba3',
//               },
//             }}
//           >
//             Send Message
//           </Button>
//           {responseMessage && (
//             <Typography sx={{ marginTop: '10px', color: '#2c3e50' }}>
//               {responseMessage}
//             </Typography>
//           )}
//         </Box>
//         <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
//           <img
//             src="https://tvkstudio.com/assets/images/caregif.gif"
//             alt="Contact Us Illustration"
//             style={{ width: '350px', height: 'auto' }}
//           />
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default Contact;
