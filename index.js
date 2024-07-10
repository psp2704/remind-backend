require('./config/dbConnect')
const express = require("express");
const cors = require("cors");
const remindRouter = require("./routes/remindRoute");
const globalErrorHandler = require("./middleware/globalErrorHandler"); // Ensure this path is correct

const app = express();
const port = 7000;

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true })); // Ensure this path is correct
app.use("/reminders", remindRouter);

// Other routes and middleware here
// Error handling middleware

app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
