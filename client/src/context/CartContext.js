import { createContext, useState, useEffect } from "react";
import {
  getSubtotal,
  getDelivery,
  getGST,
  getDiscount,
  getFinalTotal,
  getTotalItems,
} from "../utils/cartUtils";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [coupon, setCoupon] = useState(null);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ---------- Cart operations ----------
  const addToCart = (item) => {
    setCart((prev) => {
      const exist = prev.find((i) => i.id === item.id);
      if (exist) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i))
    );
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    setCoupon(null);
  };

  // ---------- Enhanced coupon logic ----------
  const applyCoupon = (code) => {
    const normalizedCode = code.trim().toUpperCase();

    // Coupon definitions
    const coupons = {
      SAVE50: { discount: 50, type: "fixed", message: "₹50 discount applied!" },
      WELCOME20: {
        discount: 20,
        type: "fixed",
        message: "₹20 welcome discount!",
      },
      FREESHIP: {
        discount: 0,
        freeDelivery: true,
        message: "Free delivery applied!",
      },
      COZY10: { discount: 10, type: "percent", message: "10% off applied!" },
    };

    const selected = coupons[normalizedCode];
    if (selected) {
      setCoupon(selected);
      return selected.message;
    }

    setCoupon(null);
    return "Invalid coupon code";
  };

  // ---------- Compute values (with coupon awareness) ----------
  const subtotal = getSubtotal(cart);
  // Pass coupon to getDelivery so free delivery can be considered
  const delivery = getDelivery(subtotal, coupon);
  const gst = getGST(subtotal);
  const discount = getDiscount(coupon, subtotal); // now supports percent
  const finalTotal = getFinalTotal(subtotal, delivery, gst, discount);
  const totalItems = getTotalItems(cart);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        clearCart,

        subtotal,
        delivery,
        gst,
        discount,
        finalTotal,
        totalItems,

        applyCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
