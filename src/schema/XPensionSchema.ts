import * as mongoose from "mongoose";
import { Model } from "mongoose";
import { Schema } from "mongoose";

var xPensionSchema: Schema = new mongoose.Schema({
    pensionType: String,            // Money Purchase | Defined Benefits
    providerName: String,
    planType: String,
    policyNumber: String,
    planStartDate: Date,
    planJoinDate: Date,
    planLeaveDate: Date,
    extraYears: Number,
    companyJoinDate: Date,
    status: String,
    planRetirementAge: Number,
    valuation: {
        currency: String,
        amount: Number
    },
    valuationDate: Date,
    taxFreeCurrentValue: {
        currency: String,
        amount: Number
    },
    employerContribution: {
        currency: String,
        amount: Number
    },
    personalContribution: {
        currency: String,
        amount: Number
    },
    contributionFrequency: String,
    waiver: String,
    coverLevel: String,
    waiverOrLifeAddable: Boolean,
    lumpSum: String,
    deathInServiceLumpSum: String,
    assetPreservationTrust: Boolean,
    contractedOut: Boolean,
    paidUpDate: Date,
    transferValue: {
        currency: String,
        amount: Number
    },
    transferValueDate: Date,
    protectedRights: String,
    nonProtectedRights: String,
    pensionableEarnings: {
        currency: String,
        amount: Number
    },
    pensionIncreaseRate: String,
    spousePension: String,
    dependantPension: String,
    createdAt: Date,
    contactId: String,
    accountId: String,
    userId: String
})

interface IXPension {
    pensionType: String,            // Money Purchase | Defined Benefits
    providerName: String,
    planType: String,
    policyNumber: String,
    planStartDate: Date,
    planJoinDate: Date,
    planLeaveDate: Date,
    extraYears: Number,
    companyJoinDate: Date,
    status: String,
    planRetirementAge: Number,
    valuation: {
        currency: String,
        amount: Number
    },
    valuationDate: Date,
    taxFreeCurrentValue: {
        currency: String,
        amount: Number
    },
    employerContribution: {
        currency: String,
        amount: Number
    },
    personalContribution: {
        currency: String,
        amount: Number
    },
    contributionFrequency: String,
    waiver: String,
    coverLevel: String,
    waiverOrLifeAddable: Boolean,
    lumpSum: String,
    deathInServiceLumpSum: String,
    assetPreservationTrust: Boolean,
    contractedOut: Boolean,
    paidUpDate: Date,
    transferValue: {
        currency: String,
        amount: Number
    },
    transferValueDate: Date,
    protectedRights: String,
    nonProtectedRights: String,
    pensionableEarnings: {
        currency: String,
        amount: Number
    },
    pensionIncreaseRate: String,
    spousePension: String,
    dependantPension: String,
    createdAt: Date,
    contactId: String,
    accountId: String,
    userId: String
}

interface IXPensionModel extends IXPension, mongoose.Document {

}

export var XPension: Model<IXPensionModel> = mongoose.model<IXPensionModel>("XPension", xPensionSchema);