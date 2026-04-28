import { useState, useContext } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { AuthContext } from "../context/AuthContext";
import "./AuthModal.css";

const AuthModal = ({ isOpen, onClose, onSuccess }) => {
  const { login, signup } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await login(email, password); // ✅ await here
      if (result.success) {
        onSuccess(); // trigger order placement
        onClose();
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Login failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!street || !city || !pincode) {
      setError("Please fill all address fields");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const result = await signup(name, email, password, {
        street,
        city,
        pincode,
      });
      if (result.success) {
        // After successful signup, automatically log in
        const loginResult = await login(email, password);
        if (loginResult.success) {
          onSuccess(); // trigger order placement
          onClose();
        } else {
          setError(loginResult.message);
        }
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Signup failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <Tabs>
          <TabList>
            <Tab>Login</Tab>
            <Tab>Signup</Tab>
          </TabList>

          {/* Login Tab */}
          <TabPanel>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error && <div className="auth-error">{error}</div>}
              <button type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          </TabPanel>

          {/* Signup Tab */}
          <TabPanel>
            <form onSubmit={handleSignup}>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <h4>Delivery Address</h4>
              <input
                type="text"
                placeholder="Street / House No."
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Pincode (6 digits)"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                required
              />
              {error && <div className="auth-error">{error}</div>}
              <button type="submit" disabled={loading}>
                {loading ? "Signing up..." : "Signup"}
              </button>
            </form>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default AuthModal;
