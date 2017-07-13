"use strict";
const mongoose = require("mongoose");
var bankAccountSchema = new mongoose.Schema({
    accountOwnerType: String,
    accountType: String,
    accountName: String,
    bankName: String,
    accountNumber: String,
    sortCode: String,
    swiftCode: String,
    iban: String,
    currency: Number,
    accountId: String,
    contactId: String,
    createdAt: Date,
    updatedAt: Date,
    userId: String,
});
exports.BankAccount = mongoose.model("BankAccount", bankAccountSchema);
//# sourceMappingURL=BankAccountSchema.js.map