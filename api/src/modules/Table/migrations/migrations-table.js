"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Tables", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      seating_capacity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 4,
        validate: {
          min: 1,
        },
      },
      status: {
        type: Sequelize.ENUM("Occupied", "Vacant", "Damaged", "removed"),
        allowNull: false,
        defaultValue: "Vacant",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Tables");
  },
};
