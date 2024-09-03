import { useState, useEffect } from "react";
import "../styles.css"; // Import your CSS file
import Pencil from "../assets/img/pencil.png";
import Dustbin from "../assets/img/dustbin.png";

function CMSBanner() {
  const [banners, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: null, // Track the id of the banner being edited
    position: "",
    altText: "",
    link: "",
    mode: "Mobile",
    imageFile: null,
    imagePreview: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch(
          "https://1a2fagymd7.execute-api.ap-south-1.amazonaws.com/v2/fetchBannerImageDetails"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setBanners(data.sort((a, b) => a.position_index - b.position_index));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching banner data:", error);
        setError("Failed to load banner data. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchBanners();
  }, []);

  const handleAddNewClick = () => {
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      id: null,
      position: "",
      altText: "",
      link: "",
      mode: "Mobile",
      imageFile: null,
      imagePreview: "",
    });
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageFile") {
      const file = files[0];
      setFormData((prevState) => ({
        ...prevState,
        imageFile: file,
        imagePreview: URL.createObjectURL(file),
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // UPDATED handleFormSubmit FUNCTION
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Confirmation dialog before proceeding
    const confirmSubmit = window.confirm("Are you sure you want to save the following changes?");
    if (!confirmSubmit) {
      return; // If the user clicks "No", cancel the submission
    }

    if (isEditing) {
      // Handle banner update
      const updatedBanners = banners.map((banner) =>
        banner.id === formData.id
          ? { ...banner, position_index: formData.position, alt: formData.altText }
          : banner
      );
      setBanners(updatedBanners.sort((a, b) => a.position_index - b.position_index));
    } else {
      // Handle new banner creation
      console.log(formData);
    }

    handleCloseModal(); // Close modal after submission
  };

  const handleEditClick = (banner) => {
    setIsEditing(true);
    setFormData({
      id: banner.id,
      position: banner.position_index,
      altText: banner.alt,
      link: banner.link,
      mode: banner.mode,
      imageFile: null,
      imagePreview: banner.image_url,
    });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (bannerId) => {
    // Implement deletion logic here
    const updatedBanners = banners.filter((banner) => banner.id !== bannerId);
    setBanners(updatedBanners);
  };

  if (isLoading) {
    return <div className="cms-banner-loading">Loading...</div>;
  }

  if (error) {
    return <div className="cms-banner-error">{error}</div>;
  }

  return (
    <div className="cms-banner-container">
      <div className="cms-banner-header">
        <h1 className="cms-banner-title">Banner Gallery</h1>
        <button className="cms-add-button" onClick={handleAddNewClick}>
          Add New
        </button>
      </div>
      <div className="cms-banner-gallery">
        {banners.map((banner) => (
          <div key={banner.id} className="cms-banner-box">
            <img
              src={banner.image_url}
              alt={banner.alt}
              className="cms-banner-preview"
            />
            <div className="cms-banner-details">
              <p className="cms-banner-index">
                Position: {banner.position_index}
              </p>
              <p className="cms-banner-alt">Alt: {banner.alt}</p>
              <p className="cms-banner-link">Link: {banner.link}</p>
              <p className="cms-banner-mode">Mode: {banner.mode}</p>
              <div className="cms-banner-actions">
                <button
                  className="cms-action-button banner-edit-button"
                  onClick={() => handleEditClick(banner)}
                >
                  <img
                    src={Pencil}
                    alt="Edit"
                    className="cms-action-icon"
                  />
                </button>
                <button
                  className="cms-action-button banner-delete-button"
                  onClick={() => handleDeleteClick(banner.id)}
                >
                  <img
                    src={Dustbin}
                    alt="Delete"
                    className="cms-action-icon"
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="cms-modal-overlay">
          <div className="cms-modal-content">
            <h2>{isEditing ? "Edit Banner Details" : "Upload New Banner Details"}</h2>
            <form onSubmit={handleFormSubmit}>
              <label>
                POSITION:
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleFormChange}
                  className="cms-input"
                  required
                />
              </label>
              <label>
                ALT TEXT:
                <input
                  type="text"
                  name="altText"
                  value={formData.altText}
                  onChange={handleFormChange}
                  className="cms-input"
                  required
                />
              </label>
              <label>
                LINK:
                <select
                  name="link"
                  value={formData.link}
                  onChange={handleFormChange}
                  className="cms-input"
                  disabled={isEditing}
                >
                  <option value="home">Home</option>
                  <option value="about">About</option>
                  <option value="services">Services</option>
                  <option value="contact">Contact</option>
                </select>
              </label>
              <label>
                MODE:
                <select
                  name="mode"
                  value={formData.mode}
                  onChange={handleFormChange}
                  className="cms-input"
                  disabled={isEditing}
                >
                  <option value="Mobile">Mobile</option>
                  <option value="Desktop">Desktop</option>
                </select>
              </label>
              <label>
                Upload Image:
                <input
                  type="file"
                  name="imageFile"
                  accept="image/*"
                  onChange={handleFormChange}
                  className="cms-input"
                />
              </label>
              {formData.imagePreview && (
                <img
                  src={formData.imagePreview}
                  alt="Preview"
                  className="cms-bannerimg-preview"
                />
              )}
              <button type="submit" className="cms-upload-button">
                {isEditing ? "Update Banner" : "Upload New Banner"}
              </button>
              <button
                type="button"
                className="cms-close-button"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CMSBanner;
