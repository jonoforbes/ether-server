"use strict";
const mongoose = require("mongoose");
const constants_1 = require("../constants");
var expenditureSchema = new mongoose.Schema({
    monthlyPolicyExpenditure: Number,
    monthlyEssentialExpenditure: Number,
    monthlyDiscretionaryExpenditure: Number,
    emergencyFundsAvailable: Number,
    emergencyFundsRecommended: Number,
    futureCircumstances: Boolean,
    currency: constants_1.Currency,
    contactId: String,
    accountId: String,
    userId: String,
    createdAt: Date,
    updatedAt: Date
});
exports.Expenditure = mongoose.model("Expenditure", expenditureSchema);
//# sourceMappingURL=ExpenditureSchema.js.map