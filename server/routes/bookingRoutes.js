const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/authMiddleware');
const {
  createBooking,
  getMyBookings,
  getAllBookings,
  updateBookingStatus,
} = require('../controllers/bookingController');

// All booking routes require you to be logged in.
router.post('/', protect, createBooking);
router.get('/my', protect, getMyBookings);

// Admin-only routes.
router.get('/', protect, adminOnly, getAllBookings);
router.patch('/:id', protect, adminOnly, updateBookingStatus);

module.exports = router;
