import { useState, useEffect } from 'react';
import '../styles.css'; // Import your CSS file

function CMSBanner() {
  const [banners, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch('https://1a2fagymd7.execute-api.ap-south-1.amazonaws.com/v2/fetchBannerImageDetails');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setBanners(data.sort((a, b) => a.position_index - b.position_index));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching banner data:", error);
        setError("Failed to load banner data. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchBanners();
  }, []);

  if (isLoading) {
    return <div className="cms-banner-loading">Loading...</div>;
  }

  if (error) {
    return <div className="cms-banner-error">{error}</div>;
  }

  return (
    <div className="cms-banner-container">
      <h1 className="cms-banner-title">Banner Gallery</h1>
      <div className="cms-banner-gallery">
        {banners.map((banner, index) => (
          <div key={banner.id} className="cms-banner-box">
            <img src={banner.image_url} alt={banner.alt} className="cms-banner-preview" />
            <div className="cms-banner-details">
              <p className="cms-banner-index">Position: {banner.position_index}</p>
              <p className="cms-banner-alt">Alt: {banner.alt}</p>
              <p className="cms-banner-link">Link: {banner.link}</p>
              <p className="cms-banner-mode">Mode: {banner.mode}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CMSBanner;