// src/components/Sidebar/Sidebar.js
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/img/logo_a.png'; // Import the logo image
import '../styles.css';

export default function Sidebar() {
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);
  const [isOpen, setIsOpen] = useState(false); // State to manage sidebar open/close

  const sidebarItems = [
    { path: '/', name: 'Home' },
    { path: '/aboutus', name: 'About Us' },
    { path: '/projectsectorial', name: 'Portfolio Projects' },
    { path: '/allprojects', name: 'All Projects' },
    { path: '/services', name: 'Services' },
    { path: '/enquire', name: 'Enquire' },
    { path: '/footer', name: 'Footer' },
  ];

  const handleClick = (path) => {
    setActive(path);
    if (window.innerWidth <= 768) {
      setIsOpen(false); // Close sidebar on item click in mobile view
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Toggle Button for Mobile */}
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        {/* Logo at the top */}
        <div className="sidebar-logo">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        
        {/* Divider */}
        <div className="sidebar-divider"></div>
       
        {/* Sidebar Items */}
        <div>
          {sidebarItems.map((item) => (
            <div
              key={item.path}
              className={`sidebar-item ${active === item.path ? 'active' : ''}`}
              onClick={() => handleClick(item.path)}
            >
              <Link to={item.path}>{item.name}</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
