const express = require("express");

const { createRemind, getAllRemind, deleteRemind, updateRemind, getSingleRemind } = require("../controller/remindCtrl");

const remindRouter = express.Router();

remindRouter.post("/", createRemind);

remindRouter.get("/", getAllRemind);

remindRouter.get('/:id', getSingleRemind)

remindRouter.delete("/:id", deleteRemind );

remindRouter.put("/:id", updateRemind );

module.exports = remindRouter