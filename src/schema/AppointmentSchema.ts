import * as mongoose from "mongoose";
import { Model } from "mongoose";
import { Schema } from "mongoose";

var appointmentSchema: Schema = new mongoose.Schema({
    description: {type: String, required: true},
    appointmentType: String,
    date: Date,
    startTime: Number, // time as number from 0 - 1440
    endTime: Number,

    contactId: String,
    saleId: String,
    accountId: String,
    userId: String,
    createdAt: Date,
    updatedAt: Date
})

interface IAppointmentModel extends IAppointment, mongoose.Document{
}

interface IAppointment {
    description: String;
    appointmentType: String;
    date: Date;
    startTime: Number;
    endTime: Number;
    
    contactId: String;
    saleId: String;
    accountId: String;
    userId: String;
    createdAt: Date;
    updatedAt: Date;
}

export var Appointment: Model<IAppointmentModel> = mongoose.model<IAppointmentModel>("Appointment", appointmentSchema);

