import React, { useState } from 'react';
import "../styles.css"; // Import your CSS file
import Pencil from "../assets/img/pencil.png";
import Dustbin from "../assets/img/dustbin.png";

import kiaShowroom from '../assets/img/kia1_webimage.webp';
import hardwareTrading from '../assets/img/hhys_webimage1.webp';
import luxuryLiving from '../assets/img/apartment_webimage2.webp';
import healthcareCenter from '../assets/img/hos1.png';
import transformingMobility from '../assets/img/ip5_webimage.webp';
import spicingProduction from "../assets/img/ip3_webimage.webp";
import preservingHeritage from "../assets/img/apartment_webimage2.webp";
import evTata from "../assets/img/tata1_webimage.webp";

const cards = [
  { id: 1, image: kiaShowroom, description: "Kerala's largest Kia showroom and workshop by Incheon Motors, featuring India's largest EV charging station." },
  { id: 2, image: hardwareTrading, description: "Revolutionising hardware trading with scalable electrical solutions for HHYS Inframart." },
  { id: 3, image: luxuryLiving, description: "Luxury living redefined through reliable electrical innovations with RDS Legacy Apartments." },
  { id: 4, image: healthcareCenter, description: "Empowering healthcare with cutting-edge electrical infrastructure for Kerala's First Nuclear Medicine Center." },
  { id: 5, image: transformingMobility, description: "Transforming mat manufacturing with advanced electrical upgrades for Travancore Cocotuft." },
  { id: 6, image: spicingProduction, description: "Spicing up production with enhanced electrical infrastructure for Eastern Condiments." },
  { id: 7, image: preservingHeritage, description: "Preserving heritage with electrifying solutions at Chungath Group's luxury resort, Napier Heritage." },
  { id: 8, image: evTata, description: "Driving Kerala forward with TATA Motors' first exclusive EV showroom with Luxon Motors Pvt Ltd." },
];

const CMSPortfolioSection = () => {
  const [cardsData, setCardsData] = useState(cards);
  const [isEditing, setIsEditing] = useState(null);
  const [formData, setFormData] = useState({ image: '', description: '', route: '' });
  const [showModal, setShowModal] = useState(false);

  const handleEdit = (id) => {
    const card = cardsData.find((card) => card.id === id);
    if (card) {
      setFormData({ image: card.image, description: card.description, route: card.route || '' });
      setIsEditing(id);
      setShowModal(true);
    }
  };

  const handleDelete = (id) => {
    setCardsData(cardsData.filter((card) => card.id !== id));
  };

  const handleSave = () => {
    if (isEditing) {
      setCardsData(cardsData.map((card) =>
        card.id === isEditing
          ? { ...card, ...formData }
          : card
      ));
    } else {
      const newId = cardsData.length > 0 ? Math.max(...cardsData.map(c => c.id)) + 1 : 1;
      setCardsData([...cardsData, { ...formData, id: newId }]);
    }
    setFormData({ image: '', description: '', route: '' });
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
        <h1 className="cms-banner-title">CMS Portfolio Section</h1>
        <button className="cms-add-button " onClick={() => { setFormData({ image: '', description: '', route: '' }); setIsEditing(null); setShowModal(true); }}>
          Add Card
        </button>
      </div>
      <div className="cms-container">
        {cardsData.map((card) => (
          <div key={card.id} className="cms-box">
            <img src={card.image} alt={card.description} className="cms-banner-preview" />
            <div className="cms-box-content">
              <p className="cms-box-description">{card.description}</p>
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
            {isEditing && <p className="cms-modal-id">ID: {isEditing}</p>}
            
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

export default CMSPortfolioSection;
