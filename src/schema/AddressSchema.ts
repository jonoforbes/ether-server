import * as mongoose from "mongoose";
import { Model } from "mongoose";
import { Schema } from "mongoose";

var addressSchema: Schema = new mongoose.Schema({
    addressType: String,
    primaryAddress: Boolean,
    longitude: Number,
    latitude: Number,
    formattedName: String,
    houseNumber: String,
    streetName: String,
    city: String,
    postCode: String,
    country: String,
    startDate: Date,
    endDate: Date,

    contactId: String,
    accountId: String,
    bankAccountId: String,
    createdAt: Date,
    updatedAt: Date,
    userId: String
})

interface IAddressModel extends IAddress, mongoose.Document {

}

interface IAddress {
    addressType: String;
    primaryAddress: Boolean; 
    longitude: Number;
    latitude: Number;
    formattedName: String;
    houseNumber: String;
    streetName: String;
    city: String;
    postCode: String;
    country: String;
    startDate: Date,
    endDate: Date,

    contactId: String;
    accountId: String;
    bankAccountId: String;
    createdAt: Date;
    updatedAt: Date;
    userId: String;
}

export var Address: Model<IAddressModel> = mongoose.model<IAddressModel>("Address", addressSchema);