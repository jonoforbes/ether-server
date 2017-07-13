import * as mongoose from "mongoose";
import {Model} from "mongoose";
import {Schema} from "mongoose";
import { Currency } from "../constants";

var incomeSchema: Schema = new mongoose.Schema({

    tEmployment: Number,
    ntEmployment: Number,
    tSelfEmployedY1: Number,
    ntSelfEmployedY1: Number,
    tSelfEmployedY2: Number,
    ntSelfEmployedY2: Number,
    tPension: Number,
    ntPension: Number,
    tStatePension: Number,
    ntStatePension: Number,
    ntStateBenefit: Number,
    tOther: Number,
    ntOther: Number,
    currency: Number,

    contactId: String,
    accountId: String,
    userId: String,
    createdAt: Date,
    updatedAt: Date
})
export var Income: Model<IIncomeModel> = mongoose.model<IIncomeModel>("Income", incomeSchema);
interface IIncomeModel extends IIncome, mongoose.Document {
}
interface IIncome {
    tEmployment: Number;
    ntEmployment: Number;
    tSelfEmployedY1: Number;
    ntSelfEmployedY1: Number;
    tSelfEmployedY2: Number;
    ntSelfEmployedY2: Number;
    tPension: Number;
    ntPension: Number;
    tStatePension: Number;
    ntStatePension: Number;
    ntStateBenefit: Number;
    tOther: Number;
    ntOther: Number;
    currency: Number;

    contactId: String;
    accountId: String;
    userId: String;
    createdAt: Date;
    updatedAt: Date;
}