import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react'; // Import the LogOut icon
import logo from '../assets/img/logo_a.png';
import '../styles.css';

export default function Sidebar({ onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState(location.pathname);
  const [isOpen, setIsOpen] = useState(false);

  const sidebarItems = [
    { path: '/', name: 'Home' },
    { path: '/aboutus', name: 'About Us' },
    { path: '/projectsectorial', name: 'Portfolio Projects' },
    { path: '/allprojects', name: 'All Projects' },
    { path: '/services', name: 'Services' },
    { path: '/enquire', name: 'Enquire' },
    { path: '/footer', name: 'Footer' },
    { path: '/careers', name: 'Careers' },
  ];

  const handleClick = (path) => {
    setActive(path);
    if (window.innerWidth <= 768) {
      setIsOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        
        <div className="sidebar-divider"></div>
       
        <div className="sidebar-items">
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

        {/* Logout button at the bottom */}
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="cms-logout-button">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}