module.exports = function (a, b) {
  var c = a.define("Garage",
    {
      name: { type: b.STRING },
      address: { type: b.STRING },
      phoneNumber: { type: b.STRING }
    }
  );
  return c.associate = function (a) {
    c.hasMany(a.Vehicle,
      { onDelete: "cascade" }),
      c.belongsTo(a.User,
        {
          foreignKey: { allowNull: !1 }
        })
  },
    c
};