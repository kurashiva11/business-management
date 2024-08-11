'use strict'

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userBusinessSchema = new Schema({
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    business: {
        type: mongoose.Types.ObjectId,
        ref: 'Business',
    }
});

mongoose.model("UserBusiness", userBusinessSchema);
