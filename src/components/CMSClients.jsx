import React, { useState, useEffect } from "react";
import axios from "axios"; // Ensure axios is imported
import "../styles.css"; // Import your CSS file
import Pencil from "../assets/img/pencil.png";
import Dustbin from "../assets/img/dustbin.png";

const CMSClients = () => {
  const [clients, setClients] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    imageFile: null,
    imagePreview: "",
  });

  // Fetch client logos from the API when the component mounts
  useEffect(() => {
    const fetchClientLogos = async () => {
      try {
        const response = await fetch(
          "https://4m6h7psse2.execute-api.ap-south-1.amazonaws.com/v1/getClientLogoURLs"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch client logos");
        }
        const data = await response.json();
        const fetchedClients = data.map((url, index) => ({
          id: index + 1,
          src: url,
          alt: `Client ${index + 1}`, // You can keep this for alt attributes but won't show it
        }));
        setClients(fetchedClients);
      } catch (error) {
        console.error("Error fetching clients data:", error);
        setError("Failed to fetch clients. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchClientLogos();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onloadend = () => {
      setFormData((prevData) => ({
        ...prevData,
        imageFile: file,
        imagePreview: reader.result,
      }));
    };
    
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleUploadImage = async () => {
    const { imageFile } = formData; // Destructure formData
    if (!imageFile) return;

    const fileName = imageFile.name;
    const reader = new FileReader();
    
    reader.onloadend = async () => {
      const fileData = reader.result.split(",")[1]; // Base64 file data

      try {
        const response = await axios.post('https://b1fdsnzm5i.execute-api.ap-south-1.amazonaws.com/v1/uploadClientImageS3', {
          file_name: fileName,
          file_data: fileData,
        });

        if (response.data.status_code === 200) {
          const newClient = {
            id: clients.length + 1,
            src: response.data.object_url,
          };
          setClients((prevClients) => [...prevClients, newClient]); // Use functional state update
          handleCloseModal(); // Close modal after successful upload
        }
      } catch (err) {
        console.error('Error uploading image:', err);
      }
    };

    reader.readAsDataURL(imageFile); // Convert image to base64
  };

  const handleAddNewClick = () => {
    setIsEditing(false);
    setFormData({
      id: null,
      imageFile: null,
      imagePreview: "",
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmModalSubmit = async () => {
    await handleUploadImage(); // Call upload function on confirm
    setIsConfirmModalOpen(false);
  };

  const handleConfirmModalClose = () => {
    setIsConfirmModalOpen(false);
  };

  // Function to delete a client logo
  const handleDeleteClient = async (client) => {
    try {
      // Assuming the client object has a src property which contains the URL
      const fileName = client.src.split("/").pop(); // Extract file name from URL
  
      // Make a DELETE request to your API
      const response = await axios.delete(`https://veiar5qy8i.execute-api.ap-south-1.amazonaws.com/v1/deleteClientLogo`, {
        data: { file_name: fileName }, // Sending the file name in the request body
      });
  
      if (response.status === 200) {
        setClients((prevClients) => prevClients.filter(c => c.id !== client.id)); // Remove client from state
        console.log("Client logo deleted successfully.");
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  return (
    <div className="cms-home">
      <div className="cms-banner-header">
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
              alt={`Client Logo ${client.id}`} // Using a default alt text for accessibility
              className="cms-client-preview"
            />
            <div className="cms-box-content">
              <div className="cms-box-actions">
                <button
                  className="cms-action-button banner-edit-button"
                  onClick={() => {
                    setIsEditing(true);
                    setFormData({
                      id: client.id,
                      imageFile: null,
                      imagePreview: client.src,
                    });
                    setIsModalOpen(true);
                  }}
                >
                  <img src={Pencil} alt="Edit" className="cms-action-icon" />
                </button>
                <button
                  className="cms-action-button banner-delete-button"
                  onClick={() => handleDeleteClient(client)} // Call the delete function
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
                Client Logo:
                <input
                  type="file"
                  name="imageFile"
                  accept="image/*"
                  className="cms-input"
                  onChange={handleFileChange} // Call handleFileChange
                />
              </label>
              {formData.imagePreview && ( // Use formData.imagePreview
                <img src={formData.imagePreview} alt="Preview" className="cms-bannerimg-preview" />
              )}

              <button type="submit" className="cms-upload-button">
                {isEditing ? "Update Client" : "Add Client"}
              </button>
              <button type="button" className="cms-close-button" onClick={handleCloseModal}>
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
              <button className="cms-no-button" onClick={handleConfirmModalClose}>
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
