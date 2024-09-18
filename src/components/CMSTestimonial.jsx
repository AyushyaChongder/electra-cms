import React, { useState } from 'react';
import '../styles.css'; // Import your CSS file
import Pencil from '../assets/img/pencil.png';
import Dustbin from '../assets/img/dustbin.png';

// Import all testimonial images
import mrShaji from '../assets/img/home_testimonial_profile_pic_1.png';
import mrReji from '../assets/img/home_testimonial_profile_pic_2.png';
import mrYaseem from '../assets/img/home_testimonial_profile_pic_3.png';

// Initial testimonial data with IDs
const initialTestimonials = [
  {
    id: 1,
    name: "Mr. Shaji",
    position: "Project Manager, Luxon Motos Pvt. Ltd.",
    image: mrShaji,
    text: "\"Electra Power Engineering's team displayed remarkable professionalism, technical expertise, and a deep understanding of our vision for the EV showroom. Their commitment to delivering a world-class electrical solution within an ambitious timeline was truly impressive. We are extremely satisfied with their work and highly recommend their services.\""
  },
  {
    id: 2,
    name: "Mr. Reji",
    position: "VP Operations, Incheon Motors Pvt. Ltd",
    image: mrReji,
    text: "\"Electra Power Engineering's team surpassed our expectations in every aspect of this project. Their expertise, dedication to quality, and ability to meet challenging timelines were truly remarkable. The charging station they installed has become a major attraction for our customers, and we are confident that it will play a key role in driving EV adoption in Kerala.\""
  },
  {
    id: 3,
    name: "Mr. Yaseen",
    position: "GM, HHYS Inframart.",
    image: mrYaseem,
    text: "\"Electra Power Engineering proved to be a reliable and efficient partner throughout the entire project. Their expertise in electrical engineering, coupled with their commitment to quality and timely delivery, exceeded our expectations. We are highly satisfied with the results and confident that our upgraded electrical infrastructure will support our growth for years to come.\""
  }
];

const CMSTestimonial = () => {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleAddNewClick = () => {
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmModalSubmit = async () => {
    setIsConfirmModalOpen(false);
    // Add logic to handle form submission here
  };

  const handleConfirmModalClose = () => {
    setIsConfirmModalOpen(false);
  };

  return (
    <div className="cms-home">
      <div className="cms-banner-header">
        <h2 className="cms-banner-title">Testimonials Section</h2>
        <button className="cms-add-button" onClick={handleAddNewClick}>
          Add Testimonial
        </button>
      </div>

      {/* Testimonial cards */}
      <div className="cms-container">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="cms-box">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="cms-testimonial-preview"
            />
            <div className="cms-box-content">
              <p className="cms-box-description"><strong>{testimonial.name}</strong>, {testimonial.position}</p>
              <p className="cms-box-text">{testimonial.text}</p>
              <div className="cms-box-actions">
                <button
                  className="cms-action-button banner-edit-button"
                  onClick={() => {
                    setIsEditing(true);
                    setIsModalOpen(true);
                  }}
                >
                  <img src={Pencil} alt="Edit" className="cms-action-icon" />
                </button>
                <button
                  className="cms-action-button banner-delete-button"
                  onClick={() => setIsConfirmModalOpen(true)}
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
              {isEditing ? "Edit Testimonial Details" : "Add New Testimonial"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsConfirmModalOpen(true);
              }}
            >
              <label>
                Name
                <input
                  type="text"
                  name="name"
                  className="cms-input"
                  // Add value and onChange handler if needed
                />
              </label>
              <label>
                Position
                <input
                  type="text"
                  name="position"
                  className="cms-input"
                  // Add value and onChange handler if needed
                />
              </label>
              <label>
                Testimonial Text
                <textarea
                  name="text"
                  className="cms-input"
                  // Add value and onChange handler if needed
                />
              </label>
              <label>
                Profile Image:
                <input
                  type="file"
                  name="imageFile"
                  accept="image/*"
                  className="cms-input"
                  // Add value and onChange handler if needed
                />
              </label>
              
              {/* Add a preview image if needed */}
              <button type="submit" className="cms-upload-button">
                {isEditing ? "Update Testimonial" : "Add Testimonial"}
              </button>
              <button className="cms-close-button" onClick={handleCloseModal}>
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
};

export default CMSTestimonial;
