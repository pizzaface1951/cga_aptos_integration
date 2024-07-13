import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginPage.css'; // Custom CSS for the login page

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('USER');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth', {
        email,
        password,
      });
      if (response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken);
        localStorage.setItem('email', email)
        console.log(response.data);
        navigate('/dashboard');
      } else {
        alert('Login failed. Please check your email and password.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }
    if (!validatePassword(password)) {
      alert('Password does not meet the requirements. Please try again.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8080/api/user', {
        email,
        password,
        role
      });
      if (response.status === 201) {
        alert('Signup successful!');
        setIsLogin(true);
      } else {
        alert('Signup failed. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ height: '100%' }}>
      <div className="card p-4" style={{ width: '400px' }}>
        <div className="text-center mb-4 d-flex justify-content-center align-items-center">
          <img src="/images/cga.png" alt="CGA Logo" className="img-fluid" style={{ maxHeight: '100px', marginRight: '10px' }} />
          <span style={{ fontSize: '2rem', margin: '0 10px' }}>X</span>
          <img src="/images/aptos.jpg" alt="Aptos Logo" className="img-fluid" style={{ maxHeight: '100px', marginLeft: '10px' }} />
        </div>
        {isLogin ? (
          <>
            <h2 style={{ fontFamily: 'Poppins, sans-serif' }}>Login</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label">Email:</label>
                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Password:</label>
                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
            <button className="btn btn-link mt-3 w-100" onClick={() => setIsLogin(false)}>Sign Up</button>
          </>
        ) : (
          <>
            <h2 style={{ fontFamily: 'Poppins, sans-serif' }}>Signup</h2>
            <form onSubmit={handleSignup}>
              <div className="mb-3">
                <label className="form-label">Email:</label>
                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Password:</label>
                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Confirm Password:</label>
                <input type="password" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Role:</label>
                <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)} required>
                  <option value="USER">User</option>
                  <option value="CREATOR">Creator</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary w-100">Signup</button>
            </form>
            <button className="btn btn-link mt-3 w-100" onClick={() => setIsLogin(true)}>Login</button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
