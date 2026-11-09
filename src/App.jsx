import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import React from "react";
import { PageProvider } from "./context/pageContext";
import { SiteProvider } from "./context/siteContext";
import Footer from "./components/Footer";

function App() {
  return (
    <PageProvider>
      <SiteProvider>
        <div className="App" id="main-container" data-scroll-container>
          <Navbar />
          <Outlet />
          <Footer />
        </div>
      </SiteProvider>
    </PageProvider>
  );
}

export default App;
