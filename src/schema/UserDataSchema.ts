import * as mongoose from "mongoose";
import {Model} from "mongoose";
import {Schema} from "mongoose";
var userDataSchema: Schema = new mongoose.Schema({
    firstName: String,
    middleName: String,
    lastName: String,
    preferredName: String,
    salutation: String,
    dateOfBirth: String,
    nationality: String,
    mobilePhone: String,
    homePhone: String,
    workPhone: String,
    userId: String
})
export var UserData: Model<IUserDataModel> = mongoose.model<IUserDataModel>("UserData", userDataSchema);
export interface IUserDataModel extends IUserData, mongoose.Document {
}
export interface IUserData {
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
    userId: String;
}