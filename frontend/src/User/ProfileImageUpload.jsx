import React, { useState } from 'react';
import axios from 'axios';

const ProfileImageUpload = () => {
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState(''); // To display success or error messages

  // Handle file change
  const handleFileChange = (e) => {
    setImage(e.target.files[0]); // Select the uploaded file
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure an image is selected
    if (!image) {
      setMessage('Please select an image to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('profileImage', image); // Append the image to form data

    const token = localStorage.getItem('token'); // Get the token from local storage

    try {
      const response = await axios.post('http://localhost:5000/users/profile/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, // Send the token for authentication
        },
      });
      
      setMessage(response.data.message); // Show success message
    } catch (error) {
      console.error('Error uploading image:', error);
      setMessage('Failed to upload the image. Please try again.');
    }
  };

  return (
    <div className='mt-20'>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload Profile Image</button>
      </form>
      {message && <p>{message}</p>} {/* Display success or error messages */}
    </div>
  );
};

export default ProfileImageUpload;
