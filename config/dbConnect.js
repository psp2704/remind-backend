const mongoose = require('mongoose');
const { scheduleNotification } = require('../utils/notify')
const Reminder = require('../model/reminderSchema')

const dbConnect = async () => {
  try {
    await mongoose.connect("mongodb+srv://psp:xQe8hXhlQff36M9T@blog-application.9jfjbyh.mongodb.net/reminder-application?retryWrites=true&w=majority");
    console.log("DB connected");
    Reminder.find()
    .then((reminders) => {
      reminders.forEach((reminder) => {
        scheduleNotification(reminder);
      });
    })
    .catch((err) => console.error("Error fetching reminders", err));
  } catch (err) {
    console.log(err);
  }
};
dbConnect();
