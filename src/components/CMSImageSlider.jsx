import React, { useState } from 'react';
import "../styles.css"; // Import your CSS file
import Pencil from "../assets/img/pencil.png";
import Dustbin from "../assets/img/dustbin.png";

import designImage from '../assets/img/service1_webimage.webp';
import installationImage from '../assets/img/service2_webimage.webp';
import panelImage from '../assets/img/service3_webimage.webp';
import auditImage from '../assets/img/service4_webimage.webp';
import testingImage from '../assets/img/service5_webimage.webp';
import maintenanceImage from '../assets/img/service6_webimage.webp';

const initialCards = [
  { id: 1, title: 'Design & Consulting', image: designImage, description: 'More About', route: '/designconsultingservice', position: 1 },
  { id: 2, title: 'Installation And Commissioning', image: installationImage, description: 'More About', route: '/installationcommisioningservice', position: 2 },
  { id: 3, title: 'Panel Board And Control Systems', image: panelImage, description: 'More About', route: '/panelboardcontrolservice', position: 3 },
  { id: 4, title: 'Statuory Approval and Compliance', image: auditImage, description: 'More About', route: '/approvalcomplianceservice', position: 4 },
  { id: 5, title: 'Maintenance and Repair', image: testingImage, description: 'More About', route: '/maintenacerepairservice', position: 5 },
  { id: 6, title: 'Value-Added Services', image: maintenanceImage, description: 'More About', route: '/valueaddedservice', position: 6 },
];

const CMSImageSlider = () => {
  const [cards, setCards] = useState(initialCards);
  const [isEditing, setIsEditing] = useState(null);
  const [formData, setFormData] = useState({ title: '', image: '', description: '', route: '', position: '' });
  const [showModal, setShowModal] = useState(false);

  const handleEdit = (id) => {
    const card = cards.find((card) => card.id === id);
    setFormData({ ...card });
    setIsEditing(id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  const handleSave = () => {
    if (isEditing) {
      setCards(
        cards.map((card) =>
          card.id === isEditing
            ? { ...card, ...formData }
            : card
        )
      );
    } else {
      const newPosition = cards.length > 0 ? Math.max(...cards.map(c => c.position)) + 1 : 1;
      setCards([...cards, { ...formData, id: cards.length + 1, position: newPosition }]);
    }
    setFormData({ title: '', image: '', description: '', route: '', position: '' });
    setIsEditing(null);
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevState) => ({
        ...prevState,
        image: URL.createObjectURL(file),
      }));
    }
  };

  return (
    <div className="cms-home">
      <div className="cms-header">
      <h1 className="cms-banner-title">CMS Image Slider</h1>
      <button className="cms-add-button" onClick={() => { setFormData({ title: '', image: '', description: '', route: '', position: '' }); setIsEditing(null); setShowModal(true); }}>
            Add Card
          </button>
      </div>
      
      <div className="cms-container">
        {cards
          .sort((a, b) => a.position - b.position) // Sort by position
          .map((card) => (
            <div key={card.id} className="cms-box">
              <img src={card.image} alt={card.title} className="cms-banner-preview" />
              <div className="cms-box-content">
                <h2 className="cms-box-title">{card.title}</h2>
                <p className="cms-box-description">{card.description}</p>
                <p className="cms-box-route">Route: {card.route}</p>
                <p className="cms-box-position">Position: {card.position}</p>
                <div className="cms-box-actions">
                  <button className="cms-action-button banner-edit-button" onClick={() => handleEdit(card.id)}>
                    <img src={Pencil} alt="Edit" className="cms-action-icon" />
                  </button>
                  <button className="cms-action-button banner-delete-button" onClick={() => handleDelete(card.id)}>
                    <img src={Dustbin} alt="Delete" className="cms-action-icon" />
                  </button>
                </div>
              </div>
            </div>
          ))}
      
      </div>
      {showModal && (
        <div className="cms-modal-overlay">
          <div className="cms-modal-content">
            <h2>{isEditing ? 'Edit Card Details' : 'Add New Card'}</h2>
            {isEditing && <p className="cms-modal-id"></p>}
            <label className="cms-label">Position</label>
            <input
              className="cms-input"
              type="number"
              name="position"
              placeholder="Position"
              value={formData.position}
              onChange={handleChange}
            />
            <label className="cms-label">Title</label>
            <input
              className="cms-input"
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
            />
            <label className="cms-label">Image</label>
            <input
              className="cms-input"
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
            />
            {formData.image && <img src={formData.image} alt="Preview" className="cms-image-preview-form" />}
            <label className="cms-label">Description</label>
            <input
              className="cms-input"
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
            />
            <label className="cms-label">Route</label>
            <input
              className="cms-input"
              type="text"
              name="route"
              placeholder="Route"
              value={formData.route}
              onChange={handleChange}
            />
          
            <button className="cms-upload-button" onClick={handleSave}>
              {isEditing ? 'Update Card' : 'Add Card'}
            </button>
            <button className="cms-close-button" onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CMSImageSlider;
