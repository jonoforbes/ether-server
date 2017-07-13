import * as mongoose from "mongoose";
import { Model } from "mongoose";
import { Schema } from "mongoose";

var clientDocumentSchema: Schema = new mongoose.Schema({
    name: {type: String, required: true},
    type: String,
    description: String,

    folderId: String,
    accountId: String,
    contactId: String,
    saleId: String,
    boxFileId: String,
    userId: String, 
    createdAt: Date,
    updatedAt: Date,
})

interface IClientDocumentModel extends IClientDocument, mongoose.Document{
}

interface IClientDocument {
    name: String;
    type: String;
    description: String;

    folderId: String;
    accountId: String;
    contactId: String;
    saleId: String;
    boxFileId: String;
    userId: String;
    createdAt: Date;
    updatedAt: Date;
}

export var ClientDocument: Model<IClientDocumentModel> = mongoose.model<IClientDocumentModel>("ClientDocument", clientDocumentSchema);
