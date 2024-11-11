require("dotenv").config();
import jwt from "jsonwebtoken";

const securePath = ["/login", "/logout"];

const createJWT = (payload) => {
  let key = process.env.JWT_SECRET;
  let token = null;
  try {
    token = jwt.sign(payload, key, { expiresIn: process.env.JWT_EXPIRE });
  } catch (error) {
    console.log(error);
  }
  return token;
};

const verifyToken = (token) => {
  let key = process.env.JWT_SECRET;
  let decoded = null;
  try {
    decoded = jwt.verify(token, key);
    console.log(decoded);
  } catch (error) {
    console.log(error);
  }
  return decoded;
};

const extractToken = (req) => {
  if (req.headers.authorization) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
};

const checkUserJWT = (req, res, next) => {
  if (securePath.includes(req.path)) return next();
  // let cookies = req.cookies;
  // let tokenFromHeader = extractToken(req);
  // console;
  // if ((cookies && cookies.restaurant) || tokenFromHeader) {
  //   let token =
  //     cookies && cookies.restaurant ? cookies.restaurant : tokenFromHeader;
  //   let decoded = verifyToken(token);

  //   if (decoded) {
  //     req.user = decoded;
  //     req.token = token;
  //     next();
  //   } else {
  //     return res.status(401).json({
  //       EC: -1,
  //       DT: "",
  //       EM: "Not authenticated the user",
  //     });
  //   }
  // } else {
  //   return res.status(401).json({
  //     EC: -1,
  //     DT: "",
  //     EM: "Not authenticated the user",
  //   });
  // }
  setTimeout(() => {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
    }

    next();
  }, 3000);
};

module.exports = { createJWT, verifyToken, checkUserJWT };
