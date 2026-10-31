# Zenith - Backend (server)

This is the Express + MongoDB API for Zenith. It handles user accounts,
rooms, and booking requests.

## What's inside

- `server.js` - the entry point. Starts the Express app and connects to MongoDB.
- `config/db.js` - connects to MongoDB using the `MONGO_URI` from `.env`.
- `models/` - Mongoose schemas (User, Room, Booking) - these define what a
  record looks like in the database.
- `controllers/` - the actual logic for each route (e.g. "create a booking",
  "log a user in").
- `routes/` - maps a URL + HTTP method (like `POST /api/auth/login`) to a
  controller function.
- `middleware/authMiddleware.js` - checks the JWT token on protected routes,
  and checks if the logged-in user is an admin.
- `seed/seedRooms.js` - a script to fill the database with the starting list
  of rooms (same rooms as the old static site).

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Copy `.env.example` to `.env` and fill in the values:
   ```
   cp .env.example .env
   ```
   By default `MONGO_URI` points to a local MongoDB
   (`mongodb://localhost:27017/zenith`). If you don't have MongoDB installed
   locally, the easiest option is a free MongoDB Atlas cluster - create one
   at https://www.mongodb.com/cloud/atlas, get the connection string it gives
   you, and paste it in as `MONGO_URI` instead.

3. Seed the rooms (only needs to be run once):
   ```
   npm run seed
   ```

4. Start the server:
   ```
   npm run dev
   ```
   This runs on `http://localhost:5000` by default (change `PORT` in `.env`
   if you need a different port). `npm run dev` uses nodemon, so it restarts
   automatically whenever you save a file.

## API routes (quick reference)

| Method | Route                  | Who can call it      | What it does                 |
|--------|-------------------------|-----------------------|-------------------------------|
| POST   | /api/auth/signup        | anyone                | create an account             |
| POST   | /api/auth/login         | anyone                | log in, get a token           |
| GET    | /api/rooms               | anyone                | list all rooms                |
| POST   | /api/bookings            | logged-in user        | request a booking             |
| GET    | /api/bookings/my         | logged-in user        | see your own requests         |
| GET    | /api/bookings             | admin only            | see every request             |
| PATCH  | /api/bookings/:id         | admin only            | approve/reject a request      |
| GET    | /health                  | anyone                | health check                  |

All logged-in-only routes expect a header: `Authorization: Bearer <token>`,
where `<token>` is what you get back from signup/login.
