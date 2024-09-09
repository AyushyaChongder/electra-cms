import React, { useRef, useEffect } from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { keyframes } from '@emotion/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import DividerImage from '../assets/img/client_divider.png';

// Import all client images
import Client1 from '../assets/img/cl1.png';
import Client2 from '../assets/img/cl2.png';
import Client3 from '../assets/img/cl3.png';
import Client4 from '../assets/img/cl4.png';
import Client5 from '../assets/img/cl5.png';
import Client6 from '../assets/img/cl6.png';
import Client7 from '../assets/img/cl7.png';
import Client8 from '../assets/img/cl8.png';
import Client9 from '../assets/img/cl9.png';
import Client10 from '../assets/img/cl10.png';
import Client11 from '../assets/img/cl11.png';
import Client12 from '../assets/img/cl12.png';
import Client13 from '../assets/img/cl14.png';
import Client15 from '../assets/img/cl16.png';
import Client16 from '../assets/img/cl17.png';
import Client17 from '../assets/img/cl18.png';
import Client18 from '../assets/img/cl19.png';
import Client19 from '../assets/img/cl20.png';
import Client20 from '../assets/img/cl211.png';
import Client21 from '../assets/img/cl222.png';
import Client22 from '../assets/img/cl233.png';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 470,
      md: 900,
      lg: 1440,
      xl: 1920,
    }
  },
  typography: {
    fontFamily: 'Montserrat, Arial, sans-serif',
  },
});

// Create an array of client image objects
const clients = [
  { src: Client1, alt: 'Client 1' },
  { src: Client2, alt: 'Client 2' },
  { src: Client3, alt: 'Client 3' },
  { src: Client4, alt: 'Client 4' },
  { src: Client5, alt: 'Client 5' },
  { src: Client6, alt: 'Client 6' },
  { src: Client7, alt: 'Client 7' },
  { src: Client8, alt: 'Client 8' },
  { src: Client9, alt: 'Client 9' },
  { src: Client10, alt: 'Client 10' },
  { src: Client11, alt: 'Client 11' },
  { src: Client12, alt: 'Client 12' },
  { src: Client13, alt: 'Client 13' },
  { src: Client15, alt: 'Client 15' },
  { src: Client16, alt: 'Client 16' },
  { src: Client17, alt: 'Client 17' },
  { src: Client18, alt: 'Client 18' },
  { src: Client19, alt: 'Client 19' },
  { src: Client20, alt: 'Client 20' },
  { src: Client21, alt: 'Client 21' },
  { src: Client22, alt: 'Client 22' },
];

const animationDuration = clients.length * 2;

const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-200%); }
`;


const ClientsCarousel = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const scrollerRef = useRef(null);
  const scrollerInnerRef = useRef(null);

  useEffect(() => {
    if (!scrollerRef.current || !scrollerInnerRef.current) return;

    const scrollerContent = Array.from(scrollerInnerRef.current.children);
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      scrollerInnerRef.current.appendChild(duplicatedItem);
    });

    const scrollSpeed = isMobile ? 50 : 30; // Adjust these values to change speed

    const scroll = () => {
      if (scrollerRef.current.scrollLeft >= scrollerInnerRef.current.scrollWidth / 2) {
        scrollerRef.current.scrollLeft = 0;
      } else {
        scrollerRef.current.scrollLeft += 1;
      }
    };

    const scrollInterval = setInterval(scroll, scrollSpeed);

    return () => clearInterval(scrollInterval);
  }, [isMobile]);

  const carouselContent = (
    <Box
      ref={scrollerRef}
      sx={{
        width: '100%',
        overflow: 'hidden',
        '&::-webkit-scrollbar': { display: 'none' },
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}
    >
      <Box
        ref={scrollerInnerRef}
        sx={{
          display: 'flex',
          alignItems: 'center',
          whiteSpace: 'nowrap',
        }}
      >
        {clients.map((client, index) => (
          <Box 
            key={index} 
            component="img" 
            src={client.src} 
            alt={client.alt} 
            sx={{ 
              margin: '0 10px', 
              height: isMobile ? '40px' : isTablet ? '40px' : '60px', 
              width: 'auto', 
              flexShrink: 0,
              maxWidth: '100%', 
            }} 
          />
        ))}
      </Box>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          margin: isMobile ? '0px' : isTablet ? '0px' : '90px', 
          flexDirection: isMobile || isTablet ? 'column' : 'row',
          borderRadius: isMobile ? '0' : '25px',
          border: isMobile || isTablet ? 'none' : '0.1px solid grey',
          padding: isMobile ? '0' : isTablet ? '20px' : '30px 40px',
          backgroundColor: isMobile ? 'transparent' : '#fff',
          width: isMobile || isTablet ? '100%' : 'auto',
          maxWidth: '100%',
          overflow: 'hidden',
        }}
      >
        {isMobile || isTablet ? (
          <>
            <Box 
              component="img" 
              src={DividerImage} 
              alt="Divider" 
              sx={{ 
                marginBottom: '20px', 
                height: 'auto', 
                alignSelf: 'center' ,
                maxWidth: '100%'
              }} 
            />
            <Typography 
              variant="h6" 
              sx={{ 
                textAlign: 'center', 
                marginBottom: '20px', 
                fontSize: isTablet ? '20px' : '18px'
              }}
            >
              OUR CLIENTS
            </Typography>
            {carouselContent}
            <Box 
              sx={{ 
                width: '100%', 
                borderTop: '1px dashed grey', 
                marginTop: '20px', 
                marginRight: isTablet ? '0' : '40px'
              }} 
            />
          </>
        ) : (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', color: '#000', marginRight: '20px', flexShrink: 0 }}>
              <Box component="img" src={DividerImage} alt="Divider" sx={{ marginRight: '10px', height: 'auto', maxWidth: '100%' }} />
              <Typography variant="h6">OUR CLIENTS</Typography>
            </Box>
            {carouselContent}
          </>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default ClientsCarousel;