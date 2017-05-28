"use strict";
const mongoose = require("mongoose");
var xLiabilitySchema = new mongoose.Schema({
    ownerType: String,
    lenderName: String,
    type: String,
    initialAmount: Number,
    outstandingAmount: Number,
    paymentAmount: Number,
    paymentFrequency: String,
    termRemaining: Number,
    repaymentMethod: String,
    ratePercentage: Number,
    rateType: String,
    rateBasisEnds: String,
    policyNumber: String,
    transferable: Boolean,
    transferPenalty: String,
    reviewDate: String,
    startDate: String,
    contactId: String,
    accountId: String,
    createdAt: Date,
    userId: String
});
exports.XLiability = mongoose.model("XLiability", xLiabilitySchema);
//# sourceMappingURL=XLiabilitySchema.js.map