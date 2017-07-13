import * as mongoose from "mongoose";
import {Model} from "mongoose";
import {Schema} from "mongoose";
var contactSchema: Schema = new mongoose.Schema({

    salutation: String,
    preferredName: String,
    dateOfBirth: Date,
    firstName: String,
    middleName: String,
    lastName: String,
    gender: String,
    maritalStatus: String,
    nationality: String,

    mobilePhone: String,
    homePhone: String,
    workPhone: String,
    primaryEmail: String,
    secondaryEmail: String,

    accountId: String,
    userId: String,
    createdAt: Date,
    updatedAt: Date
})
export var Contact: Model<IContactModel> = mongoose.model<IContactModel>("Contact", contactSchema);
interface IContactModel extends IContact, mongoose.Document {
}
interface IContact {
    salutation: String;
    preferredName: String;
    dateOfBirth: String;
    firstName: String;
    middleName: String;
    lastName: String;
    gender: String;
    maritalStatus: String;
    nationality: String;

    mobilePhone: String;
    homePhone: String;
    workPhone: String;
    primaryEmail: String;
    secondaryEmail: String;

    accountId: String;
    userId: String;
    createdAt: Date;
    updatedAt: Date;
}