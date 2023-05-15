import React from 'react';
import './CSS/Homepage.css';
import air from '../pics/air.mp4';
import logo from '../pics/logo.png';
import { Link } from 'react-router-dom';


const HomePage = () => {

  return (
    <header className='w-screen h-screen relative'>
      <video
        src={air}
        className='w-full h-full object-cover z-0'
        autoPlay
        loop
        muted
        style={{ zIndex: -1 }}
      />
      <div className="content absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center z-10">
        <nav className="navbar">
          <div className="logo">
            <img src={logo} alt="Global-Air Logo" />
          </div>
          <ul className="nav-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">Destinations</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </nav>
        <div className="main">
          <h1 className="title"></h1>
          <h1 className="subtitle">Discover Your Next Adventure</h1>
          <Link to="/signup">
            <button className="cta-btn">Travel With Us</button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default HomePage;
