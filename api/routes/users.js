const express = require("express");

const userController = require("../controllers/users");
const checkAuthToken = require("../middlewares/check-auth");

const route = express.Router();

// == ADD USER ==
route.post("/signup", userController.users_signup);

// == SIGN IN USER ==
route.post("/signing", userController.users_signing);

// == GET USER PROFILE BY ID ==
route.get("/:userId", checkAuthToken, userController.users_get_profile_by_id);

// == UPDATE USER Profile ==
route.patch("/:userId", checkAuthToken, userController.users_update_profile);


module.exports = route;
