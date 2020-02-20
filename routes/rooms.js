const { Room } = require("./models/room");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const rooms = await Room.find().sort("price");
  res.send(rooms);
});

router.get("/:id", async (req, res) => {
  const room = await Room.findById(req.params.id);

  if (!room)
    return res.status(404).send("The room with the given ID was not found.");

  res.send(room);
});

module.exports = router;
