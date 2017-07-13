"use strict";
const mongoose = require("mongoose");
var incomeSchema = new mongoose.Schema({
    tEmployment: Number,
    ntEmployment: Number,
    tSelfEmployedY1: Number,
    ntSelfEmployedY1: Number,
    tSelfEmployedY2: Number,
    ntSelfEmployedY2: Number,
    tPension: Number,
    ntPension: Number,
    tStatePension: Number,
    ntStatePension: Number,
    ntStateBenefit: Number,
    tOther: Number,
    ntOther: Number,
    currency: Number,
    contactId: String,
    accountId: String,
    userId: String,
    createdAt: Date,
    updatedAt: Date
});
exports.Income = mongoose.model("Income", incomeSchema);
//# sourceMappingURL=IncomeSchema.js.map