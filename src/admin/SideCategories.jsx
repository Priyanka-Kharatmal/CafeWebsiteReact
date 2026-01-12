import { NavLink } from "react-router-dom";

const SideCategories = () => {
  const baseClasses = "block px-2 py-1 rounded transition";
  const activeClasses = "font-bold text-white bg-amber-900";
  const inactiveClasses = "hover:text-gray-200";

  return (
    <div className="bg-amber-800 text-white w-64 min-h-screen p-6 flex flex-col justify-between rounded-tr-3xl rounded-br-3xl">
      {/* Top Section */}
      <div>
        {/* User profile */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 bg-white rounded-full">
            <img src="/gallery_images/2015.jpg" alt="" />
          </div>
          <span className="font-medium">Raj</span>
        </div>

        {/* Menu Links */}
        <nav className="space-y-4">
          <NavLink
            to="/dashboard/dashboardhome"
            end
            className={({ isActive }) =>
              `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/dashboard/reservations"
            className={({ isActive }) =>
              `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
            }
          >
            Reservations
          </NavLink>

          <NavLink
            to="/dashboard/contact-us"
            className={({ isActive }) =>
              `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
            }
          >
            Contact Us
          </NavLink>

          <NavLink
            to="/dashboard/manage-menu"
            className={({ isActive }) =>
              `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
            }
          >
            Manage Menu
          </NavLink>

          <NavLink
            to="/dashboard/manage-gallery"
            className={({ isActive }) =>
              `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
            }
          >
            Manage Gallery
          </NavLink>

          <NavLink
            to="/dashboard/manage-specials"
            className={({ isActive }) =>
              `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
            }
          >
            Manage Specials
          </NavLink>
        </nav>
      </div>

      {/* Footer */}
      <div className="text-sm text-gray-200 mt-10">
        <p>Contact us</p>
        <p>@raj</p>
      </div>
    </div>
  );
};

export default SideCategories;
