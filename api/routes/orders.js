const express = require("express");

const checkAuthToken = require("../middlewares/check-auth");
const orderController = require("../controllers/orders");

const route = express.Router();

// == GET ALL ORDERS ==
route.get("/", checkAuthToken, orderController.orders_get_all);

// == CREATE ORDER ==
route.post("/", checkAuthToken, orderController.orders_create);

// == GET DETAILS ORDER ==
route.get("/:orderId", checkAuthToken, orderController.orders_get_by_id);

// == DELETE ORDER ==
route.delete("/:orderId", checkAuthToken, orderController.orders_delete_by_id);

module.exports = route;
