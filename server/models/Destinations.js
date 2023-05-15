const mongoose = require('mongoose');

const DestinationsSchema = new mongoose.Schema({
  destination: {
    type: String,
    required: true
  },
  airports: [{
    name: {
      type: String,
      required: true
    },
    code: {
      type: String,
      required: true
    }
  }]
});

const Destinations = mongoose.model('Destinations', DestinationsSchema);

module.exports = Destinations;
