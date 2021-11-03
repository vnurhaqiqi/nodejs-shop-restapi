const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/products");

const route = express.Router();

// == GET ALL PRODUCTS ==
route.get("/", (req, res, next) => {
    Product.find()
        .exec()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

// == ADD PRODUCT ==
route.post("/", (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        qty: req.body.qty,
        price: req.body.price
    });

    product.save().then(result => {
        res.status(201).json({
            message: "product has been created",
            product: result
        });
    }).catch(error => {
        res.status(500).json({ error: err });
    });
});

// == GET DETAIL PRODUCT ==
route.get("/:productId", (req, res, next) => {
    const productId = req.params.productId;

    Product.findById(productId)
        .exec()
        .then(data => {
            if (data) {
                res.status(200).json(data);
            } else {
                res.status(404).json({ message: `ID ${productId} is not found` })
            }
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

// == UPDATE PRODUCT ==
route.patch("/:productId", (req, res, next) => {
    const productId = req.params.productId;
    const updateData = {}

    for (const up of req.body) {
        updateData[up.propName] = up.value;
    }

    Product.updateOne({ _id: productId }, { $set: updateData })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

// == DELETE PRODUCT ==
route.delete("/:productId", (req, res, next) => {
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