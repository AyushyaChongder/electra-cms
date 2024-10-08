import React, { useState } from "react";
import "../styles.css";

import Pencil from "../assets/img/pencil.png";
import Dustbin from "../assets/img/dustbin.png";

import kia1 from "../assets/img/kia/kia1.webp";
import kia2 from "../assets/img/kia/kia2.webp";
import kia3 from "../assets/img/kia/kia3.webp";

import hhys1 from "../assets/img/hhys/hhys1.webp";
import hhys2 from "../assets/img/hhys/hhys2.webp";
import hhys3 from "../assets/img/hhys/hhys3.webp";
import hhys4 from "../assets/img/hhys/hhys4.webp";

import app1 from "../assets/img/appartment/app1.webp";
import app2 from "../assets/img/appartment/app2.webp";
import app3 from "../assets/img/appartment/app3.webp";

import hos1 from "../assets/img/hospital/hos1.webp";
import hos2 from "../assets/img/hospital/hos2.webp";
import hos3 from "../assets/img/hospital/hos3.webp";

import coco1 from "../assets/img/cocotuft/coco1.webp";
import coco2 from "../assets/img/cocotuft/coco2.webp";
import coco3 from "../assets/img/cocotuft/coco3.webp";

import ec1 from "../assets/img/condiments/ec1.webp";
import ec2 from "../assets/img/condiments/ec2.webp";
import ec3 from "../assets/img/condiments/ec3.webp";

import napier1 from "../assets/img/east_napier/napier1.webp";
import napier2 from "../assets/img/east_napier/napier2.webp";
import napier3 from "../assets/img/east_napier/napier3.webp";

import tata1 from "../assets/img/tata/tata1.webp";

import kiaLogo from "../assets/img/logo/kia_logo.svg";
import hhysLogo from "../assets/img/logo/hhys_logo.svg";
import appLogo from "../assets/img/logo/app_logo.svg";
import hosLogo from "../assets/img/logo/hos_logo.svg";
import cocoLogo from "../assets/img/logo/coco_logo.svg";
import ecLogo from "../assets/img/logo/ec_logo.svg";
import napierLogo from "../assets/img/logo/napier_logo.svg";
import tataLogo from "../assets/img/logo/tata_logo.svg";

const data = [
  {
    title:
      "Kerala's largest Kia showroom and workshop by Incheon Motors, featuring India's largest EV charging station",
    images: [
      {
        url: kia1,
        alt: "India's largest EV charging station by Kia, powered by Electrapower Engineering, promoting sustainable mobility in Nettoor, Kerala",
      },
      {
        url: kia2,
        alt: "Bright, modern Kia showroom  interior at Nettoor with cars on display, showcasing Electrapower Engineering's electrical work",
      },
      {
        url: kia3,
        alt: "Exterior view of a modern Kia car dealership with prominent signage at Nettoor, Kerala, highlighting Electrapower Engineering's electrical project contribution.",
      },
    ],
    description_one:
      "Electra Power Engineering partnered with Incheon Motors Pvt. Ltd., the largest Kia dealer in Kerala, to electrify the future of automotive retail. We spearheaded the comprehensive electrical design and installation for their flagship showroom and workshop in Nettoor, Kerala, a facility that proudly houses India's largest EV charging station by Incheon Kia.",

    description_two:
      "This project exemplifies our commitment to sustainable infrastructure and cutting-edge technology. Our team not only ensured the showroom and workshop's seamless operation with robust power systems but also played a crucial role in promoting the adoption of electric vehicles through the installation of state-of-the-art charging infrastructure.",

    highlights: [
      {
        heading: "High-Capacity Power Infrastructure",
        info: "Successfully installed and integrated  a 400 kVA transformer and a 250 kVA transformer, along with a 250 kVA DG set, to provide ample power for the showroom, workshop, and EV charging station.",
      },
      {
        heading: "India's Largest Kia EV Charging Station",
        info: "Installed and commissioned a 240 kW EV charging station, the largest of its kind in India, to cater to the growing demand for electric vehicles.",
      },
      {
        heading: "Sustainable Energy Integration",
        info: "Installed a 115.2 kWp solar power system, contributing to the facility's energy efficiency and reducing its carbon footprint.",
      },
      {
        heading: "Rapid Charging Infrastructure Deployment",
        info: "Demonstrated exceptional project management and execution capabilities by completing the fast-charging station approval, installation, and commissioning within a mere 30 days.",
      },
      {
        heading: "Exceptional Project Delivery",
        info: "Successfully completed the entire project, from initial approvals to final commissioning, in just 90 days, showcasing our agility and commitment to exceeding client expectations.",
      },
    ],
    testimonial_logo: kiaLogo,
    testimonial_logo_alt: "Kia Motors Logo",
    testimonial_head: "Mr. Reji, VP Operations, Incheon Motors Pvt. Ltd",
    testimonial_info:
      "Electra Power Engineering's team surpassed our expectations in every aspect of this project. Their technical expertise, dedication to quality, and ability to deliver within challenging timelines were truly remarkable. The EV charging station they installed has become a major attraction for our customers, and we are confident that it will play a significant role in driving EV adoption in Kerala.",
  },

];

