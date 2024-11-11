const { Sequelize, DataTypes, Model } = require("sequelize");
import sequelize from "../../../core/database";

class Accounts extends Model {
  static associate(models) {
    // define association here
  }
}

Accounts.init(
  {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    role: DataTypes.ENUM("Admin", "Manager", "Server", "Chef", "Receptionist"),
    status: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "Accounts",
  }
);

module.exports = Accounts;
