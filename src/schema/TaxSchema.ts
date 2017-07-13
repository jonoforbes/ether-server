import * as mongoose from "mongoose";
import {Model} from "mongoose";
import {Schema} from "mongoose";
var taxSchema: Schema = new mongoose.Schema({

    rate: Number,
    residentCountry: String,
    domicileCountry: String,
    residenceDate: Date,
    number: Number,
    willChange: Boolean,

    contactId: String,
    accountId: String,
    userId: String,
    createdAt: Date,
    updatedAt: Date
})
export var Tax: Model<ITaxModel> = mongoose.model<ITaxModel>("Tax", taxSchema);
interface ITaxModel extends ITax, mongoose.Document {
}
interface ITax {
    rate: Number,
    residentCountry: String,
    domicileCountry: String,
    residenceDate: Date,
    number: Number,
    willChange: Boolean,

    contactId: String;
    accountId: String;
    userId: String;
    createdAt: Date;
    updatedAt: Date;

}