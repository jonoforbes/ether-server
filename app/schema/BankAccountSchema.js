"use strict";
const mongoose = require("mongoose");
const constants_1 = require("../constants");
var bankAccountSchema = new mongoose.Schema({
    accountOwnerType: String,
    accountType: String,
    accountName: String,
    bankName: String,
    accountNumber: String,
    sortCode: String,
    swiftCode: String,
    iban: String,
    currency: constants_1.Currency,
    accountId: String,
    contactId: String,
    createdAt: Date,
    updatedAt: Date,
    userId: String,
});
exports.BankAccount = mongoose.model("BankAccount", bankAccountSchema);
//# sourceMappingURL=BankAccountSchema.js.map