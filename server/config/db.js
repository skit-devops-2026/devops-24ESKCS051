// This file's only job is to connect to MongoDB using Mongoose.
// We keep it separate from server.js so the "how do I connect to the
// database" logic lives in one obvious place.

const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    // If the database isn't reachable, there's no point running the server.
    process.exit(1);
  }
}

module.exports = connectDB;
