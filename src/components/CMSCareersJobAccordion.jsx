import React, { useState,useEffect } from "react";
import "../styles.css"; // Import your CSS file
import Pencil from "../assets/img/pencil.png";
import Dustbin from "../assets/img/dustbin.png";

function CMSCareersJobAccordion() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [jobDetails, setJobDetails] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    experience: "",
    job_status: "",
    description: "",
    responsibilities: "",
    skillsets: "",
    requirements: "",
    education: "",
    updated_at:"",
  });

  // Function to generate a 24-character alphanumeric ID
  const generateRandomId = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };


  const fetchJobs = async () => {
    try {
      const response = await fetch("https://o6ahie1f44.execute-api.ap-south-1.amazonaws.com/v1/getJobs");
      const data = await response.json();
      if (data.status_code === 200) {
        setJobDetails(data.data);
        setIsLoading(false);
      } else {
        console.error("Failed to fetch jobs:", data);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };


  // Fetch job data from API
  useEffect(() => {
    fetchJobs();
  }, []);

 
  const handleEditClick = (job) => {
    setFormData({
        ...job, // Include entire job object
        job_id: job.job_id, // Ensure job_id is set for editing
        skillsets: job.skillsets.join('\n'), // Convert array to string for display
        responsibilities: job.responsibilities.join('\n'), // Ensure this is also handled
        requirements: job.requirements.join('\n'), 
        updated_at:job.updated_at,
        // Ensure this is also handled
    });
    setIsEditing(true)
    setIsModalOpen(true)
  }

  const handleDeleteClick = async (jobId) => {
    // Ask for confirmation before proceeding with deletion
    const confirmDelete = window.confirm("Are you sure you want to delete this job?");
    if (!confirmDelete) return;

    try {
        // Call the delete API
        const response = await fetch("https://b2ycde9t04.execute-api.ap-south-1.amazonaws.com/v1/deleteJobs", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                job_id: jobId,
            }),
        });

        if (!response.ok) {
            throw new Error(`Delete failed with status ${response.status}`);
        }

        const data = await response.json();
        if (data.status_code === 200) {
            // Remove the deleted job from the state
            const updatedJobs = jobDetails.filter((job) => job.job_id !== jobId);
            setJobDetails(updatedJobs); // Update state with the remaining jobs
            setError(null); // Clear any previous errors
        } else {
            throw new Error("Failed to delete job");
        }
    } catch (error) {
        console.error("Error deleting job:", error);
        setError("Failed to delete job. Please try again.");
    }
};
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    // Reset formData to empty values
    setFormData({
      title: "",
      location: "",
      experience: "",
      job_status: "",
      description: "",
      responsibilities: "",
      skillsets: "",
      requirements: "",
      education: "",
      updated_at: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the current date and time in the desired format
    const updatedAt = new Date().toISOString().slice(0, 19); // Format to "YYYY-MM-DDTHH:mm:ss"
    
    // Prepare the request body
    const requestBody = {
      title: formData.title,
      location: formData.location,
      experience: formData.experience,
      job_status: formData.job_status || "Open",
      description: formData.description,
      responsibilities: formData.responsibilities.split('\n'), // Split by new line
      skillsets: formData.skillsets.split('\n'), // Split by new line
      requirements: formData.requirements.split('\n'), // Split by new line
      education: formData.education,
      job_id: formData.job_id || generateRandomId(24), // Use the existing job_id
      updated_at: updatedAt
    };
  
    try {
      const url = isEditing 
        ? "https://aplwtllhb0.execute-api.ap-south-1.amazonaws.com/v1/updateJobs" 
        : "https://zh01ucp1s7.execute-api.ap-south-1.amazonaws.com/v1/createJobs";
      
      const method = isEditing ? "PUT" : "POST"; // Use PUT for update and POST for create
  
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log(isEditing ? "Job updated successfully:" : "Job created successfully:", data);
        fetchJobs(); // Refresh the job list
        handleCloseModal(); // Close modal after successful submission
      } else {
        console.error(isEditing ? "Failed to update job:" : "Failed to create job:", data);
        setError(isEditing ? "Failed to update job. Please try again." : "Failed to create job. Please try again.");
      }
    } catch (error) {
      console.error(isEditing ? "Error updating job:" : "Error creating job:", error);
      setError("An error occurred while processing the job. Please try again.");
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
        <h1 className="cms-banner-title">Careers Jobs List</h1>
        <button className="cms-add-button" onClick={() => setIsModalOpen(true)}>
          Add New
        </button>
      </div>
      <div className="portfolio-container">
        {jobDetails.map((job, index) => (
          <div key={index} className="portfolio-card">
            <div className="cms-banner-details">
              <h2 className="cms-banner-title">{job.title}</h2>
              <p className="cms-banner-alt"><b>Location:</b> {job.location}</p>
              <p className="cms-banner-alt"><b>Experience:</b> {job.experience}</p>
              <p className="cms-banner-alt"><b>Status:</b> {job.job_status}</p>
              <p className="cms-banner-link"><b>Description:</b> {job.description}</p>
              <p className="cms-banner-alt"><b>Responsibilities:</b></p>
              <ul>
                {job.responsibilities.map((resp, idx) => (
                  <li className="cms-banner-alt" key={idx}>
                    {resp}
                  </li>
                ))}
              </ul>
              <p className="cms-banner-alt"><b>Skillsets:</b></p>
              <ul>
                {job.skillsets.map((skill, idx) => (
                  <li className="cms-banner-alt" key={idx}>
                    {skill}
                  </li>
                ))}
              </ul>
              <p className="cms-banner-alt"><b>Requirements:</b></p>
              <ul>
                {job.requirements.map((req, idx) => (
                  <li className="cms-banner-alt" key={idx}>
                    {req}
                  </li>
                ))}
              </ul>
              <p className="cms-banner-alt"><b>Education: </b>{job.education}</p>
             
              <div className="cms-banner-actions">
                <button
                  className="cms-action-button banner-edit-button"
                  onClick={() => handleEditClick(job)}
                >
                  <img src={Pencil} alt="Edit" className="cms-action-icon" />
                </button>
                <button
                  className="cms-action-button banner-delete-button"
                  onClick={() => handleDeleteClick(job.job_id)}
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
            <h2>{isEditing ? "Edit Job Details" : "Add New Job"}</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Title:
                <input
                  type="text"
                  name="title"
                  className="cms-input"
                  value={formData.title}
                  onChange={handleFormChange}
                  required
                />
              </label>
              <label>
                Location:
                <input
                  type="text"
                  name="location"
                  className="cms-input"
                  value={formData.location}
                  onChange={handleFormChange}
                  required
                />
              </label>
              <label>
                Experience:
                <input
                  type="text"
                  name="experience"
                  className="cms-input"
                  value={formData.experience}
                  onChange={handleFormChange}
                  required
                />
              </label>
              <label>
                Job Status:
                <select
                  name="job_status"
                  className="cms-input"
                  value={formData.job_status}
                  onChange={handleFormChange}
                  required
                >
                  <option value="Open">Open</option>
                  <option value="Close">Close</option>
                </select>
              </label>
              <label>
                Description:
                <textarea
                  name="description"
                  className="cms-input"
                  value={formData.description}
                  onChange={handleFormChange}
                  required
                />
              </label>
              <label>
                Responsibilities:
                <textarea
                  name="responsibilities"
                  className="cms-input"
                  value={formData.responsibilities}
                  onChange={handleFormChange}
                  required
                />
              </label>
              <label>
                Skillsets:
                <textarea
                  name="skillsets"
                  className="cms-input"
                  value={formData.skillsets}
                  onChange={handleFormChange}
                  required
                />
              </label>
              <label>
                Requirements:
                <textarea
                  name="requirements"
                  className="cms-input"
                  value={formData.requirements}
                  onChange={handleFormChange}
                  required
                />
              </label>
              <label>
                Education:
                <input
                  type="text"
                  name="education"
                  className="cms-input"
                  value={formData.education}
                  onChange={handleFormChange}
                  required
                />
              </label>
              <button type="submit" className="cms-upload-button">
                {isEditing ? "Update Job" : "Add Job"}
              </button>
              <button
                type="button"
                onClick={handleCloseModal}
                className="cms-close-button"
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

export default CMSCareersJobAccordion;
