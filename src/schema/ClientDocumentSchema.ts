import * as mongoose from "mongoose";
import { Model } from "mongoose";
import { Schema } from "mongoose";

var clientDocumentSchema: Schema = new mongoose.Schema({
    name: {type: String, required: true},
    description: String,
    accountId: String,
    contactId: String,
    saleId: String,
    boxFileId: String,
    userId: String, 
    createdAt: Date
})

interface IClientDocumentModel extends IClientDocument, mongoose.Document{
}

interface IClientDocument {
    name: String,
    description: String,
    accountId: String,
    contactId: String,
    saleId: String,
    boxFileId: String,
    userId: String, 
    createdAt: Date
}

export var ClientDocument: Model<IClientDocumentModel> = mongoose.model<IClientDocumentModel>("ClientDocument", clientDocumentSchema);
