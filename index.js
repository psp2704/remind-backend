// require('./config/dbConnect');
const cors = require('cors')
const express = require("express");
const mongoose = require("mongoose");
const schedule = require("node-schedule");
const Reminder = require("./model/reminderSchema"); // Import the model


const app = express();
app.use(cors());
const port = 7000;

app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://psp:xQe8hXhlQff36M9T@blog-application.9jfjbyh.mongodb.net/reminder-application?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB");

    // Schedule existing reminders on server start
    Reminder.find()
      .then((reminders) => {
        reminders.forEach((reminder) => {
          schedule.scheduleJob(new Date(reminder.time), () => {
            console.log("Reminder:", reminder.message);
            // Add notification and audio logic here
          });
        });
      })
      .catch((err) => console.error("Error fetching reminders", err));
  })
  .catch((err) => console.error("Could not connect to MongoDB...", err));

app.post("/reminders", async (req, res) => {
  const { time, message } = req.body;

  const reminder = new Reminder({ time, message });

  try {
    await reminder.save();

    // Schedule the reminder
    schedule.scheduleJob(new Date(reminder.time), () => {
      console.log("Reminder:", reminder.message);
      // Add notification and audio logic here
    });

    res.status(201).send("Reminder added");
  } catch (error) {
    res.status(400).send("Error adding reminder");
  }
});

app.get('/reminders', async (req, res)=>{
    try {
        const reminders = await Reminder.find({});

        if (reminders.length === 0) {
            return res.status(200).send("No reminders found");
        }else {
            return res.status(200).json({
                reminders : reminders,
                status : "success"
            })
        }
    } catch (error) {
       console.log(error.message);
    }
})

app.get('/', (req, res)=>{
    res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
