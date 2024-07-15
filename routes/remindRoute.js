const express = require("express");

const { createRemind, getAllRemind, deleteRemind } = require("../controller/remindCtrl");

const remindRouter = express.Router();

remindRouter.post("/", createRemind);

remindRouter.get("/", getAllRemind);

remindRouter.delete("/:id", deleteRemind );

module.exports = remindRouter