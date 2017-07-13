import * as mongoose from "mongoose";
import { Model } from "mongoose";
import { Schema } from "mongoose";
import { Currency } from "../constants";

var xProtectionSchema: Schema = new mongoose.Schema({
    ownerType: String,              // Contact | Joint
    planType: String,               
    insurerName: String,
    lifeSum: Number,
    ciSum: Number,
    afterCISum: Number,
    deferredPeriod: String,         // Deferred Period in Months
    benefitDuration: String,        // Duration in Months
    benefitAmount: Number,
    benefitRate: Number,            // Percentage
    policyNumber: String,
    contributionAmount: Number,
    contributionFrequency: String,
    waiver: Boolean,
    rateGuarantee: Boolean,
    addressedNeed: String,
    inTrust: Boolean,
    assignedPolicy: Boolean,
    lapr: Boolean,
    maturityValue: Number,
    valuation: Number,
    commencementDate: Date,
    maturityDate: Date,
    currency: Number,

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
    deferredPeriod: String,         // Deferred Period in Months
    benefitDuration: String,        // Duration in Months
    benefitAmount: Number,
    benefitRate: Number,            // Percentage
    policyNumber: String,
    contributionAmount: Number,
    contributionFrequency: String,
    waiver: Boolean,
    rateGuarantee: Boolean,
    addressedNeed: String,
    inTrust: Boolean,
    assignedPolicy: Boolean,
    lapr: Boolean,
    maturityValue: Number,
    valuation: Number,
    commencementDate: Date,
    maturityDate: Date,
    currency: Number,

    createdAt: Date,
    contactId: String,
    accountId: String,
    userId: String
}

interface IXProtectionModel extends IXProtection, mongoose.Document {

}

export var XProtection: Model<IXProtectionModel> = mongoose.model<IXProtectionModel>("XProtection", xProtectionSchema);