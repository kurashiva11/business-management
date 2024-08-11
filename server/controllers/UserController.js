"use strict";

var mongoose = require("mongoose"),
    jwt = require("jsonwebtoken"),
    bcrypt = require("bcrypt"),
    User = mongoose.model("User");

exports.register = async function (req, res) {
    var existing_user = await User.findOne({
        "phoneNumber": req.body.phoneNumber,
    });
    if (existing_user != null) {
        res.status(400).send({"error": "user already exists, please log in"});
        return;
    }

    var newUser = new User(req.body);
    newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
    try {
        await newUser.save();
        req.body.password = undefined;
        res.send(req.body);
    } catch(err) {
        console.error("can't save user", err);
        res.status(500).send({"error":`can't save the user.`});
    }
};

exports.sign_in = async function (req, res) {
    var user = await User.findOne({
        phoneNumber: req.body.phoneNumber,
    });
    if (user == null) {
        return res
        .status(401)
        .json({
            "error": "User isn't registered, please register",
        });
    }
    if (!user.comparePassword(req.body.password)) {
        return res
        .status(401)
        .json({
            "error": "Authentication failed. Invalid user or password.",
        });
    }

    return res.json({
        "token": jwt.sign(
            {
                phoneNumber: user.phoneNumber,
                fullName: user.fullName,
                _id: user._id,
            },
            "RESTFULAPIs",
            {
                expiresIn: '1h'
            }
        ),
    });
};

exports.loginRequired = async function (req, res, next) {
    var token = req.headers.authorization;
    try {
        var user = await jwt.verify(token.substr(7), "RESTFULAPIs");
        
        var DBUser = await User.findOne({
            _id: user._id,
        });

        if (DBUser == null || DBUser == undefined) {
            return res.status(401).send({"error": "User unknown, please login again."});
        }

        req.user = DBUser._id;
        next();
    } catch(err) {
        console.error("failed to login", err);
        return res.status(401).send({"error": "something went wrong while logging user in."})
    }
};
