"use strict";

var _express = _interopRequireDefault(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _api = _interopRequireDefault(require("./route/api"));
var _connectDB = _interopRequireDefault(require("./config/connectDB"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
require("dotenv").config();
var cors = require("cors");
var app = (0, _express["default"])();
app.use(cors());
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
(0, _api["default"])(app);

// config cookie-parser
app.use((0, _cookieParser["default"])());
(0, _connectDB["default"])();
var port = process.env.PORT || 8000;

// app.use((req, res) => {
//   return res.send("404 not found");
// });

// test connection.

app.listen(port, function () {
  console.log("Example app listening on port ".concat(port));
});