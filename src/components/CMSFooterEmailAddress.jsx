import React, { useState, useEffect } from 'react';
import '../styles.css';
import Pencil from '../assets/img/pencil.png';
import Dustbin from '../assets/img/dustbin.png';


function CMSFooterEmailAddress() {
  const [emails, setEmails] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ id: null, email: '' });


  const fetchEmails = async () => {
    try {
      const response = await fetch('https://lb0vi80xj8.execute-api.ap-south-1.amazonaws.com/v1/getEmailAddress');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const { data } = await response.json(); // Destructure the data from the response
      setEmails(data.map(emailObj => ({ id: emailObj.id, email: emailObj.email })));
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching email data:", error);
      setError("Failed to load email data. Please try again later.");
      setIsLoading(false);
    }
  };


  // Fetch email addresses from the API
  useEffect(() => {
    
    fetchEmails();
  }, []); // Empty dependency array means this runs once on mount

  const handleEditClick = (email) => {
    setFormData(email);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setFormData({ id: null, email: '' });
  };

  const generateUniqueId = () => {
    return `id${Math.floor(Math.random() * 10000)}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update the email via API
      try {
        const response = await fetch('https://7f38n0k84b.execute-api.ap-south-1.amazonaws.com/v1/updateEmailAddress', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: formData.id,
            email: formData.email,
          }),
        });
        if (!response.ok) {
          throw new Error('Failed to update email');
        }
        setEmails(emails.map(email => (email.id === formData.id ? formData : email)));
      } catch (error) {
        console.error('Error updating email:', error);
      }
    } else {
      // Create a new email via API
      const newEmailId = generateUniqueId(); // Generate a unique ID for the new email
      try {
        const response = await fetch('https://bie5q3ubcf.execute-api.ap-south-1.amazonaws.com/v1/createEmail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: newEmailId,
            email: formData.email,
          }),
        });
        if (!response.ok) {
          throw new Error('Failed to create email');
        }
        // Add the new email to the local state
        setEmails([...emails, { id: newEmailId, email: formData.email }]);
      } catch (error) {
        console.error('Error creating email:', error);
      }
    }
    handleCloseModal();
  };

  const handleDeleteClick = async (emailId) => {
    // Ask for confirmation before proceeding with deletion
    const confirmDelete = window.confirm("Are you sure you want to delete this service card?");
    if (!confirmDelete) return;
  
    try {
      // Call the delete API
      const response = await fetch("https://22agdymsn8.execute-api.ap-south-1.amazonaws.com/v1/deleteEmail", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: emailId,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Delete failed with status ${response.status}`);
      }
  
      const data = await response.json();
      if (data.status_code === 200) {
        // Remove the deleted banner from the state
        const updatedEmails = emails.filter((email) => email.id !== emailId);
        setEmails(updatedEmails);
        
      } else {
        throw new Error("Failed to delete email");
      }
    } catch (error) {
      console.error("Error deleting email:", error);
      setError("Failed to delete email. Please try again.");
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
        <h1 className="cms-banner-title">Footer Email Addresses</h1>
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

export default CMSFooterEmailAddress