"use strict";
const mongoose = require("mongoose");
var xAssetSchema = new mongoose.Schema({
    category: String,
    type: String,
    provider: String,
    ownerType: String,
    valuation: {
        currency: String,
        amount: Number
    },
    valuationDate: String,
    description: String,
    policyNumber: String,
    yearlyIncome: {
        currency: String,
        amount: Number
    },
    taxStatus: String,
    incomeReinvested: Boolean,
    regularContribution: {
        currency: String,
        amount: Number
    },
    indexedPercentage: Number,
    premiumWaiver: Boolean,
    lapr: Boolean,
    ihtExempt: Boolean,
    applicationExemption: String,
    purchased: Boolean,
    createdAt: Date,
    contactId: String,
    accountId: String,
    userId: String
});
exports.XAsset = mongoose.model("XAsset", xAssetSchema);
//# sourceMappingURL=XAssetSchema.js.map