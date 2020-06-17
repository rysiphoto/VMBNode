var db = require("../models"),
  isAuthenticated = require("../config/middleware/isLoggedIn");
module.exports = function (a) {
  a.get("/", function (a, b) {
    return a.user ? b.redirect("/garage") : void b.render("home",
      { className: "login" })
  }),
    a.get("/login", function (a, b) {
      return a.user ? b.redirect("/garage") : void b.render("login.js",
        { className: "login" })
    }),
    a.get("/signup",
      function (a, b) {
        b.render("signup",
          {
            className: "login"
          })
      }),
    a.get("/garage",
      function (a, b) {
        db.Garage.findAll({ raw: !0 })
          .then(function (a) {
            b.render("garage.js",
              {
                breweries: a,
                className: "login"
              })
          })
      }),
    a.get("/vehicles",
      function (a, b) {
        db.Vehicle.findAll({ raw: !0 })
          .then(function (a) {
            b.render("vehicle.js",
              {
                vehicles: a,
                className: "login"
              })
          })
      }),
    a.get("/garage/add", isAuthenticated, function (a, b) {
      b.render("addGarage",
        { className: "current" })
    }), a.get("/vehicles/add",
      isAuthenticated,
      function (a, b) {
        b.render("addVehicle",
          { className: "current" })
      }), a.get("/users/:id",
        isAuthenticated, function (a, b) {
          db.User.findOne(
            { where: { id: a.params.id }, include: [db.Garage] })
            .then(a => {
              console.log(a), b.render("userDetails",
                {
                  User: a,
                  className: "current"
                })
            })
        }),
    a.get("/vehicles/:id",
      isAuthenticated,
      function (a, b) {
        db.Vehicle.findOne({
          where: { id: a.params.id },
          include: [db.Garage]
        })
          .then(a => {
            b.render("userDetails",
              {
                User: a,
                className: "current"
              })
          })
      })
    , a.get("/garage/:id", isAuthenticated, function (a, b) {
      db.Vehicle.findAll({ where: { GarageId: a.params.id } })
        .then(a => {
          console.log(a), b.render("addVehicle"
            , { vehicles: a, className: "current" })
        })
    }),
    a.get("/garage/detail",
      isAuthenticated,
      function (a, b) {
        db.Vehicles.findAll({ where: { UserId: garage.id } }).then(b.render("garageDetail",
          { vehicle: vehicle, className: "current" }
        ))
      })
};