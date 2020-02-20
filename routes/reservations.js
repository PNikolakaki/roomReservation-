const dateFormat = require("dateformat");
const { Reservation, validate } = require("./models/reservation");
const { User } = require("./models/user");
const { Room } = require("./models/room");
const moment = require("moment");
const { getDates } = require("./models/room");

const _ = require("lodash");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/:id", async (req, res) => {
  const reservation = await Reservation.findById(req.params.id);

  if (!reservation)
    return res
      .status(404)
      .send("The reservation with the given ID was not found.");

  res.send(
    _.pick(reservation, [
      "user.email",
      "room.name",
      "numberOfNights",
      "rentalFee"
    ])
  );
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send("User could not be found.");

  const room = await Room.findById(req.body.roomId);
  if (!room) return res.status(400).send("Room is not available.");

  let reservation = new Reservation({
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone
    },
    room: {
      _id: room._id,
      name: room.name
    },
    checkInDate: Date.parse(req.body.checkInDate),
    checkOutDate: Date.parse(req.body.checkOutDate)
  }); //new reservation

  var new_date = moment(reservation.checkInDate, "DD-MM-YYYY");
  var new_date2 = moment(reservation.checkOutDate, "DD-MM-YYYY");
  let new_dates = [];

  //EDW PERNAW TIS MERES POY THELEI NA KANEI KRATHSH
  while (new_date.toDate() < new_date2.toDate()) {
    new_dates.push(new_date.toDate()); //sto new_dates pernaw Date

    new_date = moment(new_date, "DD-MM-YYYY").add(1, "days");
  }
  console.log(new_dates, "New dates");

  await reservation.save();
  //EDW PREPEI NA GINEI ELEGXOS AN EINAI DIATHESIMO
  // tha elegxw gia th kathe mera p thelei na krathsei o xrhsths an einai mesa sto datesBooked array toy sygkekrimenou room

  // AN EINAI DIATHESIMO APOTHIKEYONTAI
  var p =
    (reservation.checkOutDate.getTime() - reservation.checkInDate.getTime()) /
    (1000 * 3600 * 24);

  reservation.numberOfNights = p;
  reservation.rentalFee = p * room.price;

  let today = reservation.checkInDate;
  while (today < reservation.checkOutDate) {
    room.datesBooked.push(today.setDate(today.getDate() + 1));
  }
  await room.save();

  await reservation.save();

  res.send(
    _.pick(reservation, [
      "user.email",
      "room.name",
      "numberOfNights",
      "rentalFee"
    ])
  );
});

router.delete("/:id", async (req, res) => {
  const reservation = await Reservation.findByIdAndRemove(req.params.id);

  if (!reservation)
    return res
      .status(404)
      .send("The reservtion with the given ID was not found.");

  res.send(reservation);
});
module.exports = router;
