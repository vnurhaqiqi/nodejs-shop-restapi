const express = require("express");

const checkAuthToken = require("../middlewares/check-auth");

const productController = require("../controllers/products");


const route = express.Router();

// == GET ALL PRODUCTS ==
route.get("/", productController.products_get_all);

// == ADD PRODUCT ==
route.post("/", checkAuthToken, productController.products_create);

// == GET DETAIL PRODUCT ==
route.get("/:productId", productController.products_get_by_id);

// == UPDATE PRODUCT ==
route.patch("/:productId", checkAuthToken, productController.products_update_by_id);

// == DELETE PRODUCT ==
route.delete("/:productId", checkAuthToken, productController.products_delete_by_id);

module.exports = route;