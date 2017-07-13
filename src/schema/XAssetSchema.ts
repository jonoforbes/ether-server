import * as mongoose from "mongoose";
import { Model } from "mongoose";
import { Schema } from "mongoose";
import { Currency } from "../constants";

var xAssetSchema: Schema = new mongoose.Schema({
    category: String,       // Property | ISAs | Stocks & Shares | 
                            // Personal Assets | Other Assets | Cash Accounts
                            // Cash-based Investment | Insurance Based Investment
                            // Non-insurance Based Investment 
                            // National Savings & Investment
                            // Annuity Based Investment
    currency: Currency,
    type: String,
    provider: String,
    ownerType: String,
    valuation: Number,
    valuationDate: Date,
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

    contactId: String,
    accountId: String,
    userId: String,
    createdAt: Date,
    updatedAt: Date
})

interface IXAsset {
    category: String;       // Property | ISAs | Stocks & Shares | 
                            // Personal Assets | Other Assets | Cash Accounts
                            // Cash-based Investment | Insurance Based Investment
                            // Non-insurance Based Investment 
                            // National Savings & Investment
                            // Annuity Based Investment
    currency: Currency;
    type: String;
    provider: String;
    ownerType: String;
    valuation: Number;
    valuationDate: Date;
    description: String;
    policyNumber: String;
    yearlyIncome: Number;
    taxStatus: String;      // Gross | Net | Free
    incomeReinvested: Boolean;
    regularContribution: Number;
    contributionFrequency: String;
    indexedPercentage: Number;
    premiumWaiver: Boolean;
    lapr: Boolean;
    ihtExempt: Boolean;
    applicationExemption: String;
    purchased: Boolean;
    inherited: Boolean;

    contactId: String;
    accountId: String;
    userId: String;
    createdAt: Date;
    updatedAt: Date;
}

interface IXAssetModel extends IXAsset, mongoose.Document {

}

export var XAsset: Model<IXAssetModel> = mongoose.model<IXAssetModel>("XAsset", xAssetSchema);