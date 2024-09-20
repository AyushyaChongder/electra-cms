import React from 'react';
import '../styles.css'; // Import your CSS file
import CMSCard from '../components/CMSCard'; // Import the CMSCard component
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation

function CMSHome() {
  return (
    <div className="cms-home">
      {/* Header section with title and login button */}
      <div className="cms-header flex justify-between items-center p-4">
        <h1 className="cms-title">Home Dashboard</h1>
        <Link to="/login">
          <button className="cms-button">
            Login
          </button>
        </Link>
      </div>

      {/* Content section with CMS cards */}
      <div className="cms-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        <CMSCard 
          title="Banner" 
          description="Manage the Banner section" 
          editPath="/cms-banner" 
        />
        
        <CMSCard 
          title="Service Cards" 
          description="Manage the Service Cards section" 
          editPath="/cms-service-cards" 
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
      </div>
    </div>
  );
}

export default CMSHome;
