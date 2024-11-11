import tableService from "../service/tableService";

const handleCreateTables = async (req, res) => {
  try {
    const createTable = await tableService.handleCreateTable(req.body);
    return res.status(200).json(createTable);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EC: -1,
      EM: "Error from the server",
    });
  }
};

const handleAllTables = async (req, res) => {
  try {
    const allTables = await tableService.handleAllTables();
    return res.status(200).json(allTables);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EC: -1,
      EM: "Error from the server",
    });
  }
};

const handleUpdateTables = async (req, res) => {
  try {
    let data = await tableService.handleUpdateTables(req.body);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res(500).json({
      EC: -1,
      EM: "Error from the server",
    });
  }
};

const handleDeleteTables = async (req, res) => {
  try {
    if (!req.body.id) {
      return res.status(200).json({
        EC: 1,
        EM: "Missing required parameters",
      });
    }
    const deleteTable = await tableService.handleDeleteTables(req.body.id);
    return res.status(200).json(deleteTable);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EC: -1,
      EM: "Error from the server",
    });
  }
};

module.exports = {
  handleCreateTables,
  handleAllTables,
  handleUpdateTables,
  handleDeleteTables,
};
