import React, { useState } from 'react';
import "../styles.css";
import Pencil from "../assets/img/pencil.png";
import Dustbin from "../assets/img/dustbin.png";

function CMSEnquireContactNumber() {
  const initialContactNumbers = [
    { id: 1, number: "+91 98470 58222" },
    { id: 2, number: "+91 90203 58222" },
    // Add more numbers if needed
  ];

  const [contactNumbers, setContactNumbers] = useState(initialContactNumbers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ id: '', number: '' });

  const handleEditClick = (contact) => {
    setFormData(contact);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    setContactNumbers(contactNumbers.filter((contact) => contact.id !== id));
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setFormData({ id: '', number: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setContactNumbers(contactNumbers.map((contact) => (contact.id === formData.id ? formData : contact)));
    } else {
      setContactNumbers([...contactNumbers, { ...formData, id: contactNumbers.length + 1 }]);
    }
    handleCloseModal();
  };

  return (
    <div className="cms-banner-container">
      <div className="cms-banner-header">
        <h1 className="cms-banner-title">Contact Numbers</h1>
        <button className="cms-add-button" onClick={() => setIsModalOpen(true)}>
          Add New Contact
        </button>
      </div>
      <div className="cms-banner-gallery">
        {contactNumbers.map((contact) => (
          <div key={contact.id} className="cms-banner-box">
            <div className="cms-banner-details">
              <p className="cms-banner-alt">Number: {contact.number}</p>
              <div className="cms-banner-actions">
                <button
                  className="cms-action-button banner-edit-button"
                  onClick={() => handleEditClick(contact)}
                >
                  <img src={Pencil} alt="Edit" className="cms-action-icon" />
                </button>
                <button
                  className="cms-action-button banner-delete-button"
                  onClick={() => handleDeleteClick(contact.id)}
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
            <h2>{isEditing ? "Edit Contact" : "Add New Contact"}</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Number:
                <input
                  type="text"
                  name="number"
                  className="cms-input"
                  value={formData.number}
                  onChange={handleFormChange}
                  required
                />
              </label>
              <button type="submit" className="cms-upload-button">
                {isEditing ? "Update Contact" : "Add Contact"}
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

export default CMSEnquireContactNumber;
