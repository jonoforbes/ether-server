import * as mongoose from "mongoose";
import { Model } from "mongoose";
import { Schema } from "mongoose";

var xLiabilitySchema: Schema = new mongoose.Schema({
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
    reviewDate: String,
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
    reviewDate: String,
    startDate: String,
    contactId: String,
    accountId: String,
    createdAt: Date,
    userId: String
}

interface IXLiabilityModel extends IXLiability, mongoose.Document {

}

export var XLiability: Model<IXLiabilityModel> = mongoose.model<IXLiabilityModel>("XLiability", xLiabilitySchema);