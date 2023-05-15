import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function ReservationDetails() {
  const [reservation, setReservation] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedReservation, setUpdatedReservation] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/reservation/${id}`)
      .then(response => {
        setReservation(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);

  const handleEdit = () => {
    setEditMode(true);
    setUpdatedReservation({
      firstName: reservation.firstName,
      lastName: reservation.lastName,
      passportNumber: reservation.passportNumber,
      destinationName: reservation.destination.destination,
      airportName: reservation.airport.name,
      date: reservation.date
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedReservation(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = () => {
    axios.put(`http://localhost:5000/reservation/${id}`, updatedReservation)
      .then(response => {
        setReservation(response.data);
        setEditMode(false);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:5000/reservation/${id}`)
      .then(response => {
        navigate('/userPage');
      })
      .catch(error => {
        console.error(error);
      });
  };

  if (!reservation) {
    return <div>Loading...</div>;
  }

  if (editMode) {
    return (
      <div>
        <h2>Edit Reservation</h2>
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
          <br />
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={updatedReservation.lastName}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Passport ID:
            <input
              type="text"
              name="passportNumber"
              value={updatedReservation.passportNumber}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Destination:
            <input
              type="text"
              name="destinationName"
              value={updatedReservation.destinationName}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Airport:
            <input
              type="text"
              name="airportName"
              value={updatedReservation.airportName}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Date:
            <input
              type="text"
              name="date"
              value={updatedReservation.date}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>Reservation Details</h2>
      <p><strong>First Name:</strong> {reservation.firstName}</p>
      <p><strong>Last Name:</strong> {reservation.lastName}</p>
      <p><strong>Passport ID:</strong> {reservation.passportNumber}</p>
      <p><strong>Destination:</strong> {reservation.destination.destination}</p>
      <p><strong>Airport:</strong> {reservation.airport.name}</p>
      <p><strong>Date:</strong> {reservation.date}</p>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default ReservationDetails;
