import React, { useState, useEffect } from 'react';
import '../styles.css'; // Import your CSS file
import Pencil from '../assets/img/pencil.png';
import Dustbin from '../assets/img/dustbin.png';

// Import images directly
import image1 from '../assets/img/expertise_webimage.webp';
import image2 from '../assets/img/agility_webimage.webp';
import image3 from '../assets/img/integrity_webimage.webp';
import image4 from '../assets/img/innovation_webimage.webp';
import image5 from '../assets/img/clientcentric_webimage.webp';
import image6 from '../assets/img/collaboration_webimage.webp';

const CMSAboutUsIntegrityCarousel = () => {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    title: '',
    description: '',
    image: null,     // Store the image file
    imagePreview: '', // Store the image preview URL
    alt: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  // Slides data
  const slides = [
    { title: 'Expertise Section', image: image1, description: 'Benefit from our team\'s extensive knowledge and skills in electrical engineering, ensuring proficient and reliable solutions.', alt: 'Skilled Electrapower Engineering technician at work, demonstrating expertise, reflecting company values.' },
    { title: 'Agility', image: image2, description: 'Experience our quick and flexible response to your needs, adapting swiftly to changing project requirements and timelines.', alt: 'Team collaboration around a table, adapting to project needs, showcasing Electrapower Engineering’s Agility.' },
    { title: 'Integrity', image: image3, description: 'Trust in our commitment to honesty, transparency, and ethical conduct in all aspects of our work, fostering long-term partnerships based on integrity.', alt: 'Diverse team in open discussion with clients, reflecting Electrapower Engineering’s core value of Integrity.' },
    { title: 'Innovation', image: image4, description: 'Access cutting-edge solutions and technologies as we continuously explore new ideas and approaches to enhance efficiency and effectiveness.', alt: 'Engineer working on intricate machinery, symbolizing Electrapower Engineering’s commitment to Innovation.' },
    { title: 'Client centric', image: image5, description: 'Enjoy personalized attention and tailored solutions that prioritize your unique requirements, ensuring your satisfaction and success.', alt: 'Electrapower Engineering team celebrating with happy clients, showcasing their Client Centric approach.' },
    { title: 'Collaboration', image: image6, description: 'We believe in teamwork and foster a collaborative environment where everyone\'s ideas are valued.', alt: 'Electrapower Engineering team and clients collaborating closely, highlighting the company\'s core value of Collaboration.' },
  ];

  useEffect(() => {
    setCards(slides);
    setIsLoading(false);
  }, []);

  const handleAddNewClick = () => {
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      id: null,
      title: '',
      description: '',
      image: null,
      imagePreview: '', // Reset the image preview
      alt: '',
    });
  };

  const handleConfirmModalClose = () => {
    setIsConfirmModalOpen(false);
  };

  const handleConfirmModalSubmit = async () => {
    setIsConfirmModalOpen(false);
    await handleFormSubmit(); // Proceed with form submission
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      const previewUrl = URL.createObjectURL(file); // Create the image preview URL
      setFormData((prevState) => ({
        ...prevState,
        image: file,      // Store the image file
        imagePreview: previewUrl, // Store the preview URL
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleFormSubmit = async () => {
    // Logic for handling form submission goes here
    // Similar to CMSServiceCards, handle API calls, editing, etc.
  };

  const handleEditClick = (card) => {
    setIsEditing(true);
    setFormData({
      id: card.id,
      title: card.title,
      description: card.description,
      image: null,          // Image editing logic could be handled separately
      imagePreview: card.image, // Display the existing image preview
      alt: card.alt,
    });
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (cardId) => {
    // Logic for handling deletion
    // Similar to CMSServiceCards, handle API calls for deletion
  };

  if (isLoading) {
    return <div className="loader">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="cms-home">
      <div className="cms-banner-header">
        <h1 className="cms-banner-title">About Us Integrity Carousel</h1>
        <button className="cms-add-button" onClick={handleAddNewClick}>
          Add Slide
        </button>
      </div>

      <div className="cms-container">
        {cards.map((card) => (
          <div key={card.title} className="cms-box">
            <img src={card.image} alt={card.alt} className="cms-banner-preview" />
            <div className="cms-box-content">
              <p className="cms-box-description">{card.description}</p>
              <div className="cms-box-actions">
                <button
                  className="cms-action-button banner-edit-button"
                  onClick={() => handleEditClick(card)}
                >
                  <img src={Pencil} alt="Edit" className="cms-action-icon" />
                </button>
                <button
                  className="cms-action-button banner-delete-button"
                  onClick={() => handleDeleteClick(card.id)}
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
              {isEditing ? 'Edit Slide Details' : 'Add New Slide Details'}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsConfirmModalOpen(true);
              }}
            >
              <label>
                Title:
                <input
                  type="text"
                  name="title"
                  className="cms-input"
                  value={formData.title}
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
                Image:
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  className="cms-input"
                  onChange={handleFormChange}
                />
              </label>
              {formData.imagePreview && (
                <img src={formData.imagePreview} alt="Preview" className="cms-bannerimg-preview" />
              )}

              <button type="submit" className="cms-upload-button">
                {isEditing ? 'Update Slide' : 'Add Slide'}
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
              <button className="cms-no-button" onClick={handleConfirmModalClose}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CMSAboutUsIntegrityCarousel;
