"use strict";

var delay = function delay(req, res, next) {
  if (req.path === "/login") {
    return next();
  }
  setTimeout(function () {
    if (req.headers.authorization) {
      var token = req.headers.authorization.split(" ")[1];
    }
    next();
  }, 2000);
};
module.exports = delay;