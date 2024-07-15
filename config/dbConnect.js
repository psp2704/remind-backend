const mongoose = require('mongoose');
const Reminder = require('../model/reminderSchema')

const dbConnect = async () => {
  try {
    await mongoose.connect("mongodb+srv://psp:xQe8hXhlQff36M9T@blog-application.9jfjbyh.mongodb.net/reminder-application?retryWrites=true&w=majority");
    console.log("DB connected");

  } catch (err) {
    console.log(err);
  }
};
dbConnect();
