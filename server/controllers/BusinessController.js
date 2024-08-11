"use strict";

var mongoose = require("mongoose"),
    Business = mongoose.model("Business"),
    BusinessOwner = mongoose.model("UserBusiness");

exports.GetBusinessData = async function(req, res) {
    var error, businessData = await _getBusinessData(req.query.name);

    if (error != null) {
        return res.status(404).send(error);
    }
    
    return res.status(200).send(businessData);
}

// Login required, authenticate this api with business owners only, add the user as business owner.
exports.PostBusinessData = async function(req, res) {
    // TODO: check if the business already exists.
    var business = new Business(req.body);

    try {
        await business.save();

        // update current user as the owner of the business.
        var businessOwner = new BusinessOwner({
            owner: req.user,
            business: business._id,
        });
        await businessOwner.save();

        res.status(200).send(req.body);
    } catch(err) {
        console.error("can't save business data", err);
        res.status(500).send({"error": "something went wrong while saving the business data."});
    }
}

exports.UpdateBusinessInventory = async function(req, res) {
    // check if the user is the owner for the current business.
    var error, businessData = await _getBusinessData(req.query.name);

    if (error != null) {
        return res.status(404).send(error);
    }

    try {
        var newCapacity = req.body.capacity;
        var updatedData = await Business.updateOne({
            _id: businessData._id,
        }, {
            capacity: newCapacity,
        });

        return res.status(200).send(updatedData.capacity);
    } catch(err) {
        console.error("something went wrong while updating the business capacity", err);
        return res.status(500).send({"error": "somthing went wrong while updating the capacity"});
    }
}

// TODO: Delete the business?

var _getBusinessData = async (businessName) => {
    var businessData = await Business.findOne({
        "name": businessName,
    });

    if (businessData == null) {
        return {"error": `business isn't found., there is no business with name ${businessName}`}, null;
    }

    return null, businessData;
}