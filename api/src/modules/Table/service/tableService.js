import { where } from "sequelize";
import Tables from "../models/table";
import { raw } from "body-parser";

const handleCreateTable = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.seating_capacity || !data.status) {
        resolve({
          EC: 1,
          EM: "Missing required parameter",
        });
      } else {
        await Tables.create({
          seating_capacity: data.seating_capacity,
          status: data.status,
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

const handleAllTables = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await Tables.findAll({});

      resolve({
        EC: 0,
        EM: "OK",
        data,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const handleUpdateTables = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          EC: 2,
          EM: "Missing required parameters",
        });
      }

      let tables = await Tables.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (tables) {
        tables.seating_capacity = data.seating_capacity;
        tables.status = data.status;

        await tables.save();

        resolve({
          EC: 0,
          message: "Update the table succeeds!",
        });
      } else {
        resolve({
          EC: 1,
          message: "The table not found!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const handleDeleteTables = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let table = await Tables.findOne({
        where: { id: id },
      });
      if (!table) {
        resolve({
          EC: 1,
          EM: "The table isn't exist",
        });
      }
      await Tables.destroy({
        where: { id: id },
      });

      resolve({
        EC: 0,
        EM: "The table is delete",
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handleCreateTable,
  handleAllTables,
  handleUpdateTables,
  handleDeleteTables,
};
