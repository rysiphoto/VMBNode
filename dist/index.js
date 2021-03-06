'use strict';
var fs = require("fs"),
  path = require("path"),
  Sequelize = require("sequelize"),
  basename = path.basename(module.filename),
  env = process.env.NODE_ENV || "development",
  config = require(__dirname + "/../config/config.js")[env], db = {};
if (config.use_env_variable)
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
else
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
fs.readdirSync(__dirname).filter(function (a) {
  return 0 !== a.indexOf(".") && a !== basename && ".js" === a.slice(-3)
}).forEach(function (a) {
  var b = sequelize["import"](path.join(__dirname, a));
  db[b.name] = b
}),
  Object.keys(db).forEach(function (a) { db[a].associate && db[a].associate(db) }),
  db.sequelize = sequelize,
  db.Sequelize = Sequelize,
  module.exports = db;