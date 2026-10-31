// A Room is a classroom or auditorium that can be booked.
// These get created once with the seed script (see seed/seedRooms.js)
// and then just get read by the Rooms page and the booking form.

const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // e.g. "Room 204" or "Main Auditorium"
  },
  type: {
    type: String,
    enum: ['classroom', 'auditorium'],
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  facilities: {
    type: String, // simple comma-separated text, e.g. "Projector, AC"
    default: '',
  },
});

module.exports = mongoose.model('Room', roomSchema);
