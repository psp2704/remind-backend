const Reminder = require('../model/reminderSchema');
const {appErr } = require('../utils/appErr')

const createRemind = async (req, res, next) => {
    const { time, message } = req.body;
  
    const reminder = new Reminder({ time, message });
    try {
      await reminder.save();

      const reminders = await Reminder.find({})
      // scheduleNotification(reminder); // Schedule the reminder 5 minutes before the time
      res.status(201).json({reminders : reminders, status: "success"})
    } catch (error) {
        return next(appErr(error.message, 404));
    }
  }

  const getAllRemind =  async (req, res, next) => {
    try {
      const reminders = await Reminder.find({});
  
      if (reminders.length === 0) {
        return res
          .status(200)
          .json({ status: "success", reminders: [], message: "No reminders found" });
      } else {
        return res.status(200).json({
          reminders: reminders,
          status: "success",
        });
      }
    } catch (error) {
        return next(appErr(error.message, 404));
    }
  }

  module.exports = {
    createRemind,
    getAllRemind
  }