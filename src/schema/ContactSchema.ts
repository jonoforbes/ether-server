import * as mongoose from "mongoose";
import {Model} from "mongoose";
import {Schema} from "mongoose";
var contactSchema: Schema = new mongoose.Schema({
    firstName: {type: String, required: true},
    middleName: String,
    lastName: String,
    preferredName: String,
    salutation: String,
    dateOfBirth: String,
    nationality: String,
    mobilePhone: String,
    homePhone: String,
    workPhone: String,
    accountId: String,
    userId: String
})
export var Contact: Model<IContactModel> = mongoose.model<IContactModel>("Contact", contactSchema);
interface IContactModel extends IContact, mongoose.Document {
}
interface IContact {
    firstName: String;
    middleName: String;
    lastName: String;
    preferredName: String;
    salutation: String;
    dateOfBirth: String;
    nationality: String;
    mobilePhone: String;
    homePhone: String;
    workPhone: String;
    accountId: String;
    userId: String;
}