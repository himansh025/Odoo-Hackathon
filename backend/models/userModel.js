const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['user', 'admin', 'support-agent'],
    default: 'user'
  },
  image:String,
  categoryInterest: {
    type: [String], // array of interests, e.g., ['tech', 'finance']
    default: []
  },
  preferredLanguage: {
    type: String, // e.g., 'en', 'hi', 'es'
    default: 'en'
  },
    resetPasswordToken: String,
  resetPasswordExpires: Date
});

module.exports = mongoose.model('User', userSchema);
