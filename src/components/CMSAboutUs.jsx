import React from 'react'
import '../styles.css'; // Import your CSS file
import CMSCard from '../components/CMSCard'; // Import the CMSCard component

function CMSAboutUs() {
  return (
    <div className="cms-home">
      {/* Header section with title and login button */}
      <div className="cms-header flex justify-between items-center p-4">
        <h1 className="cms-title">About Dashboard</h1>
      </div>

      
      <div className="cms-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        <CMSCard 
          title="Header Image" 
          description="Manage the Header Image section" 
          editPath="/cms-aboutus-header-image" 
        />
        
        <CMSCard 
          title="Statistics" 
          description="Manage the Statistics section" 
          editPath="/cms-aboutus-statistics" 
        />
       
        <CMSCard 
          title="Integrity Carousel" 
          description="Manage the Integrity Carousel section" 
          editPath="/cms-aboutus-integrity-carousel" 
        />
        
        
      </div>
    </div>
  )
}

export default CMSAboutUs