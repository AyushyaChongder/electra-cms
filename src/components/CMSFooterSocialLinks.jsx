import React, { useState, useEffect } from 'react';
import "../styles.css";
import Pencil from "../assets/img/pencil.png";
import Dustbin from "../assets/img/dustbin.png";
import TwitterIcon from '../assets/img/a.svg';
import FacebookIcon from '../assets/img/b.svg';
import InstagramIcon from '../assets/img/c.svg';
import LinkedInIcon from '../assets/img/d.svg';

function CMSFooterSocialLinks() {
  const [socialLinks, setSocialLinks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ id: '', platform: '', url: '', icon: '' });

  // Fetch social media links from the API
  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const response = await fetch('https://1kwvd6de1e.execute-api.ap-south-1.amazonaws.com/v1/getSocialMedia');
        const result = await response.json();
        if (result.status_code === 200) {
          const formattedData = result.data.map((item) => ({
            id: item.id,
            platform: item.SocialMedia,
            url: item.Link,
            icon: getIcon(item.SocialMedia)
          }));
          setSocialLinks(formattedData);
        }
      } catch (error) {
        console.error('Error fetching social links:', error);
        setError('Failed to fetch social links.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSocialLinks();
  }, []);

  const getIcon = (platform) => {
    switch (platform) {
      case "Linkedin":
        return LinkedInIcon;
      case "Facebook":
        return FacebookIcon;
      case "Instagram":
        return InstagramIcon;
      case "X":
        return TwitterIcon;
      default:
        return "";
    }
  };

  const handleEditClick = (link) => {
    setFormData(link);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      const response = await fetch('https://5o7zt2noh6.execute-api.ap-south-1.amazonaws.com/v1/deleteSocialMedia', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
  
      // Log the response for debugging
      const responseData = await response.json(); // This will help to see what the API returns
      console.log('Response:', responseData); // Log response data for further investigation
      console.log('Status Code:', response.status); // Log the status code
  
      if (response.ok) {
        setSocialLinks(socialLinks.filter((link) => link.id !== id));
      } else {
        setError(`Failed to delete social link: ${responseData.message || 'Unknown error.'}`);
      }
    } catch (error) {
      console.error('Error deleting social link:', error);
      setError('Failed to delete social link.');
    }
  };
  

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setFormData({ id: '', platform: '', url: '', icon: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Generate a unique id for new entries using the length of socialLinks
    const newId = `id${socialLinks.length + 1}`;

    const apiUrl = isEditing 
      ? 'https://du8pgdwfp0.execute-api.ap-south-1.amazonaws.com/v1/updateSocialMedia' 
      : 'https://b3qjmbs9v6.execute-api.ap-south-1.amazonaws.com/v1/createSocialMedia';
    
    const method = isEditing ? 'PUT' : 'POST';

    try {
        const response = await fetch(apiUrl, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: isEditing ? formData.id : newId, // Use the existing id for editing or the new id for new entries
                SocialMedia: formData.platform,
                Link: formData.url
            })
        });

        if (response.ok) {
            const newLink = { ...formData, id: isEditing ? formData.id : newId }; // Set the id based on whether it's editing or new
            if (!isEditing) {
                setSocialLinks([...socialLinks, newLink]);
            } else {
                setSocialLinks(socialLinks.map((link) => (link.id === formData.id ? newLink : link)));
            }
            handleCloseModal();
        } else {
            setError(`Failed to ${isEditing ? 'update' : 'create'} social link.`);
        }
    } catch (error) {
        console.error(`Error ${isEditing ? 'updating' : 'creating'} social link:`, error);
        setError(`Failed to ${isEditing ? 'update' : 'create'} social link.`);
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
        <h1 className="cms-banner-title">Social Links</h1>
        <button className="cms-add-button" onClick={() => setIsModalOpen(true)}>
          Add New Social Link
        </button>
      </div>
      <div className="cms-banner-gallery">
        {socialLinks.map((link) => (
          <div key={link.id} className="cms-banner-box">
            <div className="cms-banner-details">
              <p className="cms-banner-alt">
                {link.platform}: <a href={link.url} target="_blank" rel="noopener noreferrer">{link.url}</a>
              </p>
              <div className="cms-banner-actions">
                <button
                  className="cms-action-button banner-edit-button"
                  onClick={() => handleEditClick(link)}
                >
                  <img src={Pencil} alt="Edit" className="cms-action-icon" />
                </button>
                <button
                  className="cms-action-button banner-delete-button"
                  onClick={() => handleDeleteClick(link.id)}
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
            <h2>{isEditing ? "Edit Social Link" : "Add New Social Link"}</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Platform:
                <input
                  type="text"
                  name="platform"
                  className="cms-input"
                  value={formData.platform}
                  onChange={handleFormChange}
                  required
                />
              </label>
              <label>
                URL:
                <input
                  type="url"
                  name="url"
                  className="cms-input"
                  value={formData.url}
                  onChange={handleFormChange}
                  required
                />
              </label>
              {/* Optionally add icon input or selection here */}
              <button type="submit" className="cms-upload-button">
                {isEditing ? "Update Link" : "Add Link"}
              </button>
              <button type="button" className="cms-close-button" onClick={handleCloseModal}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default CMSFooterSocialLinks