import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function GoogleSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get('token');
    const profilePicture = query.get('profilePicture'); 
    
    if (token) {
      localStorage.setItem('token', token);
      if (profilePicture) {
        localStorage.setItem('profilePicture', profilePicture);
      } else {
        localStorage.setItem('profilePicture', 'https://img.freepik.com/premium-photo/stylish-man-flat-vector-profile-picture-ai-generated_606187-310.jpg'); // default
      }
      navigate('/admin'); // Redirect to home or dashboard after login
    } else {
      navigate('/'); // Redirect to login if no token is found
    }
  }, [navigate]);

  return <div>Logging you in...</div>;
}

export default GoogleSuccess;
