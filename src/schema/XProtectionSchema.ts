import * as mongoose from "mongoose";
import { Model } from "mongoose";
import { Schema } from "mongoose";

var xProtectionSchema: Schema = new mongoose.Schema({
    ownerType: String,              // Contact | Joint
    planType: String,               
    insurerName: String,
    lifeSum: Number,
    ciSum: Number,
    afterCISum: Number,
    deferredPeriod: Number,         // Deferred Period in Months
    benefitDuration: Number,        // Duration in Months
    benefitAmount: Number,
    benefitRate: Number,            // Percentage
    firstNameOne: String,
    firstNameTwo: String,
    lastNameOne: String,
    lastNameTwo: String,
    policyNumber: String,
    contributionAmount: Number,
    contributionFrequency: String,
    waiver: Number,
    rateGuarantee: Boolean,
    addressedNeed: String,
    inTrust: Boolean,
    assignedPolicy: Boolean,
    lapr: Boolean,
    maturityValue: Number,
    valuation: Number,
    commencementDate: String,
    maturityDate: String,
    createdAt: Date,
    contactId: String,
    accountId: String,
    userId: String
})

interface IXProtection {
    ownerType: String,              // Contact | Joint
    planType: String,               
    insurerName: String,
    lifeSum: Number,
    ciSum: Number,
    afterCISum: Number,
    deferredPeriod: Number,         // Deferred Period in Months
    benefitDuration: Number,        // Duration in Months
    benefitAmount: Number,
    benefitRate: Number,            // Percentage
    firstNameOne: String,
    firstNameTwo: String,
    lastNameOne: String,
    lastNameTwo: String,
    policyNumber: String,
    contributionAmount: Number,
    contributionFrequency: String,
    waiver: Number,
    rateGuarantee: Boolean,
    addressedNeed: String,
    inTrust: Boolean,
    assignedPolicy: Boolean,
    lapr: Boolean,
    maturityValue: Number,
    valuation: Number,
    commencementDate: String,
    maturityDate: String,
    createdAt: Date,
    contactId: String,
    accountId: String,
    userId: String
}

interface IXProtectionModel extends IXProtection, mongoose.Document {

}

export var XProtection: Model<IXProtectionModel> = mongoose.model<IXProtectionModel>("XProtection", xProtectionSchema);