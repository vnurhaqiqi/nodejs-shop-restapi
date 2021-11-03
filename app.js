const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const handlers = require("./handlers");

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//== ALLOW HEADERS ==
app.use(handlers.allowHeaders);

// == ROUTES ==
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);


// == ERROR HANDLERS ==
app.use(handlers.notFoundHandler);
app.use(handlers.errorHandler);


module.exports = app;