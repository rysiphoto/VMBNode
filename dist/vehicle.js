module.exports = function (a, b) {
  var c = a.define("Vehicle",
    {
      make: { type: b.STRING },
      model: { type: b.STRING },
      trim: { type: b.STRING },
      year: { type: b.INTEGER, allowNull: !0 },
      color: { type: b.STRING },
      vin: { type: b.STRING },
      lp: { type: b.STRING },
    }
  );
  return c.associate = function (a) { c.belongsTo(a.Garage, { foreignKey: { allowNull: !1 } }) }, c
};