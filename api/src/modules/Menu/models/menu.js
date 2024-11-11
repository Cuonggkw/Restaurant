import { DataTypes, Model } from "sequelize";
import sequelize from "../../../core/database";
import Categories from "../../Category/models/category";

class Menus extends Model {
  static associate(models) {}
}
Menus.init(
  {
    foodName: DataTypes.STRING,
    price: DataTypes.DECIMAL(10, 2),
    description: DataTypes.TEXT("long"),
    categorieId: DataTypes.INTEGER,
    image: DataTypes.STRING,
    status: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "Menus",
  }
);

Menus.belongsTo(Categories, {
  foreignKey: "categorieId",
  as: "categorieData",
  targetKey: "id",
});

Categories.hasMany(Menus, {
  foreignKey: "categorieId",
  as: "categorieData",
});

module.exports = Menus;
