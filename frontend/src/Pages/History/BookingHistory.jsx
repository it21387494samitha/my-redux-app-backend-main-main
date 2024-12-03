import { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faChair, faTrash } from '@fortawesome/free-solid-svg-icons';
import './History.css'

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookingHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('hhttps://newslt-mern.azurewebsites.net/api/seats/history', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(response.data);
        setError('');
      } catch (error) {
        setError('Unable to fetch booking history. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookingHistory();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this booking?');
    if (confirmed) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`https://newslt-mern.azurewebsites.net/api/seats/history/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Filter out the deleted booking from state
        setBookings(bookings.filter((booking) => booking._id !== id));
      } catch (error) {
        setError('Error deleting booking. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
        <p className="text-gray-600 ml-3">Loading your booking history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-20 p-5 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Your Booking History</h2>
      {bookings.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600 text-lg">You have no bookings yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {bookings.map((booking) => (
  <div
    key={booking._id}
    className="p-6 border rounded-lg shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300 flex justify-between items-center"
  >
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {booking.event ? booking.event.name : 'Event Name Unavailable'}
      </h3>
      <p className="text-gray-600 flex items-center mb-1">
        <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-blue-500" />
        <strong>Date: </strong> {booking.event ? new Date(booking.event.date).toLocaleDateString() : 'N/A'}
      </p>
      <p className="text-gray-600 flex items-center">
        <FontAwesomeIcon icon={faChair} className="mr-2 text-green-500" />
        <strong>Seat: </strong> {booking.seatNumber}
      </p>
    </div>
    <button
      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-transform transform hover:scale-105 flex items-center"
      onClick={() => handleDelete(booking._id)}
    >
      <FontAwesomeIcon icon={faTrash} className="mr-2" />
      Delete
    </button>
  </div>
))}

        </div>
      )}
    </div>
  );
};

export default BookingHistory;
