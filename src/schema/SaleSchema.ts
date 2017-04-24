import * as mongoose from "mongoose";
import { Model } from "mongoose";
import { Schema } from "mongoose";

var saleSchema: Schema = new mongoose.Schema({
    accountId: String,
    contactId: String,
    productId: String,
    saleStatus: String,
    quantity: Number,
    buyPrice: Number,
    term: Number,
    description: String,
    userId: String, 
    createdAt: Date
})

interface ISaleModel extends ISale, mongoose.Document{
}

interface ISale {
    accountId: String,
    contactId: String,
    productId: String,
    saleStatus: String,
    quantity: Number,
    buyPrice: Number,
    term: Number,
    description: String,
    userId: String, 
    createdAt: Date
}

export var Sale: Model<ISaleModel> = mongoose.model<ISaleModel>("Sale", saleSchema);
