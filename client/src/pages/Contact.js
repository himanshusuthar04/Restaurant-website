import { useState } from "react";
import "./Contact.css";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMsg("");

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMsg("✅ Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
      } else {
        setMsg("❌ Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMsg("❌ Network error. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <h2 className="contact-title">Contact & Location</h2>

      <div className="contact-info">
        <div className="info-box">
          <h4>📞 Phone</h4>
          <p>+91 9876543210</p>
        </div>
        <div className="info-box">
          <h4>📍 Address</h4>
          <p>Ahmedabad, Gujarat</p>
        </div>
        <div className="info-box">
          <h4>🕒 Opening Hours</h4>
          <p>Mon - Sun: 10:00 AM - 11:00 PM</p>
        </div>
      </div>

      <a href="tel:+919876543210" className="call-btn">
        📞 Call Now
      </a>

      <div className="contact-form-container">
        <h3>Send Us a Message</h3>
        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="4"
            value={form.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Message"}
          </button>
        </form>
        {msg && <p className="success-msg">{msg}</p>}
      </div>

      <div className="map-container">
        <iframe
          title="Restaurant Location Map"
          src="https://maps.google.com/maps?q=Ahmedabad&output=embed"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}

export default Contact;
