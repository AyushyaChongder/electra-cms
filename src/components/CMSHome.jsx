// src/pages/CMSHome.js
import React from 'react';
import '../styles.css'; // Import your CSS file
import CMSCard from '../components/CMSCard'; // Import the CMSCard component

function CMSHome() {
  return (
    <div className="cms-home">
      <h1 className="cms-title">Home Dashboard</h1>
      <div className="cms-container">
        <CMSCard 
          title="Banner" 
          description="Manage the Banner section" 
          editPath="/cms-banner" 
        />
        <CMSCard 
          title="Hero" 
          description="Manage the Hero section" 
          editPath="/cms-hero" 
        />
        <CMSCard 
          title="Image Slider" 
          description="Manage the Image Slider section" 
          editPath="/cms-image-slider" 
        />
        <CMSCard 
          title="About" 
          description="Manage the About section" 
          editPath="/cms-about" 
        />
        <CMSCard 
          title="Vision" 
          description="Manage the Vision section" 
          editPath="/cms-vision" 
        />
        <CMSCard 
          title="Success Cards" 
          description="Manage the Success Cards section" 
          editPath="/cms-success-cards" 
        />
        <CMSCard 
          title="Home Portfolio" 
          description="Manage the Home Portfolio section" 
          editPath="/cms-home-portfolio" 
        />
        <CMSCard 
          title="Home Client" 
          description="Manage the Home Client section" 
          editPath="/cms-home-client" 
        />
        <CMSCard 
          title="Home Testimonials" 
          description="Manage the Home Testimonials section" 
          editPath="/cms-home-testimonials" 
        />
        <CMSCard 
          title="Connect" 
          description="Manage the Connect section" 
          editPath="/cms-connect" 
        />
        <CMSCard 
          title="Footer" 
          description="Manage the Footer section" 
          editPath="/cms-footer" 
        />
      </div>
    </div>
  );
}

export default CMSHome;
