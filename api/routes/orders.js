const express = require("express");
const mongoose = require("mongoose");
const checkAuthToken = require("../middlewares/check-auth");

const Order = require("../models/orders");
const Product = require("../models/products");

const route = express.Router();

// == GET ALL ORDERS ==
route.get("/", checkAuthToken, (req, res, next) => {
    Order.find()
        .populate("product", "name price")
        .exec()
        .then(result => {
            const response = {
                count: result.length,
                data: result.map(order => {
                    return {
                        _id: order._id,
                        qty: order.qty,
                        product: order.product,
                        request: {
                            type: "GET",
                            url: `${req.protocol}://${req.get('host')}${req.originalUrl}${order._id}`
                        }
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

// == CREATE ORDER ==
route.post("/", checkAuthToken, (req, res, next) => {
    Product.findById(req.body.productId)
        .then(product => {
            if (!product) {
                return res.status(500).json({
                    message: "product not found",
                });
            } else {
                const order = new Order({
                    _id: mongoose.Types.ObjectId(),
                    product: product._id,
                    qty: req.body.qty
                });
                return order.save();
            }
        }).then(result => {
            const response = {
                message: "order has been created",
                data: {
                    _id: result._id,
                    qty: result.qty,
                    product: result.product,
                    request: {
                        type: "GET",
                        url: `${req.protocol}://${req.get('host')}${req.originalUrl}${result._id}`
                    }
                }
            }
            res.status(201).json(response);
        }).catch(err => {
            res.status(500).json({ error: err });
        });
});

// == GET DETAILS ORDER ==
route.get("/:orderId", checkAuthToken, (req, res, next) => {
    const orderId = req.params.orderId;

    Order.findById(orderId)
        .populate("product", "name price")
        .exec()
        .then(result => {
            if (!result) {
                return res.status(404).json({
                    message: "order not found",
                });
            } else {
                const response = {
                    data: {
                        _id: result._id,
                        qty: result.qty,
                        product: result.product,
                        request: {
                            type: "GET",
                            url: `${req.protocol}://${req.get('host')}${req.originalUrl}/`
                        }
                    }
                }
                res.status(200).json(response);
            }
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

// == DELETE ORDER ==
route.delete("/:orderId", checkAuthToken, (req, res, next) => {
    const orderId = req.params.orderId;

    Order.remove({ _id: orderId })
        .exec()
        .then(result => {
            res.status(200).json({ message: `order with ID ${orderId} has been deleted` });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

module.exports = route;
