import * as mongoose from "mongoose";
import { Model } from "mongoose";
import { Schema } from "mongoose";
import { Currency } from "../constants";

var bankAccountSchema: Schema = new mongoose.Schema({
    accountOwnerType: String,
    accountType: String,        // UK | Non-UK
    accountName: String,
    bankName: String,
    accountNumber: String,
    sortCode: String,
    swiftCode: String,
    iban: String,
    currency: Number,

    accountId: String,
    contactId: String,
    createdAt: Date,
    updatedAt: Date,
    userId: String,

})

interface IBankAccount {
    accountOwnerType: String,
    accountType: String;        // UK | Non-UK
    accountName: String;
    bankName: String;
    accountNumber: String;
    sortCode: String;
    swiftCode: String;
    iban: String;
    currency: Number;

    accountId: String;
    contactId: String;
    createdAt: Date;
    updatedAt: Date;
    userId: String;
}

interface IBankAccountModel extends IBankAccount, mongoose.Document {

}

export var BankAccount: Model<IBankAccountModel> = mongoose.model<IBankAccountModel>("BankAccount", bankAccountSchema);