const dateFormat = require("dateformat");
//const config = require("config");
const mongoose = require("mongoose");
const { createRoom, listRooms } = require("./routes/models/room");
const rooms = require("./routes/rooms");
const users = require("./routes/users");
const auth = require("./routes/auth");
const reservations = require("./routes/reservations");
const express = require("express");
const app = express();

// if (!config.get("jwtPrivateKey")) {
//   console.error("FATAL ERROR: jwtPrivateKey is not defined.");
//   process.exit(1);
// }

mongoose
  .connect("mongodb://localhost/room-reservation")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.use("/api/users", users);
app.use("/api/rooms", rooms);
app.use("/api/auth", auth);
app.use("/api/reservations", reservations);

// createRoom("Thessaloniki", [], 80, 80);
// createRoom("Santorini", [], 80, 80);
// createRoom("Crete", [], 120, 100);

// listRooms();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
