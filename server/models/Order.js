const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
      index: true,
    },
    userFullName: {
      type: String,
      required: true,
    },
    deliveryAddress: {
      street: String,
      city: String,
      pincode: String,
    },
    items: [orderItemSchema],
    subtotal: { type: Number, required: true },
    delivery: { type: Number, required: true },
    gst: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    finalTotal: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "preparing", "out_for_delivery", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);