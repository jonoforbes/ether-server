import * as mongoose from "mongoose";
import { Model } from "mongoose";
import { Schema } from "mongoose";

var clientAccountSchema: Schema = new mongoose.Schema({
    accountName: String,        // Account name at advisers discretion
    accountStatus: String,      // Active | Lead | Prospect | Inactive | Mark for Deletion
    accountType: String,        // Personal | Corporate
    companyFullName: String,
    companyNumber: String,
    wealthSource: {
        income: Boolean,            // Income
        bonus: Boolean,             // Bonus
        houseSale: Boolean,         // Sale of House
        businessSale: Boolean,      // Sale of Business
        inheritance: Boolean,       // Inheritance
        replacement: Boolean,       // Replacement
        divorce: Boolean,           // Divorce Settlement
        other: Boolean              // Other
    },
    fundsSource: {
        euBank: Boolean,            // EU Bank Account
        bsocAcc: Boolean,           // Banking Society Account
        stock: Boolean,             // Stockbroker
        otherReg: Boolean,          // Other Regulated Firm
        solicitorAcc: Boolean,      // Solicitor's Client Account
        accountantAcc: Boolean,     // Accountant's Client Account
        other: Boolean              // Other
    },
    scddSentDate: Date,
    scddType: String,
    createdAt: Date,
    userId: String
})

interface IClientAccount {
    accountName: String,
    accountStatus: String,
    companyFullName: String,
    companyNumber: String,
    wealthSource: {
        income: Boolean,            // Income
        bonus: Boolean,             // Bonus
        houseSale: Boolean,         // Sale of House
        businessSale: Boolean,      // Sale of Business
        inheritance: Boolean,       // Inheritance
        replacement: Boolean,       // Replacement
        divorce: Boolean,           // Divorce Settlement
        other: Boolean,             // Other
    },
    fundsSource: {
        euBank: Boolean,            // EU Bank Account
        bsocAcc: Boolean,           // Banking Society Account
        stock: Boolean,             // Stockbroker
        otherReg: Boolean,          // Other Regulated Firm
        solicitorAcc: Boolean,      // Solicitor's Client Account
        accountantAcc: Boolean,     // Accountant's Client Account
        other: Boolean,             // Other
    },
    scddSentDate: Date,
    scddType: String,
    createdAt: Date,
    userId: String
}

interface IClientAccountModel extends IClientAccount, mongoose.Document {
}

export var ClientAccount: Model<IClientAccountModel> = mongoose.model<IClientAccountModel>("ClientAccount", clientAccountSchema);