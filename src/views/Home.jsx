import React from "react";
import HeroSection from "../components/HeroSection";
import GallerySection from "../components/GallerySection";
import ServicesSection from "../components/ServicesSection";
import ContactSection from "../components/ContactSection";
import Seo from "../components/Seo";

const Home = () => {
  return (
    <>
      <Seo />
      <HeroSection />
      <GallerySection />
      <ServicesSection />
      <ContactSection />
    </>
  );
};

export default Home;
