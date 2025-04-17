import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { mycontext } from '../App';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Loginpage() {
  const { setToken, setUser } = useContext(mycontext);
  const [logindata, setlogindata] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!logindata.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(logindata.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!logindata.password) {
      newErrors.password = 'Password is required';
    } else if (logindata.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlechange = (e) => {
    setlogindata({ ...logindata, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handlelogin = async () => {
    if (!validateForm()) return;

    try {
      const res = await axios.post('http://localhost:8000/api/login', logindata);
      if (res.data && res.data.access_token) {
        //remove old token first
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        //add new information
        localStorage.setItem('token', res.data.access_token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setToken(res.data.access_token);
        setUser(res.data.user);
        console.log('Login successful', res.data);
        navigate('/Dashboard');
      } else {
        console.log('login error');
      }
    } catch (err) {
      console.error('Login error:', err.response.data);
      setErrors({ submit: 'Invalid credentials. Please try again.' });
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <div className="login-form">
          <div className="login-input-group">
            <label className="login-label">Email:</label>
            <input
              type="email"
              name="email"
              className={`login-input ${errors.email ? 'login-input-error' : ''}`}
              onChange={handlechange}
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
              onChange={handlechange}
              placeholder="Enter your password"
            />
            {errors.password && <span className="login-error-message">{errors.password}</span>}
          </div>

          {errors.submit && <div className="login-error-message">{errors.submit}</div>}

          <button className="login-button" type="submit" onClick={handlelogin}>
            Login
          </button>

          <Link to="/register" className="login-register-link">
            Don't have an account? Register here
          </Link>
        </div>
      </div>
    </div>
  );
}