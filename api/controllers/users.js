const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

// == USER SIGNUP ==
exports.users_signup = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "user already exist"
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: mongoose.Types.ObjectId(),
                            name: req.body.name,
                            email: req.body.email,
                            password: hash
                        })
                            .save()
                            .then(result => {
                                const response = {
                                    message: "user has been registered"
                                }
                                res.status(201).json(response);
                            })
                            .catch(err => {
                                res.status(500).json({ error: err });
                            });
                    }
                });
            }
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
};

// == USERS SIGNING ==
exports.users_signing = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .exec()
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: "auth failed: email unregistered"
                });
            }

            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "auth failed"
                    });
                }
                if (result) {
                    const jwtPayload = {
                        id: user._id,
                        name: user.name,
                        email: user.email
                    }

                    const token = jwt.sign(jwtPayload, process.env.JWT_KEY, { expiresIn: "12h" });

                    return res.status(200).json({
                        message: "auth success",
                        token: token,
                        userId: user._id
                    });
                }
                return res.status(401).json({
                    message: "auth failed: wrong email and password"
                });
            });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
};

// == GET USER PROFILE ==
exports.users_get_profile_by_id = (req, res, next) => {
    const userId = req.params.userId;

    User.findById(userId)
        .exec()
        .then(result => {
            if (!result) {
                return res.status(404).json({
                    message: "user not found"
                });
            }

            const response = {
                _id: result._id,
                name: result.name,
                email: result.email,
                phone: result.phone
            }
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
};

// == USERS EDIT PROFILE ==
exports.users_update_profile = (req, res, next) => {
    const userId = req.params.userId;

    const updateData = {}

    for (const up of req.body) {
        updateData[up.propName] = up.value;
    }

    User.updateOne({ _id: userId, $set: updateData })
        .exec()
        .then(result => {
            const response = {
                data: {
                    message: "profile has been updated",
                    request: {
                        type: "GET",
                        url: `${req.protocol}://${req.get('host')}${req.originalUrl}${userId}`
                    }
                }
            }
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
};