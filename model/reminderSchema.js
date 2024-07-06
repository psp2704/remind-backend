const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  time: {
    type: Date,
    required: true
  },
  message: {
    type: String,
    required: true
  }
});

const Reminder = mongoose.model('Reminder', reminderSchema);

module.exports = Reminder;
