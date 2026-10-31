const Room = require('../models/Room');

// GET /api/rooms - anyone can see the list of rooms
async function getRooms(req, res) {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: 'Could not fetch rooms', error: err.message });
  }
}

module.exports = { getRooms };
