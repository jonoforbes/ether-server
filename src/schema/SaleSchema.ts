import * as mongoose from "mongoose";
import { Model } from "mongoose";
import { Schema } from "mongoose";
import { Currency } from "../constants";

var saleSchema: Schema = new mongoose.Schema({
    saleStatus: String,
    quantity: Number,
    buyPrice: Number,
    term: Number,
    description: String,
    currency: Number,

    accountId: String,
    productId: String,
    userId: String, 
    createdAt: Date,
    updatedAt: Date
})

interface ISaleModel extends ISale, mongoose.Document{
}

interface ISale {
    saleStatus: String;
    quantity: Number;
    buyPrice: Number;
    term: Number;
    description: String;
    currency: Number;
    
    accountId: String;
    productId: String;
    userId: String;
    createdAt: Date;
    updatedAt: Date;
}

export var Sale: Model<ISaleModel> = mongoose.model<ISaleModel>("Sale", saleSchema);
