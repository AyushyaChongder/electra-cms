import React, { useState } from "react";
import "../styles.css"; // Import your CSS file
import CMSCard from "../components/CMSCard"; // Import the CMSCard component


function CMSServices() {
    // State to manage the services
    const [services, setServices] = useState([
      {
        title: "Design And Consulting",
        description: "Manage the Service",
        editPath: "/cms-footer-emailid",
      },
      {
        title: "Installation & Commissioning",
        description: "Manage the Service",
        editPath: "/cms-footer-address",
      },
      {
        title: "Panel Board & Control Systems",
        description: "Manage the Service",
        editPath: "/cms-footer-contact",
      },
      {
        title: "Approvals & Compliance",
        description: "Manage the Service",
        editPath: "/cms-footer-social",
      },
      {
        title: "Maintainance & Repair",
        description: "Manage the Service",
        editPath: "/cms-footer-contact",
      },
      {
        title: "Value Added Services",
        description: "Manage the Service",
        editPath: "/cms-footer-social",
      },
    ]);
  
    // Modal state to manage the modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newService, setNewService] = useState({
      title: "",
      description: "",
      editPath: "", // We'll generate a new edit path for each new service
    });
  
    // Handle form input changes
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewService((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
  
    // Handle form submission
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Create a new edit path for the newly added service (you can customize this)
      const editPath = `/cms-service-${services.length + 1}`;
  
      // Add the new service to the services list
      setServices((prevServices) => [
        ...prevServices,
        { ...newService, editPath: editPath },
      ]);
  
      // Close the modal and reset the form
      setIsModalOpen(false);
      setNewService({
        title: "",
        description: "",
        editPath: "",
      });
  
      // Optionally, redirect or create a blank page for the new service
      // Logic for handling the creation of a new page can be added here
    };
  
    return (
      <div className="cms-home">
        {/* Header section with title and login button */}
        <div className="cms-header flex justify-between items-center p-4">
          <h1 className="cms-title">Services Dashboard</h1>
          <button
            className="cms-add-button"
            onClick={() => setIsModalOpen(true)}
          >
            Add New Service
          </button>
        </div>
  
        {/* Content section with CMS cards */}
        <div className="cms-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {services.map((service, index) => (
            <CMSCard
              key={index}
              title={service.title}
              description={service.description}
              editPath={service.editPath}
            />
          ))}
        </div>
  
        {/* Modal for adding new service */}
        {isModalOpen && (
          <div className="cms-modal-overlay">
            <div className="cms-modal-content">
              <h2>Add New Service</h2>
              <form onSubmit={handleSubmit}>
                <label>
                  Service Title:
                  <input
                    type="text"
                    name="title"
                    className="cms-input"
                    value={newService.title}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Description:
                  <input
                    type="text"
                    name="description"
                    className="cms-input"
                    value={newService.description}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <button type="submit" className="cms-upload-button">
                  Add Service
                </button>
                <button
                  type="button"
                  className="cms-close-button"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

export default CMSServices