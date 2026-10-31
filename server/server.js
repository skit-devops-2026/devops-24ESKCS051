// This is the entry point - the file you run with "node server.js" or
// "npm run dev". It wires everything else together.

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const roomRoutes = require('./routes/roomRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();

connectDB();

app.use(cors()); // lets the React app (on a different port) call this API
app.use(express.json()); // lets us read req.body as JSON

// Every route below is prefixed with /api/...
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);

// Simple health check, same idea as the one in the DevOps project.
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/', (req, res) => {
  res.send('Zenith API is running. Try GET /api/rooms');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Zenith server listening on port ${PORT}`);
});
