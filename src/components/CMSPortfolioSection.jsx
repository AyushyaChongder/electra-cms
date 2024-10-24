import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles.css"; // Import your CSS file
import Pencil from "../assets/img/pencil.png";
import Dustbin from "../assets/img/dustbin.png";

const CMSPortfolioSection = () => {
  const [cardsData, setCardsData] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [formData, setFormData] = useState({
    image: "",
    description: "",
    route: "",
  });
  const [showModal, setShowModal] = useState(false);

  // Fetch portfolio projects from the API
  const fetchAllPortfolioProjects = async () => {
    try {
      const response = await axios.get(
        "https://syyfm3xz1k.execute-api.ap-south-1.amazonaws.com/v1/getPortfolioProject"
      );
      if (response.data.status_code === 200) {
        const sortedProjects = response.data.data.sort(
          (a, b) => a.project_position - b.project_position
        );
        setCardsData(sortedProjects);
      } else {
        console.error("Failed to fetch projects:", response.data);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchAllPortfolioProjects();
  }, []);

  const handleEdit = (id) => {
    const card = cardsData.find((card) => card.project_id === id);
    if (card) {
      setFormData({
        image: card.images[0]?.url || "",
        description: card.description_one,
        route: card.project_id,
      });
      setIsEditing(id);
      setShowModal(true);
    }
  };

  const handleDelete = (id) => {
    setCardsData(cardsData.filter((card) => card.project_id !== id));
  };

  const handleSave = () => {
    if (isEditing) {
      setCardsData(
        cardsData.map((card) =>
          card.project_id === isEditing ? { ...card, ...formData } : card
        )
      );
    } else {
      const newId =
        cardsData.length > 0
          ? Math.max(...cardsData.map((c) => c.project_id)) + 1
          : 1;
      setCardsData([...cardsData, { ...formData, project_id: newId }]);
    }
    setFormData({ image: "", description: "", route: "" });
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
      <div className="cms-banner-header">
        <h1 className="cms-banner-title">CMS Portfolio Section</h1>
        <button
          className="cms-add-button "
          onClick={() => {
            setFormData({ image: "", description: "", route: "" });
            setIsEditing(null);
            setShowModal(true);
          }}
        >
          Add Card
        </button>
      </div>
      <div className="cms-container">
        {cardsData.map((card) => (
          <div key={card.project_id} className="cms-box">
            <img
              src={card.images[1]?.url || card.images[0]?.url}
              alt={card.title}
              className="cms-banner-preview"
            />
            <div className="cms-box-content">
              <h3 className="cms-banner-alt">{card.title}</h3>
              <div className="cms-box-actions">
                <button
                  className="cms-action-button banner-edit-button"
                  onClick={() => handleEdit(card.project_id)}
                >
                  <img src={Pencil} alt="Edit" className="cms-action-icon" />
                </button>
                <button
                  className="cms-action-button banner-delete-button"
                  onClick={() => handleDelete(card.project_id)}
                >
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
            <h2>{isEditing ? "Edit Card Details" : "Add New Card"}</h2>
            {isEditing && <p className="cms-modal-id">ID: {isEditing}</p>}
            <label className="cms-label">Image</label>
            <input
              className="cms-input"
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
            />
            {formData.image && (
              <img
                src={formData.image}
                alt="Preview"
                className="cms-image-preview-form"
              />
            )}
              <label>
                Alt Text:
                <input
                  type="text"
                  name="title"
                  className="cms-input"
                  onChange={handleChange}
                />
              </label>
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
              {isEditing ? "Update Card" : "Add Card"}
            </button>
            <button
              className="cms-close-button"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CMSPortfolioSection;
