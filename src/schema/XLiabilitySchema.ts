import * as mongoose from "mongoose";
import { Model } from "mongoose";
import { Schema } from "mongoose";
import { Currency } from "../constants";

var xLiabilitySchema: Schema = new mongoose.Schema({
    currency: Number,
    ownerType: String,
    lenderName: String,
    type: String,
    initialAmount: Number,
    outstandingAmount: Number,
    paymentAmount: Number,
    paymentFrequency: String,
    termRemaining: Number,
    repaymentMethod: String,
    ratePercentage: Number,
    rateType: String,
    rateBasisEnds: String,
    policyNumber: String,
    transferable: Boolean,
    transferPenalty: String,
    reviewDate: Date,
    startDate: Date,

    contactId: String,
    accountId: String,
    createdAt: Date,
    updatedAt: Date,
    userId: String
})

interface IXLiability {
    currency: Number;
    ownerType: String;
    lenderName: String;
    type: String;
    initialAmount: Number;
    outstandingAmount: Number;
    paymentAmount: Number;
    paymentFrequency: String;
    termRemaining: Number;
    repaymentMethod: String;
    ratePercentage: Number;
    rateType: String;
    rateBasisEnds: String;
    policyNumber: String;
    transferable: Boolean;
    transferPenalty: String;
    reviewDate: Date;
    startDate: Date;

    contactId: String;
    accountId: String;
    createdAt: Date;
    updatedAt: Date;
    userId: String
}

interface IXLiabilityModel extends IXLiability, mongoose.Document {

}

export var XLiability: Model<IXLiabilityModel> = mongoose.model<IXLiabilityModel>("XLiability", xLiabilitySchema);