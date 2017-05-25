import * as mongoose from "mongoose";
import { Model } from "mongoose";
import { Schema } from "mongoose";

var xPensionSchema: Schema = new mongoose.Schema({
    pensionType: String,            // Money Purchase | Defined Benefits
    providerName: String,
    planType: String,
    policyNumber: String,
    planStartDate: String,
    planJoinDate: String,
    planLeaveDate: String,
    extraYears: Number,
    companyJoinDate: String,
    status: String,
    planRetirementAge: Number,
    valuation: {
        currency: String,
        amount: Number,
        date: String
    },
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
    paidUpDate: String,
    transferValue: {
        currency: String,
        amount: Number,
        date: String
    },
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
    planStartDate: String,
    planJoinDate: String,
    planLeaveDate: String,
    extraYears: Number,
    companyJoinDate: String,
    status: String,
    planRetirementAge: Number,
    valuation: {
        currency: String,
        amount: Number,
        date: String
    },
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
    paidUpDate: String,
    transferValue: {
        currency: String,
        amount: Number,
        date: String
    },
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