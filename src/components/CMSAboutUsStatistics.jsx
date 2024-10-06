import React, { useState, useEffect } from "react";
import "../styles.css";
import Pencil from "../assets/img/pencil.png";

function CMSAboutUsStatistics() {
  const [stats, setStats] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: "", // Ensure you have an ID field
    position: "",
    title: "",
    value: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch statistics from the API
  const fetchStats = async () => {
    try {
      const response = await fetch(
        "https://dd87lvmo4f.execute-api.ap-south-1.amazonaws.com/v1/getAboutUsStatistics"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setStats(data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching statistics:", error);
      setError("Failed to load statistics. Please try again later.");
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
    setFormData({ id: "", position: "", title: "", value: "" }); // Reset formData
  };

  const handleConfirmModalClose = () => {
    setIsConfirmModalOpen(false);
  };

  const handleConfirmModalSubmit = async () => {
    setIsConfirmModalOpen(false);
    await handleFormSubmit(); // Proceed with form submission
  };

  // Function to update statistic data via PUT API
  const handleFormSubmit = async () => {
    try {
      const response = await fetch(
        "https://hdvscmo62m.execute-api.ap-south-1.amazonaws.com/v2/updateAboutUsStatistics",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            value: formData.value,
            id: formData.id, // Ensure you include the ID
            position: Number(formData.position), // Ensure position is a number
            title: formData.title,
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
      console.error("Error updating statistic:", error);
      setError("Failed to update the statistic. Please try again later.");
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
        <h1 className="cms-banner-title">About Us Statistics</h1>
      </div>
      <div className="cms-banner-gallery">
        {stats.map((stat) => (
          <div key={stat.position} className="cms-banner-box">
            <div className="cms-banner-details">
              <p className="cms-banner-index">Position: {stat.position}</p>
              <p className="cms-banner-alt">Title: {stat.title}</p>
              <p className="cms-banner-link">Value: {stat.value}</p>
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
            <h2>Edit Statistic</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsConfirmModalOpen(true);
              }}
            >
              <label>
                Position:
                <input
                  type="number"
                  name="position"
                  className="cms-input"
                  value={formData.position}
                  onChange={handleFormChange}
                  required
                />
              </label>
              <label>
                Title:
                <input
                  type="text"
                  name="title"
                  className="cms-input"
                  value={formData.title}
                  onChange={handleFormChange}
                  required
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
                Update Statistic
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

export default CMSAboutUsStatistics;
