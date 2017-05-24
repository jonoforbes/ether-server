import * as mongoose from "mongoose";
import { Model } from "mongoose";
import { Schema } from "mongoose";

var xLiabilitySchema: Schema = new mongoose.Schema({
    ownerType: String,
    lenderName: String,
    type: String,
    initial: {
        currency: String,
        amount: Number
    },
    outstanding: {
        currency: String,
        amount: Number
    },
    payment: {
        currency:  String,
        amount: Number,
        frequency: String
    },
    termRemaining: Number,
    repaymentMethod: String,
    rate: {
        percentage: Number,
        type: String,
        basisEnds: Date
    },
    policyNumber: String,
    transferable: Boolean,
    transferPenalty: String,
    reviewDate: Date,
    startDate: String,
    contactId: String,
    accountId: String,
    createdAt: Date,
    userId: String
})

interface IXLiability {
    ownerType: String,
    lenderName: String,
    type: String,
    initial: {
        currency: String,
        amount: Number
    },
    outstanding: {
        currency: String,
        amount: Number
    },
    payment: {
        currency:  String,
        amount: Number,
        frequency: String
    },
    termRemaining: Number,
    repaymentMethod: String,
    rate: {
        percentage: Number,
        type: String,
        basisEnds: Date
    },
    policyNumber: String,
    transferable: Boolean,
    transferPenalty: String,
    reviewDate: Date,
    startDate: String,
    contactId: String,
    accountId: String,
    createdAt: Date,
    userId: String
}

interface IXLiabilityModel extends IXLiability, mongoose.Document {

}

export var XLiability: Model<IXLiabilityModel> = mongoose.model<IXLiabilityModel>("XLiability", xLiabilitySchema);