"use strict";

import { DataTypes, Model } from "sequelize";
import sequelize from "../../../core/database";

class Categories extends Model {
  static associate(models) {}
}

Categories.init(
  {
    categoryName: DataTypes.STRING,
    parent_category_ID: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "Categories",
  }
);

Categories.belongsTo(Categories, {
  as: "parentCategory",
  foreignKey: "parent_category_ID",
  onDelete: "CASCADE",
});

module.exports = Categories;
