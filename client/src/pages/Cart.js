import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import AuthModal from "../components/AuthModal";
import "./Cart.css";

const Cart = () => {
  const { user, saveOrder } = useContext(AuthContext);
  const {
    cart,
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
  } = useContext(CartContext);

  const [couponCode, setCouponCode] = useState("");
  const [couponMessage, setCouponMessage] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingOrder, setPendingOrder] = useState(false);

  const handleApplyCoupon = () => {
    const msg = applyCoupon(couponCode);
    setCouponMessage(msg);
    setCouponCode("");
  };

  // ✅ Make this async to await saveOrder
  const executePlaceOrder = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    setIsPlacingOrder(true);
    try {
      const orderDetails = {
        items: cart.map(({ id, name, price, quantity }) => ({
          id,
          name,
          price: parseInt(price.replace("₹", "")),
          quantity,
        })),
        subtotal,
        delivery,
        gst,
        discount,
        finalTotal,
      };
      const saved = await saveOrder(orderDetails); // ✅ await the async saveOrder
      if (saved) {
        setOrderPlaced(true);
        clearCart();
        setTimeout(() => setOrderPlaced(false), 5000);
      } else {
        alert("Failed to save order. Please try again.");
      }
    } catch (error) {
      console.error("Order placement error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    if (!user) {
      setShowAuthModal(true);
      setPendingOrder(true);
      return;
    }
    executePlaceOrder(); // This is now async, but we don't need to await here
  };

  const onAuthSuccess = () => {
    if (pendingOrder) {
      executePlaceOrder();
      setPendingOrder(false);
    }
  };

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="cart-empty">
        <h2>Your Cart is Empty 🛒</h2>
        <p>Looks like you haven't added anything yet.</p>
        <Link to="/menu" className="browse-menu-btn">
          Browse Menu
        </Link>
        {user && (
          <p style={{ marginTop: "1rem" }}>
            <Link to="/orders">View your order history →</Link>
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Your Cart 🛒</h1>

      {orderPlaced && (
        <div className="success-message">
          ✅ Order placed successfully! Total: ₹{finalTotal}. Thank you!
          <br />
          <Link to="/orders">Click here to see your order history</Link>
        </div>
      )}

      <div className="cart-container">
        {/* Cart Items Section */}
        <div className="cart-items">
          <div className="cart-header">
            <span>Item</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Total</span>
            <span></span>
          </div>
          {cart.map((item) => {
            const priceNum = parseInt(item.price.replace("₹", ""));
            const itemTotal = priceNum * item.quantity;
            return (
              <div key={item.id} className="cart-item">
                <div className="item-info">
                  <img src={item.img} alt={item.name} />
                  <h3>{item.name}</h3>
                </div>
                <div className="item-price">₹{priceNum}</div>
                <div className="item-quantity">
                  <button onClick={() => decreaseQty(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQty(item.id)}>+</button>
                </div>
                <div className="item-total">₹{itemTotal}</div>
                <div className="item-remove">
                  <button onClick={() => removeFromCart(item.id)}>🗑️</button>
                </div>
              </div>
            );
          })}
          <button className="clear-cart-btn" onClick={clearCart}>
            Clear Cart
          </button>
        </div>

        {/* Order Summary */}
        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal ({totalItems} items)</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="summary-row">
            <span>Delivery Fee</span>
            <span>{delivery === 0 ? "Free" : `₹${delivery}`}</span>
          </div>
          <div className="summary-row">
            <span>GST (5%)</span>
            <span>₹{gst}</span>
          </div>
          {discount > 0 && (
            <div className="summary-row discount">
              <span>Coupon Discount</span>
              <span>- ₹{discount}</span>
            </div>
          )}
          <div className="summary-row total">
            <span>Total</span>
            <span>₹{finalTotal}</span>
          </div>

          <div className="coupon-section">
            <input
              type="text"
              placeholder="Coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button onClick={handleApplyCoupon}>Apply</button>
            {couponMessage && <p className="coupon-msg">{couponMessage}</p>}
          </div>

          <button
            className="place-order-btn"
            onClick={handlePlaceOrder}
            disabled={isPlacingOrder || cart.length === 0}
          >
            {isPlacingOrder ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={onAuthSuccess}
      />
    </div>
  );
};

export default Cart;
