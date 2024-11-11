"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Orders", {
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
      total_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
        validate: { min: 0 },
      },
      status: {
        type: Sequelize.INTEGER,
      },
      notes: {
        type: Sequelize.TEXT("long"),
        allowNull: false,
      },
      payment: {
        type: Sequelize.ENUM("cash", "credit card", "debit card", "other"),
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
    await queryInterface.dropTable("Orders");
  },
};
