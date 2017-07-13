import * as mongoose from "mongoose";
import {Model} from "mongoose";
import {Schema} from "mongoose";
var healthOccupationSchema: Schema = new mongoose.Schema({

    dateOfDeath: Date,
    smoker: Boolean,
    goodHealth: Boolean,
    medicalConditions: Boolean,
    occupation: String,
    occupationTitle: String,
    occupationStatus: String,
    employerName: String,
    timeInOccupation: String,
    timeInJob: String,

    contactId: String,
    accountId: String,
    userId: String,
    createdAt: Date,
    updatedAt: Date
})
export var HealthOccupation: Model<IHealthOccupationModel> = mongoose.model<IHealthOccupationModel>("HealthOccupation", healthOccupationSchema);
interface IHealthOccupationModel extends IHealthOccupation, mongoose.Document {
}
interface IHealthOccupation {
    dateOfDeath: Date;
    smoker: Boolean;
    goodHealth: Boolean;
    medicalConditions: Boolean;
    occupation: String;
    occupationTitle: String;
    occupationStatus: String;
    employerName: String;
    timeInOccupation: String;
    timeInJob: String;

    contactId: String;
    accountId: String;
    userId: String;
    createdAt: Date;
    updatedAt: Date;
}