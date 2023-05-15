import { useState, useEffect } from 'react';
import axios from 'axios';
import '../components/CSS/Reservations.css';

function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedReservation, setUpdatedReservation] = useState({
    firstName: '',
    lastName: '',
    passportNumber: '',
    destinationName: '',
    airportName: '',
    date: ''
  });

  const [destinations, setDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/reservation')
      .then(response => {
        setReservations(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    axios.get('http://localhost:5000/destinations')
      .then(response => {
        setDestinations(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleDetailsClick = (reservation) => {
    setSelectedReservation(reservation);
    setIsEditing(false);
  };


  const handleUpdateClick = () => {
    axios.put(`http://localhost:5000/reservation/${selectedReservation._id}`, updatedReservation)
      .then(response => {
        const updatedReservations = reservations.map(reservation => {
          if (reservation._id === selectedReservation._id) {
            return response.data;
          }
          return reservation;
        });
      .catch(error => {
        console.error(error);
      });
  };

  const handleDeleteClick = () => {
    axios.delete(`http://localhost:5000/reservation/${selectedReservation._id}`)
      .then(() => {
        const updatedReservations = reservations.filter(reservation => reservation._id !== selectedReservation._id);
        setReservations(updatedReservations);
        setSelectedReservation(null);
        setIsEditing(false);
      })
      .catch(error => {
        console.error(error);
      });
  };
  
  return (
    <div className="reservation-list">
      <h2>Reservations</h2>
      <table>
        <thead>
          <tr>
            <th>Destination</th>
            <th>Airport</th>
            <th>Date</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map(reservation => (
            <tr key={reservation._id}>
              <td>{reservation.destination.destination}</td>
              <td>{reservation.airport.name}</td>
              <td>{reservation.date}</td>
              <td>
                <button onClick={() => handleDetailsClick(reservation)}>Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedReservation && (
        <div className="reservation-details">
          <h2>Reservation Details</h2>
          {isEditing ? (
            <>
              <p><strong>Destination:</strong> {selectedReservation.destination.destination}</p>
              <p><strong>Airport:</strong> {selectedReservation.airport.name}</p>
              <p><strong>Date:</strong> {selectedReservation.date}</p>
              <form>
                <label>
                  First Name:
                  <input
                    type="text"
                    name="firstName"
                    value={updatedReservation.firstName}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Last Name:
                  <input
                    type="text"
                    name="lastName"
                    value={updatedReservation.lastName}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Passport ID:
                  <input
                    type="text"
                    name="passportNumber"
                    value={updatedReservation.passportNumber}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Destination:
                  <select
                    name="destinationName"
                    value={updatedReservation.destinationName}
                    onChange={handleDestinationChange}
                  >
                    <option value="">Select a destination</option>
                    {destinations.map(destination => (
                      <option key={destination.id} value={destination.destination}>
                        {destination.destination}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Airport:
                  <select
                    name="airportName"
                    value={updatedReservation.airportName}
                    onChange={handleInputChange}
                  >
                    <option value="">Select an airport</option>
                    {airports && airports.map(airport => (
                      <option key={airport.code} value={airport.name}>
                        {airport.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Date:
                  <input
                    type="date"
                    name="date"
                    value={updatedReservation.date}
                    onChange={handleInputChange}
                  />
                </label>
                <div className="buttons">
                  <button type="button" onClick={handleUpdateClick}>
                    Update
                  </button>
                  <button type="button" onClick={handleCancelClick}>
                    Cancel
                  </button>
                </div>
              </form>
            </>
          ) : (
            <>
              <p>
                <strong>First Name:</strong> {selectedReservation.firstName}
              </p>
              <p>
                <strong>Last Name:</strong> {selectedReservation.lastName}
              </p>
              <p>
                <strong>Passport ID:</strong> {selectedReservation.passportNumber}
              </p>
              <p>
                <strong>Destination:</strong> {selectedReservation.destination.destination}
              </p>
              <p>
                <strong>Airport:</strong> {selectedReservation.airport.name}
              </p>
              <p>
                <strong>Date:</strong> {selectedReservation.date}
              </p>
              <div className="buttons">
                <button onClick={handleEditClick}>Edit</button>
                <button onClick={handleDeleteClick}>Delete</button> 
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Reservations;

