import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrashAlt, FaDownload } from 'react-icons/fa'; // Added download icon
import { MdEventSeat } from 'react-icons/md'; // Import icon for seat details
import { CSVLink } from 'react-csv'; // CSV Download component

const AdminSeatBooking = () => {
    const [seats, setSeats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState(''); // Added filter state
    const [filteredSeats, setFilteredSeats] = useState([]);

    useEffect(() => {
        // Fetch all seats from the backend
        const fetchSeats = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('https://newslt-mern.azurewebsites.net/api/seats/seats', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setSeats(response.data); // Store seats in state
                setFilteredSeats(response.data); // Initialize filtered seats
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch seats');
                setLoading(false);
            }
        };

        fetchSeats();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this seat?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`https://newslt-mern.azurewebsites.net/api/seats/seats/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Remove the deleted seat from the state
                const updatedSeats = seats.filter(seat => seat._id !== id);
                setSeats(updatedSeats);
                setFilteredSeats(updatedSeats);
            } catch (err) {
                setError('Failed to delete seat');
            }
        }
    };

    // Filter handler
    const handleFilterChange = (e) => {
        const value = e.target.value;
        setFilter(value);

        if (value === 'available') {
            setFilteredSeats(seats.filter(seat => seat.isAvailable));
        } else if (value === 'reserved') {
            setFilteredSeats(seats.filter(seat => !seat.isAvailable));
        } else {
            setFilteredSeats(seats); // Reset to all seats
        }
    };

    if (loading) {
        return <p className="text-center text-gray-500 mt-10">Loading seats...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500 mt-10">{error}</p>;
    }

    const csvReport = {
        filename: 'Seat_Report.csv',
        headers: [
            { label: 'Seat Number', key: 'seatNumber' },
            { label: 'Row', key: 'row' },
            { label: 'Column', key: 'column' },
            { label: 'Available', key: 'isAvailable' },
            { label: 'Reserved By', key: 'reservedBy' },
            { label: 'Event Name', key: 'event.name' },
        ],
        data: filteredSeats,
    };

    return (
        <div className="container mx-auto mt-24  " style={{width:`180vh`}}>
      <div className="absolute top-0 right-0 mt-4 mr-4  "  >
    <img
      src="https://www.shutterstock.com/image-vector/woman-working-big-data-tech-600nw-2015415110.jpg"
      alt="Seats Illustration"
      className="w-20 mt-20 h-auto mr-20" // Adjust size as needed
    
    />
  </div>
           <h1 className="text-5xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
  All Seat Details
</h1>
            
            {/* Filter dropdown */}
            <div className="flex justify-between mb-6">
                <select
                    value={filter}
                    onChange={handleFilterChange}
                    className="border px-3 py-2 rounded-lg text-gray-700"
                >
                    <option value="">Filter by Availability</option>
                    <option value="available">Available</option>
                    <option value="reserved">Reserved</option>
                </select>

                {/* Download CSV Button */}
                <CSVLink {...csvReport}>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center">
                        <FaDownload className="mr-2" /> Download Report
                    </button>
                </CSVLink>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-800 text-white">
                            <th className="px-4 py-2 text-left">Seat <MdEventSeat className="inline-block ml-1" /></th>
                            <th className="px-4 py-2 text-left">Row</th>
                            <th className="px-4 py-2 text-left">Column</th>
                            <th className="px-4 py-2 text-left">Available</th>
                            <th className="px-4 py-2 text-left">Reserved By</th>
                            <th className="px-4 py-2 text-left">Event Name</th>
                            <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredSeats.map((seat) => (
                            <tr key={seat._id} className="hover:bg-gray-100 transition duration-150 ease-in-out">
                                <td className="px-4 py-2">
                                    {seat.seatNumber}
                                </td>
                                <td className="px-4 py-2">
                                    {seat.row}
                                </td>
                                <td className="px-4 py-2">
                                    {seat.column}
                                </td>
                                <td className="px-4 py-2">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${seat.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {seat.isAvailable ? 'Yes' : 'No'}
                                    </span>
                                </td>
                                <td className="px-4 py-2">
                                    {seat.reservedBy ? `${seat.reservedBy.firstName} ${seat.reservedBy.lastName}` : 'N/A'}
                                </td>
                                <td className="px-4 py-2">
                                    {seat.event ? seat.event.name : 'N/A'}
                                </td>
                                <td className="px-4 py-2">
                                    <button
                                        onClick={() => handleDelete(seat._id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminSeatBooking;
