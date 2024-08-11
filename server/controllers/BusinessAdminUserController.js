"use strict";

var mongoose = require("mongoose"),
    jwt = require("jsonwebtoken"),
    bcrypt = require("bcrypt"),
    Business = mongoose.model("Business"),
    BusinessOwner = mongoose.model("UserBusiness");

exports.getAllOwnersOfBusiness = (req, res) => {
    /**
     * TODO:
     * 1. check if the business exists.
     * 2. check if the current user is owner of the current business.
     * 3. if current user is owner, list all the exising owners of the current business
     */
}

exports.addNewOwnersForBusiness = (req, res) => {
    /**
     * TODO:
     * 1. check if the business exists.
     * 2. check if the current user is owner of the current business.
     * 3. figureout how to show the list of owners? should we register them? or else user their phone numbers that we use for login?
     * 4. if the user isn't already paart of the system, redirect them to create a user.
     */
}

exports.getAllBusinessForUser = (req, res) => {
    /**
     * TODO:
     * 1. check if the user is logged in.
     * 2. get all the busness ids and the business name of for the user and return.
     */
}