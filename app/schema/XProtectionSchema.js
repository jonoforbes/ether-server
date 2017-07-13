"use strict";
const mongoose = require("mongoose");
var xProtectionSchema = new mongoose.Schema({
    ownerType: String,
    planType: String,
    insurerName: String,
    lifeSum: Number,
    ciSum: Number,
    afterCISum: Number,
    deferredPeriod: String,
    benefitDuration: String,
    benefitAmount: Number,
    benefitRate: Number,
    policyNumber: String,
    contributionAmount: Number,
    contributionFrequency: String,
    waiver: Boolean,
    rateGuarantee: Boolean,
    addressedNeed: String,
    inTrust: Boolean,
    assignedPolicy: Boolean,
    lapr: Boolean,
    maturityValue: Number,
    valuation: Number,
    commencementDate: Date,
    maturityDate: Date,
    currency: Number,
    createdAt: Date,
    contactId: String,
    accountId: String,
    userId: String
});
exports.XProtection = mongoose.model("XProtection", xProtectionSchema);
//# sourceMappingURL=XProtectionSchema.js.map