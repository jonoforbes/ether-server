"use strict";
const mongoose = require("mongoose");
var clientAccountSchema = new mongoose.Schema({
    accountName: String,
    accountStatus: String,
    accountType: String,
    companyFullName: String,
    companyNumber: String,
    wealthIncome: Boolean,
    wealthBonus: Boolean,
    wealthHouseSale: Boolean,
    wealthBusinessSale: Boolean,
    wealthInheritance: Boolean,
    wealthReplacement: Boolean,
    wealthDivorce: Boolean,
    wealthOther: Boolean,
    fundsUKBank: Boolean,
    fundsEUBank: Boolean,
    fundsBSOC: Boolean,
    fundsStock: Boolean,
    fundsOtherReg: Boolean,
    fundsSolicitor: Boolean,
    fundsAccountant: Boolean,
    fundsOther: Boolean,
    scddSentDate: Date,
    scddType: String,
    createdAt: Date,
    updatedAt: Date,
    userId: String
});
exports.ClientAccount = mongoose.model("ClientAccount", clientAccountSchema);
//# sourceMappingURL=ClientAccountSchema.js.map