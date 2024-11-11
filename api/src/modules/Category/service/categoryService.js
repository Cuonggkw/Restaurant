import Categories from "../models/category";

const CreateCategories = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.categoryName || !data.parent_category_ID) {
        resolve({
          EC: 1,
          EM: "Missing required parameter",
        });
      } else {
        await Categories.create({
          categoryName: data.categoryName,
          parent_category_ID: data.parent_category_ID,
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

const handleAllCategory = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await Categories.findAll({});
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

const handleUpdateCategory = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          EC: 2,
          EM: "Missing required parameters",
        });
      }
      let category = await Categories.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (category) {
        category.categoryName = data.categoryName;
        category.parent_category_ID = data.parent_category_ID;
        category.status = data.status;

        await category.save();

        resolve({
          EC: 0,
          EM: "Update the category succeeds!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const handleDeleteCategory = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let category = await Categories.findOne({
        where: { id: id },
      });
      if (!category) {
        resolve({
          EC: 1,
          EM: "The category isn't exist",
        });
      }
      await Categories.destroy({
        where: { id: id },
      });

      resolve({
        EC: 0,
        EM: "The category is delete",
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  CreateCategories,
  handleAllCategory,
  handleUpdateCategory,
  handleDeleteCategory,
};
