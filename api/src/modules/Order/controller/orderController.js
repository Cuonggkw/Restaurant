import orderServive from "../service/orderService";

const handleCreateOrders = async (req, res) => {
  try {
    let createOrder = await orderServive.handleCreateOrders(req.body);
    return res.status(200).json(createOrder);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EC: -1,
      EM: "Error from the server",
    });
  }
};

const getOrders = async (req, res) => {
  try {
    let orders = await orderServive.getOrders();
    return res.status(200).json(orders);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EC: -1,
      EM: "Error from the server",
    });
  }
};

const handleUpdateOrders = async (req, res) => {
  try {
    let updateOrder = await orderServive.handleUpdateOrders(req.body);
    return res.status(200).json(updateOrder);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EC: -1,
      EM: "Error from the server",
    });
  }
};

const handleDeleteOrders = async (req, res) => {
  try {
    if (!req.body.id) {
      return res.status(200).json({
        EC: 1,
        EM: "Missing required parameters",
      });
    }
    let deleteOrder = await orderServive.handleDeleteOrders(req.body.id);
    return res.status(200).json(deleteOrder);
  } catch (e) {
    return res.status(500).json({
      EC: -1,
      EM: "Error from the server",
    });
  }
};

module.exports = {
  handleCreateOrders,
  getOrders,
  handleUpdateOrders,
  handleDeleteOrders,
};
