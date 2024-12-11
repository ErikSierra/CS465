const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips'); // Import trips controller
const authController = require('../controllers/authentication');
const jwt = require('jsonwebtoken'); // Enable JSON Web Tokens

// Method to authenticate our JWT
function authenticateJWT(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (authHeader == null) {
        console.log('Auth Header Required but NOT PRESENT!');
        return res.sendStatus(401); // Unauthorized
    }

    let headers = authHeader.split(' ');
    if (headers.length < 2) {
        console.log('Not enough tokens in Auth Header: ' + headers.length);
        return res.sendStatus(400); // Bad Request
    }

    const token = headers[1]; // Extract the token

    if (token == null) {
        console.log('Null Bearer Token');
        return res.sendStatus(401); // Unauthorized
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, verified) => {
        if (err) {
            console.log('Token Validation Error!', err);
            return res.status(401).json({ message: 'Token Validation Error!' });
        }
        req.auth = verified; // Set the auth param to the decoded object
        next(); // Continue to the next middleware or route handler
    });
}

// Define route for registration endpoint
router
    .route('/register')
    .post(authController.register);

// Define route for login endpoint
router
    .route('/login') 
    .post(authController.login);

// Define route for trips endpoint
router
    .route('/trips')
    .get(tripsController.tripsList) // GET Method routes tripList
    .post(authenticateJWT, tripsController.tripsAddTrip); // POST Method adds a Trip

// GET Method routes tripsFindByCode - requires parameter
// PUT Method routes tripsUpdateTrip - requires parameter
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode) // GET /api/trips/:tripCode
    .put(authenticateJWT, tripsController.tripsUpdateTrip); // PUT /api/trips/:tripCode

module.exports = router;
