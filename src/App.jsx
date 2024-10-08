import { useState } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import "./styles.css";

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
import CMSEnquireEmailID from "./components/CMSEnquireEmailID";
import CMSEnquireOfficeAddress from "./components/CMSEnquireOfficeAddress";
import CMSEnquireContactNumber from "./components/CMSEnquireContactNumber";
import Footer from "./footer/Footer";
import Careers from "./careers/Careers";
import CMSCareersJobAccordion from "./components/CMSCareersJobAccordion";
import CMSFooterEmailAddress from "./components/CMSFooterEmailAddress";
import CMSFooterOfficeAddress from "./components/CMSFooterOfficeAddress";
import CMSFooterContact from "./components/CMSFooterContact";
import CMSFooterSocialLinks from "./components/CMSFooterSocialLinks";
import CMSServicesDesignConsulting from "./components/CMSServicesDesignConsulting";
import CMSServicesInstallation from "./components/CMSServicesInstallation";
import CMSServicesMaintainance from "./components/CMSServicesMaintainance";
import CMSServicesApprovals from "./components/CMSServicesApprovals";
import CMSServicesPanelBoard from "./components/CMSServicesPanelBoard";
import CMSServicesValue from "./components/CMSServicesValue";
import CMSPortfolioAllProjects from "./components/CMSPortfolioAllProjects";
import CMSAllProjectsIncheon from "./components/CMSAllProjectsIncheon";

// New ProtectedRoute component to secure routes
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  const handleLogin = () => {
    // On successful login, update the authentication state and localStorage
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
  };

  const handleLogout = () => {
    // On logout, reset the authentication state and clear localStorage
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <div className="app-container">
      {isAuthenticated && <Sidebar onLogout={handleLogout} />}{" "}
      {/* Show sidebar only if authenticated */}
      <div className="content-container">
        <Routes>
          {/* Public route */}
          <Route path="/login" element={<CMSLogin onLogin={handleLogin} />} />

          {/* Protected routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/aboutus"
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projectsectorial"
            element={
              <ProtectedRoute>
                <ProjectSectorial />
              </ProtectedRoute>
            }
          />
          <Route
            path="/allprojects"
            element={
              <ProtectedRoute>
                <AllProjects />
              </ProtectedRoute>
            }
          />
          <Route
            path="/enquire"
            element={
              <ProtectedRoute>
                <Enquire />
              </ProtectedRoute>
            }
          />
          <Route
            path="/services"
            element={
              <ProtectedRoute>
                <Services />
              </ProtectedRoute>
            }
          />
          <Route
            path="/footer"
            element={
              <ProtectedRoute>
                <Footer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/careers"
            element={
              <ProtectedRoute>
                <Careers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cms-home"
            element={
              <ProtectedRoute>
                <CMSHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cms-banner"
            element={
              <ProtectedRoute>
                <CMSBanner />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cms-service-cards"
            element={
              <ProtectedRoute>
                <CMSServiceCards />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cms-home-portfolio"
            element={
              <ProtectedRoute>
                <CMSPortfolioSection />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cms-home-client"
            element={
              <ProtectedRoute>
                <CMSClients />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cms-home-testimonials"
            element={
              <ProtectedRoute>
                <CMSTestimonial />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cms-aboutus-header-image"
            element={
              <ProtectedRoute>
                <CMSAboutusHeaderImage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cms-aboutus-statistics"
            element={
              <ProtectedRoute>
                <CMSAboutusStatistics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cms-aboutus-integrity-carousel"
            element={
              <ProtectedRoute>
                <CMSAboutUsIntegrityCarousel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cms-enquire-emailid"
            element={
              <ProtectedRoute>
                <CMSEnquireEmailID />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cms-enquire-address"
            element={
              <ProtectedRoute>
                <CMSEnquireOfficeAddress />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cms-enquire-contact"
            element={
              <ProtectedRoute>
                <CMSEnquireContactNumber />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cms-footer-emailid"
            element={
              <ProtectedRoute>
                <CMSFooterEmailAddress />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cms-footer-address"
            element={
              <ProtectedRoute>
                <CMSFooterOfficeAddress />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cms-footer-contact"
            element={
              <ProtectedRoute>
                <CMSFooterContact />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cms-footer-social"
            element={
              <ProtectedRoute>
                <CMSFooterSocialLinks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cms-careers-jobaccordion"
            element={
              <ProtectedRoute>
                <CMSCareersJobAccordion />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cms-services-design"
            element={
              <ProtectedRoute>
                <CMSServicesDesignConsulting />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cms-services-install"
            element={
              <ProtectedRoute>
                <CMSServicesInstallation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cms-services-panel-board"
            element={
              <ProtectedRoute>
                <CMSServicesPanelBoard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cms-services-approvals"
            element={
              <ProtectedRoute>
                <CMSServicesApprovals />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cms-services-maintainance"
            element={
              <ProtectedRoute>
                <CMSServicesMaintainance />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cms-service-value"
            element={
              <ProtectedRoute>
                <CMSServicesValue />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cms-portfolio-allprojects"
            element={
              <ProtectedRoute>
                <CMSPortfolioAllProjects />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cms-allprojects-incheon"
            element={
              <ProtectedRoute>
                <CMSAllProjectsIncheon />
              </ProtectedRoute>
            }
          />
          
         

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </div>
  );
}
