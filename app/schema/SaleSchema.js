"use strict";
const mongoose = require("mongoose");
var saleSchema = new mongoose.Schema({
    saleStatus: String,
    quantity: Number,
    buyPrice: Number,
    term: Number,
    description: String,
    currency: Number,
    accountId: String,
    productId: String,
    userId: String,
    createdAt: Date,
    updatedAt: Date
});
exports.Sale = mongoose.model("Sale", saleSchema);
//# sourceMappingURL=SaleSchema.js.map