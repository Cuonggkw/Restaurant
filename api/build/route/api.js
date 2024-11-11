"use strict";

var _express = _interopRequireDefault(require("express"));
var _tableController = _interopRequireDefault(require("../modules/Table/controller/tableController"));
var _categoryController = _interopRequireDefault(require("../modules/Category/controller/categoryController"));
var _menuController = _interopRequireDefault(require("../modules/Menu/controller/menuController"));
var _orderController = _interopRequireDefault(require("../modules/Order/controller/orderController"));
var _reservationController = _interopRequireDefault(require("../modules/Table/controller/reservationController"));
var _detailController = _interopRequireDefault(require("../modules/Order/controller/detailController"));
var _JWTAction = require("../middleware/JWTAction");
var _accountController = _interopRequireDefault(require("../modules/Account/controller/accountController"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
var apiWebRouter = function apiWebRouter(app) {
  // router.all("*", checkUserJWT);

  // Accounts
  router.get("/", _accountController["default"].getHomePage);
  router.post("/login", _accountController["default"].handleLogin);
  router.post("/logout", _accountController["default"].handleLogout);
  router.post("/account/create", _accountController["default"].handleCreateAccounts);
  router.put("/account/update", _accountController["default"].handleUpdateAccounts);
  router["delete"]("/account/detele", _accountController["default"].handleDeleteAccounts);
  router.get("/account", _accountController["default"].handleAllAccounts);

  // Tables
  router.post("/table/create", _tableController["default"].handleCreateTables);
  router.get("/table", _tableController["default"].handleAllTables);
  router.put("/table/update", _tableController["default"].handleUpdateTables);
  router["delete"]("/table/delete", _tableController["default"].handleDeleteTables);

  // Reservation
  router.post("/reservation/create", _reservationController["default"].handleCreateReservation);
  router.put("/reservation/update", _reservationController["default"].handleUpdateReservation);
  router["delete"]("/reservation/delete", _reservationController["default"].DeleteReservation);
  router.get("/reservation/detail", _reservationController["default"].DetailReservation);
  router.get("/reservation", _reservationController["default"].AllReservation);

  // Categories
  router.post("/categories/create", _categoryController["default"].handleCreateCategories);
  router.get("/categories", _categoryController["default"].handleAllCategory);
  router.put("/categories/update", _categoryController["default"].handleUpdateCategory);
  router["delete"]("/categories/delete", _categoryController["default"].handleDeleteCategory);

  // Menu
  router.get("/get/menus", _menuController["default"].getMenus);
  router.post("/menus/create", _menuController["default"].handleCreateMenus);
  router.get("/menus", _menuController["default"].handleAllMenus);
  router.put("/menus/update", _menuController["default"].handleUpdateMenus);
  router["delete"]("/menus/delete", _menuController["default"].handleDeleteMenus);

  // Order
  router.post("/orders/create", _orderController["default"].handleCreateOrders);
  router.get("/get/orders", _orderController["default"].getOrders);
  router.put("/orders/update", _orderController["default"].handleUpdateOrders);
  router["delete"]("/orders/delete", _orderController["default"].handleDeleteOrders);

  // Order Detail
  router.post("/detail/create", _detailController["default"].CreateDetails);
  router.put("/detail/update", _detailController["default"].UpdateDetails);
  router["delete"]("/detail/delete", _detailController["default"].DeleteDetails);
  router.get("/detail", _detailController["default"].orderDetail);
  return app.use("/restautant.com/v1/api/", router);
};
module.exports = apiWebRouter;