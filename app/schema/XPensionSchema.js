"use strict";
const mongoose = require("mongoose");
const constants_1 = require("../constants");
var xPensionSchema = new mongoose.Schema({
    pensionType: String,
    providerName: String,
    planType: String,
    policyNumber: String,
    planJoinDate: Date,
    status: String,
    planRetirementAge: Number,
    personalContribution: Number,
    contributionFrequency: String,
    assetPreservationTrust: Boolean,
    contractedOut: Boolean,
    planStartDate: Date,
    planLeaveDate: Date,
    extraYears: Number,
    companyJoinDate: Date,
    valuationAmount: Number,
    taxFreeCurrentValue: Number,
    employerContribution: Number,
    waiver: String,
    coverLevel: String,
    lumpSum: String,
    deathInServiceLumpSum: String,
    paidUpDate: Date,
    transferValue: Number,
    transferDate: Date,
    protectedRights: String,
    nonProtectedRights: String,
    pensionableEarnings: Number,
    pensionIncreaseRate: String,
    spousePension: String,
    dependantPension: String,
    currency: constants_1.Currency,
    createdAt: Date,
    contactId: String,
    accountId: String,
    userId: String
});
exports.XPension = mongoose.model("XPension", xPensionSchema);
//# sourceMappingURL=XPensionSchema.js.map