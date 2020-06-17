var bcrypt = require("bcryptjs");
module.exports = function (a, b) {
  var c = a.define("User",
    {
      email: {
        type: b.STRING, allowNull: !1,
        unique: !0, validate: { isEmail: !0 }
      },
      password: { type: b.STRING, allowNull: !1 }
    });
  return c.prototype.validPassword = function (a) { return bcrypt.compareSync(a, this.password) },
    c.addHook("beforeCreate", function (a) { a.password = bcrypt.hashSync(a.password, bcrypt.genSaltSync(10), null) }),
    c.associate = function (a) {
      c.hasMany(a.Brewery,
        { onDelete: "cascade" })
    }, c
};