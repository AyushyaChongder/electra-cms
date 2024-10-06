import React, { useState, useEffect } from 'react';
import "../styles.css";
import Pencil from "../assets/img/pencil.png";
import Dustbin from "../assets/img/dustbin.png";

function CMSEnquireContactNumber() {
  const [contactNumbers, setContactNumbers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ id: '', number: '' });

  const fetchContactNumbers = async () => {
    try {
      const response = await fetch('https://7rj41dy3tc.execute-api.ap-south-1.amazonaws.com/v1/getContactNumber');
      const result = await response.json();
      if (result.status_code === 200) {
        const formattedData = result.data.map(item => ({
          id: item.id,
          number: item.Contact,
        }));
        setContactNumbers(formattedData);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching contact numbers:', error);
      setError('Failed to fetch contact numbers');
      setIsLoading(false);
    }
  };

  // Fetch contact numbers from API
  useEffect(() => {
    fetchContactNumbers();
  }, []);

  const handleEditClick = (contact) => {
    setFormData(contact);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this contact number?");
    if (!confirmDelete) return;

    try {
      const response = await fetch("https://15izjgego8.execute-api.ap-south-1.amazonaws.com/v1/deleteContact", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      });

      if (!response.ok) {
        throw new Error(`Delete failed with status ${response.status}`);
      }

      const data = await response.json();
      if (data.status_code === 200) {
        // Remove the deleted contact from the state
        const updatedContacts = contactNumbers.filter((contact) => contact.id !== id);
        setContactNumbers(updatedContacts);
      } else {
        throw new Error("Failed to delete contact number");
      }
    } catch (error) {
      console.error("Error deleting contact number:", error);
      setError("Failed to delete contact number. Please try again.");
    }
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setFormData({ id: '', number: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update the contact number via API
      try {
        const response = await fetch('https://ticb5vgtx2.execute-api.ap-south-1.amazonaws.com/v1/updateContact', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: formData.id,
            Contact: formData.number,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to update contact number');
        }

        // Update the contact number in local state
        setContactNumbers(contactNumbers.map(contact => (contact.id === formData.id ? formData : contact)));
      } catch (error) {
        console.error('Error updating contact number:', error);
        setError('Failed to update contact number. Please try again.');
      }
    } else {
      // Create a new contact number via API
      const newContactId = `id${contactNumbers.length + 1}`; // Generate a unique ID for the new contact
      try {
        const response = await fetch('https://ywdp4x0ff4.execute-api.ap-south-1.amazonaws.com/v1/createContactNumber', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: newContactId,
            Contact: formData.number,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to create contact number');
        }

        // Add the new contact to the local state
        setContactNumbers([...contactNumbers, { id: newContactId, number: formData.number }]);
      } catch (error) {
        console.error('Error creating contact number:', error);
        setError('Failed to create contact number. Please try again.');
      }
    }
    handleCloseModal();
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
