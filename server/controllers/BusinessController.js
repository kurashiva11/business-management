"use strict";

var mongoose = require("mongoose"),
    jwt = require("jsonwebtoken"),
    bcrypt = require("bcrypt"),
    Business = mongoose.model("Business");

exports.GetBusinessData = async function(req, res) {
    var businessName = req.query.name;
    var businessData = await Business.findOne({
        "name": businessName,
    });

    if (businessData == null) {
        return res.status(404).send({"error": `business isn't found., there is no business with name ${businessName}`})
    }

    return res.status(200).send(businessData);
}

// Login required, authenticate this api with business owners only, add the user as business owner.
exports.PostBusinessData = async function(req, res) {
    var business = new Business(req.body);
    business.owners = [req.user];

    try {
        await business.save();
        res.status(200).send(req.body);
    } catch(err) {
        console.error("can't save business data", err);
        res.status(500).send({"error": "something went wrong while saving the business data."});
    }
}