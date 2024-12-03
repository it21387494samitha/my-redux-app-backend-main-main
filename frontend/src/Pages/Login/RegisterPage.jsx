import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    age: '',
    subscription: 'false',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isGoogleEmail = (email) => {
    if (!email.includes('@')) {
      return false;
    }
    const emailDomain = email.split('@')[1];
    return emailDomain === 'gmail.com' || (emailDomain && emailDomain.endsWith('.google.com'));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isGoogleEmail(formData.email)) {
      alert('Please use a valid Google email (e.g., @gmail.com).');
      return;
    }

    axios.post('http://localhost:5000/users/register', formData)
      .then(response => {
        alert('User registered successfully!');
      })
      .catch(error => {
        console.error('Error registering user:', error);
        alert('Failed to register user.');
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center"
         style={{ backgroundImage: `url('https://images.pexels.com/photos/1007957/pexels-photo-1007957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')` }}>
      <div className="relative z-10 p-10 bg-white bg-opacity-30 rounded-2xl shadow-2xl backdrop-blur-md max-w-md w-full mx-4 mt-12 animate-fade-in">
        <h2 className="text-3xl font-semibold text-white mb-4 text-center">Create Your Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={handleChange}
            required
            className="w-full p-3 bg-gray-800 bg-opacity-70 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder-gray-400 shadow-sm transition-all duration-300 ease-in-out transform focus:scale-105"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={handleChange}
            required
            className="w-full p-3 bg-gray-800 bg-opacity-70 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder-gray-400 shadow-sm transition-all duration-300 ease-in-out transform focus:scale-105"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
            required
            className="w-full p-3 bg-gray-800 bg-opacity-70 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder-gray-400 shadow-sm transition-all duration-300 ease-in-out transform focus:scale-105"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full p-3 bg-gray-800 bg-opacity-70 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder-gray-400 shadow-sm transition-all duration-300 ease-in-out transform focus:scale-105"
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            onChange={handleChange}
            required
            className="w-full p-3 bg-gray-800 bg-opacity-70 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder-gray-400 shadow-sm transition-all duration-300 ease-in-out transform focus:scale-105"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full p-3 bg-gray-800 bg-opacity-70 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder-gray-400 shadow-sm transition-all duration-300 ease-in-out transform focus:scale-105"
          />
          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 shadow-md">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;