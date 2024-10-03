import React from 'react'
import '../styles.css'; // Import your CSS file
import CMSCard from '../components/CMSCard'; // Import the CMSCard component


function CMSFooter() {
  return (
    <div className="cms-home">
    {/* Header section with title and login button */}
    <div className="cms-header flex justify-between items-center p-4">
      <h1 className="cms-title">Footer Dashboard</h1>
      
    </div>

    {/* Content section with CMS cards */}
    <div className="cms-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      <CMSCard 
        title="Email Address" 
        description="Manage the Email Address" 
        editPath="/cms-footer-emailid" 
      />
      
      <CMSCard 
        title="Office Address" 
        description="Manage the Office Address section" 
        editPath="/cms-footer-address" 
      />
     
      <CMSCard 
        title="Contact Number" 
        description="Manage the Contact Numbers section" 
        editPath="/cms-footer-contact" 
      />

       <CMSCard 
        title="Social Links" 
        description="Manage the Social Media section" 
        editPath="/cms-footer-social" 
      />
      
    </div>
  </div>
  )
}

export default CMSFooter