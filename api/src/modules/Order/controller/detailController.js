import detailService from "../service/detailService";

const CreateDetails = async (req, res) => {
  try {
    let create = await detailService.CreateDetails(req.body);
    return res.status(200).json(create);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EC: -1,
      EM: "Error from the server",
    });
  }
};

const UpdateDetails = async (req, res) => {
  try {
    let update = await detailService.UpdateDetails(req.body);
    return res.status(200).json(update);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EC: -1,
      EM: "Error from the server",
    });
  }
};

const DeleteDetails = async (req, res) => {
  try {
    if (!req.body.id) {
      return res.status(200).json({
        EC: 1,
        EM: "Missing required parameters",
      });
    }
    let deleted = await detailService.DeleteDetails(req.body.id);
    return res.status(200).json(deleted);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EC: -1,
      EM: "Error from the server",
    });
  }
};

const orderDetail = async (req, res) => {
  try {
    let detail = await detailService.orderDetail(req.query.id);
    return res.status(200).json(detail);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EC: -1,
      EM: "Error from the server",
    });
  }
};

module.exports = { CreateDetails, UpdateDetails, DeleteDetails, orderDetail };
