import * as mongoose from "mongoose";
import { Model } from "mongoose";
import { Schema } from "mongoose";

var bankAccountSchema: Schema = new mongoose.Schema({
    accountType: String,        // UK | Non-UK
    accountName: String,
    bankName: String,
    accountNumber: String,
    sortCode: String,
    swiftCode: String,
    iban: String,
    accountId: String,
    contactId: String,
    createdAt: Date,
    userId: String,

})

interface IBankAccount {
    accountType: String;        // UK | Non-UK
    accountName: String;
    bankName: String;
    accountNumber: String;
    sortCode: String;
    swiftCode: String;
    iban: String;
    accountId: String;
    contactId: String;
    createdAt: Date;
    userId: String;
}

interface IBankAccountModel extends IBankAccount, mongoose.Document {

}

export var BankAccount: Model<IBankAccountModel> = mongoose.model<IBankAccountModel>("BankAccount", bankAccountSchema);