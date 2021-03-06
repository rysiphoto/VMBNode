var db = require('../models'),
  passport = require('../config/passport');
module.exports = function (a) {
  a.post('/api/login',
    passport.authenticate('local'),
    function (a, b) { b.json(a.user) }),
    a.post('/api/signup',
      function (a, b) {
        db.User.create(a.body).then(function () { b.status(200).end() }).catch(function (a) { b.status(401).json(a) })
      }),
    a.post('/api/vehicles',
      function (a, b) {
        db.Vehicle.create(a.body).then(function () { b.status(200).end() }).catch(function (a) { b.status(401).json(a) })
      }),
    a.post('/api/garage',
      function (a, b) {
        db.Garage.create(a.body)
          .then(function (a) { b.status(200).json(a) }).catch(function (a) { b.status(401).json(a) })
      }),
    a.get('/logout',
      function (a, b) {
        a.logout(),
          b.redirect('/')
      }),
    a.get('/api/user_data',
      function (a, b) {
        a.user ? b.json({
          email: a.user.email,
          id: a.user.id
        }) : b.json({})
      })
};