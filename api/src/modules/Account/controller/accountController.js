import accountService from "../service/accountService";

const getHomePage = (req, res) => {
  return res.send("Hello world from controller");
};

let handleLogin = async (req, res) => {
  try {
    let data = await accountService.handleLogin(req.body);
    if (data && data.DT && data.DT.access_token) {
      res.cookie("restaurant", data.DT.access_token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });
    }

    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Error from server",
      EC: "-1",
      DT: "",
    });
  }
};

let handleCreateAccounts = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(200).json({
        EM: "Missing required parameters",
        EC: "1",
        DT: "",
      });
    }

    let password = req.body.password;
    if (password && password.length < 4) {
      return res.status(200).json({
        EM: "Your password must have more than 3 letters",
        EC: "1",
        DT: "",
      });
    }

    let data = await accountService.handleCreateAccounts(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: "",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
};

const handleUpdateAccounts = async (req, res) => {
  let data = await accountService.handleUpdateAccounts(req.body);
  return res.status(200).json(data);
};

const handleDeleteAccounts = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      EC: -1,
      EM: "Missing required parameters",
    });
  }
  let data = await accountService.handleDeleteAccounts(req.body.id);
  return res.status(200).json(data);
};

const handleAllAccounts = async (req, res) => {
  try {
    let data = await accountService.handleAllAccounts();
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Error from server",
      EC: "-1",
      DT: "",
    });
  }
};

const handleLogout = () => {
  try {
    res.clearCookie("restaurant");
    return res.status(200).json({
      EM: "Clear cookies done!",
      EC: 0,
      DT: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
};

module.exports = {
  handleLogin,
  handleCreateAccounts,
  handleUpdateAccounts,
  handleDeleteAccounts,
  handleAllAccounts,
  handleLogout,
  getHomePage,
};
