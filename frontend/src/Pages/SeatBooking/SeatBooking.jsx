import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaChair, FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa'; 

const SeatBooking = () => {
  const { eventId } = useParams();
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [eventName, setEventName] = useState('');
  const [confirmReservation, setConfirmReservation] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false); // Track feedback submission status

  const token = localStorage.getItem('token');

  const fetchSeatsAndEvent = async () => {
    try {
      const seatResponse = await axios.get(
        `https://newslt-mern.azurewebsites.net/api/seats/event/${eventId}/seats`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSeats(seatResponse.data);

      const eventResponse = await axios.get(
        `https://newslt-mern.azurewebsites.net/events/${eventId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEventName(eventResponse.data.name);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data.');
    } finally {
      setLoading(false);
    }
  };

  const handleSeatReservation = async () => {
    try {
      await axios.post(
        `https://newslt-mern.azurewebsites.net/api/seats/reserve/${eventId}/${selectedSeat}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setError('');
      setConfirmReservation(false);
      setSeats((prevSeats) =>
        prevSeats.map((seat) =>
          seat._id === selectedSeat ? { ...seat, isAvailable: false } : seat
        )
      );
      setSuccess('Seat successfully reserved!');
    } catch (error) {
      console.error('Error reserving seat:', error);
      if (error.response && error.response.status === 401) {
        setError('Unauthorized. Please log in again.');
      } else if (error.response && error.response.status === 409) {
        setError('Seat is already reserved.');
      } else {
        setError('Error reserving seat. Please try again.');
      }
      setSuccess('');
    }
  };

  // Submit Feedback
  const submitFeedback = async () => {
    try {
      await axios.post(
        'https://newslt-mern.azurewebsites.net/api/feedback',
        { feedback },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFeedback('');
      setFeedbackSubmitted(true); // Set feedback as submitted
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setError('Error submitting feedback. Please try again.');
    }
  };

  useEffect(() => {
    if (!token) {
      setError('You must be logged in to book a seat.');
      setLoading(false);
      return;
    }

    if (eventId && token) {
      fetchSeatsAndEvent();
    }
  }, [eventId, token]);

  const handleSeatClick = (seatId) => {
    setSelectedSeat(seatId);
    setConfirmReservation(true);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="animate-spin">
          <FaSpinner className="w-12 h-12 text-indigo-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-20">
      {/* Image Section */}
      <div className="w-full flex justify-center mb-5">
        <img
          src="https://cdn.prod.website-files.com/65e8dbcc20b03bec9c6fe12c/65ea107210b0d454518127e0_65565ddc63f46e2b10932b52_SEAT%20PLAN%20-EDIT.svg"
          alt="Event"
          className="w-64 h-48  shadow-lg object-cover"
        />
      </div>

      {/* Seat Booking Section */}
      <div className="bg-slate-300 p-8 w-full max-w-4xl mx-auto rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-10">
          Seat Booking for:{' '}
          <span className="text-indigo-600">{eventName || eventId}</span>
        </h2>

        {error && <p className="text-red-500 text-center mb-5">{error}</p>}
        {success && <p className="text-green-500 text-center mb-5">{success}</p>}

        {/* Seat Grid */}
        <div className="grid grid-cols-4 gap-5">
          {seats.map((seat) => (
            <div
              key={seat._id}
              className={`p-4 border rounded-lg text-center shadow-lg transition-transform transform hover:scale-105 ${
                seat.isAvailable
                  ? selectedSeat === seat._id
                    ? 'bg-green-200 shadow-2xl'
                    : 'bg-white hover:bg-green-100 cursor-pointer'
                  : 'bg-red-300 cursor-not-allowed'
              }`}
              onClick={() => seat.isAvailable && handleSeatClick(seat._id)}
            >
              <p className="font-semibold">{seat.seatNumber}</p>
              <FaChair
                className={`mx-auto my-3 text-2xl ${
                  seat.isAvailable ? 'text-green-500' : 'text-red-500'
                }`}
              />
              <button
                className={`mt-3 w-full px-4 py-2 rounded text-white transition-all ${
                  seat.isAvailable && !confirmReservation
                    ? 'bg-indigo-600 hover:bg-indigo-500'
                    : 'bg-gray-500 cursor-not-allowed'
                }`}
                disabled={!seat.isAvailable || confirmReservation}
              >
                {seat.isAvailable ? 'Reserve' : 'Booked'}
              </button>
            </div>
          ))}
        </div>

        {confirmReservation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg transform transition-all scale-105">
              <h3 className="text-lg font-semibold mb-4">Confirm Reservation</h3>
              <p className="mb-4">Are you sure you want to reserve this seat?</p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={handleSeatReservation}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-500 transition-colors"
                >
                  <FaCheckCircle className="inline-block mr-2" />
                  Confirm
                </button>
                <button
                  onClick={() => setConfirmReservation(false)}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-500 transition-colors"
                >
                  <FaTimesCircle className="inline-block mr-2" />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Feedback Form */}
        {success && !feedbackSubmitted && (
          <div className="mt-10 p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Submit Feedback</h3>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full p-3 border rounded-lg mb-4"
              rows="4"
              placeholder="Your feedback here..."
            ></textarea>
            <button
              onClick={submitFeedback}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-500 transition-colors"
            >
              Submit Feedback
            </button>
          </div>
        )}

        {feedbackSubmitted && (
          <p className="text-green-500 text-center mt-5">
            Thank you for your feedback!
          </p>
        )}
      </div>
    </div>
  );
};

export default SeatBooking;
