import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import UserMenu from "./UserMenu"; // ✅ import new component
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cart } = useContext(CartContext);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <h2 className="logo">
        Cozy<span>Bite</span> 🍽️
      </h2>

      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <NavLink to="/" onClick={closeMenu}>
          Home
        </NavLink>
        <NavLink to="/menu" onClick={closeMenu}>
          Menu
        </NavLink>
        <NavLink to="/about" onClick={closeMenu}>
          About
        </NavLink>
        <NavLink to="/reservations" onClick={closeMenu}>
          Reservations
        </NavLink>
        <NavLink to="/events" onClick={closeMenu}>
          Events
        </NavLink>
        <NavLink to="/gallery" onClick={closeMenu}>
          Gallery
        </NavLink>
        <NavLink to="/contact" onClick={closeMenu}>
          Contact
        </NavLink>

        {/* ✅ User menu (dropdown) */}
        <UserMenu />

        <a href="tel:+919876543210" className="nav-btn" onClick={closeMenu}>
          Book Table
        </a>
      </div>

      <NavLink to="/cart" className="cart-link" onClick={closeMenu}>
        🛒
        <span className="cart-count">{cart.length}</span>
      </NavLink>

      <div
        className={`menu-toggle ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
}

export default Navbar;
