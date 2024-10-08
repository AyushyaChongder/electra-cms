import React, { useState } from "react";
import "../styles.css"; // Import your CSS file
import CMSCard from "../components/CMSCard"; // Import the CMSCard component

function CMSAllProjects() {
  return (
    <div className="cms-home">
      {/* Header section with title and login button */}
      <div className="cms-header flex justify-between items-center p-4">
        <h1 className="cms-title">All Projects Dashboard</h1>
      </div>

      {/* Content section with CMS cards */}
      <div className="cms-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        <CMSCard
          title="All Projects "
          description="Manage the Project"
          editPath="/cms-allprojects-incheon"
        />

        <CMSCard
          title="Project Numbers"
          description="Manage the Project"
          editPath="/cms-allprojects-labs"
        />

    
      </div>
    </div>
  );
}

export default CMSAllProjects;
