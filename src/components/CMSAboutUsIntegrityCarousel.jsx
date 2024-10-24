import React, { useState, useEffect } from "react";
import "../styles.css"; // Import your CSS file
import Pencil from "../assets/img/pencil.png";
import Dustbin from "../assets/img/dustbin.png";

const CMSAboutUsIntegrityCarousel = () => {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    description: "",
    url: null,
    imagePreview: "",
    position: 0, // New field for position
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  // Function to generate a 24-character alphanumeric ID
  const generateRandomId = (length) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  const fetchSlidesData = async () => {
    try {
      const response = await fetch(
        "https://j00adwkd1b.execute-api.ap-south-1.amazonaws.com/v1/getAboutUsCarousel"
      );
      const result = await response.json();

      if (result.status_code === 200) {
        // Map the fetched data to match your existing structure
        const formattedCards = result.data.map((item) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          url: item.url,
          position: item.position || 0, // Assuming the API returns position
        }));

        setCards(formattedCards.sort((a, b) => a.position - b.position));
      } else {
        setError("Failed to fetch slides data.");
      }
    } catch (err) {
      setError("An error occurred while fetching data.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch slides data from API
  useEffect(() => {
    fetchSlidesData();
  }, []);

  const handleAddNewClick = () => {
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      id: null,
      title: "",
      description: "",
      url: null,
      imagePreview: "",
      position: null,
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
    if (name === "url") {
      const file = files[0];
      const previewUrl = URL.createObjectURL(file); // Create the image preview URL
      setFormData((prevState) => ({
        ...prevState,
        url: file, // Store the image file
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
    try {
      let imageURL = "";
      const positionIndex = parseInt(formData.position, 10); // Convert position to integer

      if (formData.url) {
        const reader = new FileReader();
        reader.readAsDataURL(formData.url);

        reader.onloadend = async () => {
          const base64Image = reader.result.split(",")[1];

          try {
            const uploadImageResponse = await fetch(
              "https://3diye7ozeb.execute-api.ap-south-1.amazonaws.com/v1/uploadAboutUsCarouselImage",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  file_name: formData.url.name,
                  file_data: base64Image,
                }),
              }
            );

            if (!uploadImageResponse.ok) {
              throw new Error(
                `Image upload failed with status ${uploadImageResponse.status}`
              );
            }

            const uploadImageData = await uploadImageResponse.json();
            imageURL = uploadImageData.object_url;

            const cardData = {
              id: formData.id || generateRandomId(24),
              title: formData.title,
              description: formData.description,
              url: imageURL || formData.imagePreview,
              position: positionIndex,
            };

            const method = isEditing ? "PUT" : "POST"; // Use PUT for update, POST for create

            const apiEndpoint = isEditing
              ? "https://wa6kvv1c2a.execute-api.ap-south-1.amazonaws.com/v1/updateAboutUsCarousel"
              : "https://do90bgkgc8.execute-api.ap-south-1.amazonaws.com/v1/createAboutUsCarouselCard";

            await fetch(apiEndpoint, {
              method: method,
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(cardData),
            });

            // Clear error state on success
            setError(null);

            await fetchSlidesData(); // Refresh the banners list
            handleCloseModal(); // Close the modal
          } catch (error) {
            console.error("Error uploading image or slide card data:", error);
            setError(
              "Failed to upload image or slide card data. Please try again."
            );
          }
        };

        reader.onerror = () => {
          setError("Failed to read the image file. Please try again.");
        };
      } else {
        const cardData = {
          id: formData.id || generateRandomId(24),
          title: formData.title,
          description: formData.description,
          url: formData.imagePreview,
          position: positionIndex,
        };

        try {
          const method = isEditing ? "PUT" : "POST"; // Use PUT for update, POST for create

          const apiEndpoint = isEditing
            ? "https://wa6kvv1c2a.execute-api.ap-south-1.amazonaws.com/v1/updateAboutUsCarousel"
            : "https://do90bgkgc8.execute-api.ap-south-1.amazonaws.com/v1/createAboutUsCarouselCard";

          await fetch(apiEndpoint, {
            method: method,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(cardData),
          });

          // Clear error state on success
          setError(null);

          await fetchSlidesData(); // Refresh the banners list
          handleCloseModal(); // Close the modal
        } catch (error) {
          console.error("Error uploading slide card data:", error);
          setError("Failed to upload slide card data. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error processing form submission:", error);
      setError("Failed to process form submission. Please try again.");
    }
  };

  const handleEditClick = (card) => {
    setIsEditing(true);
    setFormData({
      id: card.id,
      title: card.title,
      description: card.description,
      url: null,
      imagePreview: card.url,
      position: card.position, // Set the existing position
    });
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (cardId) => {
    // Ask for confirmation before proceeding with deletion
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this slide card?"
    );
    if (!confirmDelete) return;

    try {
      // Call the delete API
      const response = await fetch(
        "https://1njnsiuhch.execute-api.ap-south-1.amazonaws.com/v1/deleteAboutUsCarousel",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: cardId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Delete failed with status ${response.status}`);
      }

      const data = await response.json();
      if (data.status_code === 200) {
        // Remove the deleted banner from the state
        const updatedSlideCards = cards.filter((card) => card.id !== cardId);
        setCards(updatedSlideCards);
        setError(null); // Clear any previous errors
      } else {
        throw new Error("Failed to delete slide card");
      }
    } catch (error) {
      console.error("Error deleting slide card:", error);
      setError("Failed to delete slide card. Please try again.");
    }
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
          <div key={card.id} className="cms-box">
            <img
              src={card.url}
              alt={card.title}
              className="cms-banner-preview"
            />
            <div className="cms-box-content">
              <p className="cms-box-description">{card.title}</p>

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
              {isEditing ? "Edit Slide Details" : "Add New Slide Details"}
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
                  min="0"
                  value={formData.position}
                  onChange={handleFormChange}
                />
              </label>
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
                  name="url"
                  accept="image/*"
                  className="cms-input"
                  onChange={handleFormChange}
                />
              </label>
              {formData.imagePreview && (
                <img
                  src={formData.imagePreview}
                  alt="Preview"
                  className="cms-bannerimg-preview"
                />
              )}
              <label>
                Alt Text:
                <input
                  type="text"
                  name="title"
                  className="cms-input"
                  onChange={handleFormChange}
                />
              </label>

              <button type="submit" className="cms-upload-button">
                {isEditing ? "Update Slide" : "Add Slide"}
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
              <button
                className="cms-yes-button"
                onClick={handleConfirmModalSubmit}
              >
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

export default CMSAboutUsIntegrityCarousel;
