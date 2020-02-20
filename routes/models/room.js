const Joi = require("joi");
const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, //removes any paddings around the title
    minlength: 5,
    maxlength: 50
  },
  datesBooked: [Date],
  //photos:[Image]
  size: {
    type: Number
  },
  price: {
    type: Number,
    min: 20,
    required: true
  }
});

const Room = mongoose.model("Room", roomSchema);

async function createRoom(name, [datesBooked], size, price) {
  //description k photos mazi stn allon pinaka
  //authors
  const room = new Room({
    name,
    datesBooked,
    size,
    price
  });

  const result = await room.save();
  console.log(result);
}

async function listRooms() {
  const rooms = await Room.find();
  console.log(rooms);
}

exports.createRoom = createRoom;
exports.listRooms = listRooms;
exports.Room = Room;
