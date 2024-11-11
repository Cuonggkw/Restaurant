"use strict";

import { DataTypes, Model } from "sequelize";
import sequelize from "../../../core/database";
import Account from "../../Account/models/account";
import Table from "../../Table/models/table";

class Orders extends Model {
  static associate(models) {
    // define association here
  }
}
Orders.init(
  {
    tableID: DataTypes.INTEGER,
    accountID: DataTypes.INTEGER,
    total_price: DataTypes.DECIMAL(10, 2),
    status: DataTypes.INTEGER,
    notes: DataTypes.TEXT("long"),
    payment: DataTypes.ENUM("cash", "credit card", "debit card", "other"),
  },
  {
    sequelize,
    modelName: "Orders",
  }
);

Orders.belongsTo(Table, {
  foreignKey: "tableID",
  as: "tableData",
  targetKey: "id",
});

Table.hasMany(Orders, {
  foreignKey: "tableID",
  as: "tableData",
});

Orders.belongsTo(Account, {
  foreignKey: "accountID",
  as: "accountData",
  targetKey: "id",
});

Account.hasMany(Orders, {
  foreignKey: "accountID",
  as: "accountData",
});

module.exports = Orders;
