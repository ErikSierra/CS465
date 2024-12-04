const Trip = require('../models/trip'); // Import the Trip model

// POST: /trips – Adds a new Trip
const tripsAddTrip = async (req, res) => {
  const newTrip = new Trip({
    code: req.body.code,
    name: req.body.name,
    length: req.body.length,
    start: req.body.start,
    resort: req.body.resort,
    perPerson: req.body.perPerson,
    image: req.body.image,
    description: req.body.description,
  });

  try {
    const q = await newTrip.save();
    if (!q) {
      return res.status(400).json({ message: 'Failed to add trip.' });
    } else {
      return res.status(201).json(q); // Corrected status code
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

// GET: /trips – Retrieves a list of trips
const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find({});
    if (!trips || trips.length === 0) {
      return res.status(404).json({ message: 'No trips found.' });
    } else {
      return res.status(200).json(trips);
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

// GET: /trips/:tripCode – Retrieves a single trip by tripCode
const tripsListOne = async (req, res) => {
  try {
    const trip = await Trip.findOne({ code: req.params.tripCode });
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found.' });
    }
    return res.status(200).json(trip);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// PUT: /trips/:tripCode – Updates an existing Trip
const tripsUpdateTrip = async (req, res) => {
  try {
    const updatedTrip = await Trip.findOneAndUpdate(
      { code: req.params.tripCode },
      {
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description,
      },
      { new: true } // Return the updated document
    );

    if (!updatedTrip) {
      return res.status(404).json({ message: 'Trip not found.' });
    }

    return res.status(200).json(updatedTrip); // Changed to 200 OK for an update
  } catch (err) {
    return res.status(500).json(err);
  }
};

// Export the methods
module.exports = {
  tripsAddTrip,
  tripsList,
  tripsListOne, // Added this method
  tripsUpdateTrip,
};
