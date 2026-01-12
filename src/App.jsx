import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./admin/Login";
import AdminLayout from "./admin/AdminLayout";
import DashboardHome from "./admin/DashboardHome";
import AdminReservations from "./admin/AdminReservations";
import AdminContactUs from "./admin/AdminContactUs";
import AdminManageMenu from "./admin/AdminManageMenu";
import AdminManageGallery from "./admin/AdminManageGallery";
import Reservations from "./pages/Reservations";
import Gallery from "./pages/Gallery";
import AdminManageSpecials from "./admin/AdminManageSpecials";
import Specials from "./pages/Specials";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/specials" element={<Specials />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<AdminLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="dashboardhome" element={<DashboardHome />} />
            <Route path="reservations" element={<AdminReservations />} />
            <Route path="contact-us" element={<AdminContactUs />} />
            <Route path="manage-menu" element={<AdminManageMenu />} />
            <Route path="manage-gallery" element={<AdminManageGallery />} />
            <Route path="manage-specials" element={<AdminManageSpecials />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
