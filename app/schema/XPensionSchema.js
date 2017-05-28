"use strict";
const mongoose = require("mongoose");
var xPensionSchema = new mongoose.Schema({
    ownerType: String,
    pensionType: String,
    providerName: String,
    planType: String,
    policyNumber: String,
    planStartDate: String,
    planJoinDate: String,
    planLeaveDate: String,
    extraYears: Number,
    companyJoinDate: String,
    status: String,
    planRetirementAge: Number,
    valuationAmount: Number,
    valuationDate: String,
    taxFreeCurrentValue: Number,
    employerContribution: Number,
    personalContribution: Number,
    contributionFrequency: String,
    waiver: String,
    coverLevel: String,
    waiverOrLifeAddable: Boolean,
    lumpSum: String,
    deathInServiceLumpSum: String,
    assetPreservationTrust: Boolean,
    contractedOut: Boolean,
    paidUpDate: String,
    transferValue: Number,
    transferDate: String,
    protectedRights: String,
    nonProtectedRights: String,
    pensionableEarnings: Number,
    pensionIncreaseRate: String,
    spousePension: String,
    dependantPension: String,
    createdAt: Date,
    contactId: String,
    accountId: String,
    userId: String
});
exports.XPension = mongoose.model("XPension", xPensionSchema);
//# sourceMappingURL=XPensionSchema.js.map