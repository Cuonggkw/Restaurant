"use strict";

require("dotenv").config();
var fs = require("fs");
var process = require("process");
var path = require("path");
var basename = path.basename(__filename);
var Sequelize = require("sequelize");
var env = "development";
// const config = require(__dirname + "/../../config/config.json")[env];

var sequelize;
var customizeConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
  query: {
    raw: true
  },
  timezone: "+07:00"
};
sequelize = new Sequelize(process.env.DB_DATABASE_NAME, process.env.BD_USERNAME, process.env.DB_PASSWORD, customizeConfig);

// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(
//     config.database,
//     config.username,
//     config.password,
//     config
//   );
// }

fs.readdirSync(__dirname).filter(function (file) {
  return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js" && file.indexOf(".test.js") === -1;
}).forEach(function (file) {
  var model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
  sequelize[model.name] = model;
});
Object.keys(sequelize).forEach(function (modelName) {
  if (sequelize[modelName].associate) {
    sequelize[modelName].associate(sequelize);
  }
});
module.exports = sequelize;