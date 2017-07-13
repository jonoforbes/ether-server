import * as mongoose from "mongoose";
import {Model} from "mongoose";
import {Schema} from "mongoose";
import { Currency } from "../constants";

var expenditureSchema: Schema = new mongoose.Schema({

    monthlyPolicyExpenditure: Number,
    monthlyEssentialExpenditure: Number,
    monthlyDiscretionaryExpenditure: Number,
    emergencyFundsAvailable: Number,
    emergencyFundsRecommended: Number,
    futureCircumstances: Boolean,
    currency: Number,

    contactId: String,
    accountId: String,
    userId: String,
    createdAt: Date,
    updatedAt: Date
})
export var Expenditure: Model<IExpenditureModel> = mongoose.model<IExpenditureModel>("Expenditure", expenditureSchema);
interface IExpenditureModel extends IExpenditure, mongoose.Document {
}
interface IExpenditure {
    monthlyPolicyExpenditure: Number;
    monthlyEssentialExpenditure: Number;
    monthlyDiscretionaryExpenditure: Number;
    emergencyFundsAvailable: Number;
    emergencyFundsRecommended: Number;
    futureCircumstances: Boolean;
    currency: Number;

    contactId: String;
    accountId: String;
    userId: String;
    createdAt: Date;
    updatedAt: Date;
}
 
 


