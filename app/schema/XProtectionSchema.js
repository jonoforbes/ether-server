"use strict";
const mongoose = require("mongoose");
var xProtectionSchema = new mongoose.Schema({
    ownerType: String,
    planType: String,
    insurerName: String,
    lifeSum: {
        currency: String,
        amount: Number
    },
    ciSum: {
        currency: String,
        amount: Number
    },
    afterCISum: {
        currency: String,
        amount: Number
    },
    deferredPeriod: Number,
    benefitDuration: Number,
    benefitAmount: {
        currency: String,
        amount: Number
    },
    benefitRate: Number,
    firstNameOne: String,
    firstNameTwo: String,
    lastNameOne: String,
    lastNameTwo: String,
    policyNumber: String,
    contribution: {
        currency: String,
        amount: Number,
        frequency: String
    },
    waiver: {
        currency: String,
        amount: Number
    },
    rateGuarantee: Boolean,
    addressedNeed: String,
    inTrust: Boolean,
    assignedPolicy: Boolean,
    lapr: Boolean,
    maturityValue: {
        currency: String,
        amount: Number
    },
    valuation: {
        currency: String,
        amount: Number
    },
    commencementDate: Date,
    maturityDate: Date,
    createdAt: Date,
    contactId: String,
    accountId: String,
    userId: String
});
exports.XProtection = mongoose.model("XProtection", xProtectionSchema);
//# sourceMappingURL=XProtectionSchema.js.map