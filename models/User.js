const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 24,
  },
  surname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    uppercase: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    maxlength: 9,
    minlength: 9,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.export = mongoose.model('User', UserSchema);
