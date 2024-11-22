const path = require('path');
const fs = require('fs');
const Mongoose = require('./db');
const Trip = require('./travlr');

// Resolve absolute path to trips.json
const tripsPath = path.resolve(__dirname, '../data/trips.json');
console.log('Resolved Path:', tripsPath);

// Read trips.json
var trips = JSON.parse(fs.readFileSync(tripsPath, 'utf8'));

// Seed the database
const seedDB = async () => {
    try {
        await Trip.deleteMany({});
        await Trip.insertMany(trips);
        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
};

// Close the connection and exit
seedDB().then(async () => {
    await Mongoose.connection.close();
    process.exit(0);
});
