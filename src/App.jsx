import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ContactPage from "./pages/ContactPage";
import Navbar from "./components/Navbar";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="app-shell">
      <Navbar />
      <div className="app-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
