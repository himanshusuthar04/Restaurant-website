import { createContext, useState, useEffect } from "react";
import API from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load user from token on app start
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      API.get("/auth/me")
        .then((res) => {
          setUser(res.data.user);
          loadUserOrders(res.data.user.email);
        })
        .catch(() => {
          localStorage.removeItem("token");
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const loadUserOrders = async (email) => {
    try {
      const res = await API.get(`/orders/user/${email}`);
      if (res.data.success) setOrders(res.data.data);
    } catch (err) {
      console.error("Failed to load orders", err);
    }
  };

  const signup = async (name, email, password, address) => {
    try {
      const res = await API.post("/auth/signup", {
        name,
        email,
        password,
        address,
      });
      return { success: true, message: res.data.message };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Signup failed",
      };
    }
  };

  const login = async (email, password) => {
    try {
      const res = await API.post("/auth/login", { email, password });
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
        await loadUserOrders(res.data.user.email);
        return { success: true, message: res.data.message };
      }
      // Fix 6: was missing this return — caused TypeError crash on wrong password
      return { success: false, message: res.data.message || "Login failed" };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Login failed",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setOrders([]);
  };

  const saveOrder = async (orderDetails) => {
    if (!user) return false;
    try {
      const payload = {
        userEmail: user.email,
        userFullName: user.name,
        deliveryAddress: user.address,
        ...orderDetails,
      };
      const res = await API.post("/orders", payload);
      if (res.data.success) {
        await loadUserOrders(user.email);
        return true;
      }
      return false;
    } catch (err) {
      console.error("Order save error", err);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, orders, loading, signup, login, logout, saveOrder }}
    >
      {children}
    </AuthContext.Provider>
  );
};
