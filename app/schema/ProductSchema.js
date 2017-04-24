"use strict";
const mongoose = require("mongoose");
var productSchema = new mongoose.Schema({
    ticker: { type: String, required: true },
    fullName: String,
    description: String,
    userId: String,
    createdAt: Date
});
exports.Product = mongoose.model("Product", productSchema);
//# sourceMappingURL=ProductSchema.js.map