# Zenith MERN Conversion - File Manifest

This folder contains the full MERN (MongoDB, Express, React, Node) rewrite
of Zenith, built as two independent apps:

- `server/` - the backend API (Express + MongoDB + JWT auth)
- `client/` - the frontend (React, built with Vite)

They run as two separate processes locally (backend on port 5000, frontend
on port 5173) and talk to each other over HTTP. See `server/README.md` and
`client/README.md` for setup steps - run those first before splitting up
who-commits-what, so you can confirm it actually works on your machine.

## Suggested split between you and your teammate

There's no hard rule here - pick whichever split feels natural - but since
the ask was "some files my teammates can commit and some I do," a clean way
to split it by folder is:

**Person A (backend):**
- Everything under `server/`
- `server/README.md`

**Person B (frontend):**
- Everything under `client/`
- `client/README.md`

Splitting by folder (rather than mixing frontend/backend files) keeps each
person's commits self-contained and easy to review, and matches the
one-commit-per-file pattern you've been using in your PRs.

## Where this goes

These files are meant to be committed into the SAME two repos you already
have:
- `devops-24ESKCS050`
- `devops-24ESKCS051`

They go in **alongside**, not instead of, the existing `frontend/`,
`server.js`, `Dockerfile`, and `k8s/` files already in those repos - those
are what your DevOps course (CSUL511) milestones are graded on, and nothing
here touches or deletes them. Put `client/` and `server/` (and this
`MANIFEST.md`) at the root of each repo, next to the existing folders.

## Before you commit: things to double check

1. `server/.env` and `client/.env` are NOT committed (they're already in
   each folder's `.gitignore`) - only the `.env.example` files should be
   committed. `.env` holds your real database connection string and JWT
   secret, which should never go in a public GitHub repo.
2. `node_modules/` is also git-ignored in both folders - don't force-add it.
3. Run `npm install` and `npm run dev` in both `server/` and `client/`
   locally at least once before committing, just to confirm nothing is
   missing on your machine.
4. The backend needs a running MongoDB instance (local or Atlas - see
   `server/README.md`) and a seeded `rooms` collection (`npm run seed` once)
   before bookings/rooms pages will show real data.

## One-sentence summary of what each major piece does

- **Auth** (`server/controllers/authController.js` +
  `client/src/pages/Login.jsx` / `Signup.jsx` / `src/context/AuthContext.jsx`):
  sign up, log in, and stay logged in using a JWT token.
- **Rooms** (`server/controllers/roomController.js` +
  `client/src/pages/Rooms.jsx`): lists classrooms and auditoriums pulled from
  the database instead of being hardcoded in HTML.
- **Bookings** (`server/controllers/bookingController.js` +
  `client/src/pages/Booking.jsx`): logged-in users submit a request; it
  starts as "pending".
- **Admin** (`server/middleware/authMiddleware.js`'s `adminOnly` +
  `client/src/pages/Admin.jsx`): only users with `role: admin` can see every
  request and approve/reject it.
