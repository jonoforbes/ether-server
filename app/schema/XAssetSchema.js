"use strict";
const mongoose = require("mongoose");
var xAssetSchema = new mongoose.Schema({
    category: String,
    currency: Number,
    type: String,
    provider: String,
    ownerType: String,
    valuation: Number,
    valuationDate: Date,
    description: String,
    policyNumber: String,
    yearlyIncome: Number,
    taxStatus: String,
    incomeReinvested: Boolean,
    regularContribution: Number,
    contributionFrequency: String,
    indexedPercentage: Number,
    premiumWaiver: Boolean,
    lapr: Boolean,
    ihtExempt: Boolean,
    applicationExemption: String,
    purchased: Boolean,
    inherited: Boolean,
    contactId: String,
    accountId: String,
    userId: String,
    createdAt: Date,
    updatedAt: Date
});
exports.XAsset = mongoose.model("XAsset", xAssetSchema);
//# sourceMappingURL=XAssetSchema.js.map