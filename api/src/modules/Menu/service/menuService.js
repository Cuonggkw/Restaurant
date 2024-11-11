import Menus from "../../Menu/models/menu";
import Categories from "../../Category/models/category";

const getMenus = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let menus = await Menus.findAll({
        include: [
          {
            model: Categories,
            as: "categorieData",
            attributes: ["categoryName"],
          },
        ],
        raw: false,
        nest: true,
      });

      resolve({
        EC: 0,
        data: menus,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const handleCreateMenus = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.foodName ||
        !data.price ||
        !data.description ||
        !data.categorieId
      ) {
        resolve({
          EC: 1,
          EM: "Missing required parameter",
        });
      } else {
        await Menus.create({
          foodName: data.foodName,
          price: data.price,
          description: data.description,
          categorieId: data.categorieId,
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

const handleUpdateMenus = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          EC: 1,
          EM: "Missing required parameters",
        });
      }
      let menus = await Menus.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (menus) {
        menus.foodName = data.foodName;
        menus.price = data.price;
        menus.description = data.description;
        menus.categorieId = data.categorieId;
        menus.status = data.status;
        menus.image = data.image;

        await menus.save();
        resolve({
          EC: 0,
          EM: "Update the menu succeeds!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const handleDeleteMenus = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let menu = await Menus.findOne({
        where: { id: id },
      });
      if (!menu) {
        resolve({
          EC: 1,
          EM: "The menus isn't exist",
        });
      }
      await Menus.destroy({
        where: { id: id },
      });

      resolve({
        EC: 0,
        EM: "The menus is delete",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const handleAllMenus = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await Menus.findAll({});
      // if (data && data.length > 0) {
      //   data.map((item) => {
      //     item.image = new Buffer(item.image, "base64").toString("binary");
      //     return item;
      //   });
      // }
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

module.exports = {
  getMenus,
  handleCreateMenus,
  handleUpdateMenus,
  handleDeleteMenus,
  handleAllMenus,
};
