import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import React from "react";
import { PageProvider } from "./context/pageContext";

function App() {
  return (
    <PageProvider>
      <div className="App" id="main-container" data-scroll-container>
        <Navbar />
        <Outlet />
      </div>
    </PageProvider>
  );
}

export default App;
