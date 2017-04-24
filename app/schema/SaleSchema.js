"use strict";
const mongoose = require("mongoose");
var saleSchema = new mongoose.Schema({
    accountId: String,
    contactId: String,
    productId: String,
    saleStatus: String,
    quantity: Number,
    buyPrice: Number,
    term: Number,
    description: String,
    userId: String,
    createdAt: Date
});
exports.Sale = mongoose.model("Sale", saleSchema);
//# sourceMappingURL=SaleSchema.js.map