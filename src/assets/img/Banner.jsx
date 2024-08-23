import React from 'react';
import Carousel from 'react-multi-carousel';
import { Link } from 'react-router-dom';
import { useMediaQuery } from "@mui/material";
import styled from 'styled-components';
import 'react-multi-carousel/lib/styles.css';

// Web banner images
import banner1 from "../assets/img/banner_a.png";
// import banner2 from "../assets/img/banner_b.png";
import banner3 from "../assets/img/banner_c.png";
import banner4 from "../assets/img/banner_d.png";
import banner5 from "../assets/img/banner_e.png";

// Mobile banner images (replace these with your actual mobile banner images)
import mobileBanner1 from "../assets/img/BANER POSTER-01.png";
import mobileBanner2 from "../assets/img/BANER POSTER-02.png";
import mobileBanner3 from "../assets/img/BANER POSTER-03.png";
import mobileBanner4 from "../assets/img/BANER POSTER-04.png";

const BannerContainer = styled.div`
  width: 100%;
  margin-top: 2rem; // Adjust this value as needed for desktop

  @media (max-width: 960px) {
    margin-top: 0; // Remove top margin for mobile
  }
`;

const BannerImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;

  @media (max-width: 960px) {
    object-fit: contain;
    max-width: 100%;
    max-height: 100%;
  }
`;

const StyledCarousel = styled(Carousel)`
  .react-multi-carousel-item {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const responsive = {
  all: {
    breakpoint: { max: 4000, min: 0 },
    items: 1,
  }
};


function Banner() {
  const isMobile = useMediaQuery("(max-width:960px)");

  const webImages = [
    { src: banner1, route: '/enquire' },
    { src: banner3, route: '/allprojects' },
    { src: banner4, route: '/projectsectorial' },
    { src: banner5, route: "/designconsultingservice" },
  ];

  const mobileImages = [
    { src: mobileBanner1, route: '/enquire' },
    { src: mobileBanner2, route: '/aboutus' },
    { src: mobileBanner3, route: '/allprojects' },
    { src: mobileBanner4, route: '/projectsectorial' },
  ];

  const images = isMobile ? mobileImages : webImages;

  return (
    <BannerContainer>
      <StyledCarousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={7000}
        customTransition="transform 1000ms ease-in-out"
        transitionDuration={2000}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        arrows={false}
        showDots={false}
        pauseOnHover={false}
        rtl={true}
      >
        {images.map((image, index) => (
          <div key={index}>
            <Link to={image.route}>
              <BannerImage 
                src={image.src} 
                alt={`Slide ${index + 1}`}
              />
            </Link>
          </div>
        ))}
      </StyledCarousel>
    </BannerContainer>
  );
}

export default Banner;