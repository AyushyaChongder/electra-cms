import React, { useState, useEffect } from "react";
import "../styles.css"; // Import your CSS file
import Pencil from "../assets/img/pencil.png";

function CMSAboutUsHeaderImage() {
  const [headerImage, setHeaderImage] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [formData, setFormData] = useState({
    imageFile: null,
    imageName: "", // Store the current image name
  });


  // Function to fetch header image from the API
  const fetchHeaderImage = async () => {
    try {
      const response = await fetch(
        "https://vkflopezmi.execute-api.ap-south-1.amazonaws.com/v1/getAboutUsHeaderImage"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status_code}`);
      }
      const data = await response.json();
      setHeaderImage([{ id: 1, image_url: data.message[0] }]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching header image:", error);
      setError("Failed to load header image. Please try again later.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHeaderImage(); // Call the function to fetch the image when the component mounts
  }, []);

  const handleEditClick = (image) => {
    // Set the image preview and current image name in form data
    const imageName = image.image_url.split("/").pop(); // Extract image name from URL
    setFormData({ imageFile: null, imageName });
    setImagePreview(image.image_url);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ imageFile: null, imageName: "" });
    setImagePreview("");
  };

  const handleConfirmModalClose = () => {
    setIsConfirmModalOpen(false);
  }

  const handleConfirmModalSubmit = async () => {
    setIsConfirmModalOpen(false);
    await handleFormSubmit(); // Proceed with form submission
  };

  const handleFormChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setFormData({ ...formData, imageFile: file });
    }
  };

  // Convert image file to base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]); // Removes the prefix from base64
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle the form submission to update the header image
  const handleFormSubmit = async () => {
    if (!formData.imageFile && !formData.imageName) {
      alert("Please select an image.");
      return;
    }

    try {
      let base64Image = "";
      let imageName = formData.imageName; // Use the original image name

      if (formData.imageFile) {
        // If a new image is uploaded, convert it to base64 and use the new name
        base64Image = await convertToBase64(formData.imageFile);
        imageName = formData.imageFile.name;
      }

      const requestBody = {
        image_name: imageName, // Use the current image name or the new one
        image_data: base64Image,
      };

      const response = await fetch(
        "https://wy9wmf2bcf.execute-api.ap-south-1.amazonaws.com/v1/updateAboutUsHeaderImage",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log("Image updated successfully:", responseData);

        // Update the state with the new image URL if needed
        setHeaderImage([{ id: 1, image_url: imagePreview }]);
        handleCloseModal();
      } else {
        console.error("Failed to update the image.");
      }
    } catch (error) {
      console.error("Error during image update:", error);
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
        <h1 className="cms-banner-title">About Us Header Image</h1>
      </div>

      <div className="cms-container">
        {headerImage.map((image) => (
          <div key={image.id} className="cms-box">
            <img
              src={image.image_url}
              className="cms-banner-preview"
              alt="Header"
            />
            <div className="cms-box-actions">
              <button
                className="cms-action-button banner-edit-button"
                onClick={() => handleEditClick(image)}
              >
                <img src={Pencil} alt="Edit" className="cms-action-icon" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="cms-modal-overlay">
          <div className="cms-modal-content">
            <h2>Edit Header Image</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsConfirmModalOpen(true);
              }}
            >
              <input
              type="file"
              onChange={handleFormChange}
              accept="image/*"
              className="cms-input"
            />
            {imagePreview && (
              <img
                src={imagePreview}
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

            <button className="cms-upload-button">
              Update Header
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
}

export default CMSAboutUsHeaderImage;
