// src/components/Sidebar/Sidebar.js
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/img/logo_a.png'; // Import the logo image
import '../styles.css';

export default function Sidebar() {
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);
  const [sidebarItems, setSidebarItems] = useState([
    { path: '/', name: 'Home' },
    { path: '/aboutus', name: 'About Us' },
    { path: '/projectsectorial', name: 'Project Sectorial' },
    { path: '/allprojects', name: 'All Projects' },
    { path: '/enquire', name: 'Enquire' },
  ]);
  const [newItemName, setNewItemName] = useState('');

  const handleClick = (path) => {
    setActive(path);
  };

  const handleAddItem = () => {
    if (newItemName.trim()) {
      const newPath = `/${newItemName.toLowerCase().replace(/\s+/g, '')}`;
      setSidebarItems([...sidebarItems, { path: newPath, name: newItemName }]);
      setNewItemName(''); // Clear the input field
    }
  };

  return (
    <div className="sidebar">
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
  );
}
