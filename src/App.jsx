// src/App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
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


export default function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="content-container">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/aboutus" element={<About/>}/>
          <Route path="/projectsectorial" element={<ProjectSectorial />} />
          <Route path="/allprojects" element={<AllProjects/>}/>
          <Route path="/enquire" element={<Enquire/>} />
          <Route path="/services" element={<Services/>}/>
          <Route path="/cms-home" element={<CMSHome />} />
          <Route path="/cms-banner" element={<CMSBanner />} />
          <Route path="/cms-service-cards" element={<CMSServiceCards />} />
          <Route path="/cms-home-portfolio" element={<CMSPortfolioSection/>} />
          <Route path="/cms-home-client" element={<CMSClients/>} />
          <Route path="/cms-home-testimonials" element={<CMSTestimonial/>} />
        </Routes>
      </div>
    </div>
  );
}
