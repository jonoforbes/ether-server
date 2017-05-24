"use strict";
const mongoose = require("mongoose");
var xLiabilitySchema = new mongoose.Schema({
    ownerType: String,
    lenderName: String,
    type: String,
    initial: {
        currency: String,
        amount: Number
    },
    outstanding: {
        currency: String,
        amount: Number
    },
    payment: {
        currency: String,
        amount: Number,
        frequency: String
    },
    termRemaining: Number,
    repaymentMethod: String,
    rate: {
        percentage: Number,
        type: String,
        basisEnds: Date
    },
    policyNumber: String,
    transferable: Boolean,
    transferPenalty: String,
    reviewDate: Date,
    startDate: String,
    contactId: String,
    accountId: String,
    createdAt: Date,
    userId: String
});
exports.XLiability = mongoose.model("XLiability", xLiabilitySchema);
//# sourceMappingURL=XLiabilitySchema.js.map