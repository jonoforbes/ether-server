"use strict";
const mongoose = require("mongoose");
const constants_1 = require("../constants");
var saleSchema = new mongoose.Schema({
    saleStatus: String,
    quantity: Number,
    buyPrice: Number,
    term: Number,
    description: String,
    currency: constants_1.Currency,
    accountId: String,
    productId: String,
    userId: String,
    createdAt: Date,
    updatedAt: Date
});
exports.Sale = mongoose.model("Sale", saleSchema);
//# sourceMappingURL=SaleSchema.js.map