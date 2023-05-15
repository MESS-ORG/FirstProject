const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  passportNumber: {
    type: String,
    required: true
  },
  destination: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destinations',
    required: true
  },
  airport: {
    name: {
      type: String,
      required: true
    },
    code: {
      type: String,
      required: true
    }
  },
  date: {
    type: Date,
    required: true
  }
});


const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;

