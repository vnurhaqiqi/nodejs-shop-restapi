const express = require("express");

const route = express.Router();

// == GET ALL ORDERS ==
route.get("/", (req, res, next) => {
    res.status(200).json({
        message: "GET orders"
    });
});

// == CREATE ORDER ==
route.post("/", (req, res, next) => {
    const orderPayload = {
        productId: req.body.productId,
        qty: req.body.qty
    }

    res.status(201).json({
        message: "order has been created",
        order: orderPayload
    });
});

// == GET DETAILS ORDER ==
route.get("/:orderId", (req, res, next) => {
    const orderId = req.params.orderId;

    if (orderId) {
        res.status(200).json({
            message: `GET order id ${orderId}`,
            id: orderId
        });
    } else {
        res.status(404).json({
            message: `order id ${orderId} not found`,
            id: orderId
        });
    }
});

// == UPDATE ORDER ==
route.patch("/:orderId", (req, res, next) => {
    const orderId = req.params.orderId;

    if (orderId) {
        res.status(200).json({
            message: `UPDATE order id ${orderId}`,
            id: orderId
        });
    } else {
        res.status(404).json({
            message: `order id ${orderId} not found`,
            id: orderId
        });
    }
});

// == DELETE ORDER ==
route.delete("/:orderId", (req, res, next) => {
    const orderId = req.params.orderId;

    if (orderId) {
        res.status(200).json({
            message: `DELETE order id ${orderId}`,
            id: orderId
        });
    } else {
        res.status(404).json({
            message: `order id ${orderId} not found`,
            id: orderId
        });
    }
});

module.exports = route;
