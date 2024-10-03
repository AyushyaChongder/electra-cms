import React, { useState } from 'react';
import "../styles.css";
import Pencil from "../assets/img/pencil.png";
import Dustbin from "../assets/img/dustbin.png";
import TwitterIcon from '../assets/img/a.svg';
import FacebookIcon from '../assets/img/b.svg';
import InstagramIcon from '../assets/img/c.svg';
import LinkedInIcon from '../assets/img/d.svg';

function CMSFooterSocialLinks() {

  const initialSocialLinks = [
    { id: 1, platform: "LinkedIn", url: "https://www.linkedin.com/company/electrapower-engineering", icon: LinkedInIcon },
    { id: 2, platform: "Facebook", url: "https://www.facebook.com/ElectrapowerEngineering/", icon: FacebookIcon },
    { id: 3, platform: "Instagram", url: "https://www.instagram.com/electrapowerengineering/", icon: InstagramIcon },
    { id: 4, platform: "Twitter", url: "https://twitter.com/electrapowereng", icon: TwitterIcon },
  ];

  const [socialLinks, setSocialLinks] = useState(initialSocialLinks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ id: '', platform: '', url: '', icon: '' });

  const handleEditClick = (link) => {
    setFormData(link);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    setSocialLinks(socialLinks.filter((link) => link.id !== id));
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setFormData({ id: '', platform: '', url: '', icon: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setSocialLinks(socialLinks.map((link) => (link.id === formData.id ? formData : link)));
    } else {
      setSocialLinks([...socialLinks, { ...formData, id: socialLinks.length + 1 }]);
    }
    handleCloseModal();
  };

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