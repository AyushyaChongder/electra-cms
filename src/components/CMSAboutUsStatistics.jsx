import React, { useState } from 'react';
import "../styles.css";
import Pencil from "../assets/img/pencil.png";
import Dustbin from "../assets/img/dustbin.png";

function CMSAboutUsStatistics() {
  const stats = [
    { position: 1, title: "Years of Experience", value: "12+" },
    { position: 2, title: "Projects Delivered", value: "300+" },
    { position: 3, title: "Happy Clients", value: "250+" },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ position: '', title: '', value: '' });

  const handleEditClick = (stat) => {
    setFormData(stat);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (position) => {
    // Implement delete functionality
    console.log("Deleted position:", position);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setFormData({ position: '', title: '', value: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement submit functionality
    console.log("Form Submitted:", formData);
    handleCloseModal();
  };

  return (
    <div className="cms-banner-container">
      <div className="cms-banner-header">
        <h1 className="cms-banner-title">About Us Statistics</h1>
        <button className="cms-add-button" onClick={() => setIsModalOpen(true)}>
          Add New
        </button>
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
                <button
                  className="cms-action-button banner-delete-button"
                  onClick={() => handleDeleteClick(stat.position)}
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
            <h2>{isEditing ? "Edit Statistic" : "Add New Statistic"}</h2>
            <form onSubmit={handleSubmit}>
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
                {isEditing ? "Update Statistic" : "Add Statistic"}
              </button>
              <button type="button" className="cms-close-button" onClick={handleCloseModal}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CMSAboutUsStatistics;
