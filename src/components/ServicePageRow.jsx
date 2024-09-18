import React, { useState } from "react";

function ServicePageRow({ onSelectService }) {
  const [activeService, setActiveService] = useState(null);

  const handleClick = (serviceName) => {
    setActiveService(serviceName);
    onSelectService(serviceName);
  };

  return (
    <div>
      <div className="cms-home">
        <div className="cms-header">
          <h2 className="cms-banner-title">Services Pages</h2>
          <button className="cms-add-button">
            Add New Service
          </button>
        </div>
        <div className="services-container">
          <button
            className={`service-btn ${activeService === "Design And Consulting" ? "active" : ""}`}
            onClick={() => handleClick("Design And Consulting")}
          >
            <i className="icon design-icon"></i> Design And Consulting
          </button>
          <button
            className={`service-btn ${activeService === "Installation & Commissioning" ? "active" : ""}`}
            onClick={() => handleClick("Installation & Commissioning")}
          >
            <i className="icon install-icon"></i> Installation & Commissioning
          </button>
          <button
            className={`service-btn ${activeService === "Panel Board & Control Systems" ? "active" : ""}`}
            onClick={() => handleClick("Panel Board & Control Systems")}
          >
            <i className="icon panel-icon"></i> Panel Board & Control Systems
          </button>
          <button
            className={`service-btn ${activeService === "Approvals & Compliance" ? "active" : ""}`}
            onClick={() => handleClick("Approvals & Compliance")}
          >
            <i className="icon approval-icon"></i> Approvals & Compliance
          </button>
          <button
            className={`service-btn ${activeService === "Maintenance & Repair" ? "active" : ""}`}
            onClick={() => handleClick("Maintenance & Repair")}
          >
            <i className="icon repair-icon"></i> Maintenance & Repair
          </button>
          <button
            className={`service-btn ${activeService === "Value-Added Services" ? "active" : ""}`}
            onClick={() => handleClick("Value-Added Services")}
          >
            <i className="icon value-icon"></i> Value-Added Services
          </button>
        </div>
      </div>
    </div>
  );
}

export default ServicePageRow;
