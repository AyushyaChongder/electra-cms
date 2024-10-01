import React, { useState } from "react";
import "../styles.css"; // Import your CSS file
import Pencil from "../assets/img/pencil.png";
import Dustbin from "../assets/img/dustbin.png";

const jobDetails = [
  {
    title: "Accountant Assistant",
    location: "Ernakulam, Kerala",
    experience: "1+ Year",
    job_status: "Open",
    description:
      "We are seeking a motivated and detail-oriented Accountant Assistant to join our team. You will play a crucial role in supporting the financial operations of our electrical contracting firm. This position involves various accounting, administrative, and customer service tasks.",
    responsibilities: [
      "Accounting: Accurately record financial transactions, Process invoices and payments, Assist in preparing financial statements",
      "Administrative Support: Manage office tasks such as filing, printing, and emailing, Organize and maintain financial records",
      "Customer Service: Communicate with clients and vendors regarding payments and invoices, Address any billing inquiries",
      "Payroll: Assist with payroll processing, Verify timesheets and calculate vacation/sick time",
      "Financial Reporting: Help create and update financial reports (balance sheets, cash flow statements, etc.)",
      "Reconciliation: Reconcile financial accounts, including accounts receivable and payable",
      "Budgeting: Evaluate financial budgets and track expenses",
      "Compliance: Ensure compliance with company policies and procedures",
    ],
    skillsets: [
      "Strong understanding of accounting principles and practices",
      "Proficiency in Microsoft Office Suite (especially Excel)",
      "Excellent attention to detail and accuracy",
      "Effective communication and interpersonal skills",
      "Ability to work independently and as part of a team",
    ],
    requirements: [
      "Bachelor's degree in Commerce (B.Com) or higher.",
      "1+ year of experience in an electrical contracting firm or a related field",
    ],
    education: "Bachelor's degree in Commerce (B.Com) or higher",
    benefits:
      "Competitive salary. Opportunities for professional growth and development. Work in a dynamic and innovative environment.",
  },
  {
    title: "Electrical Site Engineer",
    location: "Kerala",
    experience: "2+ Years",
    job_status: "Open",
    description:
      "Electrapower Engineering, a leading A-Grade HT electrical contracting firm, is seeking a highly motivated and experienced Electrical Site Engineer to join our team.",
    responsibilities: [
      "Oversee and coordinate all on-site electrical activities.",
      "Manage project timelines, budgets, and resources.",
      "Review and interpret electrical drawings, specifications, and schematics.",
      "Conduct regular inspections and quality checks.",
      "Supervise and guide a team of electricians and technicians.",
      "Maintain effective communication with clients.",
      "Implement and enforce safety protocols.",
      "Prepare and submit regular progress reports.",
    ],
    skillsets: [
      "Strong knowledge of electrical system design.",
      "Project management and site coordination skills.",
      "Ability to read electrical schematics and plans.",
      "Excellent communication and leadership skills.",
    ],
    requirements: [
      "B.Tech/Diploma in Electrical and Electronics Engineering (EEE).",
      "Minimum 2 years of experience in electrical projects, preferably with an A-Grade Electrical Contractor.",
    ],
    education: "B.Tech/Diploma in Electrical and Electronics Engineering",
    benefits:
      "Competitive salary. Opportunities for professional development and advancement.",
  },
  {
    title: "Electrician",
    location: "Kerala",
    experience: "1-2 Years",
    job_status: "Open",
    description:
      "Electrapower Engineering is seeking skilled Electricians to join our team. The ideal candidate will have a strong technical background in electrical installations, maintenance, and repair.",
    responsibilities: [
      "Install, maintain, and repair electrical systems.",
      "Perform routine electrical maintenance tasks.",
      "Inspect transformers, circuit breakers, and electrical components.",
      "Troubleshoot and resolve electrical malfunctions.",
      "Adhere to safety protocols and regulations.",
      "Collaborate effectively with team members to complete projects.",
    ],
    skillsets: [
      "Proficient in electrical installations and repairs.",
      "Ability to read and interpret electrical drawings.",
      "Strong troubleshooting and problem-solving skills.",
      "Good communication and teamwork abilities.",
    ],
    requirements: [
      "ITI Electrical (Wireman, Electrician) or Diploma in Electrical Engineering.",
      "1 to 2 years of experience in electrical work, preferably with an A-Grade Electrical Contractor.",
    ],
    education: "ITI Electrical/Diploma in Electrical Engineering",
    benefits:
      "Attractive salary. Opportunities for training and skill development.",
  },
];

function CMSCareersJobAccordion() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
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
    benefits: "",
  });

  const handleEditClick = (job) => {
    setFormData(job);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (title) => {
    // Implement delete functionality
    console.log("Deleted job:", title);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
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
      benefits: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement submit functionality
    console.log("Form Submitted:", formData);
    handleCloseModal();
  };

  return (
    <div className="cms-banner-container">
      <div className="cms-banner-header">
        <h1 className="cms-banner-title">Careers Job Accordion</h1>
        <button className="cms-add-button" onClick={() => setIsModalOpen(true)}>
          Add New
        </button>
      </div>
      <div className="cms-banner-gallery">
        {jobDetails.map((job, index) => (
          <div key={index} className="cms-banner-box">
            <div className="cms-banner-details">
              <h2 className="cms-banner-title">{job.title}</h2>
              <p className="cms-banner-alt">Location: {job.location}</p>
              <p className="cms-banner-alt">Experience: {job.experience}</p>
              <p className="cms-banner-alt">Status: {job.job_status}</p>
              <p className="cms-banner-link">Description: {job.description}</p>
              <p className="cms-banner-alt">Responsibilities:</p>
              <ul>
                {job.responsibilities.map((resp, idx) => (
                  <li className="cms-banner-alt" key={idx}>
                    {resp}
                  </li>
                ))}
              </ul>
              <p className="cms-banner-alt">Skillsets:</p>
              <ul>
                {job.skillsets.map((skill, idx) => (
                  <li className="cms-banner-alt" key={idx}>
                    {skill}
                  </li>
                ))}
              </ul>
              <p className="cms-banner-alt">Requirements:</p>
              <ul>
                {job.requirements.map((req, idx) => (
                  <li className="cms-banner-alt" key={idx}>
                    {req}
                  </li>
                ))}
              </ul>
              <p className="cms-banner-alt">Education: {job.education}</p>
              <p className="cms-banner-alt">Benefits: {job.benefits}</p>
              <div className="cms-banner-actions">
                <button
                  className="cms-action-button banner-edit-button"
                  onClick={() => handleEditClick(job)}
                >
                  <img src={Pencil} alt="Edit" className="cms-action-icon" />
                </button>
                <button
                  className="cms-action-button banner-delete-button"
                  onClick={() => handleDeleteClick(job.title)}
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
              <label>
                Benefits:
                <textarea
                  name="benefits"
                  className="cms-input"
                  value={formData.benefits}
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
