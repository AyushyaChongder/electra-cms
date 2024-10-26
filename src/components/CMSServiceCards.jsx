import React, { useState, useEffect } from "react";
import "../styles.css"; // Import your CSS file
import Pencil from "../assets/img/pencil.png";
import Dustbin from "../assets/img/dustbin.png";

const CMSServiceCards = () => {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    position: "",
    altText: "",
    imagePreview: "",
    route: "",
    imageFile: null,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  // Route options
  const routeOptions = {
    "Design Consulting Service": "/design-consulting-service",
    "Installation and Commissioning": "/installation-commissioning-service",
    "Panel Board & Control Systems": "/panel-board-control-service",
    "Approvals & Compliance": "/approval-compliance-service",
    "Maintenance & Repair": "/maintenance-repair-service",
    "Value-Added Service": "/value-added-service",
  };

  // Function to generate a 24-character alphanumeric ID
  const generateRandomId = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const fetchServiceCards = async () => {
    try {
      const response = await fetch(
        "https://4xdfart5e0.execute-api.ap-south-1.amazonaws.com/v1/getServiceCarouselDetailsDynamoDB"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setCards(data.sort((a, b) => a.position_index - b.position_index));
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching service cards data:", error);
      setError("Failed to load service data. Please try again later.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServiceCards();
  }, []);

  const handleAddNewClick = () => {
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      id:null,
      position: "",
      altText: "",
      imageFile: null,
      route: "",
      imagePreview: "",
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

  const handleFormSubmit = async () => {
    try{
      let imageURL = "";
      const positionIndex = parseInt(formData.position, 10); // Convert position to integer

      if (formData.imageFile) {
        const reader = new FileReader();
        reader.readAsDataURL(formData.imageFile);
    
        reader.onloadend = async () => {
          const base64Image = reader.result.split(",")[1];

          try {
            const uploadImageResponse = await fetch("https://p6pozznjci.execute-api.ap-south-1.amazonaws.com/v2/createServiceImageS3", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                file_name: formData.imageFile.name,
                file_data: base64Image,
              }),
            });

            if (!uploadImageResponse.ok) {
              throw new Error(`Image upload failed with status ${uploadImageResponse.status}`);
            }
    
            const uploadImageData = await uploadImageResponse.json();
            imageURL = uploadImageData.object_url;

            const cardData={
              id: formData.id || generateRandomId(24), // Use existing ID if editing, otherwise generate a new one
              alt: formData.altText,
              image_url: imageURL,
              link: formData.route,
              position_index:positionIndex, 
            };

            const method = isEditing ? "PUT" : "POST"; // Use PUT for update, POST for create

            const apiEndpoint = isEditing
              ? "https://whsadmvw6j.execute-api.ap-south-1.amazonaws.com/v1/updateServiceCarouselCard"
              : "https://qt1cim2kz0.execute-api.ap-south-1.amazonaws.com/v1/createServiceImageDetailsDynamoDB";

              await fetch(apiEndpoint, {
                method: method,
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(cardData),
              });

              // Clear error state on success
            setError(null);

            await fetchServiceCards(); // Refresh the banners list
            handleCloseModal(); // Close the modal
          }
          catch(error){
            console.error("Error uploading image or service card data:", error);
            setError("Failed to upload image or service card data. Please try again.");
          }
        };

        reader.onerror = () => {
          setError("Failed to read the image file. Please try again.");
        };
    }
    else{
      const cardData={
        id: formData.id || generateRandomId(24), // Use existing ID if editing, otherwise generate a new one
        alt: formData.altText,
        image_url: formData.imagePreview,
        link: formData.route,
        position_index:positionIndex, 
      };

      try {
        const method = isEditing ? "PUT" : "POST"; // Use PUT for update, POST for create
  
        const apiEndpoint = isEditing
        ? "https://whsadmvw6j.execute-api.ap-south-1.amazonaws.com/v1/updateServiceCarouselCard"
        : "https://qt1cim2kz0.execute-api.ap-south-1.amazonaws.com/v1/createServiceImageDetailsDynamoDB";
  
        await fetch(apiEndpoint, {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cardData),
        });
  
        // Clear error state on success
        setError(null);
  
        await fetchServiceCards(); // Refresh the banners list
        handleCloseModal(); // Close the modal
      } catch (error) {
        console.error("Error uploading service card data:", error);
        setError("Failed to upload service card data. Please try again.");
      }
    }
  }
    catch (error) {
        console.error("Error processing form submission:", error);
        setError("Failed to process form submission. Please try again.");
    }
  };


  const handleEditClick = (card) => {
    setIsEditing(true);
    setFormData({
      id: card.id,
      position: card.position_index,
      altText: card.alt,
      route: card.link,
      imageFile: null,
      imagePreview: card.image_url,
    });
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (cardId) => {
    // Ask for confirmation before proceeding with deletion
    const confirmDelete = window.confirm("Are you sure you want to delete this service card?");
    if (!confirmDelete) return;
  
    try {
      // Call the delete API
      const response = await fetch("https://mroed1ob91.execute-api.ap-south-1.amazonaws.com/v1/deleteServiceCardDynamoDB", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: cardId,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Delete failed with status ${response.status}`);
      }
  
      const data = await response.json();
      if (data.status_code === 200) {
        // Remove the deleted banner from the state
        const updatedServiceCards = cards.filter((card) => card.id !== cardId);
        setCards(updatedServiceCards);
        setError(null); // Clear any previous errors
      } else {
        throw new Error("Failed to delete service card");
      }
    } catch (error) {
      console.error("Error deleting service card:", error);
      setError("Failed to delete service card. Please try again.");
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
        <h1 className="cms-banner-title">CMS Service Cards</h1>
        <button className="cms-add-button" onClick={handleAddNewClick}>
          Add Card
        </button>
      </div>
      <div>
        <h5 className="cms-banner-title">Image File Type: .webp</h5>
      </div>

      <div className="cms-container">
        {cards.map((card) => (
          <div key={card.id} className="cms-box">
            <img
              src={card.image_url}
              alt={card.alt}
              className="cms-banner-preview"
            />
            <div className="cms-box-content">
              <p className="cms-box-description">{card.alt}</p>
              <p className="cms-box-route">Route: {card.link}</p>
              <p className="cms-box-position">
                Position: {card.position_index}
              </p>
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
              {isEditing ? "Edit Card Details" : "Add New Card Details"}
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
                Alt Text
                <input
                  type="text"
                  name="altText"
                  className="cms-input"
                  value={formData.altText}
                  onChange={handleFormChange}
                />
              </label>
              <label>
                Image:
                <input
                  type="file"
                  name="imageFile"
                  accept="image/*"
                  className="cms-input"
                  onChange={handleFormChange}
                />
              </label>
              {formData.imagePreview && (
                  <img src={formData.imagePreview} alt="Preview" className="cms-bannerimg-preview" />
              )}
              <label>
                Route:
                <select
                  name="route"
                  className="cms-input"
                  value={formData.route}
                  onChange={handleFormChange}
                >
                  {Object.keys(routeOptions).map((option) => (
                    <option key={routeOptions[option]} value={routeOptions[option]}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <button type="submit" className="cms-upload-button">
                {isEditing ? "Update Card" : "Add Card"}
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

export default CMSServiceCards;
