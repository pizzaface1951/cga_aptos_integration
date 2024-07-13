import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css'; // Custom CSS for the header

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the access token from local storage
    navigate('/'); // Navigate back to the login page
  };

  const isLoggedIn = Boolean(localStorage.getItem('token')); // Check if the user is logged in

  return (
    <nav className="navbar navbar-dark bg-dark mb-4">
      <div className="container-fluid d-flex align-items-center">
        <div className="d-flex align-items-center">
          <img src="/images/Aptos_header.png" alt="Aptos Logo" style={{ height: '20px', marginRight: '10px' }} />
          <span style={{ fontSize: '1rem', margin: '0 15px', color: 'white' }}>X</span>
          <img src="/images/cga.png" alt="CGA Logo" style={{ height: '40px'}} />
        </div>
        <span className="navbar-brand mb-0 h1" style={{ fontFamily: 'Poppins, sans-serif' }}>Cross Game Avatars</span>
        {isLoggedIn && (
          <button onClick={handleLogout} className="btn btn-light ms-auto">Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Header;
