import React, { useState } from "react";
import "../styles.css"; // Import your CSS file
import aboutusimg from "../assets/img/aboutusimg1_webimage.webp";
import Pencil from "../assets/img/pencil.png";
import Dustbin from "../assets/img/dustbin.png";

function CMSAboutUsHeaderImage() {
  const [headerImage, setHeaderImage] = useState([{ id: 1, image_url: aboutusimg }]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [formData, setFormData] = useState({
    id: null,
    imageFile: null,
  });

  const handleAddNewClick = () => {
    setIsEditMode(false);
    setFormData({ id: null, imageFile: null });
    setImagePreview("");
    setIsModalOpen(true);
  };

  const handleEditClick = (image) => {
    setIsEditMode(true);
    setFormData({ id: image.id, imageFile: null });
    setImagePreview(image.image_url);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ id: null, imageFile: null });
    setImagePreview("");
  };

  const handleFormChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setFormData({ ...formData, imageFile: file });
    }
  };

  const handleFormSubmit = () => {
    if (isEditMode) {
      // Update existing image
      setHeaderImage(
        headerImage.map((img) =>
          img.id === formData.id ? { ...img, image_url: imagePreview } : img
        )
      );
    } else {
      // Add new image
      const newImage = {
        id: headerImage.length + 1,
        image_url: imagePreview,
      };
      setHeaderImage([...headerImage, newImage]);
    }
    handleCloseModal();
  };

  const handleDeleteClick = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this image?");
    if (confirmDelete) {
      setHeaderImage(headerImage.filter((img) => img.id !== id));
    }
  };

  return (
    <div className="cms-home">
      <div className="cms-banner-header">
        <h1 className="cms-banner-title">About Us Header Image</h1>
        <button className="cms-add-button" onClick={handleAddNewClick}>
          Add New Image
        </button>
      </div>

      <div className="cms-container">
        {headerImage.map((image) => (
          <div key={image.id} className="cms-box">
            <img src={image.image_url} className="cms-banner-preview" alt="Header" />
            <div className="cms-box-actions">
              <button className="cms-action-button banner-edit-button" onClick={() => handleEditClick(image)}>
                <img src={Pencil} alt="Edit" className="cms-action-icon" />
              </button>
              {/* <button className="cms-action-button banner-delete-button" onClick={() => handleDeleteClick(image.id)}>
                <img src={Dustbin} alt="Delete" className="cms-action-icon" />
              </button> */}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="cms-modal-overlay">
          <div className="cms-modal-content">
            <h2>{isEditMode ? "Edit Header Image" : "Add New Image"}</h2>
            <input type="file" onChange={handleFormChange} accept="image/*" className="cms-input"/>
            {imagePreview && <img src={imagePreview} alt="Preview" className="cms-bannerimg-preview" />}
  
              <button className="cms-upload-button" onClick={handleFormSubmit}>
                {isEditMode ? "Update Header" : "Add Header Image" }
              </button>
              <button className="cms-close-button" onClick={handleCloseModal}>
                Cancel
              </button>
           
          </div>
        </div>
      )}
    </div>
  );
}

export default CMSAboutUsHeaderImage;
