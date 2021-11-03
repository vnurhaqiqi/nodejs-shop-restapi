const express = require("express");

const route = express.Router();

// == GET ALL PRODUCTS ==
route.get("/", (req, res, next) => {
    res.status(200).json({
        message: "GET products"
    })
});

// == ADD PRODUCT ==
route.post("/", (req, res, next) => {
    const productPayload = {
        name: req.body.name,
        qty: req.body.qty,
        price: req.body.price
    }

    res.status(201).json({
        message: "product has been created",
        product: productPayload
    });
});

// == GET DETAIL PRODUCT ==
route.get("/:productId", (req, res, next) => {
    const productId = req.params.productId;

    if (productId) {
        res.status(200).json({
            message: `GET product id ${productId}`,
            id: productId
        });
    } else {
        res.status(404).json({
            message: `product id ${productId} not found`,
            id: productId
        });
    }
});

// == UPDATE PRODUCT ==
route.patch("/:productId", (req, res, next) => {
    const productId = req.params.productId;

    if (productId) {
        res.status(200).json({
            message: `UPDATE product id ${productId}`,
            id: productId
        });
    } else {
        res.status(404).json({
            message: `product id ${productId} not found`,
            id: productId
        });
    }
});

// == DELETE PRODUCT ==
route.delete("/:productId", (req, res, next) => {
    const productId = req.params.productId;

    if (productId) {
        res.status(200).json({
            message: `DELETE product id ${productId}`,
            id: productId
        });
    } else {
        res.status(404).json({
            message: `product id ${productId} not found`,
            id: productId
        });
    }
});

module.exports = route;