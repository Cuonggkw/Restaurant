require("dotenv").config();
import bcrypt from "bcryptjs";
import Accounts from "../models/account";
import { createJWT } from "../../../middleware/JWTAction";

const salt = bcrypt.genSaltSync(10);

const hasUserPass = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Encryption password.
      const hashPassword = await bcrypt.hashSync(password, salt);
      // Promise chỉ need user resolve
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

const checkEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await Accounts.findOne({
        where: { email: email },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const checkPhone = (phone) => {
  return new Promise(async (resolve, reject) => {
    try {
      let phoneNumber = await Accounts.findOne({
        where: { phone: phone },
      });
      if (phoneNumber) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const checkPassword = (inputPass, hashPassword) => {
  return bcrypt.compareSync(inputPass, hashPassword); // true or false
};

const handleLogin = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let login = await Accounts.findOne({
        where: {
          email: data.email,
        },
      });

      if (login) {
        let isCorrectPass = checkPassword(data.password, login.password);
        if (isCorrectPass === true) {
          let payload = {
            email: login.email,
            username: login.username,
          };
          let token = createJWT(payload);
          resolve({
            EM: "OK!",
            EC: 0,
            DT: {
              access_token: token,
              email: login.email,
              username: login.username,
            },
          });
        }
      }
      console.log(
        ">>> Input user with email/phone: ",
        data.email,
        "password: ",
        data.password
      );
      resolve({
        EM: "Your email/phone number or password is incorrect!",
        EC: 1,
        DT: "",
      });
    } catch (error) {
      reject(error);
    }
  });
};

const handleCreateAccounts = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let checkUser = await checkEmail(data.email);
      if (checkUser === true) {
        resolve({
          EM: "The email is already exist",
          EC: 1,
        });
      }

      let isPhoneExist = await checkPhone(data.phone);
      if (isPhoneExist === true) {
        resolve({
          EM: "The phone number is already exist",
          EC: 1,
        });
      }
      let hashPassFrom = await hasUserPass(data.password);

      await Accounts.create({
        username: data.username,
        password: hashPassFrom,
        email: data.email,
        phone: data.phone,
        role: data.role,
        status: data.status,
      });

      resolve({
        EM: "A user is create successfully.",
        EC: 0,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const handleUpdateAccounts = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          EC: 2,
          EM: "Missing required parameters",
        });
      }
      let user = await Accounts.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        user.role = data.role;
        user.status = data.status;

        await user.save();
        resolve({
          EC: 0,
          EM: "Update the account succeeds!",
        });
      } else {
        resolve({
          EC: 1,
          EM: "Account not found!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const handleDeleteAccounts = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let account = await Accounts.findOne({
        where: { id: id },
      });
      if (!account) {
        resolve({
          EC: 1,
          EM: "The account isn't exist",
        });
      }
      await Accounts.destroy({
        where: { id: id },
      });

      resolve({
        EC: 0,
        EM: "The account is delete",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const handleAllAccounts = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await Accounts.findAll({
        attributes: ["id", "username", "email", "phone"],
        raw: true,
        nest: true,
      });

      if (users) {
        resolve({
          EM: "get data success",
          EC: 0,
          DT: users,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handleLogin,
  handleCreateAccounts,
  handleUpdateAccounts,
  handleDeleteAccounts,
  handleAllAccounts,
};
