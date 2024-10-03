import React, { useState } from 'react';
import "../styles.css";
import Pencil from "../assets/img/pencil.png";
import Dustbin from "../assets/img/dustbin.png";

function CMSFooterOfficeAddress() {
  const officeAddresses = [
    { id: 1, address: "Electra Power Engineering, 'A' Grade Electrical Engineers & Contractors, 33/1305-A1, Chalikavattom, Vennala P.O, Kochi, Kerala, INDIA - 682028" },
    // Add more addresses here if needed
  ];

  const [addresses, setAddresses] = useState(officeAddresses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ id: '', address: '' });

  const handleEditClick = (address) => {
    setFormData(address);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    setAddresses(addresses.filter((address) => address.id !== id));
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setFormData({ id: '', address: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setAddresses(addresses.map((addr) => (addr.id === formData.id ? formData : addr)));
    } else {
      setAddresses([...addresses, { ...formData, id: addresses.length + 1 }]);
    }
    handleCloseModal();
  };

  return (
    <div className="cms-banner-container">
      <div className="cms-banner-header">
        <h1 className="cms-banner-title">Footer Office Address</h1>
        <button className="cms-add-button" onClick={() => setIsModalOpen(true)}>
          Add New Address
        </button>
      </div>
      <div className="cms-banner-gallery">
        {addresses.map((address) => (
          <div key={address.id} className="cms-banner-box">
            <div className="cms-banner-details">
              <p className="cms-banner-alt">Address: {address.address}</p>
              <div className="cms-banner-actions">
                <button
                  className="cms-action-button banner-edit-button"
                  onClick={() => handleEditClick(address)}
                >
                  <img src={Pencil} alt="Edit" className="cms-action-icon" />
                </button>
                <button
                  className="cms-action-button banner-delete-button"
                  onClick={() => handleDeleteClick(address.id)}
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
            <h2>{isEditing ? "Edit Address" : "Add New Address"}</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Address:
                <textarea
                  name="address"
                  className="cms-input"
                  value={formData.address}
                  onChange={handleFormChange}
                  required
                />
              </label>
              <button type="submit" className="cms-upload-button">
                {isEditing ? "Update Address" : "Add Address"}
              </button>
              <button type="button" className="cms-close-button" onClick={handleCloseModal}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default CMSFooterOfficeAddress