const Booking = require('../models/Booking');

// Small helper: turn "10:00" and "12:00" into a duration in minutes.
function getDurationInMinutes(start, end) {
  const [startH, startM] = start.split(':').map(Number);
  const [endH, endM] = end.split(':').map(Number);
  return endH * 60 + endM - (startH * 60 + startM);
}

// POST /api/bookings - logged-in user creates a new booking request
async function createBooking(req, res) {
  try {
    const { room, date, startTime, endTime, purpose } = req.body;

    if (!room || !date || !startTime || !endTime) {
      return res.status(400).json({ message: 'Please fill in all fields' });
    }

    const duration = getDurationInMinutes(startTime, endTime);
    if (duration <= 0) {
      return res.status(400).json({ message: 'End time must be after start time' });
    }
    if (duration < 120 || duration > 180) {
      return res.status(400).json({ message: 'Bookings must be between 2 and 3 hours long' });
    }

    const booking = await Booking.create({
      user: req.user._id,
      room,
      date,
      startTime,
      endTime,
      purpose,
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Could not create booking', error: err.message });
  }
}

// GET /api/bookings/my - logged-in user's own bookings
async function getMyBookings(req, res) {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('room', 'name type')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Could not fetch bookings', error: err.message });
  }
}

// GET /api/bookings - admin only, every booking from every user
async function getAllBookings(req, res) {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name role')
      .populate('room', 'name type')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Could not fetch bookings', error: err.message });
  }
}

// PATCH /api/bookings/:id - admin only, approve or reject a request
async function updateBookingStatus(req, res) {
  try {
    const { status } = req.body; // expected: "approved" or "rejected"

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Status must be "approved" or "rejected"' });
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.status = status;
    await booking.save();

    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Could not update booking', error: err.message });
  }
}

module.exports = { createBooking, getMyBookings, getAllBookings, updateBookingStatus };
