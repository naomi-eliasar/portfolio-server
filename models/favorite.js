"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      favorite.belongsTo(models.user, { foreignKey: "userId" });
      favorite.belongsTo(models.island, { foreignKey: "islandId" });
    }
  }
  favorite.init(
    {
      userId: DataTypes.INTEGER,
      islandId: DataTypes.INTEGER,
      villager: DataTypes.STRING,
      dreamie: DataTypes.BOOLEAN,
      resident: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "favorite",
    }
  );
  return favorite;
};
