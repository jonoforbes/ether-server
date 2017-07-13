"use strict";
const mongoose = require("mongoose");
var expenditureSchema = new mongoose.Schema({
    monthlyPolicyExpenditure: Number,
    monthlyEssentialExpenditure: Number,
    monthlyDiscretionaryExpenditure: Number,
    emergencyFundsAvailable: Number,
    emergencyFundsRecommended: Number,
    futureCircumstances: Boolean,
    currency: Number,
    contactId: String,
    accountId: String,
    userId: String,
    createdAt: Date,
    updatedAt: Date
});
exports.Expenditure = mongoose.model("Expenditure", expenditureSchema);
//# sourceMappingURL=ExpenditureSchema.js.map