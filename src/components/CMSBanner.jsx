import { useState, useEffect } from "react";
import "../styles.css"; // Import your CSS file
import Pencil from "../assets/img/pencil.png";
import Dustbin from "../assets/img/dustbin.png";

function CMSBanner() {
  const [banners, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // State for confirmation modal
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

// Define the mapping of options to URLs
const linkOptions = {
  'Home': '/home',
  'About Us': '/aboutus',
  'Service': '/designconsultingservice',
  'All Projects': '/allprojects',
  'Portfolio Projects': '/projectsectorial',
  'Enquire': '/enquire'
};

  
  // Fetch banners data
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

  useEffect(() => {
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

  const handleConfirmModalClose = () => {
    setIsConfirmModalOpen(false);
  };

  const handleConfirmModalSubmit = async () => {
    setIsConfirmModalOpen(false);
    await handleFormSubmit(); // Proceed with form submission
  };

  const generateRandomId = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
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
    try {
      let imageURL = "";
      const positionIndex = parseInt(formData.position, 10); // Convert position to integer
    
      if (formData.imageFile) {
        const reader = new FileReader();
        reader.readAsDataURL(formData.imageFile);
    
        reader.onloadend = async () => {
          const base64Image = reader.result.split(",")[1];
    
          try {
            const uploadImageResponse = await fetch("https://kva8of6eq9.execute-api.ap-south-1.amazonaws.com/v1/uploadBannerImageToS3", {
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
    
            const bannerData = {
              id: formData.id || generateRandomId(24), // Use existing ID if editing, otherwise generate a new one
              alt: formData.altText,
              image_url: imageURL,
              link: formData.link,
              position_index: positionIndex, // Use the converted integer value
              mode: formData.mode,
            };
    
            const method = isEditing ? "PUT" : "POST"; // Use PUT for update, POST for create
    
            const apiEndpoint = isEditing
              ? "https://bd4umjk1ki.execute-api.ap-south-1.amazonaws.com/v2/updateBannerImageDynamoDB"
              : "https://pygq6whe39.execute-api.ap-south-1.amazonaws.com/v2/uploadBannerImageDynamoDB";
    
            await fetch(apiEndpoint, {
              method: method,
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(bannerData),
            });
    
            // Clear error state on success
            setError(null);
    
            await fetchBanners(); // Refresh the banners list
            handleCloseModal(); // Close the modal
          } catch (error) {
            console.error("Error uploading image or banner data:", error);
            setError("Failed to upload image or banner data. Please try again.");
          }
        };
    
        reader.onerror = () => {
          setError("Failed to read the image file. Please try again.");
        };
      } else {
        const bannerData = {
          id: formData.id || generateRandomId(24), // Use existing ID if editing, otherwise generate a new one
          image_url: formData.imagePreview,
          alt: formData.altText,
          link: formData.link,
          position_index: positionIndex, // Use the converted integer value
          mode: formData.mode,
        };
    
        try {
          const method = isEditing ? "PUT" : "POST"; // Use PUT for update, POST for create
    
          const apiEndpoint = isEditing
            ? "https://bd4umjk1ki.execute-api.ap-south-1.amazonaws.com/v2/updateBannerImageDynamoDB"
            : "https://pygq6whe39.execute-api.ap-south-1.amazonaws.com/v2/uploadBannerImageDynamoDB";
    
          await fetch(apiEndpoint, {
            method: method,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(bannerData),
          });
    
          // Clear error state on success
          setError(null);
    
          await fetchBanners(); // Refresh the banners list
          handleCloseModal(); // Close the modal
        } catch (error) {
          console.error("Error uploading banner data:", error);
          setError("Failed to upload banner data. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error processing form submission:", error);
      setError("Failed to process form submission. Please try again.");
    }
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

  const handleDeleteClick = async (bannerId) => {
    // Ask for confirmation before proceeding with deletion
    const confirmDelete = window.confirm("Are you sure you want to delete this banner?");
    if (!confirmDelete) return;
  
    try {
      // Call the delete API
      const response = await fetch("https://i1cn395q18.execute-api.ap-south-1.amazonaws.com/v2/deleteBannerImageDynamoDB", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: bannerId,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Delete failed with status ${response.status}`);
      }
  
      const data = await response.json();
      if (data.status_code === 200) {
        // Remove the deleted banner from the state
        const updatedBanners = banners.filter((banner) => banner.id !== bannerId);
        setBanners(updatedBanners);
        setError(null); // Clear any previous errors
      } else {
        throw new Error("Failed to delete banner");
      }
    } catch (error) {
      console.error("Error deleting banner:", error);
      setError("Failed to delete banner. Please try again.");
    }
  };
  

  if (isLoading) {
    return <div className="loader">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }


  return (
    <div className="cms-banner-container">
      <div className="cms-banner-header">
        <h1 className="cms-banner-title">Banner Gallery </h1>        
        <button className="cms-add-button" onClick={handleAddNewClick}>
          Add New
        </button>
      </div>
      <div>
        <h6 className="cms-banner-title">Web Image Dimensions: 5600 px x 2360px</h6>
        <h6 className="cms-banner-title">Mobile Image Dimensions: 1500 px x 2084px</h6>
        <h6 className="cms-banner-title">Image File type allowed: webp</h6>
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
      <form onSubmit={(e) => { e.preventDefault(); setIsConfirmModalOpen(true); }}>
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
          Alt Text:
          <input
            type="text"
            name="altText"
            className="cms-input"
            value={formData.altText}
            onChange={handleFormChange}
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
            <option value="">Select Link</option>
            {Object.keys(linkOptions).map((key) => (
              <option key={linkOptions[key]} value={linkOptions[key]}>
                {key}
              </option>
            ))}
          </select>
        </label>
        <label>
          Mode:
          <select
            name="mode"
            className="cms-input"
            value={formData.mode}
            onChange={handleFormChange}
            required
          >
            <option value="Mobile">Mobile</option>
            <option value="Desktop">Desktop</option>
          </select>
        </label>
        <label>
          Image:
          <input
            type="file"
            name="imageFile"
            className="cms-input"
            onChange={handleFormChange}
            accept="image/*"
          />
        </label>
        {formData.imagePreview && (
            <img src={formData.imagePreview} className="cms-bannerimg-preview" alt="Preview" />
        )}
        <button type="submit" className="cms-upload-button">
          {isEditing ? "Update Banner" : "Add Banner"}
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

export default CMSBanner;
