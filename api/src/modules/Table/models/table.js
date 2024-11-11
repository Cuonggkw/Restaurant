"use strict";

import { DataTypes, Model } from "sequelize";
import sequelize from "../../../core/database/index";

class Tables extends Model {
  static associate(models) {
    // define association here
  }
}
Tables.init(
  {
    seating_capacity: DataTypes.INTEGER,
    status: DataTypes.ENUM("Occupied", "Vacant", "Damaged", "removed"),
  },
  {
    sequelize,
    modelName: "Tables",
  }
);

module.exports = Tables;
