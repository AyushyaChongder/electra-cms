// src/pages/CMSBanner.js
import React from 'react';
import '../styles.css'; // Import your CSS file

// Web banner images
import banner1 from "../assets/img/banner_a.png";
import banner3 from "../assets/img/banner_c.png";
import banner4 from "../assets/img/banner_d.png";
import banner5 from "../assets/img/banner_e.png";

function CMSBanner() {
  const images = [
    { id: 1, src: banner1 },
    { id: 2, src: banner3 },
    { id: 3, src: banner4 },
    { id: 4, src: banner5 },
  ];

  return (
    <div className="cms-banner-container">
      <h1 className="cms-banner-title">Banner Gallery</h1>
      <div className="cms-banner-gallery">
        {images.map((image, index) => (
          <div key={image.id} className="cms-banner-box">
            <img src={image.src} alt={`Banner ${index + 1}`} className="cms-banner-preview" />
            <p className="cms-banner-index">#{index + 1}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CMSBanner;
