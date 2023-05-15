import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Homepage from './components/Homepage';
import Signup from './components/SignUp';
import Login from './components/Login';
import Userpage from './components/Userpage';
import Booking from './components/Booking';
import Reservations from './components/Reservations';
import withAuth from './withAuth';

const ProtectedUser = withAuth(Userpage);
const ProtectedBooking = withAuth(Booking);

const App = () => {
  return (
    <Router>
      <Container className="mt-3">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Userpage" element={<ProtectedUser />} />
          <Route path="/Booking" element={<ProtectedBooking />} />
          <Route path="/reservations" element={<Reservations />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
