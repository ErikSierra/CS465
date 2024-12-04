const mongoose = require('mongoose');

// Define the schema for a Trip
const tripSchema = new mongoose.Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  length: { type: String, required: true },
  start: { type: String, required: true },
  resort: { type: String, required: true },
  perPerson: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true }
});

// Export the model
module.exports = mongoose.model('Trip', tripSchema);
