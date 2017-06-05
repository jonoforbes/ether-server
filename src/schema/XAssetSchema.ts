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
    valuation: Number,
    valuationDate: String,
    description: String,
    policyNumber: String,
    yearlyIncome: Number,
    taxStatus: String,      // Gross | Net | Free
    incomeReinvested: Boolean,
    regularContribution: Number,
    contributionFrequency: String,
    indexedPercentage: Number,
    premiumWaiver: Boolean,
    lapr: Boolean,
    ihtExempt: Boolean,
    applicationExemption: String,
    purchased: Boolean,
    inherited: Boolean,
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
    valuation: Number,
    valuationDate: String,
    description: String,
    policyNumber: String,
    yearlyIncome: Number,
    taxStatus: String,      // Gross | Net | Free
    incomeReinvested: Boolean,
    regularContribution: Number,
    contributionFrequency: String,
    indexedPercentage: Number,
    premiumWaiver: Boolean,
    lapr: Boolean,
    ihtExempt: Boolean,
    applicationExemption: String,
    purchased: Boolean,
    inherited: Boolean,
    createdAt: Date,
    contactId: String,
    accountId: String,
    userId: String
}

interface IXAssetModel extends IXAsset, mongoose.Document {

}

export var XAsset: Model<IXAssetModel> = mongoose.model<IXAssetModel>("XAsset", xAssetSchema);