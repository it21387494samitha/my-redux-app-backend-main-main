import React, { useState } from 'react';
import axios from 'axios';

function SeatAdd() {
  const [row, setRow] = useState('');
  const [number, setNumber] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const token = localStorage.getItem('token'); // Retrieve the token from local storage or your state management

  const handleAddSeat = () => {
    if (!row || !number) {
      setError('Both row and seat number are required.');
      return;
    }

    axios.post(
      'https://newslt-mern.azurewebsites.net/api/seats', // Update with the correct rout
      { row, number: parseInt(number, 10) },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token for authorization
        },
      }
    )
      .then((response) => {
        const { _id, row, number } = response.data.seat; // Ensure backend sends the seat with _id
        setSuccessMessage(`Seat ${row}${number} (ID: ${_id}) added successfully!`);
        setError('');
        setRow('');
        setNumber('');
      })
      .catch((error) => {
        setError('Error adding seat. It may already exist or the route is incorrect.');
        setSuccessMessage('');
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Add Seat</h2>
      {error && <p>{error}</p>}
      {successMessage && <p>{successMessage}</p>}
      <input
        type="text"
        placeholder="Row"
        value={row}
        onChange={(e) => setRow(e.target.value)}
      />
      <input
        type="number"
        placeholder="Number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <button onClick={handleAddSeat}>Add Seat</button>
    </div>
  );
}

export default SeatAdd;
