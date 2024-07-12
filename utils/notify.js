const schedule = require('node-schedule')

const sendNotification = (message) => {
  if ("Notification" in window) {
    if (Notification.permission === "granted") {
      new Notification(message);
    } else if (Notification.permission === "denied") {
      console.log("Notification permission denied");
    } else {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(message);
        }
      });
    }
  } else {
    console.log("Notifications are not supported in this browser");
  }
};

// Helper function to schedule a notification
const scheduleNotification = (reminder) => {
  const reminderTime = new Date(reminder.time);
  const notificationTime = new Date(reminderTime.getTime() - 5 * 60000); // 5 minutes before the reminder time
    console.log("schedule Notification")
  schedule.scheduleJob(notificationTime, () => {
    console.log("Reminder:", reminder.message);
    // Add your notification logic here, e.g., sending a push notification or an email
    sendNotification(reminder.message);
  });
//   console.log(reminderTime, notificationTime)
};

module.exports = { scheduleNotification }

