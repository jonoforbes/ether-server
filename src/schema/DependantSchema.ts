import * as mongoose from "mongoose";
import {Model} from "mongoose";
import {Schema} from "mongoose";
var dependantSchema: Schema = new mongoose.Schema({

    salutation: String,
    preferredName: String,
    dateOfBirth: Date,
    firstName: String,
    middleName: String,
    lastName: String,
    gender: String,
    maritalStatus: String,
    nationality: String,

    contactId: String,
    accountId: String,
    userId: String,
    createdAt: Date,
    updatedAt: Date
})
export var Dependant: Model<IDependantModel> = mongoose.model<IDependantModel>("Dependant", dependantSchema);
interface IDependantModel extends IDependant, mongoose.Document {
}
interface IDependant {
    salutation: String;
    preferredName: String;
    dateOfBirth: String;
    firstName: String;
    middleName: String;
    lastName: String;
    gender: String;
    maritalStatus: String;
    nationality: String;

    contactId: String;
    accountId: String;
    userId: String;
    createdAt: Date;
    updatedAt: Date;
}