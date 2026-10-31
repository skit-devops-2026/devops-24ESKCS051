// A User is anyone who can log in: a student, a teacher, or an admin.
// Passwords are never stored as plain text - see authController.js, where
// we hash the password with bcrypt before saving it here.

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true, // this stores the HASHED password, never the raw one
    },
    role: {
      type: String,
      enum: ['student', 'teacher', 'admin'],
      default: 'student',
    },
  },
  { timestamps: true } // adds createdAt / updatedAt automatically
);

module.exports = mongoose.model('User', userSchema);
