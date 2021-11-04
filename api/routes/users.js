const express = require("express");

const userController = require("../controllers/users");

const route = express.Router();

// == ADD USER ==
route.post("/signup", userController.users_signup);

// == SIGN IN USER ==
route.post("/signing", userController.users_signing);


module.exports = route;
