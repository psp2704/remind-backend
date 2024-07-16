const Reminder = require('../model/reminderSchema');
const { appErr } = require('../utils/appErr');

const upComing = async (remind) => {
  if (remind && remind.length !== 0) {
    return remind.filter((installation) => {
      const serviceDate = new Date(installation.nextServiceDate);
      const today = new Date();
      const timeDifference = serviceDate.getTime() - today.getTime();
      const daysDifference = timeDifference / (1000 * 3600 * 24);
      return daysDifference <= 11;
    });
  } else {
    return [];
  }

};

const createRemind = async (req, res, next) => {
  const { customerName, acBrand, installationDate, nextServiceDate } = req.body;

  const reminder = new Reminder({ customerName, acBrand, installationDate, nextServiceDate });
  try {
    await reminder.save();

    const reminders = await Reminder.find({});
    const upcomingServices = await upComing(reminders);

    res.status(201).json({ reminders: reminders, upcomingServices: upcomingServices, status: "success" });
  } catch (error) {
    return next(appErr(error.message, 404));
  }
};

const getAllRemind = async (req, res, next) => {
  try {
    const reminders = await Reminder.find({});

    if (reminders.length === 0) {
      return res
        .status(200)
        .json({ status: "success", reminders: [], upcomingServices: [], message: "No reminders found" });
    } else {
      const upcomingServices = await upComing(reminders);
      return res.status(200).json({
        reminders: reminders,
        upcomingServices: upcomingServices,
        status: "success",
      });
    }
  } catch (error) {
    return next(appErr(error.message, 404));
  }
};

const deleteRemind = async (req, res, next) => {
  try {
    await Reminder.findByIdAndDelete(req.params.id);

    const reminders = await Reminder.find({});
    const upcomingServices = await upComing(reminders);

    res.status(200).json({
      status: "success",
      msg: "Reminder Deleted Successfully",
      reminders: reminders,
      upcomingServices: upcomingServices,
    });
  } catch (error) {
    return next(appErr(error.message, 404));
  }
};

const updateRemind = async (req, res, next) =>{
  const {customerName, acBrand, installationDate,nextServiceDate} = req.body
  try {
    const reminder = await Reminder.findByIdAndUpdate( req.params.id, {
      customerName,
      acBrand,
      installationDate,
      nextServiceDate
    });

    await reminder.save();

    const reminders = await Reminder.find({})
    const upcomingServices = await upComing(reminders);

    res.status(204).json({
      status: "success",
      msg: "Reminder Updated Successfully",
      reminders: reminders,
      upcomingServices: upcomingServices,
    })

  } catch (error) {
    return next(appErr(error.message, 404))
  }
}

const getSingleRemind = async (req, res, next) =>{
  try {
    const reminder = await Reminder.findById(req.params.id);
    res.status(200).json({
      status: "success",
      msg: "Reminder Found Successfully",
      reminder: reminder,
      })
  } catch (error) {
    return next(appErr(error.message, 404))
  }
}

module.exports = {
  createRemind,
  getAllRemind,
  deleteRemind,
  updateRemind,
  getSingleRemind
};
