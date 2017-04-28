import * as mongoose from "mongoose";
import { Model } from "mongoose";
import { Schema } from "mongoose";

var clientAccountSchema: Schema = new mongoose.Schema({
    accountName: String,
    accountStatus: String,
    companyFullName: String,
    companyNumber: String,
    createdAt: Date,
    userId: String
})

interface IClientAccount {
    accountName: String;
    accountStatus: String;
    companyFullName: String;
    companyNumber: String;
    createdAt: Date;
    userId: String;
}

interface IClientAccountModel extends IClientAccount, mongoose.Document {
}

export var ClientAccount: Model<IClientAccountModel> = mongoose.model<IClientAccountModel>("ClientAccount", clientAccountSchema);