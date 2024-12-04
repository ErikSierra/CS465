var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors'); // Import CORS middleware

var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');
var travelRouter = require('./app_server/routes/travel');
var apiRouter = require('./app_api/routes/index');

var handlebars = require('hbs');

// Bring in the database
require('./app_api/models/db');

var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
handlebars.registerPartials(__dirname + '/app_server/views/partials');
app.set('view engine', 'hbs');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Enable CORS
app.use(cors({
  origin: 'http://localhost:4200', // Allow requests from Angular frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
}));

// Debugging logs
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Mount Routers
app.use('/api', apiRouter); // API routes
app.use('/', indexRouter); // Main routes
app.use('/users', usersRouter); // User routes
app.use('/travel', travelRouter); // Travel routes

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
