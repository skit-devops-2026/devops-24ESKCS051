// "Middleware" just means: a function that runs BEFORE your route handler,
// and can either let the request continue (next()) or stop it.
//
// protect()      -> makes sure the person is logged in (has a valid token)
// adminOnly()    -> makes sure the logged-in person's role is "admin"

const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function protect(req, res, next) {
  const authHeader = req.headers.authorization; // looks like "Bearer <token>"

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not logged in' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach the logged-in user (minus the password) to the request so
    // every route after this one can read req.user.
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      return res.status(401).json({ message: 'User no longer exists' });
    }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

function adminOnly(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Admins only' });
  }
}

module.exports = { protect, adminOnly };
