'use strict'

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var InventoryItemSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        trim: true,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    availableQuantity: {
        type: Number,
        required: true,
    }
});

var businessSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    address: {
        type: String,
        trim: true,
        required: true,
    },
    metaData: {
        type: Map,
        of: String,
    },
    capacity: {
        type: [InventoryItemSchema],
        default: []
    },
    Created: {
        type: Date,
        default: Date.now
    }
});

mongoose.model("Business", businessSchema);
