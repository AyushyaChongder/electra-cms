import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles.css";
import Pencil from "../assets/img/pencil.png";
import Dustbin from "../assets/img/dustbin.png";

const CMSAllProjectsIncheon = () => {
  const [projects, setProjects] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    project_position: null,
    title: "",
    img: "",
    logoPreview: null,
    images: [],
    imagePreviews: [],
    bucket_folder_name:""
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  // Function to generate a random 24-character alphanumeric ID
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

  const fetchAllProjects = async () => {
    try {
      const response = await axios.get(
        "https://jqghdcmvi0.execute-api.ap-south-1.amazonaws.com/v1/getAllProjects"
      );
      if (response.data.status_code === 200) {
        const sortedProjects = response.data.data.sort(
          (a, b) => a.project_position - b.project_position
        );
        setProjects(sortedProjects);
      } else {
        console.error("Failed to fetch projects:", response.data);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchAllProjects();
  }, []);

  const handleAddNewClick = () => {
    setIsModalOpen(true);
    setIsEditing(false);
    setFormData({
      id: null,
      project_position:projects.length + 1,
      title: "",
      img: "",
      logoPreview: null,
      images: [],
      imagePreviews: [],
      updated_at:"",
      bucket_folder_name:""
    });
  };

  const handleEditClick = (project) => {
    setIsEditing(true);
    setIsModalOpen(true);
    setFormData({
      id: project.project_id,
      project_position: project.project_position,
      title: project.title,
      img: project.img,
      logoPreview: project.img,
      images: project.images.map((image) => ({ title: image.title, image_url: image.image_url })),
      imagePreviews: project.images.map((img) => img.image_url),
      updated_at:project.updated_at,
      bucket_folder_name: project.bucket_folder_name || '' // Keep it empty initially
    });
  };

  const handleDeleteClick = async (projectId) => {
    const confirmation = window.confirm("Are you sure you want to delete this project?");
    if (!confirmation) return;
  
    try {
      const response = await fetch('https://z2597fuioh.execute-api.ap-south-1.amazonaws.com/v1/deleteAllProject', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          project_id: projectId
        })
      });
  
      const data = await response.json();
      if (response.ok && data.status_code === 200) {
        // Refresh the list of services after deletion
        await fetchAllProjects();
       
      } else {
        console.error("Error deleting project:", data);
        
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      
    }
  };
  


  const handleFormChange = (e) => {
    const { name, value, files, dataset } = e.target;
    const index = dataset.index; // Get the index from data-index if applicable

    if (name === "project_position") {
        setFormData({ ...formData, project_position: value });
    } else if (name === "title") {
        setFormData({ ...formData, title: value });
    } else if (name === "img" && files.length > 0) {
        const logoFile = files[0];
        setFormData(prevData => ({
            ...prevData,
            img: logoFile,
            logoPreview: URL.createObjectURL(logoFile), // Create a preview URL
        }));
    } if (name === "images" && files.length > 0) {
      const updatedImages = [...formData.images];
      const imageFile = files[0];
      updatedImages[index] = {
          ...updatedImages[index],
          file: imageFile, // Make sure to save the file reference
          image_url: URL.createObjectURL(imageFile), // Store preview URL
          title: updatedImages[index].title
      };
      setFormData({ ...formData, images: updatedImages });
  }
};

const saveAllProjects = async () => {
  try {
    // Assume uploadedImageURLs and uploadedLogo are initialized here
    const uploadedImageURLs = [];
    const sanitizedHeading = formData.title ? formData.title.toLowerCase().split(" ")[0] : '';
    const bucketFolderName = isEditing
    ? formData.bucket_folder_name // Use the existing bucket folder name if editing
    : sanitizedHeading; // Use sanitizedHeading if not editing



    // Upload images for the project
    for (const image of formData.images) {
      let imageUrl = "";

      if (image.file instanceof Blob) {
        const base64Image = await getBase64(image.file); // Convert to Base64
        const originalFileName = image.file.name;

        const uploadImageResponse = await fetch(`https://eyu1exp9y8.execute-api.ap-south-1.amazonaws.com/v1/uploadProjectImages?project=${bucketFolderName}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            file_name: originalFileName,
            file_data: base64Image,
          }),
        });

        if (!uploadImageResponse.ok) {
          throw new Error(`Image upload failed for ${originalFileName} with status ${uploadImageResponse.status}`);
        }

        const uploadImageData = await uploadImageResponse.json();
        imageUrl = uploadImageData.object_url; // Get the uploaded image URL
      } else if (typeof image.image_url === "string") {
        imageUrl = image.image_url; // Use existing image URL
      }

      // Ensure each image has a title coming from the form data
      uploadedImageURLs.push({
        title: image.title || `Description for ${originalFileName}`, // Use title from form data
        image_url: imageUrl,
      });
    }

    // Upload testimonial logo if exists
    let uploadedLogo = "";
    if (formData.img) {
      const logoFile = formData.img; // Assuming logoPreview holds the logo Blob

      if (logoFile instanceof Blob) {
        const base64Logo = await getBase64(logoFile); // Convert logo to Base64
        const originalLogoFileName = logoFile.name;

        const uploadLogoResponse = await fetch(`https://eyu1exp9y8.execute-api.ap-south-1.amazonaws.com/v1/uploadProjectImages?project=${sanitizedHeading}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            file_name: originalLogoFileName,
            file_data: base64Logo,
          }),
        });

        if (!uploadLogoResponse.ok) {
          throw new Error(`Logo upload failed for ${originalLogoFileName} with status ${uploadLogoResponse.status}`);
        }

        const uploadLogoData = await uploadLogoResponse.json();
        uploadedLogo = uploadLogoData.object_url; // Get logo URL
      }
    }

     // Get the current date and time in the desired format
     const updatedAt = new Date().toISOString().slice(0, 19); // Format to "YYYY-MM-DDTHH:mm:ss"
    
    // Construct the request body for the project
    const requestBody = {
      project_id: formData.id || generateRandomId(24), // Ensure unique ID
      project_position: formData.project_position, // Use project_position from form data
      title: formData.title,
      img: uploadedLogo || formData.img,
      images: uploadedImageURLs.length ? uploadedImageURLs : formData.images,
      updated_at: updatedAt, // Include updated_at timestamp
      bucket_folder_name: bucketFolderName // Set the appropriate bucket folder name
    };

    const method = isEditing? "PUT" : "POST"; // Determine method based on presence of id
    const apiEndpoint = isEditing
      ? "https://asfi485t07.execute-api.ap-south-1.amazonaws.com/v1/updateAllProject"
      : "https://dfql1n0r07.execute-api.ap-south-1.amazonaws.com/v1/createAllProject";

    const apiResponse = await fetch(apiEndpoint, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!apiResponse.ok) {
      throw new Error(`API request failed for project ${formData.title} with status ${apiResponse.status}`);
    }

    await fetchAllProjects()
    // Handle success response as needed
    handleCloseModal(); // Close the modal after completion

  } catch (error) {
    console.error("Error saving project:", error);
  }
};



