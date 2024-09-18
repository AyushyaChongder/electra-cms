import React, { useState } from "react";
import "../styles.css"; // Import your CSS file
import Pencil from "../assets/img/pencil.png";
import Dustbin from "../assets/img/dustbin.png";


// Import all client images
import Client1 from "../assets/img/cl1.png";
import Client2 from "../assets/img/cl2.png";
import Client3 from "../assets/img/cl3.png";
import Client4 from "../assets/img/cl4.png";
import Client5 from "../assets/img/cl5.png";
import Client6 from "../assets/img/cl6.png";
import Client7 from "../assets/img/cl7.png";
import Client8 from "../assets/img/cl8.png";
import Client9 from "../assets/img/cl9.png";
import Client10 from "../assets/img/cl10.png";
import Client11 from "../assets/img/cl11.png";
import Client12 from "../assets/img/cl12.png";
import Client13 from "../assets/img/cl14.png";
import Client15 from "../assets/img/cl16.png";
import Client16 from "../assets/img/cl17.png";
import Client17 from "../assets/img/cl18.png";
import Client18 from "../assets/img/cl19.png";
import Client19 from "../assets/img/cl20.png";
import Client20 from "../assets/img/cl211.png";
import Client21 from "../assets/img/cl222.png";
import Client22 from "../assets/img/cl233.png";

// Initial client data with IDs
const initialClients = [
  { id: 1, src: Client1, alt: "Client 1" },
  { id: 2, src: Client2, alt: "Client 2" },
  { id: 3, src: Client3, alt: "Client 3" },
  { id: 4, src: Client4, alt: "Client 4" },
  { id: 5, src: Client5, alt: "Client 5" },
  { id: 6, src: Client6, alt: "Client 6" },
  { id: 7, src: Client7, alt: "Client 7" },
  { id: 8, src: Client8, alt: "Client 8" },
  { id: 9, src: Client9, alt: "Client 9" },
  { id: 10, src: Client10, alt: "Client 10" },
  { id: 11, src: Client11, alt: "Client 11" },
  { id: 12, src: Client12, alt: "Client 12" },
  { id: 13, src: Client13, alt: "Client 13" },
  { id: 14, src: Client15, alt: "Client 15" }, // Skipped id 14 for Client14
  { id: 15, src: Client16, alt: "Client 16" },
  { id: 16, src: Client17, alt: "Client 17" },
  { id: 17, src: Client18, alt: "Client 18" },
  { id: 18, src: Client19, alt: "Client 19" },
  { id: 19, src: Client20, alt: "Client 20" },
  { id: 20, src: Client21, alt: "Client 21" },
  { id: 21, src: Client22, alt: "Client 22" },
];

const CMSClients = () => {
  const [clients, setClients] = useState(initialClients);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleAddNewClick = () => {
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
}

const handleConfirmModalSubmit = async () => {
    setIsConfirmModalOpen(false);
  };

  const handleConfirmModalClose = () => {
    setIsConfirmModalOpen(false);
  };

  return (
    <div className="cms-home">
      <div className="cms-header">
        <h2 className="cms-banner-title">Clients Section</h2>
        <button className="cms-add-button" onClick={handleAddNewClick}>
          Add Client
        </button>
      </div>

      {/* Client cards */}
      <div className="cms-container">
        {clients.map((client) => (
          <div key={client.id} className="cms-box">
            <img
              src={client.src}
              alt={client.alt}
              className="cms-client-preview"
            />
            <div className="cms-box-content">
              <p className="cms-box-description">{client.alt}</p>
              <div className="cms-box-actions">
                <button
                  className="cms-action-button banner-edit-button"
                 
                >
                  <img src={Pencil} alt="Edit" className="cms-action-icon" />
                </button>
                <button
                  className="cms-action-button banner-delete-button"
                  
                >
                  <img src={Dustbin} alt="Delete" className="cms-action-icon" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="cms-modal-overlay">
          <div className="cms-modal-content">
            <h2 className="cms-modal-title">
              {isEditing ? "Edit Client Details" : "Add New Client Details"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsConfirmModalOpen(true);
              }}
            >
              <label>
                Alt Text
                <input
                  type="text"
                  name="altText"
                  className="cms-input"
                  value={initialClients.alt}
                  
                />
              </label>
              <label>
                Client Logo:
                <input
                  type="file"
                  name="imageFile"
                  accept="image/*"
                  className="cms-input"
                  
                />
              </label>
              {initialClients.src && (
                
                  <img src={initialClients.src} alt="Preview" className="cms-bannerimg-preview" />
              
              )}
             

              <button type="submit" className="cms-upload-button">
                {isEditing ? "Update Card" : "Add Card"}
              </button>
              <button className="cms-close-button" onClick={handleCloseModal}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

{isConfirmModalOpen && (
        <div className="cms-modal-overlay">
          <div className="cms-confirm-modal-content">
          <h2>Confirm Submission</h2>
          <p>Are you sure you want to submit the changes?</p>
            <div className="cms-button-container">
              <button className="cms-yes-button" onClick={handleConfirmModalSubmit}>
                Yes
              </button>
              <button
                className="cms-no-button"
                onClick={handleConfirmModalClose}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CMSClients;
