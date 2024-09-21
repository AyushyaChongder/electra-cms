import { useState } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import './styles.css'

import Sidebar from "./components/Sidebar";
import Home from "./home/Home";
import About from "./about/About";
import AllProjects from "./allprojects/AllProjects";
import ProjectSectorial from "./projectsectorial/ProjectSectorial";
import Services from "./servicespage/Services";
import Enquire from "./enquire/Enquire";
import CMSHome from "./components/CMSHome";
import CMSBanner from "./components/CMSBanner";
import CMSPortfolioSection from "./components/CMSPortfolioSection";
import CMSClients from "./components/CMSClients";
import CMSServiceCards from "./components/CMSServiceCards";
import CMSTestimonial from "./components/CMSTestimonial";
import CMSAboutusHeaderImage from "./components/CMSAboutUsHeaderImage";
import CMSAboutusStatistics from "./components/CMSAboutUsStatistics";
import CMSAboutUsIntegrityCarousel from "./components/CMSAboutUsIntegrityCarousel";
import CMSLogin from "./components/CMSLogin";

// New ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');

  const handleLogin = () => {
    // Implement your login logic here
    // For demonstration, we'll just set isAuthenticated to true
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <div className="app-container">
      {isAuthenticated && <Sidebar onLogout={handleLogout} />}
      <div className="content-container">
        <Routes>
          <Route path="/login" element={<CMSLogin onLogin={handleLogin} />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/aboutus" element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          } />
          <Route path="/projectsectorial" element={
            <ProtectedRoute>
              <ProjectSectorial />
            </ProtectedRoute>
          } />
          <Route path="/allprojects" element={
            <ProtectedRoute>
              <AllProjects />
            </ProtectedRoute>
          } />
          <Route path="/enquire" element={
            <ProtectedRoute>
              <Enquire />
            </ProtectedRoute>
          } />
          <Route path="/services" element={
            <ProtectedRoute>
              <Services />
            </ProtectedRoute>
          } />
          <Route path="/cms-home" element={
            <ProtectedRoute>
              <CMSHome />
            </ProtectedRoute>
          } />
          <Route path="/cms-banner" element={
            <ProtectedRoute>
              <CMSBanner />
            </ProtectedRoute>
          } />
          <Route path="/cms-service-cards" element={
            <ProtectedRoute>
              <CMSServiceCards />
            </ProtectedRoute>
          } />
          <Route path="/cms-home-portfolio" element={
            <ProtectedRoute>
              <CMSPortfolioSection />
            </ProtectedRoute>
          } />
          <Route path="/cms-home-client" element={
            <ProtectedRoute>
              <CMSClients />
            </ProtectedRoute>
          } />
          <Route path="/cms-home-testimonials" element={
            <ProtectedRoute>
              <CMSTestimonial />
            </ProtectedRoute>
          } />
          <Route path="/cms-aboutus-header-image" element={
            <ProtectedRoute>
              <CMSAboutusHeaderImage />
            </ProtectedRoute>
          } />
          <Route path="/cms-aboutus-statistics" element={
            <ProtectedRoute>
              <CMSAboutusStatistics />
            </ProtectedRoute>
          } />
          <Route path="/cms-aboutus-integrity-carousel" element={
            <ProtectedRoute>
              <CMSAboutUsIntegrityCarousel />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </div>
  );
}