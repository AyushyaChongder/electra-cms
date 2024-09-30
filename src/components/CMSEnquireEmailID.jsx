import React, { useState } from 'react';
import '../styles.css';
import Pencil from '../assets/img/pencil.png';
import Dustbin from '../assets/img/dustbin.png';

function CMSEnquireEmailID() {
  const initialEmails = [
    { id: 1, email: "office@electrapower.in" },
    { id: 2, email: "support@electrapower.in" }
  ];

  const [emails, setEmails] = useState(initialEmails);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ id: null, email: '' });

  const handleEditClick = (email) => {
    setFormData(email);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    setEmails(emails.filter(email => email.id !== id));
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setFormData({ id: null, email: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setEmails(emails.map(email => (email.id === formData.id ? formData : email)));
    } else {
      setEmails([...emails, { ...formData, id: emails.length + 1 }]);
    }
    handleCloseModal();
  };

  return (
    <div className="cms-banner-container">
      <div className="cms-banner-header">
        <h1 className="cms-banner-title">Enquiry Email Addresses</h1>
        <button className="cms-add-button" onClick={() => setIsModalOpen(true)}>
          Add New Email
        </button>
      </div>
      <div className="cms-banner-gallery">
        {emails.map((email) => (
          <div key={email.id} className="cms-banner-box">
            <div className="cms-banner-details">
              <p className="cms-banner-alt">Email: {email.email}</p>
              <div className="cms-banner-actions">
                <button
                  className="cms-action-button banner-edit-button"
                  onClick={() => handleEditClick(email)}
                >
                  <img src={Pencil} alt="Edit" className="cms-action-icon" />
                </button>
                <button
                  className="cms-action-button banner-delete-button"
                  onClick={() => handleDeleteClick(email.id)}
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
            <h2>{isEditing ? "Edit Email" : "Add New Email"}</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  className="cms-input"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                />
              </label>
              <button type="submit" className="cms-upload-button">
                {isEditing ? "Update Email" : "Add Email"}
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

export default CMSEnquireEmailID;
