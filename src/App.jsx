import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

/* public pages */
import Home from "./pages/Home";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import News from "./pages/News";
import Result from "./pages/Result";

/* admin pages */
import AdminLogin from "./admin/pages/AdminLogin";
import Dashboard from "./admin/pages/Dashboard";
import ManageNews from "./admin/pages/ManageNews";
import ManageGallery from "./admin/pages/ManageGallery";
import ManageResults from "./admin/pages/ManageResults";
import AddParticipant from "./admin/pages/AddParticipant";

function App() {
  const location = useLocation();

  // check admin route
  const isAdminRoute = location.pathname.startsWith("/admin");
  return (
    <>
      {/* Public Navbar */}
      {!isAdminRoute && <Navbar />}
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/news" element={<News />} />
        <Route path="/result" element={<Result />} />

        {/* ADMIN ROUTES */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/news" element={<ManageNews />} />
        <Route path="/admin/gallery" element={<ManageGallery />} />
        <Route path="/admin/results" element={<ManageResults />} />
        <Route path="/admin/add-participant" element={<AddParticipant />} />
      </Routes>
      {/* Public Footer */}
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;
