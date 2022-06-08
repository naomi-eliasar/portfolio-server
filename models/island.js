"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class island extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      island.belongsTo(models.user, { foreignKey: "userId" });
      island.hasMany(models.favorite, { foreignKey: "islandId" });
    }
  }
  island.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      starterFruit: DataTypes.STRING,
      starterFlower: DataTypes.STRING,
      backgroundColor: DataTypes.STRING,
      textColor: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "island",
    }
  );
  return island;
};
