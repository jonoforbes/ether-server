"use strict";
const mongoose = require("mongoose");
var xProtectionSchema = new mongoose.Schema({
    ownerType: String,
    planType: String,
    insurerName: String,
    lifeSum: Number,
    ciSum: Number,
    afterCISum: Number,
    deferredPeriod: Number,
    benefitDuration: Number,
    benefitAmount: Number,
    benefitRate: Number,
    firstNameOne: String,
    firstNameTwo: String,
    lastNameOne: String,
    lastNameTwo: String,
    policyNumber: String,
    contributionAmount: Number,
    contributionFrequency: String,
    waiver: Number,
    rateGuarantee: Boolean,
    addressedNeed: String,
    inTrust: Boolean,
    assignedPolicy: Boolean,
    lapr: Boolean,
    maturityValue: Number,
    valuation: Number,
    commencementDate: String,
    maturityDate: String,
    createdAt: Date,
    contactId: String,
    accountId: String,
    userId: String
});
exports.XProtection = mongoose.model("XProtection", xProtectionSchema);
//# sourceMappingURL=XProtectionSchema.js.map