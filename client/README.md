# Zenith - Frontend (client)

This is the React app (built with Vite) for Zenith.

## What's inside

- `src/main.jsx` - the entry point. Sets up the router and auth context, then
  renders `<App />`.
- `src/App.jsx` - defines every page/URL in the site (the router).
- `src/pages/` - one file per page (Home, Login, Signup, Rooms, Booking,
  Admin, Faq, About).
- `src/components/` - reusable pieces: `Navbar.jsx` (top nav bar) and
  `ProtectedRoute.jsx` (blocks a page unless you're logged in / an admin).
- `src/context/AuthContext.jsx` - keeps track of who's logged in across the
  whole app, and exposes `login()`, `signup()`, `logout()`.
- `src/api/api.js` - a shared Axios instance that automatically attaches your
  login token to every request.
- `src/index.css` - all the styling for the whole site, plain CSS.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Make sure the backend (the `server/` folder) is running on
   `http://localhost:5000` first - the frontend talks to it.

3. Start the dev server:
   ```
   npm run dev
   ```
   This opens on `http://localhost:5173` by default. Any request to `/api/...`
   is automatically forwarded to the backend during development (see the
   `proxy` setting in `vite.config.js`), so you don't need to deal with CORS
   while developing locally.

4. To build for production (a real deployment, not local dev):
   ```
   npm run build
   ```
   This creates a `dist/` folder with the final HTML/CSS/JS. If you deploy the
   frontend and backend separately (e.g. frontend on Netlify/Vercel, backend
   on Render), set `VITE_API_URL` in a `.env` file to your backend's full URL
   (see `.env.example`) before building.

## How login works (plain-language version)

1. You sign up or log in. The backend checks your password and sends back a
   "token" (a long random-looking string) plus your user info.
2. The frontend saves that token in the browser's `localStorage` and keeps
   your user info in `AuthContext`.
3. Every time the frontend talks to the backend after that, it automatically
   attaches `Authorization: Bearer <token>` to the request (see
   `src/api/api.js`). This is how the backend knows who's making the request
   without you having to log in again on every page.
4. Logging out just clears that saved token and user info.
