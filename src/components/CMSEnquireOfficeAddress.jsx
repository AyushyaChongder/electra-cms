import React, { useState, useEffect } from 'react';
import "../styles.css";
import Pencil from "../assets/img/pencil.png";
import Dustbin from "../assets/img/dustbin.png";
import { Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

function CMSEnquireOfficeAddress() {
  const [addresses, setAddresses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ id: '', address: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAddresses = async () => {
    try {
      const response = await fetch('https://as783pagq9.execute-api.ap-south-1.amazonaws.com/v1/getAddress');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const { data } = await response.json();
      setAddresses(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching addresses:', error);
      setError('Failed to fetch addresses. Please try again.');
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleEditClick = (address) => {
    setFormData(address);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (addressId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this address?");
    if (!confirmDelete) return;

    try {
      const response = await fetch("https://twvj8cb4y0.execute-api.ap-south-1.amazonaws.com/v1/deleteAddress", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: addressId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Delete failed with status ${response.status}`);
      }

      const data = await response.json();
      if (data.status_code === 200) {
        const updatedAddresses = addresses.filter((address) => address.id !== addressId);
        setAddresses(updatedAddresses);
      } else {
        throw new Error("Failed to delete address");
      }
    } catch (error) {
      console.error("Error deleting address:", error);
      setError("Failed to delete address. Please try again.");
    }
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setFormData({ id: '', address: '' ,address_type:''});
  };

  const generateUniqueId = () => {
    return `id${Math.floor(Math.random() * 10000)}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      try {
        const response = await fetch('https://15fjno2lo7.execute-api.ap-south-1.amazonaws.com/v1/updateAddress', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: formData.id,
            address: formData.address,
          }),
        });
        if (!response.ok) {
          throw new Error('Failed to update address');
        }
        setAddresses(addresses.map(addr => (addr.id === formData.id ? formData : addr)));
      } catch (error) {
        console.error('Error updating address:', error);
        setError('Failed to update address. Please try again.');
      }
    } else {
      const newAddressId = generateUniqueId(); // Generate a unique ID for the new address
      try {
        const response = await fetch("https://jjdwml0jfi.execute-api.ap-south-1.amazonaws.com/v1/createAdress", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: newAddressId,
            address: formData.address,
          }),
        });
        if (!response.ok) {
          throw new Error('Failed to create address');
        }
        setAddresses([...addresses, { id: newAddressId, address: formData.address,address_type:formData.address_type }]);
      } catch (error) {
        console.error('Error creating address:', error);
        setError('Failed to create address. Please try again.');
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
        <h1 className="cms-banner-title">Office Address</h1>
        <button className="cms-add-button" onClick={() => setIsModalOpen(true)}>
          Add New Address
        </button>
      </div>
      <div className="cms-banner-gallery">
        {addresses.map((address) => (
          <div key={address.id} className="cms-banner-box">
            <div className="cms-banner-details">
            <p className="cms-banner-alt">Address Type: {address.address_type}</p>
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
                Address Type:
                <input type="text"
                  name="address_type"
                  className="cms-input"
                  value={formData.address_type}
                  onChange={handleFormChange}
                  required
                />
              </label>
              <label>
                Address:
                <div className='tooltip-wrapper'>
                  <Tooltip title='Adrress Line 1- Name of the company, Line 2- Tagline of the company, Line -3 Address Line 4- City, State, Country, Pincode. Comma after every line.'>
                    <InfoIcon className="tooltip-icon" />
                  </Tooltip>
                  <textarea
                  name="address"
                  className="cms-input"
                  value={formData.address}
                  onChange={handleFormChange}
                  style={{ height: "120px" }}
                  required
                />

                </div>
              </label>
              <button type="submit" className="cms-upload-button" disabled={isLoading}>
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
  );
}

export default CMSEnquireOfficeAddress;
