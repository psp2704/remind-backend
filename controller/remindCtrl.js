const Reminder = require('../model/reminderSchema');
const {appErr } = require('../utils/appErr')

const createRemind = async (req, res, next) => {
    const { customerName, acBrand, installationDate ,nextServiceDate} = req.body;
  
    const reminder = new Reminder({ customerName,  acBrand, installationDate ,nextServiceDate });
    try {
      await reminder.save();

      const reminders = await Reminder.find({})
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