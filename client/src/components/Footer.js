import "./Footer.css";
import React from "react";



function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Left Section */}
        <div className="footer-section">
          <h3>CozyBite 🍽️</h3>
          <p>Warm food. Cozy vibes.</p>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h4>Contact</h4>
          <p>📍 Ahmedabad, Gujarat</p>
          <p>📞 +91 9876543210</p>
          <p>✉️ info@cozybite.com</p>
        </div>

        {/* Opening Hours */}
        <div className="footer-section">
          <h4>Opening Hours</h4>
          <p>Mon - Fri: 10 AM - 11 PM</p>
          <p>Sat - Sun: 9 AM - 12 AM</p>
        </div>

        {/* Map */}
        <div className="footer-section map">
          <iframe
            title="Restaurant Location"
            src="https://maps.google.com/maps?q=Ahmedabad&output=embed"
            width="100%"
            height="150"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>

      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>© 2026 CozyBite. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;