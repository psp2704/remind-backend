const express = require("express");

const { createRemind, getAllRemind } = require("../controller/remindCtrl");

const remindRouter = express.Router();

remindRouter.post("/", createRemind);

remindRouter.get("/", getAllRemind);

module.exports = remindRouter