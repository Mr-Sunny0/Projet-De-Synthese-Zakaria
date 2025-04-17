import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { mycontext } from '../App';

export default function RegisterPage() {
  const { setToken, setUser } = useContext(mycontext);
  const [registerData, setRegisterData] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!registerData.name) newErrors.name = 'Name is required';

    if (!registerData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(registerData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!registerData.password) {
      newErrors.password = 'Password is required';
    } else if (registerData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    if (registerData.password !== registerData.password_confirmation) {
      newErrors.password_confirmation = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      const res = await axios.post('http://localhost:8000/api/register', registerData);
      if (res.data && res.data.access_token) {
        //remove old token first
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        //add new information
        localStorage.setItem('token', res.data.access_token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setToken(res.data.access_token);
        setUser(res.data.user);
        console.log('Register successful', res.data);
        navigate('/Dashboard');
      } else {
        console.log('Invalid response structure');
      }
    } catch (err) {
      console.error('Registration error:', err.response?.data || err.message);
      setErrors({ submit: 'Registration failed. Please try again.' });
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Register</h2>
        <div className="login-form">

          <div className="login-input-group">
            <label className="login-label">Name:</label>
            <input
              type="text"
              name="name"
              className={`login-input ${errors.name ? 'login-input-error' : ''}`}
              onChange={handleChange}
              placeholder="Enter your name"
            />
            {errors.name && <span className="login-error-message">{errors.name}</span>}
          </div>

          <div className="login-input-group">
            <label className="login-label">Email:</label>
            <input
              type="email"
              name="email"
              className={`login-input ${errors.email ? 'login-input-error' : ''}`}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            {errors.email && <span className="login-error-message">{errors.email}</span>}
          </div>

          <div className="login-input-group">
            <label className="login-label">Password:</label>
            <input
              type="password"
              name="password"
              className={`login-input ${errors.password ? 'login-input-error' : ''}`}
              onChange={handleChange}
              placeholder="Enter your password"
            />
            {errors.password && <span className="login-error-message">{errors.password}</span>}
          </div>

          <div className="login-input-group">
            <label className="login-label">Confirm Password:</label>
            <input
              type="password"
              name="password_confirmation"
              className={`login-input ${errors.password_confirmation ? 'login-input-error' : ''}`}
              onChange={handleChange}
              placeholder="Confirm your password"
            />
            {errors.password_confirmation && (
              <span className="login-error-message">{errors.password_confirmation}</span>
            )}
          </div>

          {errors.submit && <div className="login-error-message">{errors.submit}</div>}

          <button className="login-button" type="submit" onClick={handleRegister}>
            Register
          </button>

          <Link to="/login" className="login-register-link">
            Already have an account? Login here
          </Link>
        </div>
      </div>
    </div>
  );
}
