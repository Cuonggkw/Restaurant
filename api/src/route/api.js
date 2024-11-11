import express from "express";

import tableController from "../modules/Table/controller/tableController";
import categoryController from "../modules/Category/controller/categoryController";
import menuController from "../modules/Menu/controller/menuController";
import orderController from "../modules/Order/controller/orderController";
import reservationController from "../modules/Table/controller/reservationController";
import detailController from "../modules/Order/controller/detailController";
import { checkUserJWT } from "../middleware/JWTAction";
import accountController from "../modules/Account/controller/accountController";
const router = express.Router();

const apiWebRouter = (app) => {
  // router.all("*", checkUserJWT);

  // Accounts
  router.get("/", accountController.getHomePage);
  router.post("/login", accountController.handleLogin);
  router.post("/logout", accountController.handleLogout);
  router.post("/account/create", accountController.handleCreateAccounts);
  router.put("/account/update", accountController.handleUpdateAccounts);
  router.delete("/account/detele", accountController.handleDeleteAccounts);
  router.get("/account", accountController.handleAllAccounts);

  // Tables
  router.post("/table/create", tableController.handleCreateTables);
  router.get("/table", tableController.handleAllTables);
  router.put("/table/update", tableController.handleUpdateTables);
  router.delete("/table/delete", tableController.handleDeleteTables);

  // Reservation
  router.post(
    "/reservation/create",
    reservationController.handleCreateReservation
  );
  router.put(
    "/reservation/update",
    reservationController.handleUpdateReservation
  );
  router.delete("/reservation/delete", reservationController.DeleteReservation);
  router.get("/reservation/detail", reservationController.DetailReservation);
  router.get("/reservation", reservationController.AllReservation);

  // Categories
  router.post("/categories/create", categoryController.handleCreateCategories);
  router.get("/categories", categoryController.handleAllCategory);
  router.put("/categories/update", categoryController.handleUpdateCategory);
  router.delete("/categories/delete", categoryController.handleDeleteCategory);

  // Menu
  router.get("/get/menus", menuController.getMenus);
  router.post("/menus/create", menuController.handleCreateMenus);
  router.get("/menus", menuController.handleAllMenus);
  router.put("/menus/update", menuController.handleUpdateMenus);
  router.delete("/menus/delete", menuController.handleDeleteMenus);

  // Order
  router.post("/orders/create", orderController.handleCreateOrders);
  router.get("/get/orders", orderController.getOrders);
  router.put("/orders/update", orderController.handleUpdateOrders);
  router.delete("/orders/delete", orderController.handleDeleteOrders);

  // Order Detail
  router.post("/detail/create", detailController.CreateDetails);
  router.put("/detail/update", detailController.UpdateDetails);
  router.delete("/detail/delete", detailController.DeleteDetails);
  router.get("/detail", detailController.orderDetail);

  return app.use("/restautant.com/v1/api/", router);
};

module.exports = apiWebRouter;
