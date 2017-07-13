import * as mongoose from "mongoose";
import { Model } from "mongoose";
import { Schema } from "mongoose";

var clientAccountSchema: Schema = new mongoose.Schema({
    accountName: String,        // Account name at advisers discretion
    accountStatus: String,      // Active | Lead | Prospect | Inactive | Mark for Deletion
    accountType: String,        // Personal | Corporate
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
})

interface IClientAccount {
    accountName: String;
    accountStatus: String;
    accountType: String;
    companyFullName: String;
    companyNumber: String;
    wealthIncome: Boolean;
    wealthBonus: Boolean;
    wealthHouseSale: Boolean;
    wealthBusinessSale: Boolean;
    wealthInheritance: Boolean;
    wealthReplacement: Boolean;
    wealthDivorce: Boolean;
    wealthOther: Boolean;
    fundsUKBank: Boolean;
    fundsEUBank: Boolean;
    fundsBSOC: Boolean;
    fundsStock: Boolean;
    fundsOtherReg: Boolean;
    fundsSolicitor: Boolean;
    fundsAccountant: Boolean;
    fundsOther: Boolean;
    scddSentDate: Date;
    scddType: String;
    
    createdAt: Date;
    updatedAt: Date;
    userId: String;
}

interface IClientAccountModel extends IClientAccount, mongoose.Document {
}

export var ClientAccount: Model<IClientAccountModel> = mongoose.model<IClientAccountModel>("ClientAccount", clientAccountSchema);