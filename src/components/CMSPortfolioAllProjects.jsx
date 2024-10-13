import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles.css";
import Pencil from "../assets/img/pencil.png";
import Dustbin from "../assets/img/dustbin.png";

function CMSPortfolioAllProjects() {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newProjectData, setNewProjectData] = useState({
    id: null,
    title: "",
    images: [],
    imagePreviews: [],
    description_one: "",
    description_two: "", // Adding description_two to the project data
    highlights: [], // Adding highlights field for new project
    testimonial_head: "",
    testimonial_info: "",
    testimonial_logo: "",
    testimonial_logo_alt: "",
    project_position: null,
  });

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
        setProjects(sortedProjects);
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

  const handleEditClick = (project) => {
    setIsEditing(true);
    setIsModalOpen(true);
    setNewProjectData({
      id:project.project_id,
      project_position: project.project_position,
      title: project.title,
      images: project.images,
      imagePreviews: project.images.map((img) => img.url),
      description_one: project.description_one,
      description_two: project.description_two, // Set description_two when editing
      highlights: project.highlights, // Set highlights when editing
      testimonial_head: project.testimonial_head,
      testimonial_info: project.testimonial_info,
      testimonial_logo: project.testimonial_logo,
      testimonial_logo_alt: project.testimonial_logo_alt,
    });
  };

  const handleDeleteClick = async (projectId) => {
    const confirmation = window.confirm("Are you sure you want to delete this project?");
    if (!confirmation) return;
  
    try {
      const response = await fetch('https://x5ax4kcefa.execute-api.ap-south-1.amazonaws.com/v1/deletePortfolioProject', {
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
        await fetchAllPortfolioProjects();
       
      } else {
        console.error("Error deleting project:", data);
        
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      
    }
  };
  



  const handleAddProject = () => {
    setIsEditing(false);
    setIsModalOpen(true);
    setNewProjectData({
      id: null,
      title: "",
      images: [],
      imagePreviews: [],
      description_one: "",
      description_two: "",
      highlights: [], // Reset highlights for new project
      testimonial_head: "",
      testimonial_info: "",
      testimonial_logo: "",
      testimonial_logo_alt: "",
      project_position: projects.length + 1,
    });
  };

  const handleFormChange = (e) => {
    const { name, value, files, dataset } = e.target;
    const index = dataset.index; // Get the index from data-index

    if (name === "images" && files.length > 0) {
    
        const imagesArray = Array.from(files).map((file, index) => ({
            alt: `Image ${index + 1}`,
            file: file,
        }));

        setNewProjectData(prevData => ({
            ...prevData,
            images: imagesArray,
            imagePreviews: imagesArray.map(img => URL.createObjectURL(img.file)),
        }));
    } else if (name === "testimonial_logo" && files.length > 0) {
        const logoFile = files[0];
        setNewProjectData(prevData => ({
            ...prevData,
            testimonial_logo: logoFile,
            
        }));
    } else if (name === "heading" || name === "info") {
        // Update the highlights based on the index
        setNewProjectData(prevData => {
            const updatedHighlights = [...prevData.highlights];
            updatedHighlights[index] = {
                ...updatedHighlights[index],
                [name]: value,
            };
            return { ...prevData, highlights: updatedHighlights };
        });
    } else {
        setNewProjectData({ ...newProjectData, [name]: value });
    }
};



const saveProject = async () => {
  try {
      const uploadedImageURLs = [];
      const sanitizedHeading = newProjectData.testimonial_logo_alt.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');

      // Upload images
      for (const image of newProjectData.images) {
          let imageUrl="";

          if (image.file instanceof Blob) {
              // Convert to Base64 and upload if it's a file (Blob)
              const base64Image = await getBase64(image.file); // Make sure this is a valid Blob
              const originalFileName = image.file.name;

              const uploadImageResponse = await fetch(`https://61ssq7s0b4.execute-api.ap-south-1.amazonaws.com/v1/uploadNewPortfolioProjectImage?project=${sanitizedHeading}`, {
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
                  throw new Error(`Image upload failed with status ${uploadImageResponse.status}`);
              }

              const uploadImageData = await uploadImageResponse.json();
              imageUrl = uploadImageData.object_url;
          } else if (typeof image.url === "string") {
              // Use existing image URL if it's already a URL
              imageUrl = image.url;
          } 

          uploadedImageURLs.push({
                  alt: `Description for ${image.alt || 'Uploaded Image'}`,
                  url: imageUrl,
              });
          
      }

      // Upload testimonial logo if exists
      let uploadedTestimonialLogo = "";
      if (newProjectData.testimonial_logo) {
          const logoFile = newProjectData.testimonial_logo;

          if (logoFile instanceof Blob) {
              const base64Logo = await getBase64(logoFile); // Ensure this is a valid Blob
              const originalLogoFileName = logoFile.name;

              const uploadLogoResponse = await fetch(`https://61ssq7s0b4.execute-api.ap-south-1.amazonaws.com/v1/uploadNewPortfolioProjectImage?project=${sanitizedHeading}`, {
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
                  throw new Error(`Logo upload failed with status ${uploadLogoResponse.status}`);
              }

              const uploadLogoData = await uploadLogoResponse.json();
              uploadedTestimonialLogo = uploadLogoData.object_url; // Get logo URL
          } 
      }

      // Construct the request body for the project
      const requestBody = {
          project_id: newProjectData.id || generateRandomId(24),
          title: newProjectData.title,
          description_one: newProjectData.description_one,
          description_two: newProjectData.description_two,
          project_position: newProjectData.project_position,
          highlights: newProjectData.highlights,
          testimonial_head: newProjectData.testimonial_head,
          testimonial_info: newProjectData.testimonial_info,
          testimonial_logo:  uploadedTestimonialLogo || newProjectData.testimonial_logo, // Testimonial logo URL
          testimonial_logo_alt: newProjectData.testimonial_logo_alt,
          images: uploadedImageURLs.length ? uploadedImageURLs : newProjectData.images, // Ensure this is the correct reference
      };

      const method = isEditing ? "PUT" : "POST";
      const apiEndpoint = isEditing
          ? "https://jr6wb5i8j4.execute-api.ap-south-1.amazonaws.com/v1/updatePortfolioProject"
          : "https://ta5zlkxdba.execute-api.ap-south-1.amazonaws.com/v1/createPortfolioProject";

      const apiResponse = await fetch(apiEndpoint, {
          method: method,
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
      });

      if (!apiResponse.ok) {
          throw new Error(`API request failed with status ${apiResponse.status}`);
      }



    await fetchAllPortfolioProjects(); // Refresh the list
    handleCloseModal(); // Close the modal

  } catch (error) {
      console.error("Error saving project:", error);
      
  }
};


const handleCloseModal = () => {
  setIsModalOpen(false);
  setIsConfirmModalOpen(false);
};

const handleRemoveImage = (index) => {
  const updatedImages = newProjectData.images.filter((_, i) => i !== index);
  const updatedImagePreviews = newProjectData.imagePreviews.filter((_, i) => i !== index);
  
  // Ensure the state is updated properly
  setNewProjectData((prevData) => ({
    ...prevData,
    images: updatedImages,
    imagePreviews: updatedImagePreviews,
  }));
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
    <div className="cms-home">
      <div className="cms-banner-header">
        <h1 className="cms-banner-title">Portfolio Projects</h1>
        <button className="cms-add-button" onClick={handleAddProject}>
          Add Project
        </button>
      </div>

      <div className="portfolio-container">
        {projects.map((project, index) => (
          <div key={index} className="portfolio-card">
            <h2 className="cms-banner-title">{project.title}</h2>
            <div className="images-container">
              {project.images.map((image, imgIndex) => (
                <img
                  key={imgIndex}
                  src={image.url}
                  alt={image.alt}
                  className="project-image"
                />
              ))}
            </div>
            <p className="cms-banner-alt">
              <b>Project position:</b> {project.project_position}
            </p>
            <p className="cms-banner-alt">
              <b>Project Description 1:</b> {project.description_one}
            </p>
            <p className="cms-banner-alt">
              <b>Project Description 2: </b>
              {project.description_two}
            </p>

            {/* Highlights Section */}
            <div className="highlights-section">
              <h3 className="cms-banner-alt">
                <b>Project Highlights:</b>
              </h3>
              <ul>
                {project.highlights.map((highlight, idx) => (
                  <li key={idx} className="cms-banner-alt">
                    <strong>{highlight.heading}:</strong> {highlight.info}
                  </li>
                ))}
              </ul>
            </div>

            <div className="testimonial">
              <img
                src={project.testimonial_logo}
                alt={project.testimonial_logo_alt}
                className="testimonial-logo"
              />
              <h4 className="cms-banner-alt">
                <b>Project Testimonial Head: </b>
                {project.testimonial_head}
              </h4>
              <p className="cms-banner-alt">
                <b>Project Testimonial Info: </b>
                {project.testimonial_info}
              </p>
            </div>
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
                  value={newProjectData.project_position}
                  onChange={handleFormChange}
                  required
                />
              </label>
              <label>
                Title:
                <input
                  type="text"
                  name="title"
                  className="cms-input"
                  value={newProjectData.title}
                  onChange={handleFormChange}
                  required
                />
              </label>
              <label>
                Description One:
                <textarea
                  name="description_one"
                  className="cms-input"
                  value={newProjectData.description_one}
                  onChange={handleFormChange}
                  required
                />
              </label>
              <label>
                Description Two:
                <textarea
                  name="description_two"
                  className="cms-input"
                  value={newProjectData.description_two}
                  onChange={handleFormChange}
                />
              </label>
              <label>
                Images:
                <input
                  type="file"
                  name="images"
                  accept="image/*"
                  multiple
                  className="cms-input"
                  onChange={handleFormChange}
                />
              </label>

              <div className="image-previews">
              {newProjectData.imagePreviews.map((preview, index) => (
                <div key={index} className="image-preview">
                  <img src={preview} className="cms-bannerimg-preview" alt={`Preview ${index}`} />
                  <br />
                  <button onClick={() => handleRemoveImage(index)} className="remove-image-button">Remove</button>
              
                </div>
              ))}
            </div>

              {/* Highlights Input */}
              <div className="highlights-input-section">
                <h3 className="cms-banner-alt">Add Highlights:</h3>
                {newProjectData.highlights.map((highlight, index) => (
                  <div key={index} className="highlight-input-group">
                    <label>
                      Heading:
                      <input
                        type="text"
                        name="heading"
                        data-index={index}
                        className="cms-input"
                        value={highlight.heading}
                        onChange={handleFormChange}
                      />
                    </label>
                    <label>
                      Info:
                      <textarea
                        name="info"
                        data-index={index}
                        className="cms-input"
                        value={highlight.info}
                        onChange={handleFormChange}
                      />
                    </label>
                  </div>
                ))}
                <button
                  type="button"
                  className="cms-add-button"
                  onClick={() =>
                    setNewProjectData((prevData) => ({
                      ...prevData,
                      highlights: [
                        ...prevData.highlights,
                        { heading: "", info: "" },
                      ],
                    }))
                  }
                >
                  Add Highlight
                </button>
              </div>
              <br />
              <label>
                Testimonial Head:
                <input
                  type="text"
                  name="testimonial_head"
                  className="cms-input"
                  value={newProjectData.testimonial_head}
                  onChange={handleFormChange}
                  required
                />
              </label>
              <label>
                Testimonial Info:
                <textarea
                  name="testimonial_info"
                  className="cms-input"
                  value={newProjectData.testimonial_info}
                  onChange={handleFormChange}
                  required
                />
              </label>
              <label>
                Testimonial Logo:
                <input
                  type="file"
                  name="testimonial_logo"
                  accept="image/*"
                  className="cms-input"
                  onChange={handleFormChange}
                />
              </label>
              {/* Display Testimonial Logo Preview */}
              {newProjectData.testimonial_logo && (
                <img
                  src={newProjectData.testimonial_logo}
                  alt="Testimonial Logo Preview"
                  className="cms-bannerimg-preview"
                />
              )}
              <label>
                Testimonial Logo Alt Text:
                <input
                  type="text"
                  name="testimonial_logo_alt"
                  className="cms-input"
                  value={newProjectData.testimonial_logo_alt}
                  onChange={handleFormChange}
                  required
                />
              </label>

              <button type="submit" className="cms-upload-button">
                {isEditing ? "Update Project" : "Add Project"}
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
                onClick={saveProject}
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

export default CMSPortfolioAllProjects;
