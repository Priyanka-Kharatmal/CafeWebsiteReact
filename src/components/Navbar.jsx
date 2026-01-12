import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "./CartContext";
import { useSearch } from "./SearchContext";
import { FiMenu, FiX, FiShoppingCart, FiChevronDown } from "react-icons/fi";

const Navbar = () => {
  const { cart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dashboardDropdown, setDashboardDropdown] = useState(false);
  const [input, setInput] = useState("");
  const { setQuery } = useSearch();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(input);
    navigate("/menu");
    setIsOpen(false); // close menu after search (mobile UX)
  };

  return (
    <nav className="bg-amber-800 text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Brand */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide hover:text-yellow-300 transition"
        >
          ☕ Raj's Cafe
        </Link>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Menu */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } absolute top-16 left-0 w-full bg-amber-900 
            md:static md:bg-transparent md:flex md:items-center md:w-auto transition-all duration-300`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-6 p-4 md:p-0">
            <li>
              <Link to="/" className="hover:text-yellow-300 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/menu" className="hover:text-yellow-300 transition">
                Menu
              </Link>
            </li>
            <li>
              <Link
                to="/reservations"
                className="hover:text-yellow-300 transition"
              >
                Reservations
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-yellow-300 transition">
                About
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-yellow-300 transition">
                Login
              </Link>
            </li>

            {/* Dashboard Dropdown */}
            <li className="relative">
              <button
                onClick={() => setDashboardDropdown(!dashboardDropdown)}
                className="hover:text-yellow-300 flex items-center gap-1 transition"
              >
                Dashboard <FiChevronDown className="text-sm" />
              </button>
              {dashboardDropdown && (
                <ul className="absolute bg-white text-black rounded shadow-md mt-2 w-48 animate-fadeIn">
                  <li>
                    <Link
                      to="/dashboard/dashboardhome"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Dashboard Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/reservations"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Reservations
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/contact-us"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/manage-menu"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Manage Menu
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/manage-gallery"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Manage Gallery
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/manage-specials"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Manage Specials
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* More Dropdown */}
            <li className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="hover:text-yellow-300 flex items-center gap-1 transition"
              >
                More <FiChevronDown className="text-sm" />
              </button>
              {dropdownOpen && (
                <ul className="absolute bg-white text-black rounded shadow-md mt-2 w-44 animate-fadeIn">
                  <li>
                    <Link
                      to="/specials"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Specials
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/gallery"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Gallery
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Cart */}
            <li>
              <Link
                to="/cart"
                className="hover:text-yellow-300 flex items-center gap-1 transition"
              >
                <FiShoppingCart /> ({cart.length})
              </Link>
            </li>
          </ul>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="flex items-center mt-4 md:mt-0 md:ml-6 bg-white rounded-full overflow-hidden shadow-md focus-within:ring-2 focus-within:ring-green-500 transition"
          >
            <input
              type="text"
              placeholder="Search for coffee, snacks..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="px-4 py-2 w-40 md:w-64 text-gray-700 placeholder-gray-400 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-green-600 px-4 py-2 text-white font-medium hover:bg-green-700 transition"
            >
              🔍
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
