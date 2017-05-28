import * as mongoose from "mongoose";
import { Model } from "mongoose";
import { Schema } from "mongoose";

var xPensionSchema: Schema = new mongoose.Schema({
    ownerType: String,
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
    valuationAmount: Number,
    valuationDate: String,
    taxFreeCurrentValue: Number,
    employerContribution: Number,
    personalContribution: Number,
    contributionFrequency: String,
    waiver: String,
    coverLevel: String,
    waiverOrLifeAddable: Boolean,
    lumpSum: String,
    deathInServiceLumpSum: String,
    assetPreservationTrust: Boolean,
    contractedOut: Boolean,
    paidUpDate: String,
    transferValue: Number,
    transferDate: String,
    protectedRights: String,
    nonProtectedRights: String,
    pensionableEarnings: Number,
    pensionIncreaseRate: String,
    spousePension: String,
    dependantPension: String,
    createdAt: Date,
    contactId: String,
    accountId: String,
    userId: String
})

interface IXPension {
    ownerType: String,
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
    valuationAmount: Number,
    valuationDate: String,
    taxFreeCurrentValue: Number,
    employerContribution: Number,
    personalContribution: Number,
    contributionFrequency: String,
    waiver: String,
    coverLevel: String,
    waiverOrLifeAddable: Boolean,
    lumpSum: String,
    deathInServiceLumpSum: String,
    assetPreservationTrust: Boolean,
    contractedOut: Boolean,
    paidUpDate: String,
    transferValue: Number,
    transferDate: String,
    protectedRights: String,
    nonProtectedRights: String,
    pensionableEarnings: Number,
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