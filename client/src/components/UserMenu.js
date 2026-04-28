import { useState, useRef, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./UserMenu.css";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const menuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  if (!user) {
    // Not logged in – show Login button that opens dropdown
    return (
      <div className="user-menu" ref={menuRef}>
        <button className="user-menu-trigger" onClick={toggleMenu}>
          👤 Login
        </button>
        {isOpen && (
          <div className="user-dropdown">
            <NavLink to="/login" onClick={closeMenu} className="dropdown-item">
              🔐 Login
            </NavLink>
            <NavLink to="/signup" onClick={closeMenu} className="dropdown-item">
              📝 Signup
            </NavLink>
          </div>
        )}
      </div>
    );
  }

  
  // Logged in – show user name + dropdown
  return (
    <div className="user-menu" ref={menuRef}>
      <button className="user-menu-trigger" onClick={toggleMenu}>
        👤 {user.name.split(" ")[0]} ▼
      </button>
      {isOpen && (
        <div className="user-dropdown">
          <div className="dropdown-user-info">
            <strong>{user.name}</strong>
            <small>{user.email}</small>
          </div>
          <hr />
          <NavLink to="/orders" onClick={closeMenu} className="dropdown-item">
            📋 My Orders
          </NavLink>
          <button
            onClick={() => {
              logout();
              closeMenu();
            }}
            className="dropdown-item logout-btn"
          >
            🚪 Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;