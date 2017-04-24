import * as mongoose from "mongoose";
import { Model } from "mongoose";
import { Schema } from "mongoose";

var productSchema: Schema = new mongoose.Schema({
    ticker: {type: String, required: true},
    fullName: String,
    description: String,
    userId: String, 
    createdAt: Date
})

interface IProductModel extends IProduct, mongoose.Document{
}

interface IProduct {
    ticker: String,
    fullName: String,
    description: String,
    userId: String, 
    createdAt: Date
}

export var Product: Model<IProductModel> = mongoose.model<IProductModel>("Product", productSchema);

