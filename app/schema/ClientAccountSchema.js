"use strict";
const mongoose = require("mongoose");
var clientAccountSchema = new mongoose.Schema({
    accountName: String,
    accountStatus: String,
    accountType: String,
    companyFullName: String,
    companyNumber: String,
    wealthSource: {
        income: Boolean,
        bonus: Boolean,
        houseSale: Boolean,
        businessSale: Boolean,
        inheritance: Boolean,
        replacement: Boolean,
        divorce: Boolean,
        other: Boolean
    },
    fundsSource: {
        euBank: Boolean,
        bsocAcc: Boolean,
        stock: Boolean,
        otherReg: Boolean,
        solicitorAcc: Boolean,
        accountantAcc: Boolean,
        other: Boolean
    },
    scddSentDate: Date,
    scddType: String,
    createdAt: Date,
    userId: String
});
exports.ClientAccount = mongoose.model("ClientAccount", clientAccountSchema);
//# sourceMappingURL=ClientAccountSchema.js.map