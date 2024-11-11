import Orders from "../models/order";
import Account from "../../Account/models/account";
import Table from "../../Table/models/table";
import { where } from "sequelize";
import { raw } from "body-parser";

const handleCreateOrders = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.tableID ||
        !data.accountID ||
        !data.total_price ||
        !data.payment
      ) {
        resolve({
          EC: 1,
          EM: "Missing required parameter",
        });
      } else {
        await Orders.create({
          tableID: data.tableID,
          accountID: data.accountID,
          total_price: data.total_price,
          status: data.status,
          notes: data.notes,
          payment: data.payment,
        });

        resolve({
          EC: 0,
          EM: "Create success!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getOrders = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let orders = await Orders.findAll({
        include: [
          {
            model: Table,
            as: "tableData",
            attributes: ["id"],
          },
          {
            model: Account,
            as: "accountData",
            attributes: ["username", "role"],
          },
        ],
        raw: false,
        nest: true,
      });
      resolve({
        EC: 0,
        data: orders,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const handleUpdateOrders = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          EC: 1,
          EM: "Missing required parameters",
        });
      }
      let orders = await Orders.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (orders) {
        orders.tableID = data.tableID;
        orders.total_price = data.total_price;
        orders.payment = data.payment;

        await orders.save();
        resolve({
          EC: 0,
          message: "Update the orders succeeds!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const handleDeleteOrders = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let order = await Orders.findOne({
        where: { id: id },
      });
      if (!order) {
        resolve({
          EC: 1,
          EM: "The menus isn't exist",
        });
      }
      await Orders.destroy({
        where: { id: id },
      });
      resolve({
        EC: 0,
        EM: "The order is delete",
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handleCreateOrders,
  getOrders,
  handleUpdateOrders,
  handleDeleteOrders,
};
