"use strict";
const mongoose = require("mongoose");
var wineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    createdAt: Date,
    region: String,
    userId: String,
    myRating: Number,
    inStock: Number,
    price: Number,
    image: String
});
exports.Wine = mongoose.model("Wine", wineSchema);
//# sourceMappingURL=WineSchema.js.map