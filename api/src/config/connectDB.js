require("dotenv").config();
import { query } from "express";
import fs from "fs";
const { Sequelize } = require("sequelize");

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(
  process.env.DB_DATABASE_NAME,
  process.env.BD_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: false,
    query: {
      raw: true,
    },
    timezone: "+07:00",
  }
);

let connect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = connect;
