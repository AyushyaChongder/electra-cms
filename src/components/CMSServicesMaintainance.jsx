import React, { useState } from 'react';
import '../styles.css';

import img1 from "../assets/img/service5/img1.webp";
import img2 from "../assets/img/service5/img2.webp";
import img3 from "../assets/img/service5/img3.webp";
import img4 from "../assets/img/service5/img4.webp";
import img5 from "../assets/img/service5/img5.webp";
import img6 from "../assets/img/service5/img6.webp";




import Pencil from "../assets/img/pencil.png";
import Dustbin from "../assets/img/dustbin.png";

const sections = [
  {
    heading: "Preventive Maintenance",
    description: "We offer proactive maintenance programs to keep your electrical systems and panel boards running smoothly. Our services include regular inspections, cleaning, testing, and calibration of equipment to prevent breakdowns and extend the lifespan of your electrical infrastructure.",
    images: [img1, img2]
  },
  {
    heading: "Corrective Maintenance",
    description: "Our team of experts is available 24/7 to respond to electrical emergencies and provide prompt repair services. We diagnose and resolve issues quickly, minimising downtime and ensuring the safety of your premises.",
    images: [img3, img4]
  },
  
  {
    heading: "Annual Maintenance Contracts (AMCs)",
    description: "Our comprehensive AMCs provide peace of mind by covering all your electrical maintenance needs. With regular inspections, preventive maintenance, and priority emergency response, we keep your electrical systems operating at peak performance.",
    images: [img5, img6]
  }
];

function CMSServicesMaintainance() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    position: '',
    heading: '',
    description: '',
    bullets: '',
    images: [],
    imagePreviews: []
  });
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const handleAddNewClick = () => {
    setIsModalOpen(true);
    setIsEditing(false);
    setFormData({
      position: '',
      heading: '',
      description: '',
      bullets: '',
      images: [],
      imagePreviews: []
    });
  };

  const handleEditClick = (section) => {
    setIsModalOpen(true);
    setIsEditing(true);
    setFormData({
      position: section.position,
      heading: section.heading,
      description: section.description,
      bullets: section.bullets ? section.bullets.join('\n') : '',
      images: section.images,
      imagePreviews: section.images
    });
  };

  const handleDeleteClick = (sectionIndex) => {
    // Logic to delete the section
    console.log(`Deleting section at index: ${sectionIndex}`);
    // Example: You might want to filter out the section based on index
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images" && files.length > 0) {
      if (files.length > 2) {
        alert("You can only upload up to 2 images.");
        return;
      }
      const imagesArray = Array.from(files);
      const imagePreviews = imagesArray.map((file) => URL.createObjectURL(file));
      setFormData({ ...formData, images: imagesArray, imagePreviews });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsConfirmModalOpen(false);
  };

  const handleConfirmModalSubmit = () => {
    // Submit form logic
    console.log("Form submitted:", formData);
    handleCloseModal();
  };

  return (
    <div className="cms-home">
      <div className="cms-banner-header">
        <h1 className="cms-banner-title">Maintainance & Repair Services</h1>
        <button className="cms-add-button" onClick={handleAddNewClick}>
          Add Service
        </button>
      </div>

      <div className="cms-container">
        {sections.map((section, index) => (
          <div key={index} className="cms-box">
            {section.images.map((image, i) => (
              <img
                key={i}
                src={image}
                alt={section.heading}
                className="cms-banner-preview"
              />
            ))}
            <div className="cms-box-content">
              <h2 className="cms-banner-title">{section.heading}</h2>
              <p className="cms-banner-alt">{section.description}</p>
              <ul >
                {section.bullets && section.bullets.map((bullet, i) => (
                  <li className="cms-banner-alt" key={i}>{bullet}</li>
                ))}
              </ul>
              <div className="cms-box-actions">
                <button
                  className="cms-action-button banner-edit-button"
                  onClick={() => handleEditClick(section)}
                >
                  <img src={Pencil} alt="Edit" className="cms-action-icon" />
                </button>
                <button
                  className="cms-action-button banner-delete-button"
                  onClick={() => handleDeleteClick(index)}
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
            <h2 className="cms-modal-title">
              {isEditing ? "Edit Service Details" : "Add New Service Details"}
            </h2>
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
                />
              </label>
              <label>
                Heading:
                <input
                  type="text"
                  name="heading"
                  className="cms-input"
                  value={formData.heading}
                  onChange={handleFormChange}
                />
              </label>
              <label>
                Description:
                <textarea
                  name="description"
                  className="cms-input"
                  value={formData.description}
                  onChange={handleFormChange}
                />
              </label>
              <label>
                Bullets (each on a new line):
                <textarea
                  name="bullets"
                  className="cms-input"
                  value={formData.bullets}
                  onChange={handleFormChange}
                  placeholder="Enter each bullet point on a new line"
                />
              </label>
              <label>
                Images (Max 2):
                <input
                  type="file"
                  name="images"
                  accept="image/*"
                  multiple
                  className="cms-input"
                  onChange={handleFormChange}
                />
              </label>
              <div className="image-preview-container">
                {formData.imagePreviews.map((preview, i) => (
                  <img
                    key={i}
                    src={preview}
                    alt={`Preview ${i + 1}`}
                    className="cms-bannerimg-preview"
                  />
                ))}
              </div>

              <button type="submit" className="cms-upload-button">
                {isEditing ? "Update Service" : "Add Service"}
              </button>
              <button type="button" className="cms-close-button" onClick={handleCloseModal}>
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
              <button className="cms-yes-button" onClick={handleConfirmModalSubmit}>
                Yes
              </button>
              <button className="cms-no-button" onClick={handleCloseModal}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CMSServicesMaintainance