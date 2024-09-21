import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "../styles.css";
import loginimage from "../assets/img/login_vector.png"
import googlelogo from "../assets/img/search.png"

function CMSLogin({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'electrapower' && password === '12345') {
      setError('');
      onLogin();
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } else {
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        {/* Left Side - Image and Text */}
        <div className="login-left">
          <img 
            src={loginimage} 
            alt="Support Illustration" 
            className="login-image" 
          />
        </div>

        {/* Right Side - Login Form */}
        <div className="login-right">
          <h2 className="login-form-heading montserrat-regular">Welcome To Electra Power</h2>
          
          {error && <p className="error-message montserrat-regular" style={{color: 'red', marginBottom: '10px'}}>{error}</p>}
          
          <form onSubmit={handleSubmit}>
            <div className="login-form-group">
              <label htmlFor="username" className="login-form-label montserrat-regular">Username</label>
              <input
                type="text"
                id="username"
                className="login-form-input montserrat-regular"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="login-form-group">
              <label htmlFor="password" className="login-form-label montserrat-regular">Password</label>
              <div className="login-password-wrapper">
                <input
                  type="password"
                  id="password"
                  className="login-form-input montserrat-regular"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="login-form-agreement flex items-center justify-between">
              <label className="flex items-center montserrat-regular">
                <input type="checkbox" className="login-form-checkbox montserrat-regular" />
                <span className="login-agreement-text montserrat-regular">
                  I agree to all <a href="#" className="login-text-link montserrat-regular">End User Agreement</a> and <a href="#" className="login-text-link montserrat-regular">Policies</a>.
                </span>
              </label>
            </div>
            <button type="submit" className="cms-upload-button montserrat-regular">Sign In</button>
          </form>
          <div className="text-center login-forgot-password ">
            <a href="#" className="login-text-link montserrat-regular">Forgot password?</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CMSLogin;