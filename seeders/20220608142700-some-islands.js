"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "islands",
      [
        {
          name: "Cherry Coast",
          description: "Lucious coastal island, full of delicious cherries",
          starterFruit:
            "https://www.models-resource.com/resources/big_icons/36/35111.png",
          starterFlower:
            "https://acnh.co/assets/img/nintendo-switch-acnh-flowers/white-lilies.png",
          backgroundColor: "#ff5723",
          textColor: "white",
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Applelonie",
          description: "The best apples of the world are found here",
          starterFruit:
            "https://www.models-resource.com/resources/big_icons/36/35108.png",
          starterFlower:
            "https://acnh.co/assets/img/nintendo-switch-acnh-flowers/white-mums.png",
          backgroundColor: "#ff3d40",
          textColor: "#a5f758",
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("islands", null, {});
  },
};
