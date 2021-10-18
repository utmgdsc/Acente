import React from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Dashboard from "../components/Dashboard";

export const dashboard = () => {
    return (
        <div id="dashboard">
            <NavBar type="dashboardMenu"/>
            <Dashboard />
            <Footer />
        </div>
    );
  };
  
  export default dashboard;
  