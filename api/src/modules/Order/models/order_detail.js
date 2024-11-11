"use strict";
import { DataTypes, Model } from "sequelize";
import sequelize from "../../../core/database";
import Orders from "../models/order";
import Menus from "../../Menu/models/menu";

class OrderDetails extends Model {
  static associate(models) {
    // define association here
  }
}
OrderDetails.init(
  {
    orderID: DataTypes.INTEGER,
    menuID: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "OrderDetails",
  }
);

OrderDetails.belongsTo(Orders, {
  foreignKey: "orderID",
  as: "orderDetailData",
  targetKey: "id",
});

Orders.hasMany(OrderDetails, {
  foreignKey: "orderID",
  as: "orderDetailData",
});

OrderDetails.belongsTo(Menus, {
  foreignKey: "menuID",
  as: "menuData",
  targetKey: "id",
});

Menus.hasMany(OrderDetails, {
  foreignKey: "menuID",
  as: "menuData",
});

module.exports = OrderDetails;
