import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "./OrderHistory.css";

const OrderHistory = () => {
  const { user, orders } = useContext(AuthContext);

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return "Date not available";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!user) {
    return (
      <div className="history-container">
        <div className="history-card">
          <h2>🔐 Please Login</h2>
          <p>You need to be logged in to view your order history.</p>
          <Link to="/login" className="login-prompt-btn">
            Login Now
          </Link>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="history-container">
        <div className="history-card empty-state">
          <h2>🧾 No Orders Yet</h2>
          <p>Your order history is empty.</p>
          <p>Start exploring our delicious menu!</p>
          <Link to="/menu" className="browse-menu-btn">
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="history-container">
      <h1 className="history-title">Your Order History 🧾</h1>
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order._id || order.id} className="order-card">
            <div className="order-header">
              <div className="order-id">
                <span className="label">Order #</span>
                <strong>{order._id?.slice(-6) || order.id || "N/A"}</strong>
              </div>
              <div className="order-date">
                <span className="label">Placed on</span>
                <span>{formatDate(order.createdAt || order.orderDate)}</span>
              </div>
              <div className="order-status">
                <span className={`status-badge ${order.status || "Ordered"}`}>
                  {order.status || "Ordered"}
                </span>
              </div>
            </div>

            <div className="order-delivery-address">
              <span className="label">📍 Delivery Address:</span>
              {order.deliveryAddress ? (
                <p>
                  {order.deliveryAddress.street}, {order.deliveryAddress.city} -{" "}
                  {order.deliveryAddress.pincode}
                </p>
              ) : (
                <p>Address not available</p>
              )}
            </div>

            <div className="order-items">
              <div className="items-header">
                <span>Item</span>
                <span>Qty</span>
                <span>Price</span>
                <span>Total</span>
              </div>
              {order.items.map((item) => (
                <div key={item.id} className="order-item">
                  <span className="item-name">{item.name}</span>
                  <span className="item-qty">{item.quantity}</span>
                  <span className="item-price">₹{item.price}</span>
                  <span className="item-total">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="order-summary-details">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>₹{order.subtotal}</span>
              </div>
              <div className="summary-row">
                <span>Delivery Fee:</span>
                <span>
                  {order.delivery === 0 ? "Free" : `₹${order.delivery}`}
                </span>
              </div>
              <div className="summary-row">
                <span>GST (5%):</span>
                <span>₹{order.gst}</span>
              </div>
              {order.discount > 0 && (
                <div className="summary-row discount">
                  <span>Coupon Discount:</span>
                  <span>- ₹{order.discount}</span>
                </div>
              )}
              <div className="summary-row total">
                <span>Total Amount:</span>
                <span>₹{order.finalTotal}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
