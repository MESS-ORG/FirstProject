import { useState, useEffect } from 'react';
import '../components/CSS/Booking.css'
import axios from 'axios';

function Booking() {
  const [formData, setFormData] = useState({
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
    axios.get('http://localhost:5000/destinations')
      .then(response => {
        setDestinations(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/reservation/', {
      });
      setFormData({
        firstName: '',
        lastName: '',
        passportNumber: '',
        destinationName: '',
        airportName: '',
        date: '' });
    } catch (error) {
      console.error(error);}
  }
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  return (
    <div className="booking-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="passportNumber">Passport Number:</label>
          <input type="text" name="passportNumber" value={formData.passportNumber} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="destination">Destination:</label>
          <select name="destinationName" value={formData.destinationName} onChange={handleDestinationChange}>
            <option value="">Select a destination</option>
            {destinations.map(destination => (
              <option key={destination.id} value={destination.destination}>{destination.destination}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="airport">Airport:</label>
          <select name="airportName" value={formData.airportName} onChange={handleChange}>
            <option value="">Select an airport</option>
            {airports && airports.map(airport => (
              <option key={airport.code} value={airport.name}>{airport.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} />
        </div>
        <button className="btn-submit" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Booking;
