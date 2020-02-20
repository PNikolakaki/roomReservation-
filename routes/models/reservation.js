const Joi = require("joi");
const mongoose = require("mongoose");

const Reservation = mongoose.model(
  "Reservation",
  new mongoose.Schema({
    user: {
      type: new mongoose.Schema({
        name: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 50
        },
        phone: {
          type: String,
          required: true,
          minlength: 10,
          maxlength: 25
        },
        email: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 255
        }
      }),
      required: true
    },
    room: {
      type: new mongoose.Schema({
        name: {
          type: String,
          required: true,
          trim: true, //removes any paddings around the title
          minlength: 5,
          maxlength: 50
        }
      }),
      required: true
    },

    reservationDate: {
      type: Date,
      required: true,
      default: Date.now()
    },
    checkInDate: {
      type: Date,
      required: true
    },
    checkOutDate: {
      type: Date,
      required: true
    },
    numberOfNights: {
      type: Number
    },

    rentalFee: {
      type: Number,
      required: false
    }
  })
);

function validateRental(reservation) {
  const schema = {
    userId: Joi.string().required(), //because I want the client to send only the id
    roomId: Joi.string().required(),
    checkInDate: Joi.string().required(),
    checkOutDate: Joi.string().required()
  };

  return Joi.validate(reservation, schema);
}
exports.Reservation = Reservation;
exports.validate = validateRental;
