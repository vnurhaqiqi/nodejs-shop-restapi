const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    qty: Number,
    price: Number
});

module.exports = mongoose.model("Product", productSchema);