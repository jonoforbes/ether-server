import * as mongoose from "mongoose";
import { Model } from "mongoose";
import { Schema } from "mongoose";

var xProtectionSchema: Schema = new mongoose.Schema({
    ownerType: String,              // Contact | Joint
    planType: String,               
    insurerName: String,
    lifeSum: {
        currency: String,
        amount: Number
    },
    ciSum: {
        currency: String,
        amount: Number
    },
    afterCISum: {
        currency: String,
        amount: Number
    },
    deferredPeriod: Number,         // Deferred Period in Months
    benefitDuration: Number,        // Duration in Months
    benefitAmount: {
        currency: String,
        amount: Number
    },
    benefitRate: Number,            // Percentage
    firstNameOne: String,
    firstNameTwo: String,
    lastNameOne: String,
    lastNameTwo: String,
    policyNumber: String,
    contribution: {
        currency: String,
        amount: Number,
        frequency: String           // Weekly | Monthly | Annual
    },
    waiver: {
        currency: String,
        amount: Number
    },
    rateGuarantee: Boolean,
    addressedNeed: String,
    inTrust: Boolean,
    assignedPolicy: Boolean,
    lapr: Boolean,
    maturityValue: {
        currency: String,
        amount: Number
    },
    valuation: {
        currency: String,
        amount: Number
    },
    commencementDate: Date,
    maturityDate: Date,
    createdAt: Date,
    contactId: String,
    accountId: String,
    userId: String
})

interface IXProtection {
    ownerType: String,              // Contact | Joint
    planType: String,               
    insurerName: String,
    lifeSum: {
        currency: String,
        amount: Number
    },
    ciSum: {
        currency: String,
        amount: Number
    },
    afterCISum: {
        currency: String,
        amount: Number
    },
    deferredPeriod: Number,         // Deferred Period in Months
    benefitDuration: Number,        // Duration in Months
    benefitAmount: {
        currency: String,
        amount: Number
    },
    benefitRate: Number,            // Percentage
    firstNameOne: String,
    firstNameTwo: String,
    lastNameOne: String,
    lastNameTwo: String,
    policyNumber: String,
    contribution: {
        currency: String,
        amount: Number,
        frequency: String           // Weekly | Monthly | Annual
    },
    waiver: {
        currency: String,
        amount: Number
    },
    rateGuarantee: Boolean,
    addressedNeed: String,
    inTrust: Boolean,
    assignedPolicy: Boolean,
    lapr: Boolean,
    maturityValue: {
        currency: String,
        amount: Number
    },
    valuation: {
        currency: String,
        amount: Number
    },
    commencementDate: Date,
    maturityDate: Date,
    createdAt: Date,
    contactId: String,
    accountId: String,
    userId: String
}

interface IXProtectionModel extends IXProtection, mongoose.Document {

}

export var XProtection: Model<IXProtectionModel> = mongoose.model<IXProtectionModel>("XProtection", xProtectionSchema);