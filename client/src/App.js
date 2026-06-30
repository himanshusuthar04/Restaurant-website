import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext"; 
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Reservations from "./pages/Reservations";
import Events from "./pages/Events";
import GalleryPage from "./pages/GalleryPage";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OrderHistory from "./pages/OrderHistory";

const App = () => {
  return (
    <AuthProvider>
    <CartProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/events" element={<Events />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/orders" element={<OrderHistory />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </CartProvider>
    </AuthProvider>
  );
};

export default App;
