import { DataTypes, Model } from "sequelize";
import sequelize from "../../../core/database";
import Tables from "../models/table";
import Accounts from "../../Account/models/account";
class Reservations extends Model {}

Reservations.init(
  {
    tableID: DataTypes.INTEGER,
    accountID: DataTypes.INTEGER,
    reservation_time: DataTypes.DATE,
    actual_arrival_time: DataTypes.DATE,
    guest_count: DataTypes.INTEGER,
    contact_info: DataTypes.STRING,
    status: DataTypes.ENUM(
      "Confirmed",
      "Pending",
      "Cancelled",
      "Arrived late",
      "Checked in"
    ),
  },
  {
    sequelize,
    modelName: "Reservations",
  }
);

Reservations.belongsTo(Tables, {
  foreignKey: "tableID",
  as: "tablesData",
  targetKey: "id",
});

Tables.hasMany(Reservations, {
  foreignKey: "tableID",
  as: "tablesData",
});

Reservations.belongsTo(Accounts, {
  foreignKey: "accountID",
  as: "accountsData",
  targetKey: "id",
});

Accounts.hasMany(Reservations, {
  foreignKey: "accountID",
  as: "accountsData",
});

module.exports = Reservations;
