const express = require("express");
const router = express.Router();
const {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

router.post("/", createOrder);
router.get("/user/:email", getUserOrders);
router.get("/", getAllOrders);        // admin
router.put("/:id/status", updateOrderStatus);  // admin

module.exports = router;