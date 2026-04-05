const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // ensures no duplicate emails
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: "https://via.placeholder.com/150", // default avatar
  },
  bio: {
    type: String,
    default: "Hey there! I'm using iNotebook."
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

const User = mongoose.model('user', UserSchema);
module.exports = User;
