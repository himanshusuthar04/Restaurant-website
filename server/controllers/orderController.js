const Order = require("../models/Order");

// Create new order
exports.createOrder = async (req, res) => {
  try {
    const { userEmail, userFullName, deliveryAddress, items, subtotal, delivery, gst, discount, finalTotal } = req.body;

    if (!userEmail || !items || items.length === 0) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const order = new Order({
      userEmail,
      userFullName,
      deliveryAddress,
      items,
      subtotal,
      delivery,
      gst,
      discount,
      finalTotal,
    });

    const saved = await order.save();
    res.status(201).json({ success: true, message: "Order placed successfully", data: saved });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// Get orders for a specific user (by email)
exports.getUserOrders = async (req, res) => {
  try {
    const { email } = req.params;
    const orders = await Order.find({ userEmail: email }).sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};

// Get all orders (admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update order status (admin)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Update failed" });
  }
};