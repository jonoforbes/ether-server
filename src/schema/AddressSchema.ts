import * as mongoose from "mongoose";
import { Model } from "mongoose";
import { Schema } from "mongoose";

var addressSchema: Schema = new mongoose.Schema({
    longitude: Number,
    latitude: Number,
    formattedName: String,
    houseNumber: String,
    streetName: String,
    city: String,
    postCode: String,
    country: String,
    contactId: String,
    accountId: String,
    createdAt: Date,
    userId: String
})

interface IAddressModel extends IAddress, mongoose.Document {

}

interface IAddress {
    longitude: Number,
    latitude: Number,
    formattedName: String,
    houseNumber: String,
    streetName: String,
    city: String,
    postCode: String,
    country: String,
    contactId: String,
    accountId: String,
    createdAt: Date,
    userId: String
}

export var Address: Model<IAddressModel> = mongoose.model<IAddressModel>("Address", addressSchema);