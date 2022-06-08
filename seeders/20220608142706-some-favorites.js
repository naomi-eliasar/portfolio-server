"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "favorites",
      [
        {
          userId: 1,
          islandId: 1,
          villager: "Melba",
          dreamie: false,
          resident: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          islandId: 1,
          villager: "Marlo",
          dreamie: true,
          resident: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          islandId: 2,
          villager: "Alfonso",
          dreamie: true,
          resident: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          islandId: 2,
          villager: "Rex",
          dreamie: false,
          resident: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("favorites", null, {});
  },
};
