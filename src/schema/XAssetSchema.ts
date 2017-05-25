import * as mongoose from "mongoose";
import { Model } from "mongoose";
import { Schema } from "mongoose";

var xAssetSchema: Schema = new mongoose.Schema({
    category: String,       // Property | ISAs | Stocks & Shares | 
                            // Personal Assets | Other Assets | Cash Accounts
                            // Cash-based Investment | Insurance Based Investment
                            // Non-insurance Based Investment 
                            // National Savings & Investment
                            // Annuity Based Investment
    
    type: String,
    provider: String,
    ownerType: String,
    valuation: {
        currency: String,
        amount: Number
    },
    valuationDate: String,
    description: String,
    policyNumber: String,
    yearlyIncome: {
        currency: String,
        amount: Number
    },
    taxStatus: String,      // Gross | Net | Free
    incomeReinvested: Boolean,
    regularContribution: {
        currency: String,
        amount: Number
    },
    indexedPercentage: Number,
    premiumWaiver: Boolean,
    lapr: Boolean,
    ihtExempt: Boolean,
    applicationExemption: String,
    purchased: Boolean,
    createdAt: Date,
    contactId: String,
    accountId: String,
    userId: String
})

interface IXAsset {
    category: String,       // Property | ISAs | Stocks & Shares | 
                            // Personal Assets | Other Assets | Cash Accounts
                            // Cash-based Investment | Insurance Based Investment
                            // Non-insurance Based Investment 
                            // National Savings & Investment
                            // Annuity Based Investment
    
    type: String,
    provider: String,
    ownerType: String,
    valuation: {
        currency: String,
        amount: Number
    },
    valuationDate: String,
    description: String,
    policyNumber: String,
    yearlyIncome: {
        currency: String,
        amount: Number
    },
    taxStatus: String,      // Gross | Net | Free
    incomeReinvested: Boolean,
    regularContribution: {
        currency: String,
        amount: Number
    },
    indexedPercentage: Number,
    premiumWaiver: Boolean,
    lapr: Boolean,
    ihtExempt: Boolean,
    applicationExemption: String,
    purchased: Boolean,
    createdAt: Date,
    contactId: String,
    accountId: String,
    userId: String
}

interface IXAssetModel extends IXAsset, mongoose.Document {

}

export var XAsset: Model<IXAssetModel> = mongoose.model<IXAssetModel>("XAsset", xAssetSchema);