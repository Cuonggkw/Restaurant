import categoryService from "../service/categoryService";

const handleCreateCategories = async (req, res) => {
  try {
    const createCategories = await categoryService.CreateCategories(req.body);
    return res.status(200).json(createCategories);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EC: -1,
      EM: "Error from the server",
    });
  }
};

const handleAllCategory = async (req, res) => {
  try {
    const allCategory = await categoryService.handleAllCategory();
    return res.status(200).json(allCategory);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EC: -1,
      EM: "Error from the server",
    });
  }
};

const handleUpdateCategory = async (req, res) => {
  try {
    let updateCategory = await categoryService.handleUpdateCategory(req.body);
    return res.status(200).json(updateCategory);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EC: -1,
      EM: "Error from the server",
    });
  }
};

const handleDeleteCategory = async (req, res) => {
  try {
    if (!req.body.id) {
      return res.status(200).json({
        EC: 1,
        EM: "Missing required parameters",
      });
    }
    const deleteCategory = await categoryService.handleDeleteCategory(
      req.body.id
    );
    return res.status(200).json(deleteCategory);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EC: -1,
      EM: "Error from the server",
    });
  }
};

module.exports = {
  handleCreateCategories,
  handleAllCategory,
  handleUpdateCategory,
  handleDeleteCategory,
};
