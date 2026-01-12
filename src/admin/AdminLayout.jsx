import { Outlet } from "react-router-dom";
import SideCategories from "./SideCategories";

const AdminLayout = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <SideCategories />

      {/* Content Area */}
      <div className="flex-grow p-6 bg-gray-50 min-h-screen">
        <Outlet /> {/* This will render the nested admin pages */}
      </div>
    </div>
  );
};

export default AdminLayout;
