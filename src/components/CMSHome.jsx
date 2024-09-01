// src/pages/CMSHome.js
// import React from 'react';
import '../styles.css'; // Import your CSS file
import { useNavigate } from 'react-router-dom'; // Add this import
// import CMSBanner from './CMSBanner';

function CMSHome() {

     const navigate = useNavigate();

    const handleEditClick = () => {
        navigate('/cms-banner');
    };
    
  return (
    <div className="cms-home">
      <h1 className="cms-title">Home Dashboard</h1>
      <div className="cms-container">
        <div className="cms-box">
          <h2 className="cms-box-title">Banner</h2>
          <p>Manage the Banner section</p>
          <div className="cms-buttons">
            <button className="cms-button edit-button" onClick={handleEditClick}>Edit</button>
            <button className="cms-button delete-button">Delete</button>
          </div>
        </div>
        <div className="cms-box">
          <h2 className="cms-box-title">Hero</h2>
          <p>Manage the Hero section</p>
          <div className="cms-buttons">
            <button className="cms-button edit-button">Edit</button>
            <button className="cms-button delete-button">Delete</button>
          </div>
        </div>
        <div className="cms-box">
          <h2 className="cms-box-title">Image Slider</h2>
          <p>Manage the Image Slider section</p>
          <div className="cms-buttons">
            <button className="cms-button edit-button">Edit</button>
            <button className="cms-button delete-button">Delete</button>
          </div>
        </div>
        <div className="cms-box">
          <h2 className="cms-box-title">About</h2>
          <p>Manage the About section</p>
          <div className="cms-buttons">
            <button className="cms-button edit-button">Edit</button>
            <button className="cms-button delete-button">Delete</button>
          </div>
        </div>
        <div className="cms-box">
          <h2 className="cms-box-title">Vision</h2>
          <p>Manage the Vision section</p>
          <div className="cms-buttons">
            <button className="cms-button edit-button">Edit</button>
            <button className="cms-button delete-button">Delete</button>
          </div>
        </div>
        <div className="cms-box">
          <h2 className="cms-box-title">Success Cards</h2>
          <p>Manage the Success Cards section</p>
          <div className="cms-buttons">
            <button className="cms-button edit-button">Edit</button>
            <button className="cms-button delete-button">Delete</button>
          </div>
        </div>
        <div className="cms-box">
          <h2 className="cms-box-title">Home Portfolio</h2>
          <p>Manage the Home Portfolio section</p>
          <div className="cms-buttons">
            <button className="cms-button edit-button">Edit</button>
            <button className="cms-button delete-button">Delete</button>
          </div>
        </div>
        <div className="cms-box">
          <h2 className="cms-box-title">Home Client</h2>
          <p>Manage the Home Client section</p>
          <div className="cms-buttons">
            <button className="cms-button edit-button">Edit</button>
            <button className="cms-button delete-button">Delete</button>
          </div>
        </div>
        <div className="cms-box">
          <h2 className="cms-box-title">Home Testimonials</h2>
          <p>Manage the Home Testimonials section</p>
          <div className="cms-buttons">
            <button className="cms-button edit-button">Edit</button>
            <button className="cms-button delete-button">Delete</button>
          </div>
        </div>
        <div className="cms-box">
          <h2 className="cms-box-title">Connect</h2>
          <p>Manage the Connect section</p>
          <div className="cms-buttons">
            <button className="cms-button edit-button">Edit</button>
            <button className="cms-button delete-button">Delete</button>
          </div>
        </div>
        <div className="cms-box">
          <h2 className="cms-box-title">Footer</h2>
          <p>Manage the Footer section</p>
          <div className="cms-buttons">
            <button className="cms-button edit-button">Edit</button>
            <button className="cms-button delete-button">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CMSHome;
