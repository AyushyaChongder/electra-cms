import React from 'react';
import "../styles.css"; // Import your CSS file
import loginimage from "../assets/img/login_vector.png"
import googlelogo from "../assets/img/search.png"

function CMSLogin() {
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
          
          <form>
            <div className="login-form-group">
              <label htmlFor="email" className="login-form-label montserrat-regular">Email Address</label>
              <input
                type="email"
                id="email"
                className="login-form-input montserrat-regular"
                placeholder="Email Address"
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
            <button className="cms-upload-button montserrat-regular">Sign In</button>
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
