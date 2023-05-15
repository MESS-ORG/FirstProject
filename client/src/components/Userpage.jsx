import React, { useState } from "react";
import withAuth from "../withAuth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Booking from "./Booking";
import Reservations from "./Reservations";
import './CSS/Userpage.css'
import '../pics/logo.png'


const HandleLogout = ({ navigate }) => {
  localStorage.removeItem("token"); 
  navigate("/login");
};

const Userpage = () => {
  const navigate = useNavigate();
  const [showBooking, setShowBooking] = useState(false);
  const [showReservations, setShowReservations] = useState(false);

  const handleBook = () => {
    setShowBooking(true);
    setShowReservations(false);
  }

  const handleMyReservations = () => {
    setShowBooking(false);
    setShowReservations(true);
  }

  return (
    <div className="user-container">
      <nav className="user-navbar">
        <div className="user-logo">
         
        </div>
        <ul className="user-nav-links">
          <li>
            <Link to="/Userpage">Home</Link>
          </li>
          <li>
            <Link  >Contact Us</Link>
          </li>
          <li>
            <Link to="/" onClick={HandleLogout}>Logout</Link>
          </li>
        </ul>
      </nav>
      <div className="user-layout">
        <h1 id="wel">Welcome !</h1>
        <div className="user-buttons">
          <button className="book-flight" onClick={handleBook}>Book a Flight</button>
          <button className="my-reservations" onClick={handleMyReservations}>My Reservations</button>
        </div>
        {showBooking && <Booking />}
        {showReservations && <Reservations />}
      </div>
    </div>
  );
};

export default withAuth(Userpage);
