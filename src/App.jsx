// src/App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./home/Home";
import About from "./about/About";
import AllProjects from "./allprojects/AllProjects";
import ProjectSectorial from "./projectsectorial/ProjectSectorial";
import Enquire from "./enquire/Enquire";
import CMSHome from "./components/CMSHome";
import CMSBanner from "./components/CMSBanner";

import './styles.css'
import CMSImageSlider from "./components/CMSImageSlider";
import CMSPortfolioSection from "./components/CMSPortfolioSection";
import CMSClients from "./components/CMSCLients";


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
          <Route path="/cms-home" element={<CMSHome />} />
          <Route path="/cms-banner" element={<CMSBanner />} />
          <Route path="/cms-image-slider" element={<CMSImageSlider />} />
          <Route path="/cms-home-portfolio" element={<CMSPortfolioSection/>} />
          <Route path="/cms-home-client" element={<CMSClients/>} />
        </Routes>
      </div>
    </div>
  );
}
