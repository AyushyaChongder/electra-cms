import React, { useState } from "react";
import "../styles.css"; // Import the CSS file
import ServicePageRow from "../components/ServicePageRow";
import SubServiceCards from "../components/SubServiceCards";

function Services() {
  const [selectedService, setSelectedService] = useState(null);

  const handleSelectService = (serviceName) => {
    setSelectedService(serviceName);
  };

  return (
    <div>
      <ServicePageRow onSelectService={handleSelectService} />
      {selectedService && <SubServiceCards service={selectedService} />}
    </div>
  );
}

export default Services;
