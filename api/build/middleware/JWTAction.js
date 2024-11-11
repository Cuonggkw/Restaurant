"use strict";

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
require("dotenv").config();
var securePath = ["/login", "/logout"];
var createJWT = function createJWT(payload) {
  var key = process.env.JWT_SECRET;
  var token = null;
  try {
    token = _jsonwebtoken["default"].sign(payload, key, {
      expiresIn: process.env.JWT_EXPIRE
    });
  } catch (error) {
    console.log(error);
  }
  return token;
};
var verifyToken = function verifyToken(token) {
  var key = process.env.JWT_SECRET;
  var decoded = null;
  try {
    decoded = _jsonwebtoken["default"].verify(token, key);
    console.log(decoded);
  } catch (error) {
    console.log(error);
  }
  return decoded;
};
var extractToken = function extractToken(req) {
  if (req.headers.authorization) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
};
var checkUserJWT = function checkUserJWT(req, res, next) {
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
  setTimeout(function () {
    if (req.headers.authorization) {
      var token = req.headers.authorization.split(" ")[1];
    }
    next();
  }, 3000);
};
module.exports = {
  createJWT: createJWT,
  verifyToken: verifyToken,
  checkUserJWT: checkUserJWT
};