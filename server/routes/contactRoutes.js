const express = require("express");
const router = express.Router();
const {
  saveContactMessage,
  getContactMessages,
  deleteContactMessage,
} = require("../controllers/contactController");

router.post("/", saveContactMessage);      // Submit contact form
router.get("/", getContactMessages);       // Get all messages (admin)
router.delete("/:id", deleteContactMessage); // Delete a message

module.exports = router;