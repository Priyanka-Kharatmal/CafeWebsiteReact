import React from "react";
import { Outlet } from "react-router-dom";
import SideCategories from "./SideCategories";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <SideCategories />

      {/* Main Content */}
      <div className="flex-1 bg-white p-10 overflow-x-auto">
        <Outlet /> {/* Dynamic page content loads here */}
      </div>
    </div>
  );
};

export default Dashboard;
