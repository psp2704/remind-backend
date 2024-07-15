const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  
  customerName : {
    type: String,
    required : true
  },
  acBrand : {
    type: String,
    required : true
  },
  installationDate: {
    type: Date,
    required: true
  },
  nextServiceDate: {
    type: Date,
    required: true
  },

});

const Reminder = mongoose.model('Reminder', reminderSchema);

module.exports = Reminder;
