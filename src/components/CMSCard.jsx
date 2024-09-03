// src/components/CMSCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function CMSCard({ title, description, editPath }) {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(editPath);
  };

  return (
    <div className="cms-box">
      <h2 className="cms-box-title">{title}</h2>
      <p>{description}</p>
      <div className="cms-buttons">
        <button className="cms-button edit-button" onClick={handleEditClick}>
          Edit
        </button>
      </div>
    </div>
  );
}

export default CMSCard;
