import * as mongoose from "mongoose";
import { Model } from "mongoose";
import { Schema } from "mongoose";

var appointmentSchema: Schema = new mongoose.Schema({
    description: {type: String, required: true},
    invitees: [{type: String}],
    contactId: String,
    saleId: String,
    accountId: String,
    userId: String,
    createdAt: Date
})

interface IAppointmentModel extends IAppointment, mongoose.Document{
}

interface IAppointment {
    description: String,
    invitees: String[],
    contactId: String,
    saleId: String,
    accountId: String,
    userId: String,
    createdAt: Date
}

export var Appointment: Model<IAppointmentModel> = mongoose.model<IAppointmentModel>("Appointment", appointmentSchema);

