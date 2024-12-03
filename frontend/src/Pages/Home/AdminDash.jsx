import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDash() {
  const [eventCount, setEventCount] = useState(0); // State to hold the event count
  const [userCount, setUserCount] = useState(0); // State to hold the user count
  const [bookingCount, setBookingCount] = useState(0); // State to hold the booking count

  const navigate = useNavigate();

  // Fetch event, user, and booking counts from your API
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch Events
        const eventsResponse = await fetch('http://localhost:5000/events/count');
        if (!eventsResponse.ok) throw new Error(`HTTP error! Status: ${eventsResponse.status}`);
        const eventsData = await eventsResponse.json();
        if (Array.isArray(eventsData)) {
          setEventCount(eventsData.length); 
        }

        // Fetch Users
        const usersResponse = await fetch('http://localhost:5000/users/all');
        if (!usersResponse.ok) throw new Error(`HTTP error! Status: ${usersResponse.status}`);
        const usersData = await usersResponse.json();
        if (Array.isArray(usersData)) {
          setUserCount(usersData.length); // Count users
        }

        // Fetch Bookings
        const bookingsResponse = await fetch('http://localhost:5000/api/seats/event/yourEventId/booked-seats-count');
        if (!bookingsResponse.ok) throw new Error(`HTTP error! Status: ${bookingsResponse.status}`);
        const bookingsData = await bookingsResponse.json();
        if (Array.isArray(bookingsData)) {
          setBookingCount(bookingsData.length); // Count bookings
        }

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="flex min-h-screen ">
      {/* Main Content */}
      <div className="flex-grow p-8">
        {/* Header */}
        <header className="mb-10 text-center">
          <h1 className="text-5xl font-extrabold mb-4 text-black drop-shadow-lg">Admin Dashboard</h1>
          <p className="text-gray-200 text-xl">Manage events, users, and seat bookings efficiently</p>
        </header>

        {/* Statistics and Activities */}
        <div className="mb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Event Count Card */}
          <div className="bg-white p-8 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Total Events</h3>
            <p className="text-6xl font-extrabold text-blue-600">{eventCount}</p> {/* Dynamic event count */}
          </div>

          {/* User Count Card */}
          <div className="bg-white p-8 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Total Users</h3>
            <p className="text-6xl font-extrabold text-green-600">{userCount}</p> {/* Dynamic user count */}
          </div>

          {/* Booking Count Card */}
          <div className="bg-white p-8 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Bookings</h3>
            <p className="text-6xl font-extrabold text-yellow-600">{bookingCount}</p> {/* Dynamic booking count */}
          </div>

          {/* Revenue Placeholder */}
          <div className="bg-white p-8 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Revenue</h3>
            <p className="text-6xl font-extrabold text-red-600">$</p> {/* Dynamic revenue */}
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Manage Events */}
          <div
            className="bg-white p-8 rounded-lg shadow-lg hover:bg-purple-100 transform transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
            onClick={() => navigate('/event')}
          >
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Manage Events</h3>
            <p className="text-gray-600">Create and manage events with ease</p>
          </div>

          
          <div
            className="bg-white p-8 rounded-lg shadow-lg hover:bg-green-100 transform transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
            onClick={() => navigate('/manage-users')}
          >
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Manage Users</h3>
            <p className="text-gray-600">View and manage user accounts</p>
          </div>

          {/* Seat Booking */}
          <div
            className="bg-white p-8 rounded-lg shadow-lg hover:bg-yellow-100 transform transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
            onClick={() => navigate('/allseat')}
          >
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Seat Booking</h3>
            <p className="text-gray-600">Manage bookings and available seats</p>
          </div>

          
          <div
            className="bg-white p-8 rounded-lg shadow-lg hover:bg-red-100 transform transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
            onClick={() => navigate('/QR')}
          >
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Attenance</h3>
            <p className="text-gray-600"> Get attendance via QR code</p>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white p-8 rounded-lg shadow-lg mt-10">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Recent Activities</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>User John Doe created a new event "Annual Conference" on Sep 12, 2024.</li>
            <li>User Jane Smith booked 5 seats for the event "Workshop".</li>
            <li>Admin updated the settings on Sep 11, 2024.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminDash;
