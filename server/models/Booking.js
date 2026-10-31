// A Booking is one request: "I want this room, on this date, for this
// time range." It starts as "pending" and the admin changes it to
// "approved" or "rejected".

const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      required: true,
    },
    date: {
      type: String, // stored as "YYYY-MM-DD" to keep this beginner-simple
      required: true,
    },
    startTime: {
      type: String, // "HH:MM"
      required: true,
    },
    endTime: {
      type: String, // "HH:MM"
      required: true,
    },
    purpose: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
