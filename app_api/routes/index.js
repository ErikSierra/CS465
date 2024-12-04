const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips'); // Import trips controller

// Route to get all trips
router
  .route('/trips')
  .get(tripsController.tripsList); // Handles GET requests for /api/trips

// Route to get a single trip by tripCode and update a trip
router
  .route('/trips/:tripCode')
  .get(tripsController.tripsListOne) // Handles GET /api/trips/:tripCode
  .put(tripsController.tripsUpdateTrip); // Handles PUT /api/trips/:tripCode

module.exports = router;
