"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Reservations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      tableID: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      accountID: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      reservation_time: {
        type: Sequelize.DATE,
      },
      actual_arrival_time: {
        type: Sequelize.DATE,
        defaultValue: null,
        allowNull: true,
      },
      guest_count: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      contact_info: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM(
          "Confirmed",
          "Pending",
          "Cancelled",
          "Arrived late",
          "Checked in"
        ),
        allowNull: false,
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
    await queryInterface.dropTable("Reservations");
  },
};
