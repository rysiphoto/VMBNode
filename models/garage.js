module.exports = function (sequelize, Sequelize) {
  // brewery table -> name, address, phone,
  var Garage = sequelize.define('Garage', {
    name: { type: Sequelize.STRING },
    address: { type: Sequelize.STRING },
    phoneNumber: { type: Sequelize.STRING },
  });
  Garage.associate = function (models) {
    Garage.hasMany(models.Vehicle, {
      onDelete: 'cascade'
    });
    Garage.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Garage;
};