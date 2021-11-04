const express = require("express");
const mongoose = require("mongoose");
const checkAuthToken = require("../middlewares/check-auth");


const route = express.Router();

// == GET ALL PRODUCTS ==
route.get("/", (req, res, next) => {
    Product.find()
        .select("name price qty _id")
        .exec()
        .then(result => {
            const response = {
                count: result.length,
                data: result.map(product => {
                    return {
                        _id: product._id,
                        name: product.name,
                        qty: product.qty,
                        price: product.price,
                        request: {
                            type: "GET",
                            url: `${req.protocol}://${req.get('host')}${req.originalUrl}${product._id}`
                        }
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

// == ADD PRODUCT ==
route.post("/", checkAuthToken, (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        qty: req.body.qty,
        price: req.body.price
    });

    product.save().then(result => {
        const response = {
            message: "product has been created",
            data: {
                _id: result._id,
                name: result.name,
                qty: result.qty,
                price: result.price,
                request: {
                    type: "GET",
                    url: `${req.protocol}://${req.get('host')}${req.originalUrl}${result._id}`
                }
            }
        }
        res.status(201).json(response);
    }).catch(error => {
        res.status(500).json({ error: err });
    });
});

// == GET DETAIL PRODUCT ==
route.get("/:productId", (req, res, next) => {
    const productId = req.params.productId;

    Product.findById(productId)
        .exec()
        .then(result => {
            if (!result) {
                return res.status(404).json({
                    message: "product not found"
                })
            } else {
                const response = {
                    data: {
                        _id: result._id,
                        name: result.name,
                        qty: result.qty,
                        price: result.price,
                        request: {
                            type: "GET",
                            url: `${req.protocol}://${req.get('host')}${req.originalUrl}`
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

// == UPDATE PRODUCT ==
route.patch("/:productId", checkAuthToken, (req, res, next) => {
    const productId = req.params.productId;
    const updateData = {}

    for (const up of req.body) {
        updateData[up.propName] = up.value;
    }

    Product.updateOne({ _id: productId }, { $set: updateData })
        .exec()
        .then(result => {
            const response = {
                data: {
                    message: "product has been updated",
                    request: {
                        type: "GET",
                        url: `${req.protocol}://${req.get('host')}${req.originalUrl}${productId}`
                    }
                }
            }
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

// == DELETE PRODUCT ==
route.delete("/:productId", checkAuthToken, (req, res, next) => {
    const productId = req.params.productId;

    Product.remove({ _id: productId })
        .exec()
        .then(result => {
            res.status(200).json({ message: `product with ID ${productId} has been deleted` });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

module.exports = route;