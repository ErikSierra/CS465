const express = require('express');      // Express app
const router = express.Router();        // Router logic

// This is where we import the controllers we will route
const tripsController = require('../controllers/trips');

// Define route for our trips endpoint
router
    .route('/trips')
    .get(tripsController.tripsList);    // GET Method routes tripsList

module.exports = router;