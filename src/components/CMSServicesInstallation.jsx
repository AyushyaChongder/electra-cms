import { useState, useEffect } from "react";
import { Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import "../styles.css";
import Pencil from "../assets/img/pencil.png";
import Dustbin from "../assets/img/dustbin.png";

function CMSServicesInstallation() {
  const [sections, setSections] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    heading: "",
    description: "",
    bullets_heading: "",
    bullets: "",
    images: [],
    position: null,
    updated_at: "",
    imagePreviews: [],
  });
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

  // Fetch data from API
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://tn962s9r5i.execute-api.ap-south-1.amazonaws.com/v1/getService?service=install-comm-service"
      );
      const result = await response.json();

      if (result.status_code == 200) {
        const data = result.data;

        // Step 1: Group objects by position
        const positionGroups = data.reduce((acc, item) => {
          const pos = item.position;
          if (!acc[pos]) {
            acc[pos] = [];
          }
          acc[pos].push(item);
          return acc;
        }, {});

        // Step 2: Sort groups by position, and within each group, sort by updated_at
        const sortedData = [];
        const uniquePositions = Object.keys(positionGroups).sort(
          (a, b) => a - b
        ); // Sort positions numerically

        uniquePositions.forEach((pos) => {
          let group = positionGroups[pos];

          // If multiple items share the same position, sort them by updated_at
          if (group.length > 1) {
            group.sort((a, b) => {
              const aUpdatedAt = a.updated_at
                ? new Date(a.updated_at).getTime()
                : 0;
              const bUpdatedAt = b.updated_at
                ? new Date(b.updated_at).getTime()
                : 0;
              return bUpdatedAt - aUpdatedAt; // Most recent first
            });
          }

          // Push sorted group to the final sorted data list
          sortedData.push(...group);
        });

        // Step 3: Reassign positions sequentially
        let currentPosition = 1;
        sortedData.forEach((item) => {
          item.position = currentPosition++;
        });

        // Step 4: Update the state with the final sorted and updated data
        setSections(sortedData);
      } else {
        console.log(result.status_code);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddNewClick = () => {
    setIsModalOpen(true);
    setIsEditing(false);
    setFormData({
      id: null,
      heading: "",
      description: "",
      bullets_heading: "",
      bullets: "",
      position: null,
      updated_at: "",
      images: [],
      imagePreviews: [],
    });
  };

  const handleEditClick = (section) => {
    setIsModalOpen(true);
    setIsEditing(true);
    setFormData({
      id: section.service_id,
      heading: section.heading,
      description: section.description,
      bullets_heading: section.bullets_heading,
      bullets: section.bullets ? section.bullets.join("\n") : "",
      position: section.position,
      updated_at: section.updated_at,
      images: section.images.map((img) => ({
        alt: img.alt,
        src: img.src,
      })),
      imagePreviews: section.images.map((img) => img.src),
    });
  };
  const handleDeleteClick = async (sectionId) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this service?"
    );
    if (!confirmation) return;

    try {
      const response = await fetch(
        "https://x5ajuag7dh.execute-api.ap-south-1.amazonaws.com/v1/deleteService?service=install-comm-service",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            service_id: sectionId,
          }),
        }
      );

      const data = await response.json();
      if (response.ok && data.status_code === 200) {
        // Refresh the list of services after deletion
        await fetchData();
      } else {
        console.error("Error deleting service:", data);
        alert("Error deleting the service.");
      }
    } catch (error) {
      console.error("Error deleting service:", error);
      alert("An error occurred while deleting the service.");
    }
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images" && files.length > 0) {
      if (files.length > 2) {
        alert("You can only upload up to 2 images.");
        return;
      }
      // Store the actual file objects
      const imagesArray = Array.from(files).map((file, index) => ({
        alt: `Image ${index + 1}`,
        file: file, // Save the actual file object
      }));
      setFormData((prevData) => ({
        ...prevData,
        images: imagesArray,
        imagePreviews: imagesArray.map((img) => URL.createObjectURL(img.file)), // Create previews from file objects
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsConfirmModalOpen(false);
  };

  const handleConfirmModalSubmit = async () => {
    try {
      const uploadedImageURLs = [];
      const sanitizedHeading = formData.heading
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "");

      for (const image of formData.images) {
        let imageUrl;

        if (image.file instanceof Blob) {
          // Only convert to Base64 if it's a file (Blob)
          const base64Image = await getBase64(image.file);

          const originalFileName = image.file.name;

          const uploadImageResponse = await fetch(
            `https://7s6x697217.execute-api.ap-south-1.amazonaws.com/v1/uploadNewServiceImage?service=install-comm-service&subfolder=${sanitizedHeading}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                file_name: originalFileName,
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
          imageUrl = uploadImageData.object_url;
        } else if (typeof image.src === "string") {
          // Use existing image URL if it's already a URL
          imageUrl = image.src;
        }

        uploadedImageURLs.push({
          alt: `Description for ${image.alt || "Uploaded Image"}`,
          src: imageUrl,
        });
      }

      // Get the current date and time in the desired format
      const updatedAt = new Date().toISOString().slice(0, 19); // Format to "YYYY-MM-DDTHH:mm:ss"

      const cardData = {
        service_id: formData.id || generateRandomId(24),
        heading: formData.heading,
        description: formData.description,
        bullets_heading: formData.bullets_heading,
        bullets:
          formData.bullets.trim() === "" ? [] : formData.bullets.split("\n"),
        images: uploadedImageURLs,
        updated_at: updatedAt,
        position: formData.position,
      };

      const method = isEditing ? "PUT" : "POST";
      const apiEndpoint = isEditing
        ? "https://8jhizf6e46.execute-api.ap-south-1.amazonaws.com/v1/updateService?service=install-comm-service"
        : "https://y1kk288ltd.execute-api.ap-south-1.amazonaws.com/v1/createService?service=install-comm-service";

      await fetch(apiEndpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cardData),
      });

      await fetchData(); // Refresh the list
      handleCloseModal(); // Close the modal
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file); // Ensure you're passing the correct file
      reader.onload = () => resolve(reader.result.split(",")[1]); // Return base64 string without header
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className="cms-home">
      <div className="cms-banner-header">
        <h1 className="cms-banner-title">Installation & Commissioning Services</h1>
        <button className="cms-add-button" onClick={handleAddNewClick}>
          Add Service
        </button>
      </div>
      <div className="cms-banner-title">
        <h6>All image file types should be webp format</h6>
      </div>

      <div className="cms-container">
        {sections.map((section, index) => (
          <div key={index} className="cms-box">
            {section.images.map((image, i) => (
              <img
                key={i}
                src={image.src}
                alt={image.alt}
                className="cms-banner-preview"
              />
            ))}
            <div className="cms-box-content">
              <h2 className="cms-banner-title">{section.heading}</h2>
              <p className="cms-banner-alt">{section.description}</p>
              <h3 className="cms-banner-alt">{section.bullets_heading}</h3>{" "}
              {/* Display bullet_heading */}
              <ul>
                {section.bullets &&
                  section.bullets
                    .filter((bullet) => bullet.trim() !== "")
                    .map((bullet, i) => (
                      <li className="cms-banner-alt" key={i}>
                        {bullet}
                      </li>
                    ))}
              </ul>
              <div className="cms-box-actions">
                <button
                  className="cms-action-button banner-edit-button"
                  onClick={() => handleEditClick(section)}
                >
                  <img src={Pencil} alt="Edit" className="cms-action-icon" />
                </button>
                <button
                  className="cms-action-button banner-delete-button"
                  onClick={() => handleDeleteClick(section.service_id)}
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
              {isEditing ? "Edit Service Details" : "Add New Service Details"}
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
                  required
                />
              </label>

              <label>
                Heading:
                <input
                  type="text"
                  name="heading"
                  className="cms-input"
                  value={formData.heading}
                  onChange={handleFormChange}
                />
              </label>

              <label>
                Description:
                <div className="tooltip-wrapper">
                  <textarea
                    name="description"
                    className="cms-input cms-textarea"
                    value={formData.description}
                    onChange={handleFormChange}
                    style={{ height: "120px" }} // Increase textarea height
                  />
                  <Tooltip title="Enter a brief description of the service">
                    <InfoIcon className="tooltip-icon" />
                  </Tooltip>
                </div>
              </label>

              <label>
                Bullet Heading:
                <input
                  type="text"
                  name="bullets_heading"
                  className="cms-input"
                  value={formData.bullets_heading}
                  onChange={handleFormChange}
                />
              </label>

              <label>
                Bullets (each on a new line):
                <div className="tooltip-wrapper">
                  <textarea
                    name="bullets"
                    className="cms-input cms-textarea"
                    value={formData.bullets}
                    onChange={handleFormChange}
                    placeholder="Enter each bullet point on a new line"
                    style={{ height: "100px" }} // Increase textarea height
                  />
                  <Tooltip title="Enter each bullet point on a new line.">
                    <InfoIcon className="tooltip-icon" />
                  </Tooltip>
                </div>
              </label>

              <label>
                Images (Max 2):
                <input
                  type="file"
                  name="images"
                  accept="image/*"
                  multiple
                  className="cms-input"
                  onChange={handleFormChange}
                />
              </label>

              {formData.imagePreviews.map((preview, i) => (
                <img
                  key={i}
                  src={preview}
                  alt={`Preview ${i + 1}`}
                  className="cms-bannerimg-preview"
                />
              ))}
              <label>
                Alt Text For Images:
                <div className="tooltip-wrapper">
                  <Tooltip title="Alt text for each image should be seaprated by comma">
                    <InfoIcon className="tooltip-icon"></InfoIcon>
                  </Tooltip>
                  <textarea
                    type="text"
                    name="title"
                    className="cms-input"
                    onChange={handleFormChange}
                  />
                </div>
              </label>

              <button type="submit" className="cms-upload-button">
                {isEditing ? "Update Service" : "Add Service"}
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
              <button className="cms-no-button" onClick={handleCloseModal}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CMSServicesInstallation;
