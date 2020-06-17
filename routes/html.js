// Requiring path to so we can use relative routes to our HTML files
var db = require('../models');


// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require('../config/middleware/isLoggedIn');

module.exports = function (app) {

  app.get('/', function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      return res.redirect('/garage');
    }
    res.render('home', { className: 'login' });
  });

  app.get('/login', function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      return res.redirect('/brewery');
    }
    res.render('login.js', {
      className: 'login'
    });
  });
  app.get('/signup', function (req, res) {
    res.render('signup', { className: 'login' });
  });
  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get('/garage', function (req, res) {
    db.Garage.findAll({ raw: true }).then(function (garage) {
      res.render('garage.js', { breweries: garage, className: 'login' });
    });
    // will need to make a db call to get the user data...pass that data into the template

  });


  app.get('/vehicles', function (req, res) {
    db.Vehicle.findAll({ raw: true }).then(function (vehicle) {
      res.render('vehicle.js', { vehicles: vehicle, className: 'login' });
    });
  });
  app.get('/garage/add', isAuthenticated, function (req, res) {
    res.render('addGarage', { className: 'current' });
  });
  app.get('/vehicles/add', isAuthenticated, function (req, res) {
    res.render('addVehicle', { className: 'current' });
  });

  app.get('/users/:id', isAuthenticated, function (req, res) {
    db.User.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Garage]
    }).then(User => {
      // res.json(User);
      console.log(User);
      res.render('userDetails', { User: User, className: 'current' });
    });
  });


  app.get('/vehicles/:id', isAuthenticated, function (req, res) {
    db.Beer.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Garage]
    }).then(User => {
      res.render('userDetails', { User: User, className: 'current' });
    });
  });

  app.get('/garage/:id', isAuthenticated, function (req, res) {
    db.Vehicle.findAll({
      where: {
        GarageId: req.params.id
      }
    }).then(Vehicles => {
      console.log(Vehicles);
      res.render('addVehicle', { vehicles: Vehicles, className: 'current' });
    });
  });

  app.get('/garage/detail', isAuthenticated, function (req, res) {
    db.Vehicles.findAll({
      where: {
        UserId: garage.id
      }

    }).then(
      res.render('garageDetail', { vehicle: vehicle, className: 'current' }));
  });
};
