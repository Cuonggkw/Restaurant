const reservationService = require("../service/reservationService");

const handleCreateReservation = async (req, res) => {
  try {
    let reservation = await reservationService.handleCreateReservation(
      req.body
    );
    return res.status(200).json(reservation);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EC: -1,
      EM: "Error from the server",
    });
  }
};

const handleUpdateReservation = async (req, res) => {
  try {
    let update = await reservationService.updateReservation(req.body);
    return res.status(200).json(update);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EC: -1,
      EM: "Error from the server",
    });
  }
};

const DeleteReservation = async (req, res) => {
  try {
    if (!req.body.id) {
      return res.status(200).json({
        EC: 1,
        EM: "Missing required parameters",
      });
    }
    let detele = await reservationService.DeleteReservation(req.body.id);
    return res.status(200).json(detele);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EC: -1,
      EM: "Error from the server",
    });
  }
};

const DetailReservation = async (req, res) => {
  try {
    let detail = await reservationService.DetailReservation(req.query.id);
    return res.status(200).json(detail);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EC: -1,
      EM: "Error from the server",
    });
  }
};

const AllReservation = async (req, res) => {
  try {
    let all = await reservationService.AllReservation();
    return res.status(200).json(all);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EC: -1,
      EM: "Error from the server",
    });
  }
};

module.exports = {
  handleCreateReservation,
  handleUpdateReservation,
  DeleteReservation,
  DetailReservation,
  AllReservation,
};
