import React, { useState, useEffect } from "react";
import "../styles.css";
import Pencil from "../assets/img/pencil.png";

function CMSAllProjectsNumbers() {
  const [stats, setStats] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    value: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch project numbers data
  const fetchStats = async () => {
    try {
      const response = await fetch(
        "https://i9qn12cz4c.execute-api.ap-south-1.amazonaws.com/v1/getProjectNumbers"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      
      // Filter data to get only the value with page=portfolio-projects
      const filteredStats = data.data.filter(stat => stat.page === "all-projects");
      setStats(filteredStats);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching project numbers:", error);
      setError("Failed to load project numbers. Please try again later.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleEditClick = (stat) => {
    setFormData(stat); // Set formData to the stat being edited
    setIsModalOpen(true);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ id: "", value: "" }); // Reset formData
  };

  const handleConfirmModalClose = () => {
    setIsConfirmModalOpen(false);
  };

  const handleConfirmModalSubmit = async () => {
    setIsConfirmModalOpen(false);
    await handleFormSubmit(); // Proceed with form submission
  };

  // Function to update project number data via PUT API
  const handleFormSubmit = async () => {
    try {
      const response = await fetch(
        "https://zik6s3iccd.execute-api.ap-south-1.amazonaws.com/v1/updateProjectNumbers",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: formData.id, // Ensure you include the ID
            value: formData.value,
            page: "all-projects", 
          }),
        }
      );

      const data = await response.json();
      if (data.status_code === 200) {
        console.log("Data updated successfully:", data.updated_attributes);

        // Update the stats array with the updated statistic
        setStats((prevStats) =>
          prevStats.map((stat) =>
            stat.id === formData.id ? { ...stat, ...formData } : stat
          )
        );

        handleCloseModal();
      } else {
        throw new Error(data.message || "Failed to update the statistic");
      }
    } catch (error) {
      console.error("Error updating project number:", error);
      setError("Failed to update the project number. Please try again later.");
    }
  };

  if (isLoading) {
    return <div className="loader">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="cms-banner-container">
      <div className="cms-banner-header">
        <h1 className="cms-banner-title">All Projects Numbers</h1>
      </div>
      <div className="cms-banner-gallery">
        {stats.map((stat) => (
          <div key={stat.id} className="cms-banner-box">
            <div className="cms-banner-details">
              <p className="cms-banner-value">Value: {stat.value}</p>
              <div className="cms-banner-actions">
                <button
                  className="cms-action-button banner-edit-button"
                  onClick={() => handleEditClick(stat)}
                >
                  <img src={Pencil} alt="Edit" className="cms-action-icon" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="cms-modal-overlay">
          <div className="cms-modal-content">
            <h2>Edit Project Number</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsConfirmModalOpen(true);
              }}
            >
                <label>
                ID:
                <input
                  type="text"
                  name="id"
                  className="cms-input"
                  value={formData.id}
                  readOnly // Make ID read-only
                />
              </label>
              <label>
                Value:
                <input
                  type="text"
                  name="value"
                  className="cms-input"
                  value={formData.value}
                  onChange={handleFormChange}
                  required
                />
              </label>
              <button type="submit" className="cms-upload-button">
                Update Project Number
              </button>
              <button
                type="button"
                className="cms-close-button"
                onClick={handleCloseModal}
              >
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
              <button
                className="cms-yes-button"
                onClick={handleConfirmModalSubmit}
              >
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
}

export default CMSAllProjectsNumbers