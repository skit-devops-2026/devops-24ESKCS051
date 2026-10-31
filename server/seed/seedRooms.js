// Run this ONCE with "npm run seed" to fill the database with the same
// rooms that were on the old static rooms.html page. Safe to run again -
// it clears the Room collection first so you don't get duplicates.

require('dotenv').config();
const mongoose = require('mongoose');
const Room = require('../models/Room');

const rooms = [
  { name: 'Room 101', type: 'classroom', capacity: 40, facilities: 'Projector, Whiteboard' },
  { name: 'Room 110', type: 'classroom', capacity: 35, facilities: 'Whiteboard' },
  { name: 'Room 204', type: 'classroom', capacity: 50, facilities: 'Projector, AC, Whiteboard' },
  { name: 'Room 302', type: 'classroom', capacity: 45, facilities: 'Projector, Smart Board' },
  { name: 'Main Auditorium', type: 'auditorium', capacity: 300, facilities: 'Stage, Sound System, Projector, AC' },
  { name: 'Seminar Hall', type: 'auditorium', capacity: 120, facilities: 'Projector, Sound System, AC' },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected. Clearing old rooms...');

  await Room.deleteMany({});
  await Room.insertMany(rooms);

  console.log(`Inserted ${rooms.length} rooms.`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seeding failed:', err.message);
  process.exit(1);
});
