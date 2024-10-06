import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles.css"; // Import your CSS file
import Pencil from "../assets/img/pencil.png";
import Dustbin from "../assets/img/dustbin.png";

const CMSTestimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    position: "",
    text: "",
    imagePreview: "", // Added imagePreview to formData
    imageFile: null,
  });

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

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get(
        "https://qenb25ilw8.execute-api.ap-south-1.amazonaws.com/v1/getTestimonial"
      );

      if (response.data.status_code === 200) {
        const fetchedTestimonials = response.data.data
          .map((item) => ({
            id: item.id,
            name: item.name,
            position: item.position,
            image: item.profile_icon_url,
            text: item.description,
            index: item.index,
          }))
          .sort((a, b) => a.index - b.index);

        setTestimonials(fetchedTestimonials);
        setIsLoading(false);
      } else {
        console.error("Unexpected status code:", response.data.status_code);
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleAddNewClick = () => {
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      id: null,
      name: "",
      position: "",
      text: "",
      imageFile: null,
      imagePreview: "", // Reset imagePreview when adding new testimonial
    });
  };

  const handleConfirmModalSubmit = async () => {
    setIsConfirmModalOpen(false);
    await handleFormSubmit();
  };

  const handleConfirmModalClose = () => {
    setIsConfirmModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageFile") {
      const selectedFile = files[0];
      setFormData({ ...formData, imageFile: selectedFile });
      if (selectedFile) {
        const previewUrl = URL.createObjectURL(selectedFile); // Create a preview URL for the selected file
        setFormData((prevData) => ({
          ...prevData,
          imageFile: selectedFile,
          imagePreview: previewUrl,
        })); // Set the preview URL in formData
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleFormSubmit = async () => {
    try {
      let profileIconUrl = formData.imagePreview; // Start with the existing image URL

      if (formData.imageFile) {
        const reader = new FileReader();
        reader.readAsDataURL(formData.imageFile);

        reader.onloadend = async () => {
          const base64data = reader.result.split(",")[1];

          try {
            const uploadImageResponse = await fetch(
              "https://orobanouvg.execute-api.ap-south-1.amazonaws.com/v1/uploadTestimonialProfileS3",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  file_name: formData.imageFile.name,
                  file_data: base64data,
                }),
              }
            );

            if (!uploadImageResponse.ok) {
              throw new Error(
                `Image upload failed with status ${uploadImageResponse.status}`
              );
            }

            const uploadImageData = await uploadImageResponse.json();
            profileIconUrl = uploadImageData.object_url; // Set new image URL

            const testimonialData = {
              index: testimonials.length + 1,
              description: formData.text,
              id: formData.id || generateRandomId(24),
              name: formData.name,
              position: formData.position,
              profile_icon_url: profileIconUrl, // Use the new or existing image URL
            };

            const method = isEditing ? "PUT" : "POST"; // Use PUT for update, POST for create

            const apiEndpoint = isEditing
              ? "https://rvfpgxgrra.execute-api.ap-south-1.amazonaws.com/v1/updateTestimonial"
              : "https://n7qnecmcq5.execute-api.ap-south-1.amazonaws.com/v1/createTestimonial";

            await fetch(apiEndpoint, {
              method: method,
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(testimonialData),
            });

            // Clear error state on success
            setError(null);

            await fetchTestimonials();
            handleCloseModal();
          } catch (error) {
            console.error("Error uploading image or testimonial data:", error);
            setError(
              "Failed to upload image or testimonial data. Please try again."
            );
          }
        };
        reader.onerror = () => {
          setError("Failed to read the image file. Please try again.");
        };
      } else {
        // If no new image is selected, keep the existing image URL
        const testimonialData = {
          index: testimonials.length + 1,
          description: formData.text,
          id: formData.id || generateRandomId(24),
          name: formData.name,
          position: formData.position,
          profile_icon_url: profileIconUrl, // Use existing image URL
        };

        try {
          const method = isEditing ? "PUT" : "POST"; // Use PUT for update, POST for create

          const apiEndpoint = isEditing
            ? "https://rvfpgxgrra.execute-api.ap-south-1.amazonaws.com/v1/updateTestimonial"
            : "https://n7qnecmcq5.execute-api.ap-south-1.amazonaws.com/v1/createTestimonial";

          await fetch(apiEndpoint, {
            method: method,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(testimonialData),
          });

          // Clear error state on success
          setError(null);

          await fetchTestimonials(); // Refresh the testimonials list
          handleCloseModal(); // Close the modal
        } catch (error) {
          console.error("Error uploading testimonial data:", error);
          setError("Failed to upload testimonial data. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error processing form submission:", error);
      setError("Failed to process form submission. Please try again.");
    }
  };

  const handleEditClick = (testimonial) => {
    setIsEditing(true);
    setFormData({
      id: testimonial.id, // Capture id for PUT request
      name: testimonial.name,
      position: testimonial.position,
      text: testimonial.text, // Assuming text corresponds to the description field
      imagePreview: testimonial.image, // Set existing image for preview
      imageFile: null, // Clear image for edit
    });
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (testimonialId) => {
    // Ask for confirmation before proceeding with deletion
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this testimonial?"
    );
    if (!confirmDelete) return;

    try {
      // Call the delete API
      const response = await fetch(
        "https://0kshs1p352.execute-api.ap-south-1.amazonaws.com/v1/deleteTestimonial",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: testimonialId, // Pass the testimonial ID for deletion
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Delete failed with status ${response.status}`);
      }

      const data = await response.json();
      if (data.status_code === 200) {
        // Remove the deleted testimonial from the state
        const updatedTestimonials = testimonials.filter(
          (testimonial) => testimonial.id !== testimonialId
        );
        setTestimonials(updatedTestimonials); // Update the testimonials state
        setError(null); // Clear any previous errors
      } else {
        throw new Error("Failed to delete testimonial");
      }
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      setError("Failed to delete testimonial. Please try again.");
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
              <p className="cms-box-description">
                <strong>{testimonial.name}</strong>, {testimonial.position}
              </p>
              <p className="cms-box-text">{testimonial.text}</p>
              <div className="cms-box-actions">
                <button
                  className="cms-action-button banner-edit-button"
                  onClick={() => handleEditClick(testimonial)}
                >
                  <img src={Pencil} alt="Edit" className="cms-action-icon" />
                </button>
                <button
                  className="cms-action-button banner-delete-button"
                  onClick={() => handleDeleteClick(testimonial.id)} // Pass the testimonial ID to delete
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
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Position
                <input
                  type="text"
                  name="position"
                  className="cms-input"
                  value={formData.position}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Testimonial Text
                <textarea
                  name="text"
                  className="cms-input"
                  value={formData.text}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Profile Image:
                <input
                  type="file"
                  name="imageFile"
                  accept="image/*"
                  className="cms-input"
                  onChange={handleInputChange}
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

export default CMSTestimonial;