function CMSPortfolioAllProjects() {
  const [projects, setProjects] = useState(data); // Ensure projects is initialized
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(null);
  const [newProjectData, setNewProjectData] = useState({
    title: "",
    images: [],
    imagePreviews: [],
    description_one: "",
    testimonial_head: "",
    testimonial_info: "",
    testimonial_logo: "",
    testimonial_logo_alt: "",
  });

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [projectToDeleteIndex, setProjectToDeleteIndex] = useState(null);

  const handleEditClick = (project) => {
    setIsEditing(true);
    setIsModalOpen(true);
    setNewProjectData({
      title: project.title,
      images: project.images,
      imagePreviews: project.images,
      description_one: project.description_one,
      testimonial_head: project.testimonial_head,
      testimonial_info: project.testimonial_info,
      testimonial_logo: project.testimonial_logo,
      testimonial_logo_alt: project.testimonial_logo_alt,
    });
  };

  const handleDeleteClick = (index) => {
    setProjectToDeleteIndex(index);
    setIsConfirmModalOpen(true);
  };

  const confirmDelete = () => {
    handleDelete(projectToDeleteIndex);
    setIsConfirmModalOpen(false);
  };

  const cancelDelete = () => {
    setIsConfirmModalOpen(false);
  };

  const handleDelete = (index) => {
    const updatedProjects = projects.filter((_, idx) => idx !== index);
    setProjects(updatedProjects);
  };

  const handleAddProject = () => {
    setIsEditing(false);
    setIsModalOpen(true);
    setNewProjectData({
      title: "",
      images: [],
      imagePreviews: [],
      description_one: "",
      testimonial_head: "",
      testimonial_info: "",
      testimonial_logo: "",
      testimonial_logo_alt: "",
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name === "images") {
      const files = Array.from(e.target.files);
      const newImages = files.map((file) => ({
        url: URL.createObjectURL(file),
        alt: file.name,
      }));
      setNewProjectData((prevData) => ({
        ...prevData,
        images: newImages,
        imagePreviews: newImages.map((image) => image.url),
      }));
    } else {
      setNewProjectData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const saveProject = () => {
    if (isEditing) {
      const updatedProjects = [...projects];
      updatedProjects[currentProjectIndex] = newProjectData;
      setProjects(updatedProjects);
    } else {
      setProjects([...projects, newProjectData]);
    }
    setIsModalOpen(false);
    setNewProjectData({
      title: "",
      images: [],
      imagePreviews: [],
      description_one: "",
      testimonial_head: "",
      testimonial_info: "",
      testimonial_logo: "",
      testimonial_logo_alt: "",
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
            <p className="cms-banner-alt">{project.description_one}</p>
            <div className="testimonial">
              <img
                src={project.testimonial_logo}
                alt={project.testimonial_logo_alt}
                className="testimonial-logo"
              />
              <h4 className="cms-banner-alt">{project.testimonial_head}</h4>
              <p className="cms-banner-alt">{project.testimonial_info}</p>
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
                onClick={() => handleDeleteClick(index)}
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
                saveProject();
              }}
            >
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
                Description:
                <textarea
                  name="description_one"
                  className="cms-input"
                  value={newProjectData.description_one}
                  onChange={handleFormChange}
                  required
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
                  required
                />
              </label>

              {newProjectData.imagePreviews.map((preview, i) => (
                <img
                  key={i}
                  src={preview}
                  alt={`Preview ${i + 1}`}
                  className="cms-bannerimg-preview"
                />
              ))}

              <label>
                Testimonial Logo:
                <input
                  type="file"
                  name="testimonial_logo"
                  className="cms-input"
                  accept="image/*" // This restricts the file types to images
                  onChange={handleFormChange} // Use a custom function to handle the image
                  required
                />
              </label>
              {newProjectData.testimonial_logo && (
                
                <img src={newProjectData.testimonial_logo} alt="Preview" className="cms-bannerimg-preview" />
            
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
            </form>
            <button
              className="cms-close-button"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {isConfirmModalOpen && (
        <div className="cms-modal-overlay">
          <div className="cms-modal-content">
            <h2 className="cms-modal-title">Confirm Delete</h2>
            <p>Are you sure you want to delete this project?</p>
            <button onClick={confirmDelete} className="cms-yes-button">
              Yes, Delete
            </button>
            <button onClick={cancelDelete} className="cms-no-button">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CMSPortfolioAllProjects;