const handleRemoveImage = (index) => {
  const updatedImages = formData.images.filter((_, i) => i !== index);
  setFormData((prevData) => ({ ...prevData, images: updatedImages }));
};

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsConfirmModalOpen(false);
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file); // Ensure you're passing the correct file
        reader.onload = () => resolve(reader.result.split(',')[1]); // Return base64 string without header
        reader.onerror = (error) => reject(error);
    });
    };

  return (
    <div className="cms-projects-container">
      <div className="cms-header">
        <h1 className="cms-title">All Projects</h1>
        <button className="cms-add-button" onClick={handleAddNewClick}>
          Add New Project
        </button>
      </div>

      <div className="cms-project-list">
        {projects.map((project, index) => (
          <div key={index} className="cms-project-card">
            <h2 className="cms-project-title">{project.title}</h2>
            <img
              src={project.img}
              alt={project.title}
              className="cms-client-preview"
            />
            {project.images.map((image, imgIndex) => (
              <div key={imgIndex} className="cms-image-card">
                <img
                  src={image.image_url}
                  alt={image.title}
                  className="cms-image-preview"
                />
                <p className="cms-banner-alt">{image.title}</p>
              </div>
            ))}
            <div className="cms-box-actions">
              <button
                className="cms-action-button banner-edit-button"
                onClick={() => handleEditClick(project)}
              >
                <img src={Pencil} alt="Edit" className="cms-action-icon" />
              </button>
              <button
                className="cms-action-button banner-delete-button"
                onClick={() => handleDeleteClick(project.project_id)}
              >
                <img src={Dustbin} alt="Delete" className="cms-action-icon" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
  <div className="cms-modal-overlay">
    <div className="cms-modal-content">
      <h2 className="cms-modal-title">
        {isEditing ? "Edit Project" : "Add New Project"}
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
            name="project_position"
            className="cms-input"
            value={formData.project_position}
            onChange={handleFormChange} // Use handleFormChange
            required
          />
        </label>
        <label>
          Project Title:
          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={formData.title}
            onChange={handleFormChange} // Use handleFormChange
            className="cms-input"
            required
          />
        </label>
        <label>
          Project Logo:
          <input
            type="file"
            accept="image/*"
            name="img" // Name for logo
            onChange={handleFormChange} // Use handleFormChange
            className="cms-input"
          />
        </label>
        {formData.logoPreview && (
          <img
            src={formData.logoPreview} // Preview the logo
            alt="Logo Preview"
            className="cms-bannerimg-preview"
          />
        )}
        <label>
          Project Images:
          {formData.images.map((image, index) => (
            <div key={index} className="cms-image-form-group">
              <input
                type="text"
                placeholder="Image Title"
                value={image.title} // Bind title to formData
                onChange={(e) => {
                  const updatedImages = [...formData.images];
                  updatedImages[index] = {
                    ...updatedImages[index],
                    title: e.target.value, // Update title for the specific image
                  };
                  setFormData({ ...formData, images: updatedImages });
                }} // Handle title change separately
                className="cms-input"
              
              />
              <input
                type="file"
                accept="image/*"
                name="images" // Name for images
                data-index={index} // Pass index for handling
                onChange={handleFormChange} // Use handleFormChange
                className="cms-input"
           
              />
              {image.image_url && (
                <div>
                <img
                  src={image.image_url}
                  alt={`Preview of ${image.title}`}
                  className="cms-bannerimg-preview"
                />
                <br />
                <button type="button" onClick={() => handleRemoveImage(index)} className="remove-image-button">Remove</button>
                <br />
                </div>
                
              )}
            </div>
          ))}
          <br />
          <button
            type="button"
            onClick={() => {
              setFormData(prevData => ({
                ...prevData,
                images: [...prevData.images, { title: "", image_url: "" }] // Add new empty image object
              }));
            }} // Function to add new image inputs
            className="cms-add-button"
          >
            Add Image
          </button>
        </label>
        <button type="submit" className="cms-upload-button">
          {isEditing ? "Update Project" : "Add Project"}
        </button>
      </form>
      <button
        className="cms-close-button"
        onClick={handleCloseModal}
      >
        Close
      </button>
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
                onClick={saveAllProjects}
              >
                Yes
              </button>
              <button
                className="cms-no-button"
                onClick={handleCloseModal}
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

export default CMSAllProjectsIncheon;
