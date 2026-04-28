const Reservation = require("../models/Reservation");

// Create Reservation
exports.createReservation = async (req, res) => {
  try {
    const { name, phone, date, time, guests } = req.body;

    if (!name || !phone || !date || !time || !guests) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const reservation = new Reservation({
      name,
      phone,
      date,
      time,
      guests
    });

    const saved = await reservation.save();

    res.status(201).json({
      success: true,
      message: "Reservation created",
      data: saved
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
};

// Get All Reservations
exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: reservations.length,
      data: reservations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching reservations"
    });
  }
};

// Delete Reservation
exports.deleteReservation = async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Reservation deleted"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Delete failed"
    });
  }
};